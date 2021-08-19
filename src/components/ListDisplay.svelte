<script lang="ts">
  import { createList, loadList, storeList } from '@utils/shoppingListUtils';
  import type { ShoppingList } from '@utils/shoppingListUtils';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { v4 } from 'uuid';
  import { goto } from '@roxi/routify';

  export let key: string;

  const isMasterList = key === 'master';

  let list: ShoppingList;
  let selected: boolean[] = [];

  onMount(async () => {
    list = await loadList(key);
  });

  $: {
    if (list) {
      storeList(key, list);
    }
  }

  let addInput: string;
</script>

<div class="h-full flex flex-col items-center">
  <div class="m-2 p-2 w-full">
    {#if list}
      {#if isMasterList}
        <h1 class="text-4xl text-center">Master List</h1>
      {:else}
        <input
          class="text-4xl text-center bg-gray-100 focus:bg-gray-200 rounded-lg w-5/6 mx-auto block"
          bind:value={list.name}
          placeholder="Enter name"
        />
      {/if}
      {#if list.items.length == 0}
        <h1 class="text-2xl text-gray-400 text-center">Try adding some items</h1>
      {/if}
      {#each list.items as { item, done }, i (i)}
        <div class="flex m-2 p-2">
          {#if isMasterList}
            <input type="checkbox" bind:checked={selected[i]} class="self-center mr-2 w-8 h-8" />
          {:else}
            <input type="checkbox" bind:checked={done} class="self-center mr-2 w-8 h-8" />
          {/if}
          <p class={`text-center self-center ${!isMasterList && done ? 'line-through' : ''}`}>{item}</p>
          <button
            class="bg-red-500 text-white ml-auto rounded-md p-2"
            on:click={() => {
              list.items = [...list.items.slice(0, i), ...list.items.slice(i + 1)];
              selected = [...selected.slice(0, i), ...selected.slice(i + 1)];
            }}>X</button
          >
        </div>
      {/each}
    {/if}
  </div>

  {#if selected.filter((val) => val).length > 0 && isMasterList}
    <button
      class="text-4xl bg-blue-500 text-white fixed bottom-24 rounded-lg p-2"
      transition:fade={{ duration: 250 }}
      on:click={() => {
        const newVals = [];
        selected.forEach((val, i) => {
          newVals.push(list.items[i]);
        });
        const newList = createList(newVals);
        const newKey = v4();
        storeList(newKey, newList);
        $goto(`/list/${newKey}`);
      }}>Create new list</button
    >
  {/if}

  <form
    class="flex fixed bottom-0 w-full bg-gray-300 m-0"
    on:submit|preventDefault={() => {
      // regex which checks for non-whitespace strings
      if (/\S*$/.test(addInput) && addInput) {
        console.log(addInput, /\S+/.test(''));
        list.items = [...list.items, { item: addInput, done: false }];
        addInput = '';
      }
    }}
  >
    <input type="text" class="input w-full rounded-lg" bind:value={addInput} />
    <button class="ml-auto m-2 rounded-lg bg-gray-500 text-white p-2" type="submit">Add item</button>
  </form>
</div>
