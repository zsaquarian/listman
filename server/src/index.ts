import express from 'express';
import { PORT } from './utils/constants';

const app = express();

app.get('/', (_req, res) => {
  res.send('Hello world');
});

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
