import path from 'node:path';
import { Project, type SourceFile } from 'ts-morph';

const playgroundDir = path.resolve(__dirname, '../');
const katcnDir = path.resolve(__dirname, '../../../packages/components');
const docgenDist = path.resolve(__dirname, '../../../packages/docgen/dist');

function cleanSourceFile(sourceFile: SourceFile) {
  const sourceImports = sourceFile.getImportDeclarations();
  const sourceExports = sourceFile.getExportDeclarations();
  const importsSet = new Set<string>();

  for (const sourceImport of sourceImports) {
    const moduleSpecifierValue = sourceImport.getModuleSpecifierValue();

    if (
      !moduleSpecifierValue.startsWith('.') &&
      !moduleSpecifierValue.startsWith('katcn')
    ) {
      const newImport = sourceImport
        .getText()
        .replaceAll(
          `"${moduleSpecifierValue}"`,
          `"https://esm.sh/${moduleSpecifierValue}"`,
        );
      importsSet.add(newImport);
    }
    sourceImport.remove();
  }

  for (const sExport of sourceExports) {
    sExport.remove();
  }

  const cleanedImports = Array.from(importsSet).join('\n');
  const body = sourceFile.getFullText();
  const finalImports = cleanedImports.replace(
    'import {forwardRef} from "https://esm.sh/react";',
    '',
  );

  return [finalImports, body].join('\n');
}

export async function init() {
  const project = new Project({ skipAddingFilesFromTsConfig: true });
  const transpiler = new Bun.Transpiler({
    loader: 'tsx',
    tsconfig: {
      compilerOptions: {
        jsx: 'react-jsx',
        jsxImportSource: 'katcn',
      },
    },
    autoImportJSX: true,
  });

  const codeAsString: string[] = [];
  const components = new Bun.Glob('**/*.tsx').scanSync({
    cwd: `${katcnDir}/src`,
  });
  let outputCode = '';

  if (Bun.env.NODE_ENV === 'development') {
    const jsxRuntimeCode = await Bun.file(
      `${katcnDir}/dist/jsx-runtime.js`,
    ).text();
    codeAsString.push(jsxRuntimeCode);
  } else {
    const jsxRuntimeCode = await Bun.file(
      `${katcnDir}/dist/jsx-runtime.js`,
    ).text();
    codeAsString.push(jsxRuntimeCode);
  }

  for (const component of components) {
    const componentPath = `${katcnDir}/src/${component}`;
    const componentCode = await Bun.file(componentPath).text();
    const newCode = transpiler.transformSync(componentCode);
    codeAsString.push(newCode);
  }

  const defaultTokensConfigTxt = await Bun.file(
    `${katcnDir}/dist/tokens.js`,
  ).text();
  // codeAsString.push('// ./tokens/index.ts \n');
  codeAsString.push(transpiler.transformSync(defaultTokensConfigTxt));

  const editorCode = await Bun.file(`${docgenDist}/index.js`).text();
  codeAsString.push(editorCode);

  outputCode = codeAsString.join('\n');

  const sourceFile = project.createSourceFile('code-temp.tsx', outputCode, {
    overwrite: true,
  });

  outputCode = cleanSourceFile(sourceFile);

  await Bun.write(`${playgroundDir}/src/static/init.js`, outputCode);
  const katcnCss = await Bun.file(`${katcnDir}/dist/index.css`).text();
  await Bun.write(`${playgroundDir}/src/static/katcn.css`, katcnCss);
}

await init();
