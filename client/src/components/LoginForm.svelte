<script lang="ts">
  import Form from './Form.svelte';
  import { mutation, operationStore } from '@urql/svelte';
  import { LoginDocument } from '@graphql';
  import { parseCombinedError } from '@utils/errorParser';
  import type { ParsedError } from '@utils/errorParser';
  import { goto } from '@roxi/routify';

  const loginMutation = mutation(operationStore(LoginDocument));

  let errors: ParsedError[] = [];

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
