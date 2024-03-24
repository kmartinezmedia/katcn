import { type Options, defineConfig } from 'tsup';

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
      skipNodeModulesBundle: true,
      watch,
      // clean: !watch,
      tsconfig: './tsconfig.build.json',
      entry: {
        components: 'src/components.tsx',
        tokens: 'src/tokens.ts',
        'jsx-runtime': 'src/jsx-runtime.ts',
        'jsx-dev-runtime': 'src/jsx-dev-runtime.ts',
        getStyles: 'src/getStyles.ts',
      },
    },
  ] satisfies Options[];
});
