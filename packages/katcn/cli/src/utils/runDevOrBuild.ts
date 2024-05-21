import path from 'node:path';
import { transformProject } from '../utils/transformProject';
import { createTsMorphProject } from './createTsMorphProject';

export interface DevOrBuildProps {
  watch?: boolean;
  /** @default '.katcn' */
  outDir?: string;
  /** Glob of files to include when extracting CSS */
  include?: string;
  /** ID of config to use */
  id?: string;
}

export async function runDevOrBuild({
  watch = false,
  outDir = path.resolve(Bun.env.PWD, '.katcn'),
  include,
}: DevOrBuildProps) {
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
}
