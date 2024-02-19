import { $ } from 'bun';

export default {
  name: 'lint',
  description: '',
  run: async () => {
    await $`biome ci .`;
  },
};
