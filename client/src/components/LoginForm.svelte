<script lang="ts">
  import Form from './Form.svelte';
  import { mutation, operationStore } from '@urql/svelte';
  import { GoogleSignInDocument, LoginDocument } from '@graphql';
  import { parseCombinedError } from '@utils/errorParser';
  import type { ParsedError } from '@utils/errorParser';
  import { goto } from '@roxi/routify';

  const loginMutation = mutation(operationStore(LoginDocument));
  const googleSignInMutation = mutation(operationStore(GoogleSignInDocument));

  let errors: ParsedError[] = [];

  const googleLogin = async (googleUser: CredentialResponse) => {
    const result = await googleSignInMutation({ token: googleUser.credential });
    $goto('/');
  };

  // @ts-ignore
  window.googleLogin = googleLogin;

  let formVals = { password: '', usernameOrEmail: '' } as GenericFormValues;

  const login = async () => {
    const result = await loginMutation({ usernameOrEmail: formVals.usernameOrEmail, password: formVals.password });
    if (result.error) {
      errors = parseCombinedError(result.error);
      return;
    }

    $goto('/');
  };
</script>

<Form {errors} {formVals} hasUsernameOrEmail hasGoogleAuth submitText="Log in" submitHandler={login} />
