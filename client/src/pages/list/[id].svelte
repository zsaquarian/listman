<script lang="ts">
  import ListDisplay from '@components/ListDisplay.svelte';
  import { params } from '@roxi/routify';
  import { loadList, storeList } from '@utils/listUtils';
  import type { GenericList } from '@utils/listUtils';
  import { onMount } from 'svelte';

  const key = $params.id;
  let list: GenericList;
  let storedList: GenericList;

  onMount(async () => {
    list = await loadList(key);
    storedList = JSON.parse(JSON.stringify(list));
  });

  const removeItem = (i: number): void => {
    list.items = [...list.items.slice(0, i), ...list.items.slice(i + 1)];
  };

  $: {
    if (JSON.stringify(list) !== JSON.stringify(storedList)) {
      storeList(key, list);
      storedList = list;
    }
  }
</script>

<ListDisplay bind:list {removeItem} listUuid={key} />
