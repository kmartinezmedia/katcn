import type { Project } from 'ts-morph';
import type { UniversalTokensConfig } from '../../types';
import { defaultTokensConfig } from '../../tokens';
import {
  type OnSourceFileChange,
  transformWatchers,
} from './transformWatchers';
import {
  type TransformedData,
  transformSourceFile,
} from './transformSourceFile';

interface TransformOptions {
  config?: UniversalTokensConfig;
  project: Project;
  outFile?: string;
  watch?: boolean;
}

export async function transformProject({
  config = defaultTokensConfig,
  project,
  outFile,
  watch: shouldWatch = false,
}: TransformOptions) {
  const sourceFiles = project.getSourceFiles();
  const transformedData: TransformedData[] = [];

  const onChange: OnSourceFileChange = (sFile) =>
    transformSourceFile({ sourceFile: sFile });

  if (shouldWatch) {
    transformWatchers({ project, onChange });
  }

  for await (const sourceFile of sourceFiles) {
    const data = await transformSourceFile({ sourceFile, config, outFile });
    transformedData.push(data);
  }

  return transformedData;
}
