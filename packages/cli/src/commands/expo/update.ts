import { $ } from 'bun';

import type { MobileProps } from './_setup';
import { setup } from './_setup';

export default {
  name: 'update',
  description: '🚀 Update',
  run: async (props: MobileProps) => {
    const { channel } = await setup({
      props,
    });

    await $`eas update --auto --channel ${channel}`;
    await $`rm -rf dist`;
  },
};
