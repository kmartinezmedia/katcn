'use server';

import type { SafelistMap } from 'katcn/cli/types';
import { convertSafelistMapToTailwindCss } from 'katcn/cli/utils/convertSafelistMapToTailwindCss';
import { createTsMorphProject } from 'katcn/cli/utils/createTsMorphProject';
import { processSafelistForSourceFile } from 'katcn/cli/utils/processSafelistForSourceFile';
import tailwindCss from 'katcn/tailwindCss.json';
import * as tailwindcss from 'tailwindcss';
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

async function loadStylesheet(id: string, base: string) {
  function load() {
    console.log('loadStylesheet', id, base);
    if (id === 'tailwindcss') {
      return {
        path: 'virtual:tailwindcss/index.css',
        base,
        content: tailwindCss.index,
      };
    }
    if (
      id === 'tailwindcss/preflight' ||
      id === 'tailwindcss/preflight.css' ||
      id === './preflight.css'
    ) {
      return {
        path: 'virtual:tailwindcss/preflight.css',
        base,
        content: tailwindCss.preflight,
      };
    }
    if (
      id === 'tailwindcss/theme' ||
      id === 'tailwindcss/theme.css' ||
      id === './theme.css'
    ) {
      return {
        path: 'virtual:tailwindcss/theme.css',
        base,
        content: tailwindCss.theme,
      };
    }
    if (
      id === 'tailwindcss/utilities' ||
      id === 'tailwindcss/utilities.css' ||
      id === './utilities.css'
    ) {
      return {
        path: 'virtual:tailwindcss/utilities.css',
        base,
        content: tailwindCss.utilities,
      };
    }

    throw new Error(`The browser build does not support @import for "${id}"`);
  }
  return load();
}

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
  const cssValues = Array.from(safelistMap.values()).flatMap((item) => [
    ...item,
  ]);

  const cssSafelist = cssValues.join('\n');

  const compiler = await tailwindcss.compile(cssInput, {
    base: '/',
    loadStylesheet,
  });

  // const cssOutput = '';
  const cssOutput = compiler.build(cssValues);
  // combine all css safelist values into a single string
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
