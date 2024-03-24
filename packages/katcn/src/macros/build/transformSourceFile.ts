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
  removeImports?: boolean;
  includePreflightCss?: boolean;
}

export type TransformedData = { css: string; js: string };

export function transformSourceFile({
  config = defaultTokensConfig,
  sourceFile,
  outFile,
  removeImports,
  includePreflightCss,
}: TransformSourceFileOptions) {
  const registry = new CssRegistry();
  const filePath = sourceFile.getFilePath();

  const transformedTsx = transformTsx(sourceFile, { removeImports });

  const { classNamesToKeep, varsToKeep, jsContent } = transformedTsx;

  registry.updateRegistry({ filePath, classNamesToKeep, varsToKeep });

  const fileHasCss = classNamesToKeep.size > 0 || varsToKeep.size > 0;

  if (fileHasCss) {
    const cssContent = transformCss({
      config: config,
      classNamesToKeep: registry.allClassNamesToKeep,
      varsToKeep: registry.allVarsToKeep,
      includePreflight: includePreflightCss,
    });

    if (outFile) {
      Bun.write(outFile, cssContent);
    }

    return { css: cssContent, js: jsContent };
  }
  return { css: '', js: jsContent };
}
