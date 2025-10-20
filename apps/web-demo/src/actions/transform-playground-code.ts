import 'server-only';

import path from 'node:path';
import { execa } from 'execa';
import type { SafelistMap } from 'katcn/cli/types';
import { convertSafelistMapToTailwindCss } from 'katcn/cli/utils/convertSafelistMapToTailwindCss';
import { createTsMorphProject } from 'katcn/cli/utils/createTsMorphProject';
import { processSafelistForSourceFile } from 'katcn/cli/utils/processSafelistForSourceFile';
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

  const tailwindcssBin = path.resolve(
    process.cwd(),
    'node_modules/.bin/tailwindcss',
  );

  const { stdout: cssOutput } = await execa(tailwindcssBin, ['-i', '-'], {
    input: cssInput,
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
    cssOutput,
    cssSafelist,
    jsOutput,
  };
}
