import type { Options } from 'tsup';

export const sharedConfig = {
  format: ['esm'],
  outDir: 'dist',
  splitting: false,
  treeshake: false,
  sourcemap: false,
  minify: false,
  bundle: true,
  dts: true,
  noExternal: ['clsx', 'tailwind-merge'],
  external: [
    'react',
    'katcn',
    'tailwindcss',
    'clsx',
    'ts-morph',
    '@babel/core',
    '@babel/plugin-transform-react-jsx',
    '@babel/preset-typescript',
  ],
} satisfies Options;
