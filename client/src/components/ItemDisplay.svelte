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
  <p class={`text-center self-center ${shouldLineThrough && checked ? 'line-through' : ''}`}>{itemName}</p>
  <IconButton buttonClass="bg-error-500 text-white ml-auto" onClickHandler={removeItem} icon={X} />
</div>
