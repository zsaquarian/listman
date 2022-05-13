<script lang="ts">
  import { X, ViewGrid } from '@steeze-ui/heroicons';
  import { Icon } from '@steeze-ui/svelte-icon';
  import IconButton from '@components/IconButton.svelte';

  export let checked: boolean;
  export let shouldLineThrough: boolean;
  export let itemName: string;
  export let removeItem: () => void;
</script>

<div class="flex ${$$props.class}">
  <Icon src={ViewGrid} class="opacity-25 hover:opacity-75 transition-opacity w-8 cursor-move m-2" />
  <input type="checkbox" bind:checked class="self-center w-8 h-8" />
  <input
    class="self-center dark:bg-black w-full mx-2"
    class:line-through={shouldLineThrough && checked}
    bind:value={itemName}
  />
  <IconButton buttonClass="bg-error-500 text-white ml-auto" onClickHandler={removeItem} icon={X} />
</div>
