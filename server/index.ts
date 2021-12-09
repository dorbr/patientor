import express from 'express';
import cors from "cors";

import apiRouter from './src/routers/api';

const app = express();

app.use(cors());

app.use(express.json());

const PORT = 3001;


app.use('/api', apiRouter);

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});