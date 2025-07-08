import { commandHelp, type Props, print } from 'bluebun';

export default {
  name: 'tools',
  description: '',
  run: async (props: Props) => {
    print(await commandHelp(props));
  },
};
