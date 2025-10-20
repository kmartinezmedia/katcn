import { HStack, VStack } from 'katcn';
import { getPlayground } from '@/actions/get-playground';
import Editor from './_editor';
import { PlaygroundTabs } from './_tabs';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { jsInput } = await getPlayground(id);
  return (
    <HStack width="full">
      <VStack width="1/2">
        <Editor id={id} jsInput={jsInput} />
      </VStack>
      <VStack width="1/2" height="screen" overflow="scroll">
        <PlaygroundTabs id={id} />
      </VStack>
    </HStack>
  );
}
