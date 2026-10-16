package de.lauri.appstore;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Build;
import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;
import androidx.work.Worker;
import androidx.work.WorkerParameters;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UpdateCheckWorker extends Worker {

    private static final String CHANNEL_ID = "lauju_store_updates";

    public UpdateCheckWorker(@NonNull Context context, @NonNull WorkerParameters params) {
        super(context, params);
    }

    @NonNull
    @Override
    public Result doWork() {
        Context context = getApplicationContext();
        try {
            // Installierte Benutzer-Apps ermitteln
            PackageManager pm = context.getPackageManager();
            List<PackageInfo> installedList = pm.getInstalledPackages(0);
            Map<String, Long> installedCodes = new HashMap<>();
            Map<String, String> installedLabels = new HashMap<>();
            for (PackageInfo pi : installedList) {
                boolean isSystem = (pi.applicationInfo != null) && ((pi.applicationInfo.flags & android.content.pm.ApplicationInfo.FLAG_SYSTEM) != 0);
                if (isSystem) continue;
                long code = (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) ? pi.getLongVersionCode() : pi.versionCode;
                installedCodes.put(pi.packageName, code);
                CharSequence lbl = (pi.applicationInfo != null) ? pi.applicationInfo.loadLabel(pm) : null;
                installedLabels.put(pi.packageName, lbl != null ? lbl.toString() : pi.packageName);
            }

            java.util.Set<String> updatedPackages = new java.util.HashSet<>();
            String firstAppName = "";

            // 1. Lauju Repo prüfen (kompaktes index-v1.json)
            HttpURLConnection laujuConn = null;
            try {
                URL url = new URL("https://lauju1909.github.io/fdroid-repo/fdroid/repo/index-v1.json");
                laujuConn = (HttpURLConnection) url.openConnection();
                laujuConn.setRequestProperty("User-Agent", "LaujuStore/1.0");
                laujuConn.setConnectTimeout(15000);
                laujuConn.setReadTimeout(20000);
                laujuConn.connect();

                if (laujuConn.getResponseCode() == 200) {
                    BufferedReader br = new BufferedReader(new InputStreamReader(laujuConn.getInputStream()));
                    StringBuilder sb = new StringBuilder();
                    String line;
                    while ((line = br.readLine()) != null) {
                        sb.append(line);
                    }
                    br.close();

                    JSONObject root = new JSONObject(sb.toString());
                    JSONObject packages = root.optJSONObject("packages");
                    JSONArray apps = root.optJSONArray("apps");

                    if (packages != null && apps != null) {
                        for (int i = 0; i < apps.length(); i++) {
                            JSONObject appObj = apps.getJSONObject(i);
                            String pkgName = appObj.optString("packageName");
                            String appName = appObj.optString("name", pkgName);

                            if (installedCodes.containsKey(pkgName) && !updatedPackages.contains(pkgName)) {
                                long installedCode = installedCodes.get(pkgName);
                                JSONArray versions = packages.optJSONArray(pkgName);
                                if (versions != null && versions.length() > 0) {
                                    long maxCode = 0;
                                    for (int j = 0; j < versions.length(); j++) {
                                        JSONObject verObj = versions.getJSONObject(j);
                                        long vCode = verObj.optLong("versionCode", 0);
                                        if (vCode > maxCode) maxCode = vCode;
                                    }
                                    if (maxCode > installedCode) {
                                        updatedPackages.add(pkgName);
                                        if (firstAppName.isEmpty()) {
                                            firstAppName = appName;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } catch (Exception ignored) {
            } finally {
                if (laujuConn != null) laujuConn.disconnect();
            }

            // 2. Offizielles F-Droid Repository speicherschonend über F-Droid Package API v1 prüfen
            for (Map.Entry<String, Long> entry : installedCodes.entrySet()) {
                String pkgName = entry.getKey();
                if (updatedPackages.contains(pkgName)) continue;
                if (pkgName.startsWith("com.google.") || pkgName.startsWith("com.android.") || pkgName.startsWith("com.samsung.")) {
                    continue;
                }
                HttpURLConnection fdConn = null;
                try {
                    URL fdUrl = new URL("https://f-droid.org/api/v1/packages/" + pkgName);
                    fdConn = (HttpURLConnection) fdUrl.openConnection();
                    fdConn.setRequestProperty("User-Agent", "LaujuStore/1.0");
                    fdConn.setConnectTimeout(5000);
                    fdConn.setReadTimeout(5000);
                    fdConn.connect();

                    if (fdConn.getResponseCode() == 200) {
                        BufferedReader br = new BufferedReader(new InputStreamReader(fdConn.getInputStream()));
                        StringBuilder sb = new StringBuilder();
                        String line;
                        while ((line = br.readLine()) != null) {
                            sb.append(line);
                        }
                        br.close();

                        JSONObject pkgRoot = new JSONObject(sb.toString());
                        long maxCode = pkgRoot.optLong("suggestedVersionCode", 0);
                        JSONArray verArr = pkgRoot.optJSONArray("packages");
                        if (verArr != null) {
                            for (int j = 0; j < verArr.length(); j++) {
                                long vc = verArr.getJSONObject(j).optLong("versionCode", 0);
                                if (vc > maxCode) maxCode = vc;
                            }
                        }
                        if (maxCode > entry.getValue()) {
                            updatedPackages.add(pkgName);
                            if (firstAppName.isEmpty()) {
                                firstAppName = installedLabels.getOrDefault(pkgName, pkgName);
                            }
                        }
                    }
                } catch (Exception ignored) {
                } finally {
                    if (fdConn != null) fdConn.disconnect();
                }
            }

            int updateCount = updatedPackages.size();
            if (updateCount > 0) {
                sendNotification(context, updateCount, firstAppName);
            }
            return Result.success();
        } catch (Exception e) {
            return Result.retry();
        }
    }

    private void sendNotification(Context context, int count, String firstAppName) {
        NotificationManager nm = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel ch = new NotificationChannel(
                    CHANNEL_ID,
                    "App-Aktualisierungen",
                    NotificationManager.IMPORTANCE_DEFAULT
            );
            ch.setDescription("Benachrichtigt über neue Updates für deine installierten Apps");
            nm.createNotificationChannel(ch);
        }

        Intent intent = new Intent(context, MainActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent pi = PendingIntent.getActivity(
                context,
                0,
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S ? PendingIntent.FLAG_IMMUTABLE : 0)
        );

        String title = (count == 1) ? "1 App-Update verfügbar" : count + " App-Updates verfügbar";
        String body = (count == 1) ? firstAppName + " kann jetzt aktualisiert werden." : firstAppName + " und " + (count - 1) + " weitere Apps.";

        NotificationCompat.Builder b = new NotificationCompat.Builder(context, CHANNEL_ID)
                .setSmallIcon(android.R.drawable.stat_sys_download_done)
                .setContentTitle(title)
                .setContentText(body)
                .setAutoCancel(true)
                .setContentIntent(pi)
                .setPriority(NotificationCompat.PRIORITY_DEFAULT);

        nm.notify(1909, b.build());
    }
}
