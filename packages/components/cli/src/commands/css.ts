import path from 'node:path';
import type { Props } from 'bluebun';
import { createTsMorphProject, transformProject } from 'katcn/macros';
import { ts } from 'ts-morph';

interface CssProps extends Props {
  options: {
    watch?: boolean;
    /** @default '.katcn/styles.css' */
    outFile?: string;
    /** Glob of files to include when extracting CSS */
    include?: string;
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
    const project = createTsMorphProject({
      tsConfigFilePath: path.resolve(Bun.env.PWD, 'tsconfig.json'),
      skipAddingFilesFromTsConfig: false,
    });

    if (props.options.include) {
      const itemsToInclude = props.options.include
        .trimStart()
        .trimEnd()
        .split(',');
      for (const item of itemsToInclude) {
        try {
          const depPath = require.resolve(item);
          const contents = await Bun.file(depPath).text();
          project.createSourceFile(depPath.replace('js', 'tsx'), contents);
        } catch (e) {}
      }
    }

    await transformProject({
      watch: !!props.options.watch,
      outFile:
        props.options.outFile ?? path.resolve(Bun.env.PWD, '.katcn/styles.css'),
      project,
    });
  },
};
