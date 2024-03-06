'use client';
import { CodeEditor, type DtsLibs } from 'docgen';

const exampleCode = `
import { VStack, Text, Icon } from 'katcn';
import { getStyles } from 'katcn/getStyles';

export default function Example() {
  const customStyles = getStyles({
    borderWidth: 'thick',
    borderColor: 'warning',
    backgroundColor: 'accent-wash',
    elevation: '1',
  });

  return (
    <VStack backgroundColor="alert">
      <VStack width="1/2" backgroundColor="accent">
        <Text color="on-color" variant="display1" className={customStyles}>
          something
        </Text>
        <Icon name="addFile" size="lg" />
      </VStack>
    </VStack>
  )
 }
`;

export function Editor({ dtsLibs }: { dtsLibs: DtsLibs }) {
  return <CodeEditor userCode={exampleCode} dtsLibs={dtsLibs} />;
}
