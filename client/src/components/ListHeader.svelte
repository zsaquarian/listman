<script lang="ts">
  import { Share } from '@capacitor/share';
  import { Share as ShareIcon, UserAdd as UserAddIcon, Plus as PlusIcon } from '@steeze-ui/heroicons';
  import IconButton from './IconButton.svelte';
  import CollabPopup from './CollabPopup.svelte';
  import Popup from './Popup.svelte';
  import { goto } from '@roxi/routify';
  import { v4 } from 'uuid';
  import { getContext } from 'svelte';
  import { ShareListDocument } from '@graphql';
  import { mutation, operationStore } from '@urql/svelte';
  import type { GenericList, GenericListItem } from '@utils/listUtils';
  import { getFormattedModifiedTime, listToString, createList, storeList } from '@utils/listUtils';

  export let list: GenericList;
  export let isMasterList: boolean;
  export let isShared: boolean;
  export let selected: GenericListItem[];
  export let listUuid: string;

  let formattedModifiedTime: string = list && list.modified ? getFormattedModifiedTime(list) : 'a few seconds ago';
  const { open } = getContext('simple-modal');
  const shareListMutation = mutation(operationStore(ShareListDocument));

  const onSuccess = () => {
    $goto(`/sharedList/${listUuid}`);
    open(Popup, { message: "You've successfully shared this list!" });
  };

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
</script>

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
          selected && selected.length > 0 ? 'text-primary-300 dark:text-primary-100' : 'text-black dark:text-accent-50'
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
            {
              listUuid,
              shareListMutation,
              onSuccess,
            },
            {}
          );
        }}
        icon={UserAddIcon}
        text="Collaborate"
        filled={true}
      />
    {/if}
  </div>
</div>
