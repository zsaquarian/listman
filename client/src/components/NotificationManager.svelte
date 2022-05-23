<script lang="ts">
  import { operationStore, subscription } from '@urql/svelte';
  import { getNotificationsContext } from 'svelte-notifications';

  const { addNotification } = getNotificationsContext();

  const notifications = operationStore(`
    subscription Notifications {
      notifications {
        id
        message
      }
    }
  `);

  const handleSubscription = (_, data) => {
    return [...data.notifications];
  };

  subscription(notifications, handleSubscription);

  $: {
    if ($notifications.data) {
      $notifications.data.forEach((val: { id: string; message: string }) => {
        addNotification({
          id: val.id,
          text: val.message,
          position: 'top-right',
          removeAfter: 4000,
        });
      });
    }
  }
</script>
