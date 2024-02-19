import { $ } from 'bun';

export default {
  name: 'typecheck',
  description: '🧹 Typecheck',
  run: async () => {
    await $`bun --bun tsc --noEmit`;
  },
};
