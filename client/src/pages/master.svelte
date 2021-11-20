<script lang="ts">
  import ListDisplay from '@components/ListDisplay.svelte';
  import { createList, loadList, storeList } from '@utils/shoppingListUtils';
  import type { ShoppingList } from '@utils/shoppingListUtils';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { v4 } from 'uuid';
  import { goto } from '@roxi/routify';

  const key = 'master';

  let list: ShoppingList;
  let selected = [] as boolean[]; // note that the 'done' property of the master list denotes whether an item is selected

  onMount(async () => {
    list = await loadList(key);
  });

  const removeItem = (i: number): void => {
    list.items = [...list.items.slice(0, i), ...list.items.slice(i + 1)];
    selected = [...selected.slice(0, i), ...selected.slice(i + 1)];
  };

  $: {
    if (list && list.items) {
      selected = list.items.map((val) => val.done);
      console.log(selected);
      storeList(key, list);
    }
  }
</script>

<ListDisplay bind:list isMasterList={true} {removeItem} />
