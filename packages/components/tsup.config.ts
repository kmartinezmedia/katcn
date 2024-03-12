import { Options, defineConfig } from 'tsup';

export default defineConfig(({ watch }) => {
  return [
    {
      format: ['esm'],
      outDir: 'dist',
      splitting: false,
      treeshake: false,
      sourcemap: false,
      minify: false,
      bundle: true,
      dts: true,
      noExternal: ['clsx', 'tailwind-merge'],
      skipNodeModulesBundle: true,
      watch,
      clean: !watch,
      tsconfig: './tsconfig.build.json',
      entry: {
        index: 'src/index.ts',
        types: 'src/types/index.ts',
        'jsx-runtime': 'src/jsx-runtime.ts',
        'jsx-dev-runtime': 'src/jsx-dev-runtime.ts',
        extractStyleProps: 'src/extractStyleProps.ts',
        getStyles: 'src/getStyles.ts',
        helpers: 'src/helpers/index.ts',
        macros: 'src/macros/index.ts',
      },
    },
  ] satisfies Options[];
});
