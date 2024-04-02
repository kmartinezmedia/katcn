import type { SourceFile } from 'ts-morph';
import { defaultTokensConfig } from '../../tokens';
import type { UniversalTokensConfig } from '../../types';
import { KatcnStyleSheet } from '../css/stylesheet';
import { transformTsx } from './transformTsx';

export interface TransformSourceFileOptions {
  config?: UniversalTokensConfig;
  sourceFile: SourceFile;
  removeImports?: boolean;
  disablePreflight?: boolean;
  stylesheet?: KatcnStyleSheet;
}

export type TransformedData = { css: string; js: string };

export function transformSourceFile({
  sourceFile,
  removeImports,
  stylesheet = new KatcnStyleSheet({
    config: defaultTokensConfig,
    disablePreflight: false,
  }),
}: TransformSourceFileOptions) {
  const filePath = sourceFile.getFilePath();
  const transformedTsx = transformTsx(sourceFile, { removeImports });
  const { classNamesToKeep, classNamesToAdd, varsToKeep, jsContent } =
    transformedTsx;
  stylesheet.classNamesToKeep.set(filePath, classNamesToKeep);
  stylesheet.classNamesToAdd.set(filePath, classNamesToAdd);
  for (const varToKeep of varsToKeep) {
    stylesheet.varsToKeep.add(varToKeep);
  }

  return {
    css: stylesheet.css,
    js: jsContent,
    classNamesToKeep: stylesheet.allClassNamesToKeep,
    classNamesToAdd: stylesheet.allClassNamesToAdd,
    varsToKeep: stylesheet.varsToKeep,
  };
}
