import type { Props } from 'bluebun';
import { transform } from '#macros';
import path from 'node:path';

interface CssProps extends Props {
  options: {
    watch?: boolean;
    /** @default '.katcn/styles.css' */
    outFile?: string;
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
    await transform({
      watch: !!props.options.watch,
      outFile:
        props.options.outFile ?? path.resolve(Bun.env.PWD, '.katcn/styles.css'),
      tsmorphOptions: {
        tsConfigFilePath: path.resolve(Bun.env.PWD, 'tsconfig.json'),
      },
    });
  },
};
