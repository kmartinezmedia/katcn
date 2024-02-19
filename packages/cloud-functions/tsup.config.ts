import { defineConfig } from 'tsup';

// eslint-disable-next-line import/no-default-export
export default defineConfig(({ watch }) => {
  return {
    format: ['esm'],
    external: ['firebase-functions', 'firebase-admin'],
    dts: true,
    watch,
    minify: false,
    clean: true,
    entry: {
      index: 'src/index.ts',
    },
  };
});
