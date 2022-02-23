<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Exclamation } from '@steeze-ui/heroicons';

  export let error: string;
</script>

<div class="flex items-center">
  <Icon src={Exclamation} class="text-error-500 w-8 mr-2" />
  <h1>{error}</h1>
</div>
