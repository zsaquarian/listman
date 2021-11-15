<script lang="ts">
  import { listToString } from '@utils/shoppingListUtils';
  import type { ShoppingList } from '@utils/shoppingListUtils';
  import { Share } from '@capacitor/share';
  import { Share as ShareIcon, UserAdd as UserAddIcon } from 'svelte-hero-icons';
  import ItemDisplay from './ItemDisplay.svelte';
  import IconButton from './IconButton.svelte';
  import { getContext } from 'svelte';
  import CollabPopup from './CollabPopup.svelte';
  import { ShareListDocument } from '../graphql';
  import { mutation, operationStore } from '@urql/svelte';
  import { goto } from '@roxi/routify';

  export let isMasterList = false;
  export let isShared = false;
  export let removeItem: (i: number) => void;
  export let list: ShoppingList;
  export let listUuid: string;

  const { open } = getContext('simple-modal');

  const shareListMutation = mutation(operationStore(ShareListDocument));
  let addInput: string;

  // $: console.log(list);
</script>

<div class="h-full flex flex-col items-center">
  <div class="m-2 p-2 w-full">
    {#if list && list.items}
      <div class="flex bg-gray-100 p-2 rounded-md">
        {#if isMasterList}
          <h1 class="text-4xl text-center">Master List</h1>
        {:else}
          <input
            class="text-4xl text-center rounded-lg w-5/6 mx-auto block"
            bind:value={list.name}
            placeholder="Enter name"
          />
        {/if}
        <div class="flex ml-auto">
          <IconButton
            onClickHandler={async () => {
              await Share.share({
                title: list.name,
                text: listToString(list),
                dialogTitle: 'Share list',
              });
            }}
            icon={ShareIcon}
            text="Share"
          />
          {#if !isMasterList && !isShared}
            <IconButton
              onClickHandler={() => {
                open(
                  CollabPopup,
                  { listUuid, shareListMutation },
                  {},
                  {
                    onClosed: () => {
                      $goto(`/sharedList/${listUuid}`);
                    },
                  }
                );
              }}
              icon={UserAddIcon}
              text="Collaborate"
              filled={true}
            />
          {/if}
        </div>
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
        if (isShared) {
          list.items.push({ item: addInput, done: false });
        } else {
          list.items = [...list.items, { item: addInput, done: false }];
        }
        addInput = '';
      }
    }}
  >
    <input type="text" class="input w-full rounded-lg p-2" bind:value={addInput} />
    <button class="ml-auto m-2 rounded-lg bg-gray-500 text-white p-2" type="submit">Add item</button>
  </form>
</div>
