import { defineConfig } from 'tsup';
import { sharedConfig } from './tsup.config';

export default defineConfig({
  ...sharedConfig,
  clean: true,
  entry: ['src/jsx-dev-runtime.ts', 'src/jsx-runtime.ts'],
});
