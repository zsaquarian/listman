<script lang="ts">
  import HomepageList from '@components/HomepageList.svelte';
  import { getLists, Lists } from '@utils/listUtils';
  import { onMount } from 'svelte';
  import { Storage } from '@capacitor/storage';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Search } from '@steeze-ui/heroicons';
  import { operationStore, query } from '@urql/svelte';
  import { GetSharedListsDocument } from '@graphql';

  let lists = [] as Lists;

  const sharedListsQuery = operationStore(GetSharedListsDocument);

  const sharedLists = query(sharedListsQuery);
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

  let searchText: string = '';

  const filter = (str: string, matched: string) => {
    let re = new RegExp(matched, 'i');

    if (str == '') {
      return 'Untitled List'.match(re);
    } else {
      return str.match(re);
    }
  };

  let filteredLists = [];
  let searchTimeout: NodeJS.Timeout;

  $: {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      filteredLists = lists.filter((val) => filter(val.name, searchText));
    }, 200);
  }
</script>

<div
  class="text-4xl mt-4 bg-white rounded-lg w-11/12 mx-auto text-black border-[6px] border-accent-200 flex items-center justify-between"
>
  <input type="text" class="p-2 bg-white w-11/12" placeholder="Search for lists" bind:value={searchText} />
  <Icon src={Search} class="w-8 mr-4" />
</div>

<ul class="flex flex-col text-center text-3xl m-4 bg-primary-100 rounded-lg p-4 bg-opacity-25 shadow-lg">
  {#each filteredLists as { key, name, isShared, isExternal }, i (i)}
    <HomepageList {key} {name} {isShared} {isExternal} removeList={() => removeList(key, i)} />
  {/each}
</ul>
