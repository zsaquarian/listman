<script lang="ts">
  import { onMount } from 'svelte';
  import { getLists, Lists } from '@utils/shoppingListUtils';
  import { Storage } from '@capacitor/storage';
  import { operationStore, query } from '@urql/svelte';
  import { GetSharedListsDocument } from '../graphql';
  import Icon from 'svelte-hero-icons/Icon.svelte';
  import IconButton from '@components/IconButton.svelte';
  import { Users, X } from 'svelte-hero-icons';
  import { getStore } from '@utils/yjsUtils';

  const sharedListsQuery = operationStore(GetSharedListsDocument);

  const sharedLists = query(sharedListsQuery);

  let lists = [] as Lists;
  let onlySharedLists = [];

  $: {
    if (!$sharedLists.fetching && !$sharedLists.error) {
      // onlySharedLists = $sharedLists.data.getSharedLists.filter((val) => !lists.includes(val));
      onlySharedLists = $sharedLists.data.getSharedLists.filter((val) => lists.some((list) => list.key === val));
      console.log($sharedLists.data.getSharedLists.filter((val) => lists.some((list) => list.key === val)));

      onlySharedLists.forEach((val) => {
        const store = getStore(val);

        lists = [...lists, { key: val, name: $store.todos.name, isShared: true }];
      });
    }
  }

  onMount(async () => {
    const result = await getLists();
    lists = [...result];
  });
</script>

<h1 class="text-4xl m-2">Lists:</h1>
<div
  class="flex flex-col text-center text-3xl m-4 bg-primary-100 rounded-lg
p-4 bg-opacity-25 shadow-lg"
>
  <!-- {#each onlySharedLists as key, i (key)} -->
  <!--   <div class="flex items-center mb-2"> -->
  <!--     <a href={`/sharedList/${key}`} class="self-center">{key}</a> -->
  <!--     <Icon src={Users} class="w-8 ml-auto mr-2 text-primary-500" /> -->
  <!--     <IconButton -->
  <!--       icon={X} -->
  <!--       buttonClass="bg-error-500 text-white" -->
  <!--       onClickHandler={async () => { -->
  <!--         await Storage.remove({ key }); -->
  <!--         lists = [...lists.slice(0, i), ...lists.slice(i + 1)]; -->
  <!--       }} -->
  <!--     /> -->
  <!--   </div> -->
  <!-- {/each} -->
  {#each lists as { name, key, isShared }, i (i)}
    {#if key !== 'master'}
      <div class="flex mb-2 items-center">
        <a href={isShared ? `/sharedList/${key}` : `/list/${key}`} class="self-center"
          >{name ? name : 'Untitled list'}</a
        >
        {#if isShared}
          <Icon src={Users} class="w-8 ml-auto mr-2 text-primary-500" />
        {/if}
        <IconButton
          icon={X}
          buttonClass={`bg-error-500 ${isShared ? '' : 'ml-auto'} text-white`}
          onClickHandler={async () => {
            await Storage.remove({ key });
            lists = [...lists.slice(0, i), ...lists.slice(i + 1)];
          }}
        />
      </div>
    {:else if lists.length === 1}
      <h1 class="text-4xl text-accent-900 drop-shadow-lg">No lists made yet</h1>
    {/if}
  {/each}
</div>
