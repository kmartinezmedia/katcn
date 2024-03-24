async function buildFixtures() {
  await Bun.build({
    format: 'esm',
    target: 'node',
    entrypoints: ['src/fixtures.ts'],
    outdir: 'dist',
  });
}

await buildFixtures();

export type {};
