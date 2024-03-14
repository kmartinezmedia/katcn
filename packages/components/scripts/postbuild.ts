/// <reference types="bun-types" />

async function buildFixtures() {
  const data = await Bun.build({
    format: 'esm',
    target: 'node',
    entrypoints: ['src/fixtures.ts'],
    outdir: 'dist',
  });
  console.log(data);
}

// @ts-expect-error this is fine
await buildFixtures();
