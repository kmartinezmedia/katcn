import { Options, defineConfig } from 'tsup';

export const sharedConfig = {
  format: ['esm'],
  dts: true,
  external: ['react', 'react-dom'],
  outDir: 'dist',
  splitting: false,
  bundle: false,
  sourcemap: false,
  minify: false,
} satisfies Options;

export default defineConfig({
  ...sharedConfig,
  clean: false, // tsup-runtime.config.ts handles this
  entry: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/jsx-runtime.ts',
    '!src/jsx-dev-runtime.ts',
  ],
});
