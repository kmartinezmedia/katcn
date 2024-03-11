import type { Props } from 'bluebun';
import { CssPurger } from './_cssPurger';

interface CssProps extends Props {
  options: {
    watch?: boolean;
  };
}

export default {
  name: 'css',
  description: '',
  run: async (props: CssProps) => {
    const cssRegistry = new CssPurger({ watch: props.options.watch });
    await cssRegistry.processFiles();
  },
};
