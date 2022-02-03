import { syncedStore, getYjsValue } from '@syncedstore/core';
import type { GenericList } from './listUtils';
import { svelteSyncedStore } from '@syncedstore/svelte';
import { WebsocketProvider } from 'y-websocket';
import type { Readable } from 'svelte/store';
import type { MappedTypeDescription } from '@syncedstore/core/types/doc';

export const getStore = (key: string): Readable<MappedTypeDescription<{ todos: GenericList }>> => {
  const listStore = syncedStore({ todos: {} as GenericList });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new WebsocketProvider(import.meta.env.VITE_YJS_IP, key, getYjsValue(listStore) as any); // sync via websocket
  const store = svelteSyncedStore(listStore);

  return store;
};
