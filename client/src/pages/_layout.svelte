<script lang="ts">
  import NavBar from '@components/NavBar.svelte';
  import { createClient } from '@utils/createClient';

  createClient();
</script>

<NavBar />
<slot />
