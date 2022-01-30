import express from 'express';
import { GOOD_ORIGINS, PORT } from './utils/constants';
import dotenv from 'dotenv';
import { server } from './server';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const main = async () => {
  const app = express();

  app.use(
    cors({
      origin: (origin, callback) => {
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

  app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
  });
};

main();
