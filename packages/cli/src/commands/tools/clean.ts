import { $ } from 'bun';
import { rmSync } from 'node:fs';

export default {
  name: 'clean',
  description: '🧹 Clean',
  run: async () => {
    rmSync('dist', { recursive: true, force: true });
    await $`rm -rf .turbo && rm -rf node_modules && rm -rf .next`;
  },
};
