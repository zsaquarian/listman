<script lang="ts">
  import ListHeader from '@components/ListHeader.svelte';
  import type { GenericList, GenericListItem } from '@utils/listUtils';
  import Modal from 'svelte-simple-modal';

  export let isMasterList: boolean;
  export let isSharedList: boolean;
  export let selected: GenericListItem[];
  export let list: GenericList;
  export let listUuid: string;
</script>

<Modal><ListHeader {isMasterList} {isSharedList} {list} {listUuid} {selected} /></Modal>
