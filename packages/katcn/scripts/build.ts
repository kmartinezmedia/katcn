import { $ } from 'bun';
import { createWatcher } from './_createWatcher';

async function build() {
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

  const transpileFiles = {
    components: 'src/components.tsx',
    'jsx-runtime': 'src/jsx-runtime.ts',
    'jsx-dev-runtime': 'src/jsx-dev-runtime.ts',
  };

  const buildFiles = [
    'src/helpers/index.ts',
    'src/tokens.ts',
    'src/fixtures.ts',
    'src/getStyles.ts',
  ];

  await Bun.write(
    `${outdir}/components.js`,
    transpiler.transformSync(await Bun.file(transpileFiles.components).text()),
  );

  await Bun.write(
    `${outdir}/jsx-runtime.js`,
    transpiler.transformSync(
      await Bun.file(transpileFiles['jsx-runtime']).text(),
    ),
  );

  await Bun.write(
    `${outdir}/jsx-dev-runtime.js`,
    transpiler.transformSync(
      await Bun.file(transpileFiles['jsx-dev-runtime']).text(),
    ),
  );

  await Bun.build({
    entrypoints: buildFiles,
    outdir,
    external: ['react', 'react-dom', 'clsx', 'tailwind-merge'],
  });

  await $`tsc -p tsconfig.build.json --outDir ${outdir} --declaration --emitDeclarationOnly`;
}

if (Bun.argv.includes('--watch')) {
  createWatcher(`${Bun.env.PWD}/src`, build);
}

await build();
