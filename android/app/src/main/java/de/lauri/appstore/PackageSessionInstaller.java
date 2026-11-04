package de.lauri.appstore;

import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageInstaller;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import androidx.core.content.FileProvider;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;

/**
 * F-Droid / Neo Store kompatibler PackageInstaller Session-Manager.
 * Nutzt offizielle Android PackageInstaller Sessions mit expliziten PendingIntents
 * und setzt USER_ACTION_NOT_REQUIRED ausschließlich bei Updates bereits installierter Pakete.
 */
public class PackageSessionInstaller {

    public static int commitInstallSession(Context context, File apkFile, String requestedPackageName) throws Exception {
        PackageManager pm = context.getPackageManager();
        PackageInfo archiveInfo = pm.getPackageArchiveInfo(apkFile.getAbsolutePath(), 0);
        String resolvedPkg = (archiveInfo != null && archiveInfo.packageName != null)
                ? archiveInfo.packageName
                : requestedPackageName;

        PackageInstaller packageInstaller = pm.getPackageInstaller();
        PackageInstaller.SessionParams params = new PackageInstaller.SessionParams(
                PackageInstaller.SessionParams.MODE_FULL_INSTALL
        );

        params.setSize(apkFile.length());
        params.setInstallLocation(PackageInfo.INSTALL_LOCATION_AUTO);

        if (resolvedPkg != null && !resolvedPkg.isEmpty()) {
            params.setAppPackageName(resolvedPkg);
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            params.setPackageSource(PackageInstaller.PACKAGE_SOURCE_STORE);
        }

        // Wie bei F-Droid & Neo Store: Stille Updates (USER_ACTION_NOT_REQUIRED) nur für bereits installierte Apps anfordern
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S && isPackageInstalled(pm, resolvedPkg)) {
            params.setRequireUserAction(PackageInstaller.SessionParams.USER_ACTION_NOT_REQUIRED);
        }

        int sessionId = packageInstaller.createSession(params);
        try (PackageInstaller.Session session = packageInstaller.openSession(sessionId)) {
            try (InputStream in = new FileInputStream(apkFile);
                 OutputStream out = session.openWrite("package.apk", 0, apkFile.length())) {
                byte[] buffer = new byte[16384];
                int n;
                while ((n = in.read(buffer)) != -1) {
                    out.write(buffer, 0, n);
                }
                session.fsync(out);
            }

            // Expliziter Intent auf InstallStatusReceiver (erfüllt Android 14+ FLAG_MUTABLE Sicherheitsanforderung)
            Intent statusIntent = new Intent(context, InstallStatusReceiver.class);
            statusIntent.setPackage(context.getPackageName());
            if (resolvedPkg != null) {
                statusIntent.putExtra(PackageInstaller.EXTRA_PACKAGE_NAME, resolvedPkg);
            }

            int flags = PendingIntent.FLAG_UPDATE_CURRENT;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                flags |= PendingIntent.FLAG_MUTABLE;
            }

            PendingIntent pendingIntent = PendingIntent.getBroadcast(
                    context,
                    sessionId,
                    statusIntent,
                    flags
            );
            session.commit(pendingIntent.getIntentSender());
        }

        return sessionId;
    }

    public static void launchFallbackInstallIntent(Context context, File apkFile) {
        Uri apkUri = FileProvider.getUriForFile(
                context,
                context.getPackageName() + ".fileprovider",
                apkFile
        );
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setDataAndType(apkUri, "application/vnd.android.package-archive");
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }

    private static boolean isPackageInstalled(PackageManager pm, String packageName) {
        if (packageName == null || packageName.isEmpty()) {
            return false;
        }
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                pm.getPackageInfo(packageName, PackageManager.PackageInfoFlags.of(0));
            } else {
                pm.getPackageInfo(packageName, 0);
            }
            return true;
        } catch (PackageManager.NameNotFoundException e) {
            return false;
        }
    }
}
