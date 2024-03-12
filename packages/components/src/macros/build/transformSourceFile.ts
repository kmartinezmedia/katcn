import type { SourceFile } from 'ts-morph';
import { defaultTokensConfig } from '../../tokens';
import type { UniversalTokensConfig } from '../../types';
import { CssRegistry } from './cssRegistry';
import { transformCss } from './transformCss';
import { transformTsx } from './transformTsx';

export interface TransformSourceFileOptions {
  config?: UniversalTokensConfig;
  sourceFile: SourceFile;
  outFile?: string;
}

export type TransformedData = { css: string; js: string };

export async function transformSourceFile({
  config = defaultTokensConfig,
  sourceFile,
  outFile,
}: TransformSourceFileOptions) {
  const registry = new CssRegistry();
  const filePath = sourceFile.getFilePath();

  const transformedTsx = transformTsx(sourceFile);

  const { classNamesToKeep, varsToKeep, jsContent } = transformedTsx;

  registry.updateRegistry({ filePath, classNamesToKeep, varsToKeep });

  const fileHasCss = classNamesToKeep.size > 0 || varsToKeep.size > 0;

  if (fileHasCss) {
    const cssContent = await transformCss({
      config: config,
      classNamesToKeep: registry.allClassNamesToKeep,
      varsToKeep: registry.allVarsToKeep,
    });

    if (outFile) {
      await Bun.write(outFile, cssContent);
    }

    return { css: cssContent, js: jsContent };
  }

  return { css: '', js: jsContent };
}
