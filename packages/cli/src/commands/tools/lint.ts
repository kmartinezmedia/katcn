import { $ } from 'bun';

export default {
  name: 'lint',
  description: '🧹 Lint',
  run: async () => {
    await $`biome ci .`;
  },
};
