package de.lauri.appstore;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInstaller;

/**
 * Manifest-registrierter BroadcastReceiver für PackageInstaller-Statusmeldungen
 * nach dem Vorbild von F-Droid (InstallerService) und Neo Store (SessionInstaller).
 * Verwendet explizite Intents, um die strengen Android 14/15/16 PendingIntent-Sicherheitsregeln
 * und Google Play Protect Anforderungen vollständig zu erfüllen.
 */
public class InstallStatusReceiver extends BroadcastReceiver {

    public interface StatusCallback {
        void onResult(boolean success, String packageName, int status, String message);
    }

    private static volatile StatusCallback activeCallback;

    public static void setStatusCallback(StatusCallback callback) {
        activeCallback = callback;
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent == null) {
            return;
        }

        int status = intent.getIntExtra(PackageInstaller.EXTRA_STATUS, PackageInstaller.STATUS_FAILURE);
        String pkgName = intent.getStringExtra(PackageInstaller.EXTRA_PACKAGE_NAME);
        String msg = intent.getStringExtra(PackageInstaller.EXTRA_STATUS_MESSAGE);

        if (status == PackageInstaller.STATUS_PENDING_USER_ACTION) {
            Intent confirmIntent = intent.getParcelableExtra(Intent.EXTRA_INTENT);
            if (confirmIntent != null) {
                confirmIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                try {
                    context.startActivity(confirmIntent);
                } catch (Exception ignored) {
                }
            }
            return;
        }

        boolean success = (status == PackageInstaller.STATUS_SUCCESS);
        StatusCallback cb = activeCallback;
        if (cb != null) {
            cb.onResult(success, pkgName != null ? pkgName : "", status, msg != null ? msg : "");
        }
    }
}
