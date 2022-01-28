<script lang="ts">
  import { mutation, operationStore } from '@urql/svelte';
  import { CreateUserDocument } from '@graphql';
  import { parseCombinedError } from '@utils/errorParser';
  import type { ParsedError } from '@utils/errorParser';
  import { goto } from '@roxi/routify';
  import Form from './Form.svelte';

  const createUserMutation = mutation(operationStore(CreateUserDocument));

  let errors: ParsedError[] = [];

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
