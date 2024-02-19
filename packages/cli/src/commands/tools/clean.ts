import { $ } from 'bun';

export default {
  name: 'clean',
  description: '🧹 Clean',
  run: async () => {
    await $`rm -rf .turbo && rm -rf dist && rm -rf node_modules && rm -rf .next`;
  },
};
