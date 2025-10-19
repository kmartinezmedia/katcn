import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.{ts,tsx}', '!src/**/*.test.{ts,tsx}'],
  format: ['esm'],
  dts: true,
  outDir: './dist',
  clean: true,
  tsconfig: './tsconfig.build.json',
});
