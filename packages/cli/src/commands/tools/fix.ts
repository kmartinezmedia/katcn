import { $ } from 'bun';

export default {
  name: 'fix',
  description: '🔧 Fix lint/formatter errors',
  run: async () => {
    await $`biome check --apply .`;
    await $`biome format --write .`;
  },
};
