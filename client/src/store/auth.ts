import { writable } from 'svelte/store';
import { Storage } from '@capacitor/storage';

const authStateKey = 'auth-state';

export interface AuthState {
  isLoggedIn: boolean;
  username: string;
}

const getStoredAuthState = async () => {
  return JSON.parse((await Storage.get({ key: authStateKey })).value) as AuthState;
};

export const authStore = writable((await getStoredAuthState()) || ({ isLoggedIn: false, username: '' } as AuthState));

const authStateInit = async () => {
  authStore.set(await getStoredAuthState());

  authStore.subscribe((val) => {
    console.log(val);
    Storage.set({ key: authStateKey, value: JSON.stringify(val) });
  });
};

authStateInit();
