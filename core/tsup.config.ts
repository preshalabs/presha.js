import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts', 'cli/index.ts', 'runtime/express.ts'],
  format: ['esm'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  target: 'node18',
  outDir: 'dist',
  banner: {
    js: '#!/usr/bin/env node'
  }
});
