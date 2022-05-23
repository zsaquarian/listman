import { ApolloServer } from 'apollo-server-express';
import { db } from './db';
import { schema } from './schema';
import { MyContext } from './context';
import { redis } from './redis';
import { Server } from 'http';
import { Disposable } from 'graphql-ws';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core/dist/plugin/drainHttpServer';

export const makeServer = (httpServer: Server, serverCleanup: Disposable) =>
  new ApolloServer({
    schema,
    context: ({ req, res }): MyContext => ({ req, res, db, redis }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
