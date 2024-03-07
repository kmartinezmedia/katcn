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
      'react',
      'katcn',
      'tailwindcss',
      'clsx',
      'ts-morph',
      '@babel/core',
      '@babel/plugin-transform-react-jsx',
      '@babel/preset-typescript',
    ],
    watch,
    clean: !watch,
    tsconfig: './tsconfig.build.json',
    entry: {
      'jsx-runtime': 'src/jsx-runtime.ts',
      'jsx-dev-runtime': 'src/jsx-dev-runtime.ts',
      getStyles: 'src/tailwind/getStyles.ts',
      types: 'src/types/index.ts',
      index: 'src/index.ts',
      tailwind: 'src/tailwind/index.ts',
    },
  };
});
