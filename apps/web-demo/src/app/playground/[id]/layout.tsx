'use client';

import { VStack, HStack } from 'katcn';
import { PlaygroundProvider } from './_provider';
import Editor from './_editor';
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
        <VStack width="half">
          <Tabs />
          {children}
        </VStack>
      </HStack>
    </PlaygroundProvider>
  );
}
