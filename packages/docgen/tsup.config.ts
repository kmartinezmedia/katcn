import { defineConfig } from 'tsup';

export default defineConfig(({ watch }) => {
  return {
    format: ['esm'],
    dts: true,
    outDir: 'dist',
    splitting: false,
    bundle: true,
    external: [
      'colord',
      'prettier',
      '@monaco-editor/react',
      'katcn',
      'react',
      'react-dom',
    ],
    sourcemap: false,
    minify: false,
    watch,
    clean: !watch,
    entry: ['src/index.ts'],
    tsconfig: './tsconfig.build.json',
  };
});
