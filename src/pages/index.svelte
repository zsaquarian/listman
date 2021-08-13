<script lang="ts">
  import { onMount } from 'svelte';
  import { getLists } from '@utils/shoppingListUtils';
  import { Storage } from '@capacitor/storage';

  let lists = [];

  onMount(async () => {
    const result = await getLists();
    lists = [...result];
  });
</script>

<h1 class="text-4xl m-2">Lists:</h1>
<div class="flex flex-col text-center text-3xl">
  {#each lists as { name, key }, i (i)}
    {#if key !== 'master'}
      <div class="flex">
        <a href={`/list/${key}`}>{name}</a>
        <button
          class="bg-red-500 text-white ml-auto rounded-md p-2"
          on:click={async () => {
            await Storage.remove({ key });
            lists = [...lists.slice(0, i), ...lists.slice(i + 1)];
          }}>X</button
        >
      </div>
    {:else if lists.length == 1}
      <h1 class="text-4xl text-gray-400">No lists made yet</h1>
    {/if}
  {/each}
</div>

<a class="text-4xl text-blue-500 text-center m-2" href="/master">Master List</a>
