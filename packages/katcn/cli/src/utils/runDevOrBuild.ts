import path from 'node:path';
import { defaultTokensConfig } from '#tokens';
import type { KatcnConfig } from '#types';
import { transformProject } from '../utils/transformProject';
import { createTsMorphProject } from './createTsMorphProject';

export interface DevOrBuildProps {
  watch?: boolean;
  /** @default 'katcn.css' */
  output?: string;
  /** Glob of files to include when extracting CSS */
  include?: string;
  /** ID of config to use */
  id?: string;
  /** Path or url to config file in js, ts, or json format */
  config?: string;
}

export async function runDevOrBuild({
  watch = false,
  output = '.katcn/styles.css',
  include,
  // config: configPath,
}: DevOrBuildProps) {
  const project = createTsMorphProject({
    tsConfigFilePath: path.resolve(Bun.env.PWD, 'tsconfig.json'),
    skipAddingFilesFromTsConfig: false,
  });

  const config: KatcnConfig = defaultTokensConfig;

  /** TODO: add custom config support */
  // if (configPath) {
  //   if (configPath.startsWith('http')) {
  //     const response = await fetch(configPath);
  //     config = await response.json();
  //   } else {
  //     const config = await Bun.file(configPath).json();
  //   }
  // }

  if (include) {
    const itemsToInclude = include.trimStart().trimEnd().split(',');
    for (const item of itemsToInclude) {
      try {
        const depPath = require.resolve(item);
        const contents = await Bun.file(depPath).text();
        const projectFiles = project.getSourceFiles();
        const isNotInProject = !projectFiles.some(
          (file) => file.getFilePath() === depPath,
        );
        const isTypescriptFile =
          depPath.endsWith('.tsx') || depPath.endsWith('.ts');
        if (isNotInProject && isTypescriptFile) {
          project.createSourceFile(depPath.replace('js', 'tsx'), contents);
        }
      } catch (e) {
        console.error(`[katcn] Error including ${item}: ${e}`);
      }
    }
  }

  await transformProject({
    watch,
    output: path.resolve(Bun.env.PWD, output),
    project,
    pwd: Bun.env.PWD,
    config,
  });
}
