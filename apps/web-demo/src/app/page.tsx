'use server';

import { promises as fs } from 'fs';
import { Editor } from '@/ui/Editor';

async function getDtsFiles(
  inputDir: string,
  dtsFiles: string[],
  scopeName: string,
) {
  return await Promise.all(
    dtsFiles.map(async (file) => {
      const content = await fs.readFile(`${inputDir}/${file}`, 'utf-8');
      return {
        content,
        filePath: `file:///node_modules/${scopeName}/${file}`,
      };
    }),
  );
}

export default async function Home() {
  const katDtsFiles = await fs.readdir('public/katcn/dist');
  const katPackageJson = await fs.readFile(
    'public/katcn/package.json',
    'utf-8',
  );

  const parsedKatDtsFiles = await getDtsFiles(
    'public/katcn/dist',
    katDtsFiles,
    'katcn',
  );

  const dtsLibs = [
    {
      content: katPackageJson,
      filePath: 'file:///node_modules/katcn/package.json',
    },
    ...parsedKatDtsFiles,
  ];

  // console.log('parsedKatDtsFiles', parsedKatDtsFiles);
  // console.log('katPackageJson', katPackageJson);

  return <Editor dtsLibs={dtsLibs} />;
}
