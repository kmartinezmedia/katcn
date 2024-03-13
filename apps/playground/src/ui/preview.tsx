'use server';

import { VStack, Text } from 'katcn';
import { createTsMorphProject, transformSourceFile } from 'katcn/macros';

interface EditorPreviewProps {
  code?: string;
}

const project = createTsMorphProject({
  skipAddingFilesFromTsConfig: false,
});

export async function EditorPreview({ code }: EditorPreviewProps) {
  if (!code) {
    return (
      <VStack width="half" height="100vh">
        <Text variant="display1" color="primary">
          Loading...
        </Text>
      </VStack>
    );
  }

  const sourceFile = project.createSourceFile('editor-preview.tsx', code, {
    overwrite: true,
  });

  const data = await transformSourceFile({
    sourceFile,
  });

  return (
    <VStack width="half" height="100vh">
      <Text variant="display1" color="primary">
        {`${data.css}`}
      </Text>
    </VStack>
  );
}
