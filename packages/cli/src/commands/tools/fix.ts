import { $ } from 'bun';
import { syncpackConfig } from './syncpack';

export default {
  name: 'fix',
  description: '🔧 Fix lint/formatter/package.json errors',
  run: async () => {
    await $`biome check --fix --unsafe .`;
    await $`biome format --fix .`;
    await $`bun syncpack format --config ${syncpackConfig}`;
    await $`bun syncpack fix-mismatches --config ${syncpackConfig}`;
  },
};
