<script lang="ts">
  import UserDropdown from './UserDropdown.svelte';
  import Icon from 'svelte-hero-icons/Icon.svelte';
  import { Menu, X } from 'svelte-hero-icons';

  // Most code from https://dev.to/joshnuss/creating-a-sidebar-menu-in-svelte-ih2
  let open = false;
</script>

<div
  class="bg-primary-500 p-2 text-white w-full"
  on:focusout={() => {
    open = false;
  }}
>
  <div class="grid grid-cols-navbar">
    <button on:click={() => (open = !open)} class="block lg:hidden">
      {#if open}
        <Icon src={X} solid class="text-white w-8 h-8" />
      {:else}
        <Icon src={Menu} solid class="text-white w-8 h-8" />
      {/if}
    </button>

    <aside class="absolute lg:relative -left-full z-50 w-full lg:left-0 lg:w-auto" class:left-0={open}>
      <nav class="bg-primary-500 flex flex-col gap-4 h-screen lg:h-auto lg:flex-row p-2 mt-12 lg:mt-0">
        <a class="text-2xl" href="/">Home</a>
        <a class="text-2xl" href="/list">All Lists</a>
        <a class="text-2xl" href="/master">Master list</a>
        <a class="text-2xl" href="/config">Settings</a>
        <hr class="my-2 border-1 rounded-lg lg:hidden" />
      </nav>
    </aside>
    <h1 class="text-5xl text-white text-center flex-auto">Listman</h1>
    <UserDropdown class="ml-auto" />
  </div>
</div>

<style>
  aside {
    transition: left 0.3s ease-in-out;
  }
</style>
