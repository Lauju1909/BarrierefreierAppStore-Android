package de.lauri.appstore;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(StoreInstallerPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
