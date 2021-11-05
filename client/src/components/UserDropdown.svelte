<script lang="ts">
  import { mutation, operationStore, query } from '@urql/svelte';
  import { LogOutDocument, MeDocument, RefreshDocument } from '../graphql';
  import Icon from 'svelte-hero-icons/Icon.svelte';
  import { ChevronDown, ChevronUp } from 'svelte-hero-icons';

  const meQuery = operationStore(MeDocument);
  const me = query(meQuery);

  const logOut = mutation(operationStore(LogOutDocument));

  let dropdown = false;

  const refreshTime = 3600; // 1 hour in seconds
  const refresh = mutation(operationStore(RefreshDocument));
  const refreshInterval = setInterval(() => {
    const result = refresh();
    console.log(result);
  }, (refreshTime - 1) * 1000);
</script>

<div
  class="rounded-md border-2 border-white p-2 flex items-center
transition-all"
>
  <div class="mr-2">
    {#if $me.error || $me.data?.me === null}
      <a href="/login">Log In</a>
    {:else if !$me.fetching}
      <p>{$me.data.me.username}</p>
    {/if}
  </div>

  {#if $me.data?.me}
    <button
      id="menu-button"
      on:click={() => {
        dropdown = !dropdown;
      }}
    >
      {#if !dropdown}
        <Icon src={ChevronDown} class="w-6" />
      {:else}
        <Icon src={ChevronUp} class="w-6" />
      {/if}
    </button>
    <div
      class={`rounded-md text-black bg-gray-200 p-2 absolute right-2 mt-28 transition-all w-48 duration-200 ease-in-out ${
        !dropdown ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <button
        on:click={() => {
          logOut();
          me.reexecute();
        }}>Log Out</button
      >
    </div>
  {/if}
</div>
