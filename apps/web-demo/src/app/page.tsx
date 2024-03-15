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

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const serverUrl = process.env.SERVER_URL!;

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
