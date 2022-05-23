<script lang="typescript">
  import { Router } from '@roxi/routify';
  import { routes } from '../.routify/routes';
  import { Modal } from 'svelte-simple-modal';
  import Notifications from 'svelte-notifications';
</script>

<Modal>
  <Notifications>
    <Router {routes} />
  </Notifications>
</Modal>
