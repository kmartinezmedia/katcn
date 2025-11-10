import { HStack, VStack } from 'katcn';
import Editor from '@/playground/editor';
import PlaygroundTabs from '@/playground/tabs';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <HStack width="full">
      <VStack width="1/2">
        <Editor id={id} />
      </VStack>
      <VStack width="1/2" height="screen" overflow="scroll">
        <PlaygroundTabs id={id} />
      </VStack>
    </HStack>
  );
}
