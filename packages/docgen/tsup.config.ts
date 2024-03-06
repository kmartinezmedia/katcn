import { defineConfig } from 'tsup';

export default defineConfig(({ watch }) => {
  return {
    format: ['esm'],
    dts: false,
    outDir: 'dist',
    splitting: false,
    bundle: false,
    sourcemap: false,
    minify: false,
    watch,
    clean: false, // handles this above
    entry: ['src/**/*.ts', 'src/**/*.tsx'],
  };
});
