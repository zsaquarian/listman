<script lang="ts">
  import ListDisplay from '@components/ListDisplay.svelte';
  import { params } from '@roxi/routify';
  import { isDifferent, loadList, storeList } from '@utils/listUtils';
  import type { GenericList } from '@utils/listUtils';
  import { onMount } from 'svelte';

  const key = $params.id;
  let list: GenericList;
  let storedList: GenericList;

  onMount(async () => {
    list = await loadList(key);
    storedList = Object.create(list); // makes a copy of the list, otherwise it will be a reference
  });

  const removeItem = (i: number): void => {
    list.items = [...list.items.slice(0, i), ...list.items.slice(i + 1)];
  };

  $: {
    if (isDifferent(list, storedList)) {
      storeList(key, list);
      storedList = Object.create(list);
    }
  }
</script>

<ListDisplay bind:list {removeItem} listUuid={key} />
