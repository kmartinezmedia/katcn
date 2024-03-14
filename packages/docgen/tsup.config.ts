import { defineConfig } from 'tsup';

export default defineConfig(({ watch }) => {
  return {
    format: ['esm'],
    dts: (process.env.NODE_ENV as string) === 'server' ? false : true,
    outDir: 'dist',
    splitting: false,
    bundle: true,
    banner: { js: `'use client';` },
    external: [
      'base-url',
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
