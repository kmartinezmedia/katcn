import type { Props } from 'bluebun';
import { createTsMorphProject, transformProject } from 'katcn/macros';
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
    await transformProject({
      watch: !!props.options.watch,
      outFile:
        props.options.outFile ?? path.resolve(Bun.env.PWD, '.katcn/styles.css'),
      project: createTsMorphProject({
        tsConfigFilePath: path.resolve(Bun.env.PWD, 'tsconfig.json'),
        skipAddingFilesFromTsConfig: false,
      }),
    });
  },
};
