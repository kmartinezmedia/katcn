import { defineConfig } from 'tsup';
import { sharedConfig } from './tsup.config';

export default defineConfig(({ watch }) => ({
  ...sharedConfig,
  clean: !watch,
  entry: ['src/jsx-dev-runtime.ts', 'src/jsx-runtime.ts'],
}));
