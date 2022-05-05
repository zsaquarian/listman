<script lang="ts">
  import { createList, getFormattedModifiedTime, listToString, storeList } from '@utils/listUtils';
  import type { GenericList } from '@utils/listUtils';
  import { Share } from '@capacitor/share';
  import { Share as ShareIcon, UserAdd as UserAddIcon, Plus as PlusIcon } from '@steeze-ui/heroicons';
  import ItemDisplay from './ItemDisplay.svelte';
  import IconButton from './IconButton.svelte';
  import { getContext } from 'svelte';
  import CollabPopup from './CollabPopup.svelte';
  import { ShareListDocument } from '@graphql';
  import { mutation, operationStore } from '@urql/svelte';
  import { goto } from '@roxi/routify';
  import { v4 } from 'uuid';

  export let isMasterList = false;
  export let isShared = false;
  export let removeItem: (i: number) => void;
  export let list: GenericList;
  export let listUuid: string;

  const { open } = getContext('simple-modal');

  const shareListMutation = mutation(operationStore(ShareListDocument));
  let addInput: string;
  let formattedModifiedTime: string = list && list.modified ? getFormattedModifiedTime(list) : 'a few seconds ago';

  let modifiedInterval = setInterval(() => {
    formattedModifiedTime = getFormattedModifiedTime(list);
  }, 1000 * 60);

  $: {
    if (list && list.items) {
      clearInterval(modifiedInterval);
      modifiedInterval = setInterval(() => {
        formattedModifiedTime = getFormattedModifiedTime(list);
      }, 1000 * 60);
    }
  }

  $: selected = list && list.items && list.items.filter((val) => val.done);
</script>

<div class="lg:w-3/4 mx-auto flex flex-col items-center">
  <div class="p-2 w-full">
    {#if list && list.items}
      <div class="flex flex-col bg-accent-50 p-2 rounded-md dark:bg-accent-600">
        <div class="justify-self-center">
          {#if isMasterList}
            <h1 class="text-4xl text-center">Master List</h1>
          {:else}
            <input
              class="text-4xl text-center rounded-lg w-11/12 mx-auto block dark:bg-black"
              bind:value={list.name}
              placeholder="Enter name"
            />
          {/if}
          <p>Modified: {formattedModifiedTime}</p>
        </div>
        <div class="flex justify-between">
          <IconButton
            buttonClass="text-primary-300 dark:text-primary-100"
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
          {#if isMasterList}
            <IconButton
              buttonClass={`transition ${
                selected.length > 0 ? 'text-primary-300 dark:text-primary-100' : 'text-black dark:text-accent-50'
              }`}
              onClickHandler={() => {
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
              }}
              text="Create new list"
              icon={PlusIcon}
            />
          {/if}
          {#if !isMasterList && !isShared}
            <IconButton
              class="text-primary-300 dark:text-primary-100"
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
          bind:itemName={item}
          shouldLineThrough={!isMasterList}
          removeItem={() => {
            removeItem(i);
          }}
          class="m-2 p-2"
        />
      {/each}
    {/if}
  </div>
  <form
    class="flex sticky bottom-0 bg-accent-200 dark:bg-accent-800 m-0 w-full lg:rounded-lg lg:w-3/4"
    on:submit|preventDefault={() => {
      // regex which checks for non-whitespace strings
      if (/\S*$/.test(addInput) && addInput) {
        if (isShared) {
          list.items.push({ item: addInput, done: false });
        } else {
          list.items = [...list.items, { item: addInput, done: false }];
        }
        addInput = '';
      }
    }}
  >
    <input
      type="text"
      class="input w-full m-2 rounded-lg p-2 dark:text-black"
      bind:value={addInput}
      placeholder="Enter the name of a new item"
    />
    <button
      class="ml-auto m-2 rounded-lg bg-primary-500 border-opacity-0 border-white border-2 transition-colors hover:border-opacity-100 text-white p-2"
      type="submit">Add item</button
    >
  </form>
</div>
