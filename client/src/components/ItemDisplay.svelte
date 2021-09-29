<script lang="ts">
  export let checked: boolean;
  export let shouldLineThrough: boolean;
  export let itemName: string;
  export let removeItem: () => void;
</script>

<div class="flex ${$$props.class}">
  <input type="checkbox" bind:checked class="self-center mr-2 w-8 h-8" />
  <p class={`text-center self-center ${shouldLineThrough && checked ? 'line-through' : ''}`}>{itemName}</p>
  <button class="bg-red-500 text-white ml-auto rounded-md p-2" on:click={removeItem}>X</button>
</div>
