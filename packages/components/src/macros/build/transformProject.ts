import type { Project, SourceFile } from 'ts-morph';
import { defaultTokensConfig } from '../../tokens';
import type { UniversalTokensConfig } from '../../types';
import {
  type OnSourceFileChange,
  transformWatchers,
} from './transformWatchers';
import { transformCss } from './transformCss';
import { transformTsx } from './transformTsx';
import { CssRegistry } from './cssRegistry';

interface TransformOptions {
  config?: UniversalTokensConfig;
  project: Project;
  outFile?: string;
  watch?: boolean;
}
async function processFile({
  sourceFile,
  registry,
}: { sourceFile: SourceFile; registry: CssRegistry }) {
  const filePath = sourceFile.getFilePath();
  const transformedTsx = transformTsx(sourceFile);
  const { classNamesToKeep, varsToKeep, jsContent } = transformedTsx;
  registry.updateRegistry({ filePath, classNamesToKeep, varsToKeep });
  return transformedTsx;
}

export async function transformProject({
  config = defaultTokensConfig,
  project,
  outFile,
  watch: shouldWatch = false,
}: TransformOptions) {
  const registry = new CssRegistry();
  const sourceFiles = project.getSourceFiles();

  const onChange: OnSourceFileChange = (sFile) =>
    processFile({ sourceFile: sFile, registry });

  if (shouldWatch) {
    transformWatchers({ project, onChange });
  }

  for await (const sourceFile of sourceFiles) {
    await processFile({ sourceFile, registry });
  }

  const fileHasCss =
    registry.allClassNamesToKeep.size > 0 || registry.allVarsToKeep.size > 0;

  if (fileHasCss) {
    const cssContent = await transformCss({
      config: config,
      classNamesToKeep: registry.allClassNamesToKeep,
      varsToKeep: registry.allVarsToKeep,
    });

    if (outFile) {
      await Bun.write(outFile, cssContent);
    }
  }
}
