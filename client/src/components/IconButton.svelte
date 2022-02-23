<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon';
  import type { IconSource } from '@steeze-ui/svelte-icon/types';

  export let onClickHandler: () => void;
  export let icon: IconSource;
  export let text = '';
  export let buttonClass = '';
  export let resize = true;
</script>

<button class={'flex items-center rounded-md p-2 ' + buttonClass} on:click={onClickHandler}>
  {#if text.length > 0}
    <p class={`text-black dark:text-white text-xl mr-2 hidden ${resize ? 'sm:block' : ''}`}>{text}</p>
  {/if}
  <Icon src={icon} theme="solid" size="2rem" />
</button>
