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
      scopes: ['email', 'profile'],
      clientId: '328700882343-69r2ogebmt2fv5g1p7j92bhtmkle3d2t.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
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
