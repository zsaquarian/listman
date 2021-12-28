<script lang="ts">
  import type { ParsedError } from '@utils/errorParser';
  import InputWithErrors from './InputWithErrors.svelte';

  export let hasGoogleAuth: boolean = false;
  export let hasEmail: boolean = false;
  export let hasUsername: boolean = false;
  export let hasUsernameOrEmail: boolean = false;

  export let errors: ParsedError[];
  export let submitHandler: () => void;

  export let submitText: string;

  export let formVals: GenericFormValues;
</script>

<div
  class="flex flex-col justify-center m-2 w-full sm:w-3/4 md:w-1/2 mx-auto rounded-lg border-primary-300 border-2 bg-primary-50 py-2 px-16 drop-shadow"
>
  {#if hasGoogleAuth}
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

    <div class="border-b-2 border-black text-center mt-4 mb-4 justify-center" style="line-height: 0.1rem;">
      <span class="bg-primary-50 px-4">OR</span>
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
