import { syncedStore, getYjsValue } from '@syncedstore/core';
import type { ShoppingList } from './shoppingListUtils';
import { svelteSyncedStore } from '@syncedstore/svelte';
import { WebsocketProvider } from 'y-websocket';

export const getStore = (key: string) => {
  const listStore = syncedStore({ todos: {} as ShoppingList });
  new WebsocketProvider('ws://localhost:1234', key, getYjsValue(listStore) as any); // sync via websocket
  const store = svelteSyncedStore(listStore);

  return store;
};
