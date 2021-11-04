<script lang="ts">
  import { operationStore, query } from '@urql/svelte';
  import { MeDocument } from '../graphql';

  // Most code from https://dev.to/joshnuss/creating-a-sidebar-menu-in-svelte-ih2
  let open = false;

  const meQuery = operationStore(MeDocument);

  const me = query(meQuery);
</script>

<div
  class="bg-blue-500 p-2 text-white w-screen"
  on:focusout={() => {
    open = false;
  }}
>
  <div class="flex">
    <button class="text-4xl w-4 h-4" on:click={() => (open = !open)}>{open ? 'x' : '≡'}</button>
    <h1 class="text-5xl m-auto">Listman</h1>
    <div class="rounded-md border-2 border-white p-2">
      {#if $me.error}
        <a href="/login">Sign In</a>
      {:else if !$me.fetching}
        <p>{$me.data.me.username}</p>
      {/if}
    </div>
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
