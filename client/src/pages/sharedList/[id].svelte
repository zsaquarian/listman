<script lang="ts">
  import ListDisplay from '@components/ListDisplay.svelte';
  import { loadList, storeList } from '@utils/shoppingListUtils';
  import type { ShoppingList } from '@utils/shoppingListUtils';
  import { getContext, onMount } from 'svelte';
  import { svelteSyncedStore } from '@syncedstore/svelte';
  import { goto, params } from '@roxi/routify';
  import syncedStore, { getYjsValue } from '@syncedstore/core';
  import { WebsocketProvider } from 'y-websocket';
  import { operationStore, query } from '@urql/svelte';
  import { CanViewListDocument } from '../../graphql';
  import CantViewList from '@components/CantViewList.svelte';
  import ErrorPopup from '@components/ErrorPopup.svelte';

  const key = $params.id;

  const canViewListQuery = operationStore(CanViewListDocument, { uuid: key });
  const canViewList = query(canViewListQuery);
  const { open } = getContext('simple-modal');

  const listStore = syncedStore({ todos: {} as ShoppingList });
  new WebsocketProvider('ws://localhost:1234', key, getYjsValue(listStore) as any); // sync via websocket
  let store = svelteSyncedStore(listStore);

  $: if ($canViewList.error) {
    console.log($canViewList.error.message);
    if ($canViewList.error.message.includes('Not authorized')) {
      console.log('saoetnuh');
      open(
        ErrorPopup,
        { error: 'Please login to view collabative lists' },
        {},
        {
          onClosed: () => {
            list.isShared = false;
            $goto('/login');
          },
        }
      );
    }

    if ($canViewList.error.message.includes('List does not exist')) {
      open(
        ErrorPopup,
        { error: 'List does not exst' },
        {},
        {
          onOpen: () => {
            console.log('open');
          },
          onClose: () => {
            console.log('closed');
            $goto('/');
          },
        }
      );
    }
  }

  if (!$canViewList.fetching && !$canViewList.data.canViewList) {
    open(CantViewList);
  }

  onMount(async () => {
    const loadedList = await loadList(key);
    Object.assign($store.todos, loadedList);
    list.isShared = true;
  });

  const removeItem = (i: number): void => {
    $store.todos.items.splice(i, 1);
  };

  $: {
    if ($store.todos && $store.todos.items) {
      console.log($store.todos);
      storeList(key, $store.todos);
    }
  }

  $: list = $store.todos;

  $: console.log($store.toJSON());

  $: console.log($canViewList);
</script>

{#if $canViewList.fetching}
  <p class="text-center text-4xl">Loading...</p>
{:else if $canViewList.error}
  <p class="text-center text-4xl">An error has occured</p>
{:else}
  <ListDisplay bind:list {removeItem} isShared={true} listUuid={key} />
{/if}
