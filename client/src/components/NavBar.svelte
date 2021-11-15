<script lang="ts">
  import UserDropdown from './UserDropdown.svelte';

  // Most code from https://dev.to/joshnuss/creating-a-sidebar-menu-in-svelte-ih2
  let open = false;
</script>

<div
  class="bg-blue-500 p-2 text-white w-full"
  on:focusout={() => {
    open = false;
  }}
>
  <div class="flex">
    <button class="text-4xl w-4 h-4" on:click={() => (open = !open)}>{open ? 'x' : '≡'}</button>
    <h1 class="text-5xl m-auto">Listman</h1>
    <UserDropdown />
  </div>
  <aside class="absolute -left-full z-50 w-full" class:left-0={open}>
    <nav class="bg-blue-400 flex flex-col h-screen p-2 mt-2">
      <a class="text-4xl mb-4" href="/">Home</a>
      <a class="text-4xl" href="/master">Master list</a>
      <hr class="my-2 border-1 rounded-lg" />
    </nav>
  </aside>
</div>

<style>
  aside {
    transition: left 0.3s ease-in-out;
  }
</style>
