<script lang="ts">
  import NavBar from '@components/NavBar.svelte';

  import { dedupExchange, fetchExchange, gql, initClient } from '@urql/svelte';
  import { cacheExchange } from '@urql/exchange-graphcache';
  import { MeDocument } from '../graphql';
  import type { LoginMutation } from '../graphql';

  initClient({
    url: 'http://localhost:3000/graphql',
    fetchOptions: {
      credentials: 'include',
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        updates: {
          Mutation: {
            login: (result: LoginMutation, _args, cache, _info) => {
              const user = result.login.user;

              cache.updateQuery({ query: MeDocument }, (data) => {
                if (result.login.error) {
                  return data;
                } else {
                  return {
                    me: {
                      id: user.id,
                      uuid: user.uuid,
                      email: user.email,
                      username: user.username,
                    },
                  };
                }
              });
            },
          },
        },
      }),
      fetchExchange,
    ],
  });
</script>

<NavBar />
<slot />
