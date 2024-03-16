/// <reference types="bun-types" />

async function buildFixtures() {
  await Bun.build({
    format: 'esm',
    target: 'node',
    entrypoints: ['src/fixtures.ts'],
    outdir: 'dist',
  });
}

// @ts-expect-error this is fine
await buildFixtures();
