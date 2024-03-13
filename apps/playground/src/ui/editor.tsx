'use client';
import { CodeEditor, type DtsLibs, type OnChange } from 'docgen';
import { VStack } from 'katcn';
import { EditorPreview } from './preview';

const exampleCode = `
import { VStack, Text, Icon, getStyles } from 'katcn';

function Example() {
  const customStyles = getStyles({
    borderWidth: 'thick',
    borderColor: 'warning',
    backgroundColor: 'accent'
  });

  return (
    <VStack backgroundColor="alert">
      <VStack width="half" backgroundColor="accent">
        <Text color="on-color" variant="display1" className={customStyles}>
          something
        </Text>
        <Icon name="addFile" size="lg" />
      </VStack>
    </VStack>
  )
 }
`;

export function Editor({
  dtsLibs,
  onChange,
}: { dtsLibs: DtsLibs; onChange?: OnChange }) {
  return (
    <VStack height="100vh" color="primary">
      <CodeEditor
        userCode={exampleCode}
        dtsLibs={dtsLibs}
        onChange={onChange}
        Preview={EditorPreview}
      />
    </VStack>
  );
}
