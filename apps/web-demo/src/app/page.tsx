'use server';

import { promises as fs, existsSync } from 'fs';
import { Editor } from '@/ui/Editor';
import { VStack } from 'katcn';

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

const katcnDistDir = 'pubdlic/katcn/dist';

export default async function Home() {
  if (existsSync(katcnDistDir)) {
    const katDtsFiles = await fs.readdir(katcnDistDir);
    const katPackageJson = await fs.readFile(
      'public/katcn/package.json',
      'utf-8',
    );

    const parsedKatDtsFiles = await getDtsFiles(
      katcnDistDir,
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

    // return <Editor dtsLibs={dtsLibs} />;

    return <VStack backgroundColor="accent">hi</VStack>;
  }
  return <VStack backgroundColor="accent">hi</VStack>;
}
