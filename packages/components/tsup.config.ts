import { defineConfig } from 'tsup';

export default defineConfig(({ watch }) => {
  return {
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
      'katcn',
      'react',
      'tailwindcss',
      'clsx',
      'ts-morph',
      '@babel/core',
      '@babel/plugin-transform-react-jsx',
      '@babel/preset-typescript',
    ],
    watch,
    clean: true,
    tsconfig: './tsconfig.build.json',
    entry: {
      index: 'src/index.ts',
      types: 'src/types/index.ts',
      'jsx-runtime': 'src/jsx-runtime.ts',
      'jsx-dev-runtime': 'src/jsx-dev-runtime.ts',
      getStyles: 'src/tailwind/getStyles.ts',
      tailwind: 'src/tailwind/index.ts',
    },
  };
});
