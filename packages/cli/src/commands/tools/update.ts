import { $ } from 'bun';

export default {
  name: 'update',
  description: '🧹 Update dependencies',
  run: async () => {
    await $`bunx npm-check-updates --root --format group -i -ws`;
  },
};
