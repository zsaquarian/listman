<script lang="ts">
  import ListDisplay from '@components/ListDisplay.svelte';
  import { loadList, storeList } from '@utils/shoppingListUtils';
  import { getContext, onMount } from 'svelte';
  import { goto, params } from '@roxi/routify';
  import { operationStore, query } from '@urql/svelte';
  import { CanViewListDocument } from '../../graphql';
  import CantViewList from '@components/CantViewList.svelte';
  import ErrorPopup from '@components/ErrorPopup.svelte';
  import { getStore } from '@utils/yjsUtils';

  const key = $params.id;

  const canViewListQuery = operationStore(CanViewListDocument, { uuid: key });
  const canViewList = query(canViewListQuery);
  const { open } = getContext('simple-modal');

  const store = getStore(key);

  $: if ($canViewList.error) {
    if ($canViewList.error.message.includes('Not authorized')) {
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
          onClose: () => {
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
    try {
      const loadedList = await loadList(key);
      Object.assign($store.todos, loadedList);
      list.isShared = true;
    } catch (e) {}
  });

  const removeItem = (i: number): void => {
    $store.todos.items.splice(i, 1);
  };

  $: {
    if ($store.todos && $store.todos.items) {
      storeList(key, $store.todos);
    }
  }

  $: list = $store.todos;
</script>

{#if $canViewList.fetching}
  <p class="text-center text-4xl">Loading...</p>
{:else if $canViewList.error}
  <p class="text-center text-4xl">An error has occured</p>
{:else}
  <ListDisplay bind:list {removeItem} isShared={true} listUuid={key} />
{/if}
