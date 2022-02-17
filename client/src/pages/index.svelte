<script lang="ts">
  import { onMount } from 'svelte';
  import { getLists } from '@utils/listUtils';
  import { Storage } from '@capacitor/storage';
  import { operationStore, query } from '@urql/svelte';
  import { GetSharedListsDocument } from '@graphql';
  import HomepageList from '@components/HomepageList.svelte';

  const sharedListsQuery = operationStore(GetSharedListsDocument);

  const sharedLists = query(sharedListsQuery);

  let lists = [];

  $: {
    if (!$sharedLists.fetching && !$sharedLists.error) {
      // onlySharedLists = $sharedLists.data.getSharedLists.filter((val) => !lists.includes(val));
      $sharedLists.data.getSharedLists.forEach((val) => {
        lists = [...lists, { key: val, name: '', isShared: true, isExternal: true }];
      });

      lists.sort((a, b) => {
        if (a.modified < b.modified) return -1;
        else if (a.modified > b.modified) return 1;

        return 0;
      });

      lists = lists.filter((val, i) => {
        if (i === 0) return true;
        if (val.key === lists[i - 1].key) return false;

        return true;
      });
    }
  }

  onMount(async () => {
    const result = await getLists();
    lists = [...result];
  });

  const removeList = async (key: string, i: number) => {
    await Storage.remove({ key });
    lists = [...lists.slice(0, i), ...lists.slice(i + 1)];
  };

  $: realLists = lists.slice(0, 10);
</script>

<div class="w-full md:w-3/4 mx-auto">
  <h1 class="text-4xl m-2">Lists:</h1>
  <div class="flex flex-col text-center text-3xl m-4 bg-primary-100 rounded-lg p-4 bg-opacity-25 shadow-lg">
    {#each realLists as { name, key, isShared, isExternal }, i (i)}
      <HomepageList {key} {name} {isShared} {isExternal} removeList={() => removeList(key, i)} />
    {/each}
    {#if lists.length < 1}
      <div class="text-4xl text-accent-900 drop-shadow-lg">
        <p>No lists made yet 🤔</p>
        <p class="hidden md:block">Check out the master list to get started!</p>
      </div>
    {/if}
  </div>
</div>

<div class="text-center mt-8">
  <a class="text-4xl text-white rounded-lg p-4 text-center bg-accent-500 m-2" href="/master">Master List</a>
</div>
