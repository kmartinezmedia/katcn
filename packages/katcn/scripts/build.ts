import { $ } from 'bun';
import { createWatcher } from './_createWatcher';

const outdir = 'dist';
const watch = Bun.argv.includes('--watch');
const srcDir = `${Bun.env.PWD}/src`;

async function build() {
  await $`tsup`;
  await $`tsc -p tsconfig.build.json --outDir ${outdir} --declaration --emitDeclarationOnly`;
  await $`bun run ./scripts/buildDtsLibs.ts`;
  await $`bun run ./scripts/getTailwindCss.ts`;
}

if (watch) {
  createWatcher(srcDir, build);
}

await build();
