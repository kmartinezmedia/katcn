import type { Props } from 'bluebun';
import { $ } from 'bun';

export const syncpackConfig = `${import.meta.dirname}/.syncpackrc`;

export default {
  name: 'syncpack',
  description: '🧹 Syncpack',
  run: async (props: Props) => {
    await $`syncpack ${props.first} --config ${syncpackConfig} ${props.argv}`;
  },
};
