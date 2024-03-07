import fs, { copyFile } from 'node:fs';
import { cp } from 'node:fs/promises';
import path from 'node:path';
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
    async onSuccess() {
      const rootOfRepo = path.resolve(__dirname);
      const publicDir = path.resolve(rootOfRepo, '../../apps/web-demo/public');
      const katcnDist = path.resolve(rootOfRepo, 'dist');
      const katcnOut = path.resolve(publicDir, 'katcn/dist');
      const katcnPkgJson = path.resolve(rootOfRepo, 'package.json');
      const katcnPkgJsonOut = path.resolve(katcnOut, '../package.json');

      console.log(`Copying ${katcnDist} to`, katcnOut);
      fs.mkdirSync(katcnOut, { recursive: true });
      cp(katcnDist, katcnOut, { recursive: true, force: true });

      console.log(`Copying ${katcnPkgJson} to`, katcnPkgJsonOut);
      copyFile(katcnPkgJson, katcnPkgJsonOut, () => {});
    },
  };
});
