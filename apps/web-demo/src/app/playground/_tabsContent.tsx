import { $ } from 'bun';
import type { SafelistMap } from 'katcn/cli/types';
import { convertSafelistMapToTailwindCss } from 'katcn/cli/utils/convertSafelistMapToTailwindCss';
import { createTsMorphProject } from 'katcn/cli/utils/createTsMorphProject';
import { processSafelistForSourceFile } from 'katcn/cli/utils/processSafelistForSourceFile';

import { ts } from 'ts-morph';
import { Preview } from './_preview';
import type { PlaygroundTabID } from './_types';

type TabsContentProps = {
  activeTabId: PlaygroundTabID;
  id: string;
  jsInput: string;
};

export async function TabsContent({
  activeTabId,
  id,
  jsInput,
}: TabsContentProps) {
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

  if (
    activeTabId === 'css' ||
    activeTabId === 'css-tailwind' ||
    activeTabId === 'css-safelist' ||
    activeTabId === 'js'
  ) {
    const content = {
      css: cssOutput,
      'css-safelist': cssSafelist,
      'css-tailwind': cssOutput,
      js: jsOutput,
    }[activeTabId];

    return (
      <pre style={{ textWrap: 'pretty' }}>
        <code>{content}</code>
      </pre>
    );
  }

  if (activeTabId === 'preview') {
    return <Preview jsOutput={jsOutput} cssOutput={cssOutput} />;
  }
  return null;
}
