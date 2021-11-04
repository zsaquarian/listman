import express from 'express';
import { CORS_ORIGIN, PORT } from './utils/constants';
import dotenv from 'dotenv';
import { server } from './server';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const main = async () => {
  const app = express();

  app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
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
