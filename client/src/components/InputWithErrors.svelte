<script lang="ts">
  import Input from './Input.svelte';
  import Error from './Error.svelte';
  import type { ParsedError } from '@utils/errorParser';

  export let value: string;
  export let placeholder: string;
  export let type: 'text' | 'password' = 'text';

  export let error: ParsedError;
</script>

<div {...$$props}>
  <Input bind:value {placeholder} {type} />
  <Error {error} />
</div>
