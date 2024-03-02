import path from 'node:path';
import { $ } from 'bun';
import { Options, build } from 'tsup';

const rootOfRepo = path.resolve(import.meta.dirname, '..');

const sharedConfig = {
  format: ['esm'],
  dts: false,
  outDir: 'dist',
  splitting: false,
  bundle: false,
  sourcemap: false,
  minify: false,
} satisfies Options;

export async function buildIcons(watch?: boolean) {
  const args = watch ? '--watch' : '';
  await $`bun run build:icons ${args}`;
}

export async function buildJsxRuntime(watch?: boolean) {
  await build({
    ...sharedConfig,
    watch,
    clean: !watch,
    entry: ['src/jsx-dev-runtime.ts', 'src/jsx-runtime.ts'],
  });
}

export async function buildPackage(watch?: boolean) {
  await build({
    ...sharedConfig,
    watch,
    clean: false, // handles this above
    entry: [
      'src/**/*.ts',
      'src/**/*.tsx',
      '!src/jsx-runtime.ts',
      '!src/jsx-dev-runtime.ts',
    ],
  });
}

export async function buildTypes(watch?: boolean) {
  const args = watch ? '--watch' : '';
  await $`tsc -p ${rootOfRepo}/tsconfig.json ${args}`;
}
