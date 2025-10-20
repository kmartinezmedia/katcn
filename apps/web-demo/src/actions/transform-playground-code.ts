import 'server-only';

import tailwind from '@tailwindcss/postcss';
import type { SafelistMap } from 'katcn/cli/types';
import { convertSafelistMapToTailwindCss } from 'katcn/cli/utils/convertSafelistMapToTailwindCss';
import { createTsMorphProject } from 'katcn/cli/utils/createTsMorphProject';
import { processSafelistForSourceFile } from 'katcn/cli/utils/processSafelistForSourceFile';
import postcss from 'postcss';
import { ts } from 'ts-morph';

type TransformPlaygroundCodeProps = {
  jsInput: string;
  id: string;
};

export async function transformPlaygroundCode({
  id,
  jsInput,
}: TransformPlaygroundCodeProps) {
  const project = createTsMorphProject({
    skipAddingFilesFromTsConfig: true,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2015,
      jsx: ts.JsxEmit.ReactJSX,
    },
  });

  const sourceFile = project.createSourceFile(`${id}.tsx`, jsInput, {
    overwrite: true,
  });

  const safelistMap: SafelistMap = new Map();
  processSafelistForSourceFile({ safelistMap, sourceFile });
  const cssInput = await convertSafelistMapToTailwindCss(safelistMap);

  const result = await postcss([tailwind()]).process(cssInput, {
    from: undefined,
  });
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

  return {
    cssInput,
    cssOutput: result.css,
    cssSafelist,
    jsOutput,
  };
}
