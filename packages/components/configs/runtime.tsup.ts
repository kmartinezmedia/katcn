import { defineConfig } from 'tsup';
import { sharedConfig } from './shared-config';

export default defineConfig(({ watch }) => {
  return {
    ...sharedConfig,
    watch,
    clean: true,
    tsconfig: './runtime.tsconfig.json',
    entry: {
      'jsx-runtime': 'src/jsx-runtime.ts',
      'jsx-dev-runtime': 'src/jsx-dev-runtime.ts',
      getStyles: 'src/tailwind/getStyles.ts',
      types: 'src/types/index.ts',
    },
  };
});
