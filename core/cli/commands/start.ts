import { startServer } from '../../runtime/server';

export async function runStart() {
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  console.log('🚀 Starting your app with presha.js...');
  await startServer(port);
}
