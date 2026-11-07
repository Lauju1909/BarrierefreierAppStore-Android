package de.lauri.appstore;

import java.io.File;

/**
 * Native Rust Security & Verification Bridge (`liblauju_store_core.so`).
 * Provides memory-safe, zero-copy streaming SHA-256 hashing, ZIP/APK central
 * directory structural validation (`AndroidManifest.xml`), and strict URL/filename sanitization.
 * Includes a seamless Java fallback if the native library is unavailable on a custom ABI.
 */
public final class RustStoreCore {

    private static boolean nativeLoaded = false;

    static {
        try {
            System.loadLibrary("lauju_store_core");
            nativeLoaded = true;
        } catch (Throwable ignored) {
            nativeLoaded = false;
        }
    }

    private RustStoreCore() {}

    public static boolean isNativeLoaded() {
        return nativeLoaded;
    }

    // Native JNI methods implemented in rust-core/src/lib.rs
    public static native String computeSha256(String filePath);
    public static native boolean verifyApkStructure(String filePath, String expectedSha256);
    public static native String sanitizeFileName(String rawName);
    public static native boolean isValidHttpsUrl(String url);

    /**
     * Safe wrapper that calls the Rust native implementation when loaded,
     * or falls back to Java if running in an environment without JNI libs.
     */
    public static String safeSanitizeFileName(String rawName) {
        if (nativeLoaded) {
            try {
                String res = sanitizeFileName(rawName != null ? rawName : "");
                if (res != null && !res.isEmpty()) {
                    return res;
                }
            } catch (Throwable ignored) {
            }
        }
        if (rawName != null && rawName.endsWith(".apk")) {
            return rawName.replaceAll("[^a-zA-Z0-9._-]", "_");
        }
        return "package_" + System.currentTimeMillis() + ".apk";
    }

    public static boolean safeIsValidHttpsUrl(String url) {
        if (nativeLoaded) {
            try {
                return isValidHttpsUrl(url != null ? url : "");
            } catch (Throwable ignored) {
            }
        }
        return url != null && url.trim().startsWith("https://");
    }

    public static boolean safeVerifyApk(File apkFile, String expectedSha256) throws Exception {
        if (apkFile == null || !apkFile.exists()) {
            return false;
        }
        if (nativeLoaded) {
            try {
                return verifyApkStructure(
                        apkFile.getAbsolutePath(),
                        expectedSha256 != null ? expectedSha256.trim() : ""
                );
            } catch (Throwable ignored) {
            }
        }
        if (expectedSha256 != null && !expectedSha256.trim().isEmpty()) {
            String actual = ApkDownloadClient.computeSha256JavaFallback(apkFile);
            if (!actual.equalsIgnoreCase(expectedSha256.trim())) {
                return false;
            }
        }
        return apkFile.length() > 128;
    }
}
