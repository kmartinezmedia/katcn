import type { Project, SourceFile } from 'ts-morph';
import { defaultTokensConfig } from '../../tokens';
import type { UniversalTokensConfig } from '../../types';
import { CssRegistry } from './cssRegistry';
import { transformCss } from './transformCss';
import { transformTsx } from './transformTsx';
import {
  type OnSourceFileChange,
  transformWatchers,
} from './transformWatchers';

interface TransformOptions {
  config?: UniversalTokensConfig;
  project: Project;
  outFile?: string;
  watch?: boolean;
}
function processFile({
  sourceFile,
  registry,
}: { sourceFile: SourceFile; registry: CssRegistry }) {
  const filePath = sourceFile.getFilePath();
  const transformedTsx = transformTsx(sourceFile);
  const { classNamesToKeep, varsToKeep, jsContent } = transformedTsx;
  registry.updateRegistry({ filePath, classNamesToKeep, varsToKeep });
  return transformedTsx;
}

async function transform({
  config,
  registry,
  outFile,
}: {
  registry: CssRegistry;
  config: UniversalTokensConfig;
  outFile?: string;
}) {
  const fileHasCss =
    registry.allClassNamesToKeep.size > 0 || registry.allVarsToKeep.size > 0;
  if (fileHasCss) {
    const cssContent = transformCss({
      config: config,
      classNamesToKeep: registry.allClassNamesToKeep,
      varsToKeep: registry.allVarsToKeep,
    });

    if (outFile) {
      await Bun.write(outFile, cssContent);
    }
  }
}

export async function transformProject({
  config = defaultTokensConfig,
  project,
  outFile,
  watch: shouldWatch = false,
}: TransformOptions) {
  const registry = new CssRegistry();
  const sourceFiles = project.getSourceFiles();

  const onChange: OnSourceFileChange = async (sFile) => {
    processFile({ sourceFile: sFile, registry });
    await transform({ config, registry, outFile });
  };

  if (shouldWatch) {
    transformWatchers({ project, onChange });
  }

  for (const sourceFile of sourceFiles) {
    processFile({ sourceFile, registry });
  }

  await transform({ config, registry, outFile });
}
