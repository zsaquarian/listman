<script lang="ts">
  import Icon from 'svelte-hero-icons/Icon.svelte';
  import { Exclamation } from 'svelte-hero-icons';
  import type { ParsedError } from '@utils/errorParser';
  import { getReadableError } from '@utils/errorParser';

  export let error: ParsedError;
</script>

{#if error}
  <p class="text-error-500 mx-auto">
    <Icon src={Exclamation} class="w-8" />
    {getReadableError(error)}
  </p>
{/if}
