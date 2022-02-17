package dev.nahos.listman;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
import com.getcapacitor.Plugin;
import com.capacitorjs.plugins.storage.StoragePlugin;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
            add(GoogleAuth.class);
            add(StoragePlugin.class);
        }});
    }
}
