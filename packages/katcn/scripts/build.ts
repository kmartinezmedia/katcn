import { $ } from 'bun';

const outdir = 'dist';
const transpiler = new Bun.Transpiler({
  loader: 'tsx',
  tsconfig: {
    compilerOptions: {
      jsx: 'react-jsx',
      jsxImportSource: 'katcn',
    },
  },
  autoImportJSX: true,
  trimUnusedImports: true,
});

const entryFiles = {
  components: 'src/components.tsx',
  tokens: 'src/tokens.ts',
  fixtures: 'src/fixtures.ts',
  'jsx-runtime': 'src/jsx-runtime.ts',
  'jsx-dev-runtime': 'src/jsx-dev-runtime.ts',
  getStyles: 'src/getStyles.ts',
};

await Bun.write(
  `${outdir}/components.js`,
  transpiler.transformSync(await Bun.file(entryFiles.components).text()),
);

await Bun.write(
  `${outdir}/jsx-runtime.js`,
  transpiler.transformSync(await Bun.file(entryFiles['jsx-runtime']).text()),
);

await Bun.write(
  `${outdir}/jsx-dev-runtime.js`,
  transpiler.transformSync(
    await Bun.file(entryFiles['jsx-dev-runtime']).text(),
  ),
);

await Bun.build({
  entrypoints: [entryFiles.tokens, entryFiles.fixtures, entryFiles.getStyles],
  outdir,
  external: ['react', 'react-dom', 'clsx', 'tailwind-merge'],
});

await $`tsc -p tsconfig.build.json --outDir ${outdir} --declaration --emitDeclarationOnly`;
