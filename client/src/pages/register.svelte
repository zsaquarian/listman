<script lang="ts">
  import RegisterForm from '@components/RegisterForm.svelte';
</script>

<svelte:head>
  <title>Register</title>
</svelte:head>

<RegisterForm />

<p class="text-center">
  Already have an account? <a href="/login" class="transition text-accent-800 hover:text-accent-600">Log In</a>
</p>
