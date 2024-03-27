import { rmSync } from 'node:fs';

export default {
  name: 'clean',
  description: '🧹 Clean',
  run: async () => {
    rmSync('dist', { recursive: true, force: true });
    rmSync('.turbo', { recursive: true, force: true });
    rmSync('.next', { recursive: true, force: true });
    rmSync('.katcn', { recursive: true, force: true });
    rmSync('.docgen', { recursive: true, force: true });
    rmSync('node_modules', { recursive: true, force: true });
  },
};
