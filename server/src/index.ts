import express from 'express';
import { GOOD_ORIGINS, IN_PROD, PORT } from './utils/constants';
import dotenv from 'dotenv';
import { makeServer } from './server';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { seed } from './seed';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { schema } from './schema';
import { SubscriptionContext } from './context';
import { redis } from './redis';
import { db } from './db';

dotenv.config();

const main = async () => {
  const app = express();
  const http = createServer(app);

  const wsServer = new WebSocketServer({
    server: http,
    path: '/graphql',
  });
  const serverCleanup = useServer(
    {
      schema,
      context: (ctx, _msg, _args): SubscriptionContext => {
        const cookieString = ctx.extra.request.headers.cookie;
        if (!cookieString) return { redis, db, cookies: {} };
        const pairs = cookieString.split(';');
        const splittedPairs = pairs.map((cookie) => cookie.split('='));
        const cookies = splittedPairs.reduce((obj, cookie) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          obj[decodeURIComponent(cookie[0].trim())] = decodeURIComponent(cookie[1].trim());
          return obj;
        }, {});

        return { cookies, redis, db };
      },
    },
    wsServer
  );

  const server = makeServer(http, serverCleanup);

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!IN_PROD && !origin) callback(null, true);

        if (origin && GOOD_ORIGINS.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by cors'));
        }
      },
      credentials: true,
    })
  );
  app.use(cookieParser());

  await server.start();

  server.applyMiddleware({ app, cors: false });

  app.get('/', (_req, res) => {
    res.send('Hello world');
  });

  app.post('/seed', (_req, res) => {
    if (IN_PROD) return;

    seed();
    res.send('Database seeded succesfully');
  });

  http.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
  });
};

main();
