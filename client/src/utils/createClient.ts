import { dedupExchange, fetchExchange, initClient, subscriptionExchange } from '@urql/svelte';
import { cacheExchange } from '@urql/exchange-graphcache';
import { MeDocument, RefreshDocument } from '@graphql';
import type { CreateUserMutation, GoogleSignInMutation, LoginMutation } from '@graphql';
import { authExchange } from '@urql/exchange-auth';
import { authStore } from '@store/auth';
import { createClient as createWSClient } from 'graphql-ws';

const wsClient = createWSClient({
  url: import.meta.env.VITE_SUB_GRAPHQL_IP,
});

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
                  authStore.update((val) => ({ ...val, isLoggedIn: true, username: user.username }));
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
                  authStore.update((val) => ({ ...val, isLoggedIn: true, username: user.username }));
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
                  authStore.update((val) => ({ ...val, isLoggedIn: true, username: user.username }));
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
              authStore.update((val) => ({ ...val, isLoggedIn: false, username: '' }));

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
      subscriptionExchange({
        forwardSubscription: (operation) => ({
          subscribe: (sink) => ({
            unsubscribe: wsClient.subscribe(operation, sink),
          }),
        }),
      }),
    ],
  });
};
