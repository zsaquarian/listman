import { ApolloServer } from 'apollo-server-express';
import { db } from './db';
import { schema } from './schema';
import { MyContext } from './context';
import { redis } from './redis';

export const server = new ApolloServer({
  schema,
  context: ({ req, res }): MyContext => ({ req, res, db, redis }),
});
