import fs from 'node:fs';
import path from 'node:path';
import { $ } from 'bun';
import { defineConfig } from 'tsup';
import { sharedConfig } from './shared-config';

const rootOfRepo = path.resolve(import.meta.dirname, '..');

export default defineConfig(({ watch }) => {
  return {
    ...sharedConfig,
    watch,
    clean: !watch,
    entry: ['src/jsx-dev-runtime.ts', 'src/jsx-runtime.ts'],
    async onSuccess() {
      const args = watch ? '--watch' : '';
      const dtsDir = `${rootOfRepo}/dts`;

      if (!watch) {
        if (fs.existsSync(dtsDir)) {
          fs.rm(dtsDir, { recursive: true }, () => {});
        }
      }
      await $`tsc -p ${rootOfRepo}/tsconfig.json ${args}`.quiet();
    },
  };
});
