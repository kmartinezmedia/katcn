import type { Props } from 'bluebun';
import { commandHelp, print } from 'bluebun';

export default {
  name: 'CLI',
  description: '',
  run: async (props: Props) => {
    print(await commandHelp(props));
  },
};
