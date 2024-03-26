import type { PlaygroundPageProps } from '@/types';
import { Editor } from '@/ui/editor';
import { HStack, VStack } from 'katcn';
import Tabs from './_tabs';

interface PlaygroundParams
  extends PlaygroundPageProps,
    React.PropsWithChildren {}

export default function Layout({ params, children }: PlaygroundParams) {
  return (
    <>
      <HStack width="full">
        <VStack width="half">
          <Editor socketUrl={process.env.SOCKET_URL} params={params} />
        </VStack>
        <VStack width="half" height="100vh" overflow="scroll">
          <Tabs />
          {children}
        </VStack>
      </HStack>
    </>
  );
}
