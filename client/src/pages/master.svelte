<script lang="ts">
  import ListDisplay from '@components/ListDisplay.svelte';
  import { loadOrCreateList, storeList } from '@utils/listUtils';
  import type { GenericList } from '@utils/listUtils';
  import { onMount } from 'svelte';

  const key = 'master';

  let list: GenericList;
  let selected = [] as boolean[]; // note that the 'done' property of the master list denotes whether an item is selected

  onMount(async () => {
    list = await loadOrCreateList(key);
  });

  const removeItem = (i: number): void => {
    list.items = [...list.items.slice(0, i), ...list.items.slice(i + 1)];
    selected = [...selected.slice(0, i), ...selected.slice(i + 1)];
  };

  $: {
    if (list && list.items) {
      selected = list.items.map((val) => val.done);
      storeList(key, list);
    }
  }
</script>

<ListDisplay bind:list isMasterList={true} {removeItem} />
