<script lang="ts">
  export let value: string;
  export let placeholder: string;
  export let type: 'text' | 'password' = 'text';
</script>

{#if type === 'text'}
  <input
    type="text"
    class="border-2 rounded-md w-3/4 my-2 text-center px-2 dark:text-black"
    aria-label={placeholder}
    {placeholder}
    bind:value
  />
{:else if type === 'password'}
  <input
    type="password"
    class="border-2 rounded-md w-3/4 my-2 text-center px-2 dark:text-black"
    aria-label={placeholder}
    {placeholder}
    bind:value
  />
{/if}
