import express from 'express';
import { PORT } from './utils/constants';
import dotenv from 'dotenv';
import session from 'express-session';
import { v4 } from 'uuid';
import { server } from './server';

dotenv.config();

const SESSION_SECRET = process.env.SESSION_SECRET;

const main = async () => {
  const app = express();

  await server.start();

  server.applyMiddleware({ app, cors: false });

  app.use(
    session({
      genid: (_req) => v4(),
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );

  app.get('/', (_req, res) => {
    res.send('Hello world');
  });

  app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
  });
};

main();
