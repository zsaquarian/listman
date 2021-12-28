import { writable } from 'svelte/store';

export interface AuthState {
  isLoggedIn: boolean;
}

export const authStore = writable({ isLoggedIn: false } as AuthState);
