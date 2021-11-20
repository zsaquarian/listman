<script lang="ts">
  import Icon from 'svelte-hero-icons/Icon.svelte';

  export let onClickHandler: () => void;
  export let icon: any;
  export let text: string = '';
  export let buttonClass = '';
  export let resize = true;
</script>

<button class={'flex items-center rounded-md p-2 ' + buttonClass} on:click={onClickHandler}>
  {#if text.length > 0}
    <p class={`text-black text-xl mr-2 hidden ${resize ? 'sm:block' : ''}`}>{text}</p>
  {/if}
  <Icon src={icon} solid class={'w-8 ' + $$props.class} />
</button>
