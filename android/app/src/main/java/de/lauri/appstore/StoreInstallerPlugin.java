package de.lauri.appstore;

import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import androidx.core.content.FileProvider;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

@CapacitorPlugin(name = "StoreInstaller")
public class StoreInstallerPlugin extends Plugin {

    @PluginMethod
    public void canRequestPackageInstalls(PluginCall call) {
        JSObject ret = new JSObject();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            ret.put("value", getContext().getPackageManager().canRequestPackageInstalls());
        } else {
            ret.put("value", true);
        }
        call.resolve(ret);
    }

    @PluginMethod
    public void openInstallPermissionSettings(PluginCall call) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            Intent intent = new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES);
            intent.setData(Uri.parse("package:" + getContext().getPackageName()));
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            getContext().startActivity(intent);
        }
        call.resolve();
    }

    private static final String ACTION_INSTALL_RESULT = "de.lauri.appstore.INSTALL_RESULT";

    private void installWithSession(final Context context, File apkFile) throws Exception {
        android.content.pm.PackageInstaller installer = context.getPackageManager().getPackageInstaller();
        android.content.pm.PackageInstaller.SessionParams params = new android.content.pm.PackageInstaller.SessionParams(
                android.content.pm.PackageInstaller.SessionParams.MODE_FULL_INSTALL);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            params.setRequireUserAction(android.content.pm.PackageInstaller.SessionParams.USER_ACTION_NOT_REQUIRED);
        }
        int sessionId = installer.createSession(params);
        android.content.pm.PackageInstaller.Session session = installer.openSession(sessionId);
        try (java.io.OutputStream out = session.openWrite("app", 0, apkFile.length());
             java.io.InputStream in = new java.io.FileInputStream(apkFile)) {
            byte[] buf = new byte[65536];
            int n;
            while ((n = in.read(buf)) > 0) out.write(buf, 0, n);
            session.fsync(out);
        }

        android.content.BroadcastReceiver receiver = new android.content.BroadcastReceiver() {
            @Override
            public void onReceive(Context ctx, Intent intent) {
                int status = intent.getIntExtra(android.content.pm.PackageInstaller.EXTRA_STATUS, -1);
                if (status == android.content.pm.PackageInstaller.STATUS_PENDING_USER_ACTION) {
                    Intent confirm = intent.getParcelableExtra(Intent.EXTRA_INTENT);
                    if (confirm != null) {
                        confirm.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                        ctx.startActivity(confirm);
                    }
                    return;
                }
                JSObject ev = new JSObject();
                ev.put("status", status);
                ev.put("message", intent.getStringExtra(android.content.pm.PackageInstaller.EXTRA_STATUS_MESSAGE));
                notifyListeners("installResult", ev);
                try { ctx.unregisterReceiver(this); } catch (Exception ignored) {}
            }
        };
        IntentFilter filter = new IntentFilter(ACTION_INSTALL_RESULT);
        if (Build.VERSION.SDK_INT >= 33) {
            context.registerReceiver(receiver, filter, Context.RECEIVER_NOT_EXPORTED);
        } else {
            context.registerReceiver(receiver, filter);
        }

        Intent resultIntent = new Intent(ACTION_INSTALL_RESULT).setPackage(context.getPackageName());
        int flags = PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S ? PendingIntent.FLAG_MUTABLE : 0);
        PendingIntent pi = PendingIntent.getBroadcast(context, sessionId, resultIntent, flags);
        session.commit(pi.getIntentSender());
        session.close();
    }

    @PluginMethod
    public void getInstalledApps(PluginCall call) {
        JSArray arr = new JSArray();
        PackageManager pm = getContext().getPackageManager();
        List<PackageInfo> packages = pm.getInstalledPackages(0);
        for (PackageInfo pi : packages) {
            JSObject obj = new JSObject();
            obj.put("packageName", pi.packageName);
            obj.put("versionName", pi.versionName != null ? pi.versionName : "");
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                obj.put("versionCode", pi.getLongVersionCode());
            } else {
                obj.put("versionCode", pi.versionCode);
            }
            arr.put(obj);
        }
        JSObject ret = new JSObject();
        ret.put("apps", arr);
        call.resolve(ret);
    }

    @PluginMethod
    public void downloadAndInstall(PluginCall call) {
        String downloadUrl = call.getString("url");
        String fileName = call.getString("fileName");

        if (downloadUrl == null || downloadUrl.isEmpty()) {
            call.reject("URL darf nicht leer sein");
            return;
        }

        if (fileName == null || fileName.isEmpty()) {
            fileName = "downloaded_app.apk";
        }

        final String finalFileName = fileName;
        final String finalUrl = downloadUrl;

        new Thread(() -> {
            try {
                URL url = new URL(finalUrl);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestProperty("User-Agent", "LaujuStore/1.0");
                conn.setInstanceFollowRedirects(true);
                conn.connect();

                int responseCode = conn.getResponseCode();
                if (responseCode == HttpURLConnection.HTTP_MOVED_PERM || responseCode == HttpURLConnection.HTTP_MOVED_TEMP || responseCode == 307 || responseCode == 308) {
                    String newUrl = conn.getHeaderField("Location");
                    conn = (HttpURLConnection) new URL(newUrl).openConnection();
                    conn.setRequestProperty("User-Agent", "LaujuStore/1.0");
                    conn.connect();
                }

                File cacheDir = new File(getContext().getCacheDir(), "apks");
                if (!cacheDir.exists()) {
                    cacheDir.mkdirs();
                }

                File apkFile = new File(cacheDir, finalFileName);
                if (apkFile.exists()) {
                    apkFile.delete();
                }

                InputStream is = conn.getInputStream();
                FileOutputStream fos = new FileOutputStream(apkFile);

                byte[] buffer = new byte[8192];
                int len;
                while ((len = is.read(buffer)) != -1) {
                    fos.write(buffer, 0, len);
                }

                fos.flush();
                fos.close();
                is.close();
                conn.disconnect();

                // Installation über PackageInstaller-Session (wie Google Play):
                // Updates laufen ab Android 12 ohne Rückfrage, sonst bestätigt der Nutzer einmal.
                installWithSession(getContext(), apkFile);

                JSObject ret = new JSObject();
                ret.put("success", true);
                ret.put("filePath", apkFile.getAbsolutePath());
                call.resolve(ret);
            } catch (Exception e) {
                call.reject("Download/Installation fehlgeschlagen: " + e.getMessage(), e);
            }
        }).start();
    }
}
