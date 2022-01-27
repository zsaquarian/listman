import { writable } from 'svelte/store';
import { Storage } from '@capacitor/storage';

const configKey = 'config';

export interface Config {
  darkMode: boolean;
}

const getStoredConfig = async () => {
  return JSON.parse((await Storage.get({ key: configKey })).value) as Config;
};

export const config = writable({ darkMode: false } as Config);

const authStateInit = async () => {
  config.set((await getStoredConfig()) || { darkMode: false });

  config.subscribe((val) => {
    Storage.set({ key: configKey, value: JSON.stringify(val) });
  });
};

authStateInit();
