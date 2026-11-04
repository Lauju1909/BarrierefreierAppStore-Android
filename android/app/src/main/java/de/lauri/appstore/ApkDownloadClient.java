package de.lauri.appstore;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.MessageDigest;

/**
 * Modularer HTTPS-Download-Client nach F-Droid / Neo Store Vorbild.
 * Trennt den Netzwerk-Download strikt von der PackageInstaller-Session-Logik
 * und prüft vor der Rückgabe die Paket-Integrität und optionale SHA-256-Prüfsumme.
 */
public class ApkDownloadClient {

    public interface ProgressListener {
        void onProgress(int percent, long downloadedBytes, long totalBytes);
    }

    public static File fetchPackageArchive(
            Context context,
            String downloadUrl,
            String fileName,
            String expectedSha256,
            ProgressListener listener
    ) throws Exception {
        File repoCacheDir = new File(context.getCacheDir(), "apks");
        if (!repoCacheDir.exists()) {
            repoCacheDir.mkdirs();
        }

        // Alte temporäre Dateien aufräumen
        File[] oldFiles = repoCacheDir.listFiles();
        if (oldFiles != null) {
            for (File f : oldFiles) {
                if (f.isFile() && f.lastModified() < System.currentTimeMillis() - 3600_000L) {
                    f.delete();
                }
            }
        }

        String safeName = (fileName != null && fileName.endsWith(".apk"))
                ? fileName.replaceAll("[^a-zA-Z0-9._-]", "_")
                : "package_" + System.currentTimeMillis() + ".apk";
        File targetFile = new File(repoCacheDir, safeName);
        if (targetFile.exists()) {
            targetFile.delete();
        }

        HttpURLConnection conn = followRedirects(downloadUrl);
        int responseCode = conn.getResponseCode();
        if (responseCode < 200 || responseCode >= 300) {
            conn.disconnect();
            throw new Exception("Server antwortete mit HTTP " + responseCode);
        }

        long totalBytes = conn.getContentLengthLong();
        try (InputStream in = conn.getInputStream();
             FileOutputStream out = new FileOutputStream(targetFile)) {

            byte[] buffer = new byte[16384];
            long downloadedBytes = 0;
            int lastPercent = -1;
            int read;

            while ((read = in.read(buffer)) != -1) {
                out.write(buffer, 0, read);
                downloadedBytes += read;

                if (listener != null) {
                    if (totalBytes > 0) {
                        int percent = (int) ((downloadedBytes * 100L) / totalBytes);
                        if (percent != lastPercent && (percent - lastPercent >= 2 || percent == 100)) {
                            lastPercent = percent;
                            listener.onProgress(percent, downloadedBytes, totalBytes);
                        }
                    } else if (downloadedBytes % (256 * 1024) < 16384) {
                        listener.onProgress(-1, downloadedBytes, -1);
                    }
                }
            }
            out.flush();
        } finally {
            conn.disconnect();
        }

        // 1. Optionale SHA-256 Prüfsummen-Kontrolle
        if (expectedSha256 != null && !expectedSha256.trim().isEmpty()) {
            String actualHash = computeSha256(targetFile);
            if (!actualHash.equalsIgnoreCase(expectedSha256.trim())) {
                targetFile.delete();
                throw new Exception("SHA-256 Sicherheitsprüfung fehlgeschlagen.");
            }
        }

        // 2. Paket-Archiv-Validierung über Android PackageManager (wie in F-Droid / Neo Store)
        PackageManager pm = context.getPackageManager();
        PackageInfo archiveInfo = pm.getPackageArchiveInfo(targetFile.getAbsolutePath(), 0);
        if (archiveInfo == null || archiveInfo.packageName == null) {
            targetFile.delete();
            throw new Exception("Die heruntergeladene Datei ist kein gültiges Android-Paket.");
        }

        return targetFile;
    }

    private static HttpURLConnection followRedirects(String urlString) throws Exception {
        String currentUrl = urlString;
        for (int redirects = 0; redirects < 6; redirects++) {
            URL url = new URL(currentUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setConnectTimeout(20000);
            conn.setReadTimeout(30000);
            conn.setInstanceFollowRedirects(true);
            conn.setRequestProperty("User-Agent", "F-Droid/1.21.1 (LaujuStore; Android)");
            conn.setRequestProperty("Accept", "application/vnd.android.package-archive, application/octet-stream, */*");
            conn.connect();

            int status = conn.getResponseCode();
            if (status == HttpURLConnection.HTTP_MOVED_TEMP
                    || status == HttpURLConnection.HTTP_MOVED_PERM
                    || status == HttpURLConnection.HTTP_SEE_OTHER
                    || status == 307
                    || status == 308) {
                String location = conn.getHeaderField("Location");
                conn.disconnect();
                if (location == null || location.isEmpty()) {
                    throw new Exception("Ungültige Weiterleitung beim Download.");
                }
                currentUrl = new URL(url, location).toString();
                continue;
            }
            return conn;
        }
        throw new Exception("Zu viele Weiterleitungen beim Download.");
    }

    public static String computeSha256(File file) throws Exception {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        try (InputStream fis = new FileInputStream(file)) {
            byte[] buffer = new byte[8192];
            int n;
            while ((n = fis.read(buffer)) != -1) {
                digest.update(buffer, 0, n);
            }
        }
        StringBuilder sb = new StringBuilder();
        for (byte b : digest.digest()) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }
}
