import { defineConfig, type Options } from 'tsup';

// eslint-disable-next-line import/no-default-export
export default defineConfig(({ watch }: Options) => {
  return {
    external: [],
    format: ['cjs', 'esm'],
    dts: true,
    watch,
    minify: false,
    treeshake: false,
    splitting: false,
    clean: true,
    outDir: './dist',
    bundle: false, // Produce individual .js files for each icon.
    entry: ['src/**/*.{ts,tsx}', '!src/**/*.test.ts'],
    tsconfig: './tsconfig.build.json',
  };
});
