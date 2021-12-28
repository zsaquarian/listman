<script lang="ts">
  import LoginForm from '@components/LoginForm.svelte';
</script>

<svelte:head>
  <script src="https://accounts.google.com/gsi/client" async defer></script>
  <title>Login</title>
</svelte:head>

<LoginForm />

<p class="text-center">
  New to Listman? <a href="/register" class="transition text-accent-800 hover:text-accent-600">Sign Up</a>
</p>
