use jni::objects::{JClass, JString};
use jni::sys::{jboolean, jstring, JNI_FALSE, JNI_TRUE};
use jni::JNIEnv;
use sha2::{Digest, Sha256};
use std::fs::File;
use std::io::{Read, Seek, SeekFrom};
use std::path::Path;

/// Pure-Rust streaming SHA-256 computation in constant 64 KB memory.
pub fn compute_file_sha256(path: &Path) -> Result<String, String> {
    let mut file = File::open(path).map_err(|e| format!("Failed to open APK: {}", e))?;
    let mut hasher = Sha256::new();
    let mut buffer = [0u8; 65536];
    loop {
        let read_bytes = file
            .read(&mut buffer)
            .map_err(|e| format!("Read error while hashing APK: {}", e))?;
        if read_bytes == 0 {
            break;
        }
        hasher.update(&buffer[..read_bytes]);
    }
    Ok(hex::encode(hasher.finalize()))
}

/// Pure-Rust APK / ZIP structural integrity verifier.
/// Checks:
/// 1. Local file header magic (`PK\x03\x04`)
/// 2. Minimum valid size (> 128 bytes)
/// 3. ZIP End of Central Directory (`PK\x05\x06`) in the tail of the archive
/// 4. Presence of `AndroidManifest.xml` in the ZIP central directory / entries
pub fn verify_apk_archive_structure(path: &Path) -> Result<bool, String> {
    let mut file = File::open(path).map_err(|e| format!("Cannot open APK file: {}", e))?;
    let metadata = file
        .metadata()
        .map_err(|e| format!("Cannot read APK metadata: {}", e))?;
    let len = metadata.len();
    if len < 128 {
        return Ok(false);
    }

    let mut magic = [0u8; 4];
    file.read_exact(&mut magic)
        .map_err(|e| format!("Failed to read APK magic header: {}", e))?;
    if magic != [0x50, 0x4B, 0x03, 0x04] {
        return Ok(false);
    }

    // Read tail (up to last 512 KB) to inspect Central Directory for AndroidManifest.xml and EOCD
    let tail_size = std::cmp::min(len, 524_288) as usize;
    file.seek(SeekFrom::End(-(tail_size as i64)))
        .map_err(|e| format!("Seek error: {}", e))?;
    let mut tail = vec![0u8; tail_size];
    file.read_exact(&mut tail)
        .map_err(|e| format!("Tail read error: {}", e))?;

    let has_eocd = tail.windows(4).any(|w| w == [0x50, 0x4B, 0x05, 0x06]);
    if !has_eocd {
        return Ok(false);
    }

    // Check if AndroidManifest.xml is present in Central Directory (or head of file)
    let manifest_bytes = b"AndroidManifest.xml";
    let mut has_manifest = tail
        .windows(manifest_bytes.len())
        .any(|w| w == manifest_bytes);

    if !has_manifest {
        let head_size = std::cmp::min(len, 65_536) as usize;
        file.seek(SeekFrom::Start(0))
            .map_err(|e| format!("Seek start error: {}", e))?;
        let mut head = vec![0u8; head_size];
        file.read_exact(&mut head)
            .map_err(|e| format!("Head read error: {}", e))?;
        has_manifest = head
            .windows(manifest_bytes.len())
            .any(|w| w == manifest_bytes);
    }

    Ok(has_manifest)
}

/// Sanitizes an untrusted APK filename to prevent path traversal and invalid characters.
pub fn sanitize_apk_filename(raw_name: &str) -> String {
    let trimmed = raw_name.trim();
    if trimmed.is_empty() {
        return "package_update.apk".to_string();
    }
    let mut clean: String = trimmed
        .chars()
        .map(|c| {
            if c.is_ascii_alphanumeric() || c == '.' || c == '_' || c == '-' {
                c
            } else {
                '_'
            }
        })
        .collect();
    while clean.contains("..") {
        clean = clean.replace("..", "_");
    }
    let clean = clean.trim_start_matches('.').to_string();
    if clean.is_empty() {
        "package_update.apk".to_string()
    } else if !clean.to_lowercase().ends_with(".apk") {
        format!("{}.apk", clean)
    } else {
        clean
    }
}

/// Validates that a download or repository URL uses strict HTTPS and has a valid host.
pub fn is_valid_https_url(url: &str) -> bool {
    let trimmed = url.trim();
    if !trimmed.starts_with("https://") || trimmed.len() < 12 {
        return false;
    }
    let without_scheme = &trimmed["https://".len()..];
    let host = without_scheme.split('/').next().unwrap_or("");
    !host.is_empty()
        && host.contains('.')
        && !host.contains("..")
        && !host.chars().any(|c| c.is_whitespace())
}

// ============================================================================
// JNI Exports for `de.lauri.appstore.RustStoreCore`
// ============================================================================

#[no_mangle]
pub extern "system" fn Java_de_lauri_appstore_RustStoreCore_computeSha256<'local>(
    mut env: JNIEnv<'local>,
    _class: JClass<'local>,
    file_path: JString<'local>,
) -> jstring {
    let path_str: String = match env.get_string(&file_path) {
        Ok(s) => s.into(),
        Err(_) => return std::ptr::null_mut(),
    };
    match compute_file_sha256(Path::new(&path_str)) {
        Ok(hash) => match env.new_string(hash) {
            Ok(jstr) => jstr.into_raw(),
            Err(_) => std::ptr::null_mut(),
        },
        Err(_) => std::ptr::null_mut(),
    }
}

#[no_mangle]
pub extern "system" fn Java_de_lauri_appstore_RustStoreCore_verifyApkStructure<'local>(
    mut env: JNIEnv<'local>,
    _class: JClass<'local>,
    file_path: JString<'local>,
    expected_sha256: JString<'local>,
) -> jboolean {
    let path_str: String = match env.get_string(&file_path) {
        Ok(s) => s.into(),
        Err(_) => return JNI_FALSE,
    };
    let expected_str: String = if expected_sha256.is_null() {
        String::new()
    } else {
        env.get_string(&expected_sha256)
            .map(Into::into)
            .unwrap_or_default()
    };

    let path = Path::new(&path_str);
    if !expected_str.trim().is_empty() {
        match compute_file_sha256(path) {
            Ok(actual) => {
                if !actual.eq_ignore_ascii_case(expected_str.trim()) {
                    return JNI_FALSE;
                }
            }
            Err(_) => return JNI_FALSE,
        }
    }

    match verify_apk_archive_structure(path) {
        Ok(true) => JNI_TRUE,
        _ => JNI_FALSE,
    }
}

#[no_mangle]
pub extern "system" fn Java_de_lauri_appstore_RustStoreCore_sanitizeFileName<'local>(
    mut env: JNIEnv<'local>,
    _class: JClass<'local>,
    raw_name: JString<'local>,
) -> jstring {
    let input: String = if raw_name.is_null() {
        String::new()
    } else {
        env.get_string(&raw_name)
            .map(Into::into)
            .unwrap_or_default()
    };
    let sanitized = sanitize_apk_filename(&input);
    match env.new_string(sanitized) {
        Ok(jstr) => jstr.into_raw(),
        Err(_) => std::ptr::null_mut(),
    }
}

#[no_mangle]
pub extern "system" fn Java_de_lauri_appstore_RustStoreCore_isValidHttpsUrl<'local>(
    mut env: JNIEnv<'local>,
    _class: JClass<'local>,
    url: JString<'local>,
) -> jboolean {
    if url.is_null() {
        return JNI_FALSE;
    }
    let url_str: String = match env.get_string(&url) {
        Ok(s) => s.into(),
        Err(_) => return JNI_FALSE,
    };
    if is_valid_https_url(&url_str) {
        JNI_TRUE
    } else {
        JNI_FALSE
    }
}
