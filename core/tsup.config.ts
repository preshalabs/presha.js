import { defineConfig } from 'tsup';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Copy templates to dist
const copyTemplates = async () => {
  const templatesDir = resolve(__dirname, 'generator/templates');
  const distTemplatesDir = resolve(__dirname, 'dist/generator/templates');

  await fs.mkdir(distTemplatesDir, { recursive: true });
  await fs.cp(templatesDir, distTemplatesDir, { recursive: true });
};

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
  },
  onSuccess: copyTemplates
});
