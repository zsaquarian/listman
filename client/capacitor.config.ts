import { CapacitorConfig } from '@capacitor/cli';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const config: CapacitorConfig = {
  appId: 'dev.nahos.listman',
  appName: 'Listman',
  bundledWebRuntime: false,
  webDir: 'public',
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
    GoogleAuth: {
      scopes: ['email'],
      serverClientId: process.env.VITE_GOOGLE_CLIENT_ID,
    },
  },
  cordova: {},
  server: {
    // TODO: comment next line before building for prod
    // url: process.env.IP,
    cleartext: true,
  },
};

export default config;
