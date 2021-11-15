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

<div class="text-center">
  <ListDisplay bind:list isMasterList={true} {removeItem} />

  {#if selected.filter((val) => val).length > 0}
    <button
      class="text-4xl bg-blue-500 text-white fixed bottom-24 rounded-lg p-2"
      transition:fade={{ duration: 250 }}
      on:click={() => {
        const newVals = [];
        selected.forEach((_val, i) => {
          if (selected[i]) newVals.push(list.items[i]);
        });
        const newList = createList(newVals);
        newList.items.forEach((val) => {
          val.done = false;
        });
        const newKey = v4();
        storeList(newKey, newList);
        $goto(`/list/${newKey}`);
      }}>Create new list</button
    >
  {/if}
</div>
