import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts', '!src/**/*.test.ts'],
  format: ['esm'],
  dts: true,
  outDir: './dist',
  clean: true,
  tsconfig: './tsconfig.build.json',
});
