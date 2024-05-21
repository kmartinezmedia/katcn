import path from 'node:path';
import type { Props } from 'bluebun';
import { createTsMorphProject } from '../utils/createTsMorphProject';
import { transformProject } from '../utils/transformProject';

interface CssProps extends Props {
  options: {
    watch?: boolean;
    /** @default '.katcn' */
    outDir?: string;
    /** Glob of files to include when extracting CSS */
    include?: string;
    /** ID of config to use */
    id?: string;
  };
}

export default {
  name: 'css',
  description: '',
  run: async (props: CssProps) => {
    const {
      watch = false,
      outDir = path.resolve(Bun.env.PWD, '.katcn'),
      include,
    } = props.options;

    const project = createTsMorphProject({
      tsConfigFilePath: path.resolve(Bun.env.PWD, 'tsconfig.json'),
      skipAddingFilesFromTsConfig: false,
    });

    if (include) {
      const itemsToInclude = include.trimStart().trimEnd().split(',');
      for (const item of itemsToInclude) {
        try {
          const depPath = require.resolve(item);
          const contents = await Bun.file(depPath).text();
          project.createSourceFile(depPath.replace('js', 'tsx'), contents);
        } catch (e) {}
      }
    }

    await transformProject({
      watch,
      outDir,
      project,
      pwd: Bun.env.PWD,
    });
  },
};
