import { $ } from 'bun';

export default {
  name: 'fix',
  description: '',
  run: async () => {
    await $`biome check --apply .`;
    await $`biome format --write .`;
  },
};
