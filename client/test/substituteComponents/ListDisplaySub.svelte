<script lang="ts">
  import ListDisplay from '@components/ListDisplay.svelte';
  import type { GenericList } from '@utils/listUtils';
  import Modal from 'svelte-simple-modal';

  export let isMasterList: boolean;
  export let removeItem: (i: number) => void;
  export let list: GenericList;
  export let listUuid: string;
</script>

<Modal><ListDisplay {isMasterList} {removeItem} {list} {listUuid} /></Modal>
