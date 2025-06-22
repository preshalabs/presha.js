import express, { Router } from 'express';
import path from 'path';

export async function createRouter(): Promise<Router> {
  const router = express.Router();

  const generatedRouterPath = path.resolve(
    process.cwd(),
    'dist/generated/routes/index.js'
  );
  try {
    const generated = await import(generatedRouterPath);
    router.use(generated.default || generated);
  } catch (err) {
    console.error(`❌ Failed to load generated router:`, err);
  }

  return router;
}
