'use server';

import type { SafelistMap } from 'katcn/cli/types';
import { convertSafelistMapToCss } from 'katcn/cli/utils/convertSafelistMapToCss';
import { createTsMorphProject } from 'katcn/cli/utils/createTsMorphProject';
import { processSafelistForSourceFile } from 'katcn/cli/utils/processSafelistForSourceFile';
import { ts } from 'ts-morph';

const project = createTsMorphProject({
  skipAddingFilesFromTsConfig: true,
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2015,
    jsx: ts.JsxEmit.ReactJSX,
  },
});

export async function transformCode(id: string, code: string) {
  const sourceFile = project.createSourceFile(`${id}.tsx`, code, {
    overwrite: true,
  });

  const safelistMap: SafelistMap = new Map();
  processSafelistForSourceFile({ safelistMap, sourceFile });
  const css = await convertSafelistMapToCss(safelistMap);
  // combine all css safelist values into a single string
  const cssValues = Array.from(safelistMap.values()).flatMap((item) => [
    ...item,
  ]);
  const cssSafelistString = cssValues.join('\n');

  const sourceFileImports = sourceFile.getImportDeclarations();
  sourceFileImports.map((item) => item.remove());
  const js = sourceFile
    .getEmitOutput()
    .getOutputFiles()[0]
    .getText()
    .replaceAll('_a.jsx', 'jsx');

  return { css, cssSafelist: cssSafelistString, js };
}
