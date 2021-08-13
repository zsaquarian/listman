<script lang="ts">
  // Most code from https://dev.to/joshnuss/creating-a-sidebar-menu-in-svelte-ih2
  let open = false;
</script>

<div
  class="bg-blue-500 p-2 text-white w-screen "
  on:focusout={() => {
    open = false;
  }}
>
  <button class="text-4xl" on:click={() => (open = !open)}>{open ? 'x' : '≡'}</button>
  <aside class="absolute -left-full z-50 w-full" class:left-0={open}>
    <nav class="bg-blue-400 flex flex-col h-screen p-2 mt-2">
      <a class="text-4xl" href="/">Home</a>
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
