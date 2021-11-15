<script lang="ts">
  import NavBar from '@components/NavBar.svelte';

  import { dedupExchange, errorExchange, fetchExchange, initClient } from '@urql/svelte';
  import { cacheExchange } from '@urql/exchange-graphcache';
  import { MeDocument } from '../graphql';
  import type { CreateUserMutation, GoogleSignInMutation, LoginMutation } from '../graphql';

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
            googleSignIn: (result: GoogleSignInMutation, _args, cache, _info) => {
              const user = result.googleSignIn.user;

              cache.updateQuery({ query: MeDocument }, (data) => {
                if (result.googleSignIn.error) {
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
            createUser: (result: CreateUserMutation, _args, cache, _info) => {
              const user = result.createUser.user;

              cache.updateQuery({ query: MeDocument }, (data) => {
                if (result.createUser.error) {
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
            logOut: (_result, _args, cache, _info) => {
              cache.updateQuery({ query: MeDocument }, (data) => {
                return {
                  me: null,
                };
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
