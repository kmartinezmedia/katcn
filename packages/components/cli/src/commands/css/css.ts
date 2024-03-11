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
    await Bun.write(
      `${Bun.env.PWD}/.katcn/types/css.d.ts`,
      `declare module '#katcn/*.css' {}`,
    );
    const cssRegistry = new CssPurger({ watch: props.options.watch });
    await cssRegistry.processFiles();
  },
};
