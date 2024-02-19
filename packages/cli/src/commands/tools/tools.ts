import { type Props, commandHelp, print } from 'bluebun';

export default {
  name: 'tools',
  description: '',
  run: async (props: Props) => {
    print(await commandHelp(props));
  },
};
