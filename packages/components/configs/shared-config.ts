import type { Options } from 'tsup';

export const sharedConfig = {
  format: ['esm'],
  dts: false,
  outDir: 'dist',
  splitting: false,
  bundle: false,
  sourcemap: false,
  minify: false,
} satisfies Options;
