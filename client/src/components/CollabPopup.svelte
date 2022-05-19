<script lang="ts">
  import type { ExecuteMutation } from '@urql/svelte';
  import { getContext } from 'svelte';
  import InputWithErrors from './InputWithErrors.svelte';
  import { goto } from '@roxi/routify';

  export let shareListMutation: ExecuteMutation;
  export let listUuid: string;

  const { close } = getContext('simple-modal');

  let username: string;
  let error = '';

  const shareList = async () => {
    const result = await shareListMutation({ listUuid, sharedWith: username });
    if (result.error.toString().includes('user with that username does not exist')) {
      error = 'User with that username does not exist';
    } else {
      close({
        onClosed: () => {
          $goto(`/sharedList/${listUuid}`);
        },
      });
    }
  };
</script>

<form class="flex flex-col m-0" action="submit" on:submit|preventDefault={shareList}>
  <p class="mb-2 text-xl">Collabarate with others</p>
  <InputWithErrors
    bind:value={username}
    type="text"
    placeholder="Add people using their username"
    class="text-center"
    {error}
  />
  <button
    class="bg-accent-300 w-16 p-2 mx-auto my-2 hover:bg-accent-400
focus:bg-accent-400 text-white transition rounded-md"
    action="submit">Done</button
  >
</form>
