<script lang="ts">
  import { listToString } from '@utils/shoppingListUtils';
  import type { ShoppingList } from '@utils/shoppingListUtils';
  import { Share } from '@capacitor/share';
  import Icon from 'svelte-awesome/components/Icon.svelte';
  import { shareAlt } from 'svelte-awesome/icons';
  import ItemDisplay from './ItemDisplay.svelte';

  export let isMasterList = false;
  export let removeItem: (i: number) => void;
  export let list: ShoppingList;

  let addInput: string;
</script>

<div class="h-full flex flex-col items-center">
  <div class="m-2 p-2 w-full">
    {#if list}
      <div class="flex">
        {#if isMasterList}
          <h1 class="text-4xl text-center">Master List</h1>
        {:else}
          <input
            class="text-4xl text-center bg-gray-100 focus:bg-gray-200 rounded-lg w-5/6 mx-auto block"
            bind:value={list.name}
            placeholder="Enter name"
          />
        {/if}
        <button
          on:click={async () => {
            await Share.share({
              title: list.name,
              text: listToString(list),
              dialogTitle: 'Share list',
            });
          }}
        >
          <Icon data={shareAlt} class="m-2 text-blue" />
        </button>
      </div>
      {#if list.items.length == 0}
        <h1 class="text-2xl text-gray-400 text-center">Try adding some items</h1>
      {/if}
      {#each list.items as { item, done }, i (i)}
        <ItemDisplay
          bind:checked={done}
          itemName={item}
          shouldLineThrough={!isMasterList}
          removeItem={() => removeItem(i)}
          class="m-2 p-2"
        />
      {/each}
    {/if}
  </div>
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
