import { dedupExchange, fetchExchange, initClient } from '@urql/svelte';
import { cacheExchange } from '@urql/exchange-graphcache';
import { MeDocument, RefreshDocument } from '../graphql';
import type { CreateUserMutation, GoogleSignInMutation, LoginMutation } from '../graphql';
import { authExchange } from '@urql/exchange-auth';
import { authStore } from '@store/auth';

export const createClient = (): void => {
  initClient({
    url: import.meta.env.VITE_GRAPHQL_IP,
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
                  authStore.update((val) => ({ ...val, isLoggedIn: true }));
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

              authStore.update((val) => ({ ...val, isLoggedIn: true }));
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

              authStore.update((val) => ({ ...val, isLoggedIn: true }));
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
              authStore.update((val) => ({ ...val, isLoggedIn: false }));

              cache.updateQuery({ query: MeDocument }, (_data) => {
                return {
                  me: null,
                };
              });
            },
          },
        },
      }),
      authExchange({
        addAuthToOperation: ({ operation }) => {
          return operation;
        },
        didAuthError: ({ error }) => {
          return error.graphQLErrors.some((val) => val.message.includes('Not authorized'));
        },
        getAuth: async ({ authState, mutate }) => {
          if (!authState) {
            return {
              loggedIn: false,
            };
          }

          const result = await mutate(RefreshDocument);

          if (result.data?.refresh?.token) {
            return {
              loggedIn: true,
            };
          }

          return {
            loggedIn: false,
          };
        },
      }),
      fetchExchange,
    ],
  });
};
