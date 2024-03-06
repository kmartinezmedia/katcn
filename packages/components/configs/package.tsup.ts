import fs, { copyFile } from 'node:fs';
import { cp } from 'node:fs/promises';
import path from 'node:path';
import { defineConfig } from 'tsup';
import { sharedConfig } from './shared-config';

const rootOfRepo = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootOfRepo, '../../apps/web-demo/public');
const demoDir = path.resolve(publicDir, 'katcn/dist');
const srcPackageJsonFile = path.resolve(rootOfRepo, 'package.json');

const demoKatcnDist = path.resolve(rootOfRepo, 'dist');
const distPackageJsonFile = path.resolve(demoDir, '../package.json');
const srcReactTypes = path.resolve('@types/react/index.d.ts');

export default defineConfig(({ watch }) => {
  return [
    {
      ...sharedConfig,
      watch,
      clean: false, // handles this in runtime
      tsconfig: './package.tsconfig.json',
      entry: {
        index: 'src/index.ts',
        tailwind: 'src/tailwind/index.ts',
      },
      async onSuccess() {
        console.log(`Copying ${demoKatcnDist} to`, demoDir);
        fs.mkdirSync(demoDir, { recursive: true });
        cp(demoKatcnDist, demoDir, { recursive: true, force: true });
        copyFile(srcPackageJsonFile, distPackageJsonFile, () => {});
        copyFile(
          srcReactTypes,
          `${publicDir}/@types/react/index.d.ts`,
          () => {},
        );
      },
    },
  ] as const;
});
