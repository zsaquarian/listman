<script lang="typescript">
  import { Router } from '@roxi/routify';
  import { routes } from '../.routify/routes';
  import { Modal } from 'svelte-simple-modal';
</script>

<Modal>
  <Router {routes} />
</Modal>
