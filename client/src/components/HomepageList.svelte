<script lang="ts">
  import { Storage } from '@capacitor/storage';
  import { authStore } from '@store/auth';
  import { getStore } from '@utils/yjsUtils';
  import { X, Users } from '@steeze-ui/heroicons';
  import { Icon } from '@steeze-ui/svelte-icon';

  import IconButton from './IconButton.svelte';

  export let key: string;
  export let name: string;
  export let isExternal: boolean;
  export let isShared: boolean;
  export let removeList: () => void;
  let store = getStore(key);
</script>

{#if (isShared && $authStore.isLoggedIn) || !isShared}
  <div class="flex items-center mb-2">
    <a href={isShared ? `/sharedList/${key}` : `/list/${key}`} class="self-center"
      >{isExternal ? $store.todos.name : name === '' ? 'Untitled List' : name}</a
    >
    <div class="ml-auto flex items-center">
      {#if isShared}
        <Icon src={Users} class="w-8 mr-2 text-primary-500" />
      {/if}
      <IconButton icon={X} buttonClass="bg-error-500 text-white" onClickHandler={removeList} />
    </div>
  </div>
{/if}
