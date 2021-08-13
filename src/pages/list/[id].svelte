<script lang="ts">
  import ListDisplay from '@components/ListDisplay.svelte';
  import { params } from '@roxi/routify';

  const key = $params.id;
</script>

<ListDisplay {key} />
