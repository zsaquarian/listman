import { writable } from 'svelte/store';
import { Storage } from '@capacitor/storage';

const authStateKey = 'auth-state';

export interface AuthState {
  isLoggedIn: boolean;
}

const getStoredAuthState = async () => {
  return JSON.parse((await Storage.get({ key: authStateKey })).value) as AuthState;
};

export const authStore = writable((await getStoredAuthState()) || ({ isLoggedIn: false } as AuthState));

authStore.subscribe((val) => Storage.set({ key: authStateKey, value: JSON.stringify(val) }));
