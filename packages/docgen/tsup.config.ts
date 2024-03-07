import { defineConfig } from 'tsup';

export default defineConfig(({ watch }) => {
  return {
    format: ['esm'],
    dts: true,
    outDir: 'dist',
    splitting: false,
    bundle: false,
    sourcemap: false,
    minify: false,
    watch,
    clean: !watch,
    entry: ['src/**/*.{ts,tsx,json}'],
    tsconfig: './tsconfig.build.json',
  };
});
