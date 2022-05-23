<script lang="ts">
  import NavBar from '@components/NavBar.svelte';
  import { config } from '@store/config';
  import { createClient } from '@utils/createClient';
  import NotificationManager from '@components/NotificationManager.svelte';

  createClient();

  $: {
    if ($config.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
</script>

<div class="min-h-screen dark:bg-black dark:text-white transition-colors">
  <NotificationManager />
  <NavBar />
  <slot />
</div>
