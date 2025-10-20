import 'server-only';

import path from 'node:path';
import { fileURLToPath } from 'node:url';
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

  // Resolve virtual CSS path relative to this module's directory so
  // PostCSS resolves `@import "tailwindcss"` via the app's node_modules
  const moduleDir = path.dirname(fileURLToPath(import.meta.url));
  const virtualCssPath = path.join(moduleDir, '_virtual.css');

  const result = await postcss([tailwind()]).process(cssInput, {
    from: virtualCssPath,
    to: virtualCssPath,
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
