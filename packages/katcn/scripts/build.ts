import { $ } from 'bun';
import { createWatcher } from './_createWatcher';

const outdir = 'dist';
const watch = Bun.argv.includes('--watch');
const srcDir = `${Bun.env.PWD}/src`;
const distDir = `${Bun.env.PWD}/dist`;
const srcGlob = new Bun.Glob(`${srcDir}/**/*.{ts,tsx}`);
const isMacroFile = (file: string) => file.includes('macros');
const srcFiles = Array.from(srcGlob.scanSync());

async function build(files: string[]) {
  const nonMacroFiles = files.filter((file) => !isMacroFile(file));
  const { success, logs, outputs } = await Bun.build({
    entrypoints: nonMacroFiles,
    outdir: distDir,
    root: srcDir,
    minify: true,
    external: [
      'react',
      'react-dom',
      'clsx',
      'tailwind-merge',
      'tailwindcss-animate',
    ],
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
}

if (watch) {
  createWatcher(srcDir, build);
}

await build(srcFiles);
