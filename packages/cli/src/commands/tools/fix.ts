import { $ } from 'bun';

export default {
  name: 'fix',
  description: '🔧 Fix lint/formatter errors',
  run: async () => {
    const { exitCode } = await $`biome check --fix --unsafe .`;
    if (exitCode) {
      console.error(`Fix failed in ${Bun.env.PWD}`);
      process.exit(1);
    }
    const { exitCode: formatExitCode } = await $`biome format --fix .`;
    if (formatExitCode) {
      console.error(`Fix failed in ${Bun.env.PWD}`);
      process.exit(1);
    }
  },
};
