import { defineConfig } from 'tsup';
import { sharedConfig } from './shared-config';

export default defineConfig(({ watch }) => {
  return {
    ...sharedConfig,
    watch,
    clean: false, // handles this above
    entry: [
      'src/**/*.ts',
      'src/**/*.tsx',
      '!src/jsx-runtime.ts',
      '!src/jsx-dev-runtime.ts',
    ],
  };
});
