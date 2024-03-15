/// <reference types="bun-types" />
import path from 'node:path';
import { Project, type SourceFile } from 'ts-morph';

const serverDir = path.resolve(__dirname, '../');
const katcnDir = path.resolve(__dirname, '../../../packages/katcn');
const katcnDistDir = path.resolve(katcnDir, 'dist');

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

async function getDtsLibs() {
  const dtsLibs: {
    content: string;
    filePath: string;
  }[] = [];

  const katPackageJson = await Bun.file(`${katcnDir}/package.json`).text();
  const reactTypesResp = await fetch(
    'https://unpkg.com/@types/react@18.2.0/index.d.ts',
  );

  dtsLibs.push({
    content: await reactTypesResp.text(),
    filePath: 'file:///node_modules/react/index.d.ts',
  });

  dtsLibs.push({
    content: katPackageJson,
    filePath: 'file:///node_modules/katcn/package.json',
  });

  const katDtsFiles = new Bun.Glob('*.d.ts').scanSync({
    cwd: katcnDistDir,
    absolute: true,
  });

  for await (const file of katDtsFiles) {
    const content = await Bun.file(file).text();
    dtsLibs.push({
      content,
      filePath: `file:///node_modules/katcn/${path.relative(
        katcnDistDir,
        file,
      )}`,
    });
  }

  return `export const dtsLibs = ${JSON.stringify(dtsLibs)};`;
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
    macro: {
      katcn: {
        getStyles: 'katcn/getStyles',
      },
    },
    autoImportJSX: true,
  });

  const codeAsString: string[] = [];
  const dtsLibsTxt = await getDtsLibs();
  await Bun.write(`${serverDir}/src/fixtures/dtsLibs.ts`, dtsLibsTxt);

  const components = new Bun.Glob('**/*.tsx').scanSync({
    cwd: `${katcnDir}/src`,
    absolute: true,
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

  for (const file of components) {
    const componentCode = await Bun.file(file).text();
    const newCode = transpiler.transformSync(componentCode);
    codeAsString.push(newCode);
  }

  const defaultTokensConfigTxt = await Bun.file(
    `${katcnDir}/dist/tokens.js`,
  ).text();
  codeAsString.push(transpiler.transformSync(defaultTokensConfigTxt));

  outputCode = codeAsString.join('\n');

  const sourceFile = project.createSourceFile('code-temp.tsx', outputCode, {
    overwrite: true,
  });

  outputCode = cleanSourceFile(sourceFile);
  await Bun.write(`${serverDir}/dist/init.js`, outputCode);
}

// copy icon font to dist
const iconFont = Bun.file(`${katcnDir}/src/icons/fonts/icons.woff2`);
await Bun.write(`${serverDir}/dist/icons.woff2`, iconFont);

await init();
