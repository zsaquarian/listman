<script lang="ts">
  import { X } from '@steeze-ui/heroicons';
  import IconButton from '@components/IconButton.svelte';

  export let checked: boolean;
  export let shouldLineThrough: boolean;
  export let itemName: string;
  export let removeItem: () => void;
</script>

<div class="flex ${$$props.class}">
  <input type="checkbox" bind:checked class="self-center mr-2 w-8 h-8" />
  <input
    class="self-center dark:bg-black w-max"
    class:line-through={shouldLineThrough && checked}
    bind:value={itemName}
  />
  <IconButton buttonClass="bg-error-500 text-white ml-auto" onClickHandler={removeItem} icon={X} />
</div>
