import { watch as fsWatch } from 'node:fs';
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
  console.log('[typescript]: building types...');
  const _build = async () => {
    await $`tsc -p ${rootOfRepo}/tsconfig.json`;
  };

  if (watch) {
    console.log('[typescript]: watching for changes...');
    const watcher = fsWatch(
      `${rootOfRepo}/src`,
      { recursive: true },
      async (event, filename) => {
        console.log(`typescript: detected ${event} in ${filename}`);
        await _build();
      },
    );

    process.on('SIGINT', () => {
      // close watcher when Ctrl-C is pressed
      console.log('[typescript]: closing watcher...');
      watcher.close();
      process.exit(0);
    });
  } else {
    await _build();
  }
}
