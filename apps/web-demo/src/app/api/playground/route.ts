import { $ } from 'bun';
import type { SafelistMap } from 'katcn/cli/types';
import { convertSafelistMapToTailwindCss } from 'katcn/cli/utils/convertSafelistMapToTailwindCss';
import { createTsMorphProject } from 'katcn/cli/utils/createTsMorphProject';
import { processSafelistForSourceFile } from 'katcn/cli/utils/processSafelistForSourceFile';
import { NextResponse } from 'next/server';
import { ts } from 'ts-morph';
import { db } from '@/lib/firebase/firebase-admin';

const project = createTsMorphProject({
  skipAddingFilesFromTsConfig: true,
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2015,
    jsx: ts.JsxEmit.ReactJSX,
  },
});

async function transformJs({ id, jsInput }: { id: string; jsInput: string }) {
  const sourceFile = project.createSourceFile(`${id}.tsx`, jsInput, {
    overwrite: true,
  });

  const safelistMap: SafelistMap = new Map();
  processSafelistForSourceFile({ safelistMap, sourceFile });
  const cssInput = await convertSafelistMapToTailwindCss(safelistMap);
  const cssOutput = await $`echo ${cssInput} | tailwindcss -i -`.text();
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

export async function PUT(request: Request) {
  const formData = await request.formData();
  const id = formData.get('id') as string;
  const jsInput = formData.get('jsInput') as string;
  const { cssInput, cssOutput, cssSafelist, jsOutput } = await transformJs({
    id,
    jsInput,
  });

  await db.doc(`playgrounds/${id}`).update({
    jsInput,
    cssInput,
    cssOutput,
    cssSafelist,
    jsOutput,
  });

  return NextResponse.json({ message: 'Playground updated' });
}

export async function POST(request: Request) {
  const id = crypto.randomUUID();
  const { jsInput } = await request.json();
  const { cssInput, cssOutput, cssSafelist, jsOutput } = await transformJs({
    id,
    jsInput,
  });

  await db.doc(`playgrounds/${id}`).set({
    jsInput,
    cssInput,
    cssOutput,
    cssSafelist,
    jsOutput,
  });

  return NextResponse.json({ id });
}
