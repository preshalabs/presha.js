import { defineConfig } from 'tsup'

export default defineConfig({
  entry: { index: 'cli/index.ts' },
  format: ['cjs'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: false,
  target: 'node18',
  outDir: 'dist',
  banner: {
    js: '#!/usr/bin/env node'
  }
})
