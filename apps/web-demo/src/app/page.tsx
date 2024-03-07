'use server';
import { HStack, Icon, Text, VStack } from 'katcn';

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
  const typesDtsFiles = await fs.readdir('public/@types');
  const katPackageJson = await fs.readFile(
    'public/katcn/package.json',
    'utf-8',
  );

  const parsedKatDtsFiles = await getDtsFiles(
    'public/katcn/dist',
    katDtsFiles,
    'katcn',
  );
  const parsedTypesDtsFiles = await getDtsFiles(
    'public/@types',
    typesDtsFiles,
    '@types',
  );

  return (
    <HStack>
      <Editor
        dtsLibs={[
          {
            content: katPackageJson,
            filePath: 'file:///node_modules/katcn/package.json',
          },
          ...parsedTypesDtsFiles,
          ...parsedKatDtsFiles,
        ]}
      />
      <VStack backgroundColor="alert">
        <VStack width="1/2" backgroundColor="accent">
          <Text color="on-color" variant="display1">
            something
          </Text>
          <Icon name="addFile" size="lg" />
        </VStack>
      </VStack>
    </HStack>
  );
}
