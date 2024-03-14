'use server';

import { CodeEditor } from 'docgen';

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

const serverUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4001'
    : 'http://167.71.186.74:4001';

export default async function Home() {
  const dtsLibsResp = await fetch(`${serverUrl}/dtsLibs`, {
    method: 'GET',
    cache: 'no-store',
  });
  const dtsLibs = await dtsLibsResp.json();

  return (
    <CodeEditor
      serverUrl={serverUrl}
      userCode={exampleCode}
      dtsLibs={dtsLibs}
    />
  );
}
