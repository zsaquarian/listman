<script lang="ts">
  import type { ParsedError } from '@utils/errorParser';
  import { onMount } from 'svelte';
  import InputWithErrors from './InputWithErrors.svelte';
  import { GoogleAuth } from '@reslear/capacitor-google-auth';
  import { goto } from '@roxi/routify';
  import { GoogleSignInDocument } from '@graphql';
  import { mutation, operationStore } from '@urql/svelte';
  import { Capacitor } from '@capacitor/core';

  export let hasGoogleAuth = false;
  export let hasEmail = false;
  export let hasUsername = false;
  export let hasUsernameOrEmail = false;

  export let errors: ParsedError[];
  export let submitHandler: () => void;

  export let submitText: string;

  export let formVals: GenericFormValues;

  onMount(() => {
    if (Capacitor.getPlatform() == 'web') {
      GoogleAuth.initialize({
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
        scopes: ['email', 'profile'],
      });
    }
  });

  const googleSignInMutation = mutation(operationStore(GoogleSignInDocument));

  const googleSignIn = async () => {
    const googleResult = await GoogleAuth.signIn();

    const backendResult = await googleSignInMutation({ token: googleResult.authentication.idToken });

    if (!backendResult.data.googleSignIn.error) {
      $goto('/');
    }
  };
</script>

<div
  class="flex flex-col justify-center m-2 w-full sm:w-3/4 md:w-1/2 mx-auto rounded-lg border-primary-300 border-2 bg-primary-50 py-2 px-16 drop-shadow dark:bg-primary-500"
>
  {#if hasGoogleAuth}
    <div class="border-b-2 border-black text-center mb-4 justify-center" style="line-height: 0.1rem;">
      <div class="block">
        <div
          class="bg-primary-700 dark:bg-primary-900 text-white justify-center my-4 pr-2 w-auto inline-flex rounded-md"
        >
          <img src="/google_icon.svg" class="bg-white mr-2 p-2 rounded-l-md dark:bg-black" alt="Google Icon" />
          <button on:click={googleSignIn}>Sign in with Google</button>
        </div>
      </div>
      <span class="bg-primary-50 dark:bg-primary-500 px-4">OR</span>
    </div>
  {/if}

  <form action="submit" class="text-center" on:submit|preventDefault={submitHandler}>
    {#if hasEmail}
      <InputWithErrors
        bind:value={formVals.email}
        placeholder="E-mail"
        error={errors.find((val) => val.field === 'email')}
      />
    {/if}

    {#if hasUsername}
      <InputWithErrors
        bind:value={formVals.username}
        placeholder="Username"
        error={errors.find((val) => val.field === 'username')}
      />
    {/if}

    {#if hasUsernameOrEmail}
      <InputWithErrors
        bind:value={formVals.usernameOrEmail}
        placeholder="Username or e-mail"
        error={errors.find((val) => val.field === 'usernameOrEmail')}
      />
    {/if}

    <InputWithErrors
      bind:value={formVals.password}
      placeholder="Password"
      type="password"
      error={errors.find((val) => val.field === 'password')}
    />

    <button
      type="submit"
      class="border-2 bg-accent-400 rounded-md border-accent-200
hover:border-white transition active:bg-gray-100 p-2 sm:w-1/2 md:w-1/3 lg:w-1/4
drop-shadow-lg text-white">{submitText}</button
    >
  </form>
</div>
