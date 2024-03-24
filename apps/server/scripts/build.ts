import path from 'node:path';

const serverDir = path.resolve(__dirname, '../');
const katcnDir = path.resolve(__dirname, '../../../packages/katcn');
const katcnDistDir = path.resolve(katcnDir, 'dist');

async function getDtsLibs() {
  const dtsLibs: typeof import('#dist/dtsLibs.json').default = [];

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

  return JSON.stringify(dtsLibs);
}

export async function init() {
  const dtsLibsTxt = await getDtsLibs();
  await Bun.write(`${serverDir}/dist/dtsLibs.json`, dtsLibsTxt);
}

await init();
