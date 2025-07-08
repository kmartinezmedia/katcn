import { $ } from 'bun';
import { createWatcher } from './_createWatcher';

const outdir = 'dist';
const watch = Bun.argv.includes('--watch');
const srcDir = `${Bun.env.PWD}/src`;
const distDir = `${Bun.env.PWD}/dist`;
const srcGlob = new Bun.Glob(`${srcDir}/**/*.{ts,tsx}`);

const isNotTestFile = (file: string) => !file.includes('test');
const isNotNodeFile = (file: string) => !file.includes('node');
const srcFiles = Array.from(srcGlob.scanSync()).filter(isNotTestFile);

async function build(files: string[]) {
  const entrypoints = files.filter(isNotNodeFile);
  const {
    success,
    logs,
    outputs: _outputs,
  } = await Bun.build({
    entrypoints,
    outdir: distDir,
    root: srcDir,
    minify: process.env.NODE_ENV === 'production',
    external: ['react', 'react-dom', 'clsx', 'tailwind-merge', '#fixtures'],
  });

  const nodeFiles = files.filter((file) => file.includes('node'));
  // build node entrypoint
  await Bun.build({
    entrypoints: nodeFiles,
    outdir: distDir,
    root: srcDir,
    minify: false,
    external: ['ts-morph'],
  });

  /** TODO: only log if debug mode is true */
  // for (const output of outputs) {
  //   if (!watch) {
  //     console.info(`[katcn ${watch ? 'dev' : 'build'}] ${output.path}`);
  //   }
  // }

  if (!success) {
    for (const log of logs) {
      console.error(log);
    }
    process.exitCode = 1;
  }

  await $`tsc -p tsconfig.build.json --outDir ${outdir} --declaration --emitDeclarationOnly`;
  await $`bun run ./scripts/buildDtsLibs.ts`;
}

if (watch) {
  createWatcher(srcDir, build);
}

await build(srcFiles);
