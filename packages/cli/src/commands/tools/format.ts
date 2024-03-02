import { Props } from 'bluebun';
import { $ } from 'bun';

export default {
  name: 'format',
  description: '🧹 Format',
  run: async (props: Props) => {
    await $`biome format ${props.arguments ? props.arguments[0] : '.'} --write`;
  },
};
