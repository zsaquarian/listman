<script lang="ts">
  import { onMount } from 'svelte';
  import { getLists } from '@utils/shoppingListUtils';
  import { Storage } from '@capacitor/storage';
  import { operationStore, query } from '@urql/svelte';
  import { GetSharedListsDocument } from '../graphql';
  import Icon from 'svelte-hero-icons/Icon.svelte';
  import { Users } from 'svelte-hero-icons';

  const sharedListsQuery = operationStore(GetSharedListsDocument);

  const sharedLists = query(sharedListsQuery);

  let lists = [];
  let onlySharedLists = [];

  $: {
    if (!$sharedLists.fetching && !$sharedLists.error) {
      onlySharedLists = $sharedLists.data.getSharedLists.filter((val) => !lists.includes(val));
    }
  }

  onMount(async () => {
    const result = await getLists();
    lists = [...result];
  });
</script>

<h1 class="text-4xl m-2">Lists:</h1>
<div class="flex flex-col text-center text-3xl m-4 bg-gray-100 rounded-lg p-2">
  {#each onlySharedLists as key, i (key)}
    <div class="flex items-center">
      <a href={`/sharedList/${key}`} class="underline self-center">{key}</a>
      <Icon src={Users} class="w-8 ml-auto mr-2 text-blue-500" />
      <button
        class="bg-red-500 text-white rounded-md p-2 my-2"
        on:click={async () => {
          await Storage.remove({ key });
          lists = [...lists.slice(0, i), ...lists.slice(i + 1)];
        }}>X</button
      >
    </div>
  {/each}
  {#each lists as { name, key, isShared }, i (i)}
    {#if key !== 'master'}
      <div class="flex">
        <a href={isShared ? `/sharedList/${key}` : `/list/${key}`} class="underline self-center">{name}</a>
        <button
          class="bg-red-500 text-white ml-auto rounded-md p-2 my-2"
          on:click={async () => {
            await Storage.remove({ key });
            lists = [...lists.slice(0, i), ...lists.slice(i + 1)];
          }}>X</button
        >
      </div>
    {:else if lists.length == 1}
      <h1 class="text-4xl text-gray-400">No lists made yet</h1>
    {/if}
  {/each}
</div>

<a class="text-4xl text-blue-500 text-center m-2" href="/master">Master List</a>
