<script lang="ts">
  import Icon from 'svelte-hero-icons/Icon.svelte';

  export let onClickHandler: () => void;
  export let icon: any;
  export let text: string;
  export let filled = false;
</script>

<button class="flex items-center rounded-md p-2" class:bg-blue-300={filled} on:click={onClickHandler}>
  <p class="text-black mr-2">{text}</p>
  <Icon src={icon} solid class={`w-8 ${filled ? 'text-white' : 'text-blue-300'}`} />
</button>
