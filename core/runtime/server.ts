import express from 'express';
import { createRouter } from './createRouter';

export async function startServer(port = 3000) {
  const app = express();

  app.use(express.json());

  const router = await createRouter();
  app.use('/', router);

  app.listen(port, () => {
    console.log(`🚀 presha.js server running at http://localhost:${port}`);
  });
}
