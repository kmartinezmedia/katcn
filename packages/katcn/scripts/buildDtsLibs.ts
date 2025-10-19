import path from 'node:path';
import katcnPackageJson from '../../../package.json';

const katcnDir = path.resolve(__dirname, '../');
const katcnDistDir = path.resolve(katcnDir, 'dist');

async function getDtsLibs() {
  const dtsLibs: { content: string; filePath: string }[] = [];
  const katPackageJson = await Bun.file(`${katcnDir}/package.json`).text();
  const reactTypesBaseUrl = `https://unpkg.com/@types/react@${katcnPackageJson.catalog['@types/react']}`;

  const reactTypesResp = await fetch(`${reactTypesBaseUrl}/index.d.ts`);
  dtsLibs.push({
    content: await reactTypesResp.text(),
    filePath: 'file:///node_modules/react/index.d.ts',
  });

  const reactJsxRuntime = await fetch(`${reactTypesBaseUrl}/jsx-runtime.d.ts`);
  dtsLibs.push({
    content: await reactJsxRuntime.text(),
    filePath: 'file:///node_modules/react/jsx-runtime.d.ts',
  });

  const reactJsxDevRuntime = await fetch(
    `${reactTypesBaseUrl}/jsx-dev-runtime.d.ts`,
  );
  dtsLibs.push({
    content: await reactJsxDevRuntime.text(),
    filePath: 'file:///node_modules/react/jsx-dev-runtime.d.ts',
  });

  dtsLibs.push({
    content: katPackageJson,
    filePath: 'file:///node_modules/katcn/package.json',
  });

  const katDtsFiles = new Bun.Glob('**/*.d.ts').scanSync({
    cwd: katcnDistDir,
    absolute: true,
  });

  for await (const file of katDtsFiles) {
    const content = await Bun.file(file).text();
    dtsLibs.push({
      content,
      filePath: `file:///node_modules/katcn/${path.relative(
        katcnDistDir,
        file.replace('components.d.ts', 'index.d.ts'),
      )}`,
    });
  }

  const katcnTypes = require.resolve('@katcn/types');
  const katcnTypesContent = await Bun.file(katcnTypes).text();
  dtsLibs.push({
    content: katcnTypesContent,
    filePath: 'file:///node_modules/@katcn/types/index.d.ts',
  });

  return JSON.stringify(dtsLibs);
}

export async function init() {
  const dtsLibsTxt = await getDtsLibs();
  await Bun.write(`${katcnDistDir}/dtsLibs.json`, dtsLibsTxt);
}

await init();
