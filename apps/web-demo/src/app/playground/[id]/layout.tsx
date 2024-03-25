'use client';

import { HStack, VStack } from 'katcn';
import Editor from './_editor';
import { PlaygroundProvider } from './_provider';
import Tabs from './_tabs';

interface PlaygroundParams extends React.PropsWithChildren {
  socket: React.ReactNode;
}

export default function Layout({ socket, children }: PlaygroundParams) {
  return (
    <PlaygroundProvider>
      {socket}
      <HStack width="full">
        <VStack width="half">
          <Editor />
        </VStack>
        <VStack width="half" height="100vh" overflow="scroll">
          <Tabs />
          {children}
        </VStack>
      </HStack>
    </PlaygroundProvider>
  );
}
