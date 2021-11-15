<script lang="ts">
  import Icon from 'svelte-hero-icons/Icon.svelte';
  import { Exclamation } from 'svelte-hero-icons';

  export let error: string;
</script>

<div class="flex items-center">
  <Icon src={Exclamation} class="text-red-500 w-8 mr-2" />
  <h1>{error}</h1>
</div>
