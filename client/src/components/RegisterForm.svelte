<script lang="ts">
  import { mutation, operationStore } from '@urql/svelte';
  import { CreateUserDocument, GoogleSignInDocument, LoginDocument } from '../graphql';
  import { parseCombinedError, getReadableError } from '@utils/errorParser';
  import type { ParsedError } from '@utils/errorParser';
  import { goto } from '@roxi/routify';
  import Form from './Form.svelte';

  const createUserMutation = mutation(operationStore(CreateUserDocument));
  const googleSignInMutation = mutation(operationStore(GoogleSignInDocument));

  let errors: ParsedError[] = [];

  const googleLogin = async (googleUser: CredentialResponse) => {
    const result = await googleSignInMutation({ token: googleUser.credential });
    $goto('/');
  };

  // @ts-ignore
  window.googleLogin = googleLogin;

  let formVals = { email: '', username: '', password: '' } as GenericFormValues;

  const createUser = async () => {
    const result = await createUserMutation({
      username: formVals.username,
      email: formVals.email,
      password: formVals.password,
    });
    if (result.error) {
      errors = parseCombinedError(result.error);
      return;
    }

    $goto('/');
  };
</script>

<Form {errors} {formVals} hasUsername hasEmail hasGoogleAuth submitText="Sign up" submitHandler={createUser} />
