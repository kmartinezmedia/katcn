'use server';

import type { SafelistMap } from 'katcn/cli/types';
import { convertSafelistMapToTailwindCss } from 'katcn/cli/utils/convertSafelistMapToTailwindCss';
import { createTsMorphProject } from 'katcn/cli/utils/createTsMorphProject';
import { processSafelistForSourceFile } from 'katcn/cli/utils/processSafelistForSourceFile';
import { ts } from 'ts-morph';
import type { Playground } from '@/playground/types';

const project = createTsMorphProject({
  skipAddingFilesFromTsConfig: true,
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2015,
    jsx: ts.JsxEmit.ReactJSX,
  },
});

export async function transformCode({
  id,
  jsInput,
}: {
  id: string;
  jsInput: string;
}) {
  const sourceFile = project.createSourceFile(`${id}.tsx`, jsInput, {
    overwrite: true,
  });

  const safelistMap: SafelistMap = new Map();
  processSafelistForSourceFile({ safelistMap, sourceFile });
  const cssInput = await convertSafelistMapToTailwindCss(safelistMap);
  const cssOutput = await Bun.$`echo ${cssInput} | tailwindcss -i -`.text();
  // combine all css safelist values into a single string
  const cssValues = Array.from(safelistMap.values()).flatMap((item) => [
    ...item,
  ]);
  const cssSafelist = cssValues.join('\n');

  const sourceFileImports = sourceFile.getImportDeclarations();
  sourceFileImports.map((item) => item.remove());
  const jsOutput = sourceFile
    .getEmitOutput()
    .getOutputFiles()[0]
    .getText()
    .replaceAll('_a.jsx', 'jsx');

  const data: Playground = {
    id,
    cssInput,
    cssOutput,
    cssSafelist,
    jsInput,
    jsOutput,
  };

  return data;
}
