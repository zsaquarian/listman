<script lang="ts">
  import type { ExecuteMutation } from '@urql/svelte';
  import { getContext } from 'svelte';

  export let shareListMutation: ExecuteMutation;
  export let listUuid: string;

  const { close } = getContext('simple-modal');

  let username: string;

  const shareList = async () => {
    await shareListMutation({ listUuid, sharedWith: username });
    close();
  };
</script>

<form class="flex flex-col m-0" action="submit" on:submit|preventDefault={shareList}>
  <label class="mb-2" for="collab-username">Collabarate with others</label>
  <input
    class="bg-gray-200 rounded-md p-2 focus:bg-gray-100 hover:bg-gray-100"
    id="collab-username"
    type="text"
    bind:value={username}
    placeholder="Add people using their username"
  />
  <button
    class="bg-blue-300 w-16 p-2 mx-auto my-2 hover:bg-blue-400
focus:bg-blue-400 text-white transition rounded-sm"
    action="submit">Done</button
  >
</form>
