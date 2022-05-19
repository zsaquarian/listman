<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Exclamation } from '@steeze-ui/heroicons';
  import type { ParsedError } from '@utils/errorParser';
  import { getReadableError } from '@utils/errorParser';

  export let error: ParsedError | string;
</script>

{#if error}
  <p class="text-error-500 mx-auto">
    <Icon src={Exclamation} class="w-8" />
    {typeof error === 'string' ? error : getReadableError(error)}
  </p>
{/if}
