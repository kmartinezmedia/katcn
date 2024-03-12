/// <reference types="bun-types" />
import fs, { copyFile } from 'node:fs';
import { cp } from 'node:fs/promises';
import { watch } from 'node:fs';
import path from 'node:path';
import { buildPlayground } from './buildPlayground';

async function buildFixtures() {
  const data = await Bun.build({
    format: 'esm',
    target: 'node',
    entrypoints: ['src/fixtures.ts'],
    outdir: 'dist',
  });
  console.log(data);
}

async function copyDist() {
  const rootOfRepo = path.resolve(__dirname, '..');
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
}

if (Bun.argv.includes('--watch')) {
  const entry = path.resolve(import.meta.dirname, 'src');
  const watcher = watch(
    path.dirname(entry),
    { recursive: true },
    async (_event, filename) => {
      console.info(`Fixtures update: ${filename}`, import.meta.file);
      await copyDist();
    },
  );

  process.on('SIGINT', () => {
    // close watcher when Ctrl-C is pressed
    console.info('Closing watcher...', import.meta.file);
    watcher.close();

    process.exit(0);
  });
}

await Promise.all([buildFixtures(), buildPlayground(), copyDist()]);
