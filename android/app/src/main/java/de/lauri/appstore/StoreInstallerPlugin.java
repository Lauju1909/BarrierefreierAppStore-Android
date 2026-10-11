package de.lauri.appstore;

import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.net.ConnectivityManager;
import android.net.NetworkCapabilities;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import android.util.Base64;
import androidx.core.content.FileProvider;
import androidx.work.Constraints;
import androidx.work.ExistingPeriodicWorkPolicy;
import androidx.work.NetworkType;
import androidx.work.PeriodicWorkRequest;
import androidx.work.WorkManager;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.MessageDigest;
import java.util.List;
import java.util.concurrent.TimeUnit;

@CapacitorPlugin(name = "StoreInstaller")
public class StoreInstallerPlugin extends Plugin {

    private static final String ACTION_INSTALL_RESULT = "de.lauri.appstore.INSTALL_RESULT";

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

    @PluginMethod
    public void isWifiConnected(PluginCall call) {
        JSObject ret = new JSObject();
        ConnectivityManager cm = (ConnectivityManager) getContext().getSystemService(Context.CONNECTIVITY_SERVICE);
        boolean isWifi = false;
        if (cm != null) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                android.net.Network active = cm.getActiveNetwork();
                if (active != null) {
                    NetworkCapabilities caps = cm.getNetworkCapabilities(active);
                    if (caps != null && caps.hasTransport(NetworkCapabilities.TRANSPORT_WIFI)) {
                        isWifi = true;
                    }
                }
            } else {
                android.net.NetworkInfo ni = cm.getActiveNetworkInfo();
                if (ni != null && ni.getType() == ConnectivityManager.TYPE_WIFI) {
                    isWifi = true;
                }
            }
        }
        ret.put("isWifi", isWifi);
        call.resolve(ret);
    }

    @PluginMethod
    public void scheduleBackgroundUpdateCheck(PluginCall call) {
        int hours = call.getInt("hours", 12);
        boolean wifiOnly = call.getBoolean("wifiOnly", true);

        if (hours <= 0) {
            WorkManager.getInstance(getContext()).cancelUniqueWork("LaujuStoreUpdateCheck");
            JSObject ret = new JSObject();
            ret.put("scheduled", false);
            call.resolve(ret);
            return;
        }

        Constraints.Builder cb = new Constraints.Builder();
        if (wifiOnly) {
            cb.setRequiredNetworkType(NetworkType.UNMETERED);
        } else {
            cb.setRequiredNetworkType(NetworkType.CONNECTED);
        }

        PeriodicWorkRequest req = new PeriodicWorkRequest.Builder(
                UpdateCheckWorker.class,
                hours,
                TimeUnit.HOURS
        ).setConstraints(cb.build()).build();

        WorkManager.getInstance(getContext()).enqueueUniquePeriodicWork(
                "LaujuStoreUpdateCheck",
                ExistingPeriodicWorkPolicy.UPDATE,
                req
        );

        JSObject ret = new JSObject();
        ret.put("scheduled", true);
        ret.put("hours", hours);
        call.resolve(ret);
    }

    @PluginMethod
    public void openApp(PluginCall call) {
        String pkg = call.getString("packageName");
        if (pkg == null || pkg.isEmpty()) {
            call.reject("packageName erforderlich");
            return;
        }
        PackageManager pm = getContext().getPackageManager();
        Intent intent = pm.getLaunchIntentForPackage(pkg);
        if (intent != null) {
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            getContext().startActivity(intent);
            JSObject ret = new JSObject();
            ret.put("success", true);
            call.resolve(ret);
        } else {
            call.reject("App hat keine Start-Aktivität oder ist nicht installiert: " + pkg);
        }
    }

    @PluginMethod
    public void uninstallApp(PluginCall call) {
        String pkg = call.getString("packageName");
        if (pkg == null || pkg.isEmpty()) {
            call.reject("packageName erforderlich");
            return;
        }
        Intent intent = new Intent(Intent.ACTION_UNINSTALL_PACKAGE);
        intent.setData(Uri.parse("package:" + pkg));
        intent.putExtra(Intent.EXTRA_RETURN_RESULT, true);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        getContext().startActivity(intent);

        JSObject ret = new JSObject();
        ret.put("success", true);
        call.resolve(ret);
    }

    @PluginMethod
    public void getInstalledApps(PluginCall call) {
        boolean includeSystem = call.getBoolean("includeSystem", false);
        JSArray arr = new JSArray();
        PackageManager pm = getContext().getPackageManager();
        List<PackageInfo> packages = pm.getInstalledPackages(PackageManager.GET_META_DATA);

        for (PackageInfo pi : packages) {
            boolean isSystem = (pi.applicationInfo.flags & ApplicationInfo.FLAG_SYSTEM) != 0;
            if (!includeSystem && isSystem) {
                continue;
            }

            JSObject obj = new JSObject();
            obj.put("packageName", pi.packageName);
            CharSequence label = pi.applicationInfo.loadLabel(pm);
            obj.put("name", label != null ? label.toString() : pi.packageName);
            obj.put("versionName", pi.versionName != null ? pi.versionName : "");
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                obj.put("versionCode", pi.getLongVersionCode());
            } else {
                obj.put("versionCode", pi.versionCode);
            }
            obj.put("isSystem", isSystem);

            // Optionales Icon als Data-URL für installierte Apps
            try {
                Drawable icon = pi.applicationInfo.loadIcon(pm);
                Bitmap bitmap;
                if (icon instanceof BitmapDrawable) {
                    bitmap = ((BitmapDrawable) icon).getBitmap();
                } else {
                    int w = Math.max(1, icon.getIntrinsicWidth());
                    int h = Math.max(1, icon.getIntrinsicHeight());
                    bitmap = Bitmap.createBitmap(w, h, Bitmap.Config.ARGB_8888);
                    Canvas canvas = new Canvas(bitmap);
                    icon.setBounds(0, 0, canvas.getWidth(), canvas.getHeight());
                    icon.draw(canvas);
                }
                if (bitmap != null) {
                    ByteArrayOutputStream stream = new ByteArrayOutputStream();
                    bitmap.compress(Bitmap.CompressFormat.PNG, 85, stream);
                    byte[] bytes = stream.toByteArray();
                    obj.put("iconBase64", "data:image/png;base64," + Base64.encodeToString(bytes, Base64.NO_WRAP));
                }
            } catch (Exception ignored) {}

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
        String expectedSha256 = call.getString("sha256");

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

                int totalLength = conn.getContentLength();
                InputStream is = conn.getInputStream();
                FileOutputStream fos = new FileOutputStream(apkFile);

                byte[] buffer = new byte[8192];
                int len;
                long downloaded = 0;
                long lastProgressTime = 0;

                while ((len = is.read(buffer)) != -1) {
                    fos.write(buffer, 0, len);
                    downloaded += len;
                    long now = System.currentTimeMillis();
                    if (now - lastProgressTime > 200 || downloaded == totalLength) {
                        lastProgressTime = now;
                        int percent = (totalLength > 0) ? (int) ((downloaded * 100) / totalLength) : -1;
                        JSObject progressObj = new JSObject();
                        progressObj.put("percent", percent);
                        progressObj.put("downloadedBytes", downloaded);
                        progressObj.put("totalBytes", totalLength);
                        progressObj.put("fileName", finalFileName);
                        notifyListeners("downloadProgress", progressObj);
                    }
                }

                fos.flush();
                fos.close();
                is.close();
                conn.disconnect();

                // SHA-256 Prüfsummen-Verifizierung (falls angegeben)
                if (expectedSha256 != null && !expectedSha256.isEmpty()) {
                    String actualSha256 = calculateSha256(apkFile);
                    if (!actualSha256.equalsIgnoreCase(expectedSha256.trim())) {
                        apkFile.delete();
                        call.reject("Sicherheitsfehler: SHA-256 Prüfsumme stimmt nicht überein! Erwartet: " + expectedSha256 + ", Tatsächlich: " + actualSha256);
                        return;
                    }
                }

                // Installation über PackageInstaller-Session (wie Google Play):
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

    private String calculateSha256(File file) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            FileInputStream fis = new FileInputStream(file);
            byte[] buffer = new byte[8192];
            int n;
            while ((n = fis.read(buffer)) != -1) {
                digest.update(buffer, 0, n);
            }
            fis.close();
            byte[] hash = digest.digest();
            StringBuilder hex = new StringBuilder();
            for (byte b : hash) {
                hex.append(String.format("%02x", b));
            }
            return hex.toString();
        } catch (Exception e) {
            return "";
        }
    }

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
}
