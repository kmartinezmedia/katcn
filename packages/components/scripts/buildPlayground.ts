/// <reference types="bun-types" />
import path from 'node:path';
import { Project } from 'ts-morph';

export async function buildPlayground() {
  const transpiler = new Bun.Transpiler({
    loader: 'tsx',
    define: { 'process.env.NODE_ENV': '"production"' },
    tsconfig: {
      compilerOptions: {
        jsx: 'react-jsx',
        jsxImportSource: 'katcn',
      },
    },
    autoImportJSX: false,
    jsxOptimizationInline: true,
  });

  const project = new Project({
    tsConfigFilePath: path.resolve(__dirname, '../tsconfig.json'),
    skipAddingFilesFromTsConfig: true,
  });

  const srcDir = path.resolve(__dirname, '../src');
  const distDir = path.resolve(__dirname, '../dist');

  const codeAsString: string[] = [];
  const components = new Bun.Glob('**/*.tsx').scanSync({ cwd: srcDir });
  let outputCode = '';

  const jsxRuntimeCode = await Bun.file(`${distDir}/jsx-dev-runtime.js`).text();
  codeAsString.push(jsxRuntimeCode);

  for (const component of components) {
    const componentPath = `${srcDir}/${component}`;
    const componentCode = await Bun.file(componentPath).text();
    // const sourceFile = project.addSourceFileAtPath(componentPath)
    const newCode = transpiler.transformSync(componentCode);
    codeAsString.push(`// ./ui/${component} \n`);
    codeAsString.push(newCode);
  }

  const defaultTokensConfigTxt = await Bun.file(`${distDir}/tokens.js`).text();
  codeAsString.push('// ./tokens/index.ts \n');
  codeAsString.push(transpiler.transformSync(defaultTokensConfigTxt));

  outputCode = codeAsString.join('\n');

  const sourceFile = project.createSourceFile('code-temp.tsx', outputCode, {
    overwrite: true,
  });

  const sourceImports = sourceFile.getImportDeclarations();
  const sourceExports = sourceFile.getExportDeclarations();

  for (const sourceImport of sourceImports) {
    sourceImport.remove();
  }

  for (const sExport of sourceExports) {
    sExport.remove();
  }

  outputCode = sourceFile.getFullText();

  await Bun.write(`${distDir}/playground.js`, outputCode);
}
