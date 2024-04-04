import { $ } from 'bun';

export default {
  name: 'lint',
  description: '🧹 Lint',
  run: async () => {
    const { exitCode } = await $`biome ci . --error-on-warnings`;
    if (exitCode === 1) {
      console.error(`Lint failed in ${Bun.env.PWD}`);
      process.exit(1);
    }
  },
};
