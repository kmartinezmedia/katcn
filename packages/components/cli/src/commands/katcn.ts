import type { Props } from 'bluebun';
import { commandHelp, print } from 'bluebun';

export default {
  name: 'katcn',
  description: '',
  run: async (props: Props) => {
    switch (props?.first) {
      case 'css':
        return (await import('./css')).default.run(props);
      default: {
        await commandHelp(props);
        break;
      }
    }
  },
};
