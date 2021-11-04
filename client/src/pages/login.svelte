<script lang="ts">
  import { mutation, operationStore } from '@urql/svelte';
  import { GoogleSignInDocument, LoginDocument } from '../graphql';
  import { parseCombinedError, getReadableError } from '@utils/errorParser';
  import type { ParsedError } from '@utils/errorParser';
  import { goto } from '@roxi/routify';

  const loginMutation = mutation(operationStore(LoginDocument));
  const googleSignInMutation = mutation(operationStore(GoogleSignInDocument));

  let errors: ParsedError[];

  const googleLogin = async (googleUser: CredentialResponse) => {
    const result = await googleSignInMutation({ token: googleUser.credential });
    console.log(result);
  };

  // @ts-ignore
  window.googleLogin = googleLogin;

  const login = async () => {
    const result = await loginMutation({ usernameOrEmail, password });
    if (result.error) {
      errors = parseCombinedError(result.error);
      return;
    }

    $goto('/');
  };

  let usernameOrEmail: string;
  let password: string;
</script>

<svelte:head>
  <script src="https://accounts.google.com/gsi/client" async defer></script>
  <title>Login</title>
</svelte:head>

<div
  class="grid justify-center m-2 sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto
rounded-lg bg-blue-200 p-2 drop-shadow"
>
  <form action="submit" class="text-center" on:submit|preventDefault={login}>
    <input
      type="text"
      class="border-2 rounded-md w-3/4 my-2 text-center"
      aria-label="Username or e mail"
      placeholder="Username or e mail"
      bind:value={usernameOrEmail}
    />

    {#if errors && errors.some((val) => val.field && val.field === 'usernameOrEmail')}
      <p class="text-red-500 w-full mx-auto">
        <i class="fas fa-exclamation-circle" />
        {getReadableError(errors.find((val) => val.field && val.field === 'usernameOrEmail'))}
      </p>
    {/if}

    <input
      type="text"
      class="border-2 rounded-md w-3/4 my-2 text-center"
      aria-label="Password"
      placeholder="Password"
      bind:value={password}
    />
    {#if errors && errors.some((val) => val.field && val.field === 'password')}
      <p class="text-red-500 w-full mx-auto">
        {getReadableError(errors.find((val) => val.field && val.field === 'password'))}
      </p>
    {/if}
    <button
      type="submit"
      class="border-2 bg-gray-200 rounded-md hover:border-gray-100 active:bg-gray-100 p-2 sm:w-1/2 md:w-1/3 lg:w-1/4 drop-shadow-lg"
      >Log In</button
    >
  </form>

  <!-- Google Auth -->
  <div class="mx-auto">
    <div
      id="g_id_onload"
      data-client_id="610976066282-9rpjagnk956552lmej9k047v103stlbu.apps.googleusercontent.com"
      data-context="signin"
      data-ux_mode="popup"
      data-callback="googleLogin"
      data-auto_prompt="false"
    />

    <div
      class="g_id_signin"
      data-type="standard"
      data-shape="rectangular"
      data-theme="filled_black"
      data-text="signin_with"
      data-size="large"
      data-logo_alignment="left"
    />
  </div>
</div>
