import { HStack, VStack } from 'katcn';
import { type Tab, Tabs } from '@/components/Tabs';
import Editor from './_editor';
import { TabsContent } from './_tabsContent';
import type { PlaygroundTabID } from './_types';

const tabs = [
  { tabId: 'preview', label: 'Preview' },
  { tabId: 'css-safelist', label: 'CSS Safelist' },
  { tabId: 'css-tailwind', label: 'CSS Tailwind' },
  { tabId: 'css', label: 'CSS' },
  { tabId: 'js', label: 'JS' },
] satisfies Tab<PlaygroundTabID>[];

const exampleCode = `
import { VStack, Text, Icon } from 'katcn';
import { getStyles } from 'katcn/getStyles';

function Example() {
  const customStyles = getStyles({
    borderWidth: '2',
    borderColor: 'warning',
    bg: 'accent'
  });

  return (
    <VStack bg="alert">
      <VStack width="1/2" bg="accent">
        <Text color="on-accent" variant="display1" className={customStyles}>
          something
        </Text>
        <Icon name="addFile" size="4" />
      </VStack>
    </VStack>
  )
}
`
  .trimStart()
  .trimEnd();

export default async function Page() {
  // const [jsInput, setJsInput] = useState(exampleCode);
  // const [activeTabId, setActiveTabId] = useState<PlaygroundTabID>(
  //   tabs[0].tabId,
  // );
  const jsInput = exampleCode;
  const activeTabId = tabs[0].tabId;
  return (
    <HStack width="full">
      <VStack width="1/2">
        <Editor jsInput={jsInput} />
      </VStack>
      <VStack width="1/2" height="screen" overflow="scroll">
        <Tabs tabs={tabs} activeTabId={activeTabId}>
          <TabsContent activeTabId={activeTabId} id="kat" jsInput={jsInput} />
        </Tabs>
      </VStack>
    </HStack>
  );
}
