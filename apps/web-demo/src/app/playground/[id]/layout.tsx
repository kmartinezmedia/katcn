'use client';

import { HStack, VStack } from 'katcn';
import Editor from './_editor';
import Tabs from './_tabs';

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <HStack width="full">
      <VStack width="1/2">
        <Editor />
      </VStack>
      <VStack width="1/2" height="screen" overflow="scroll">
        <Tabs />
        {children}
      </VStack>
    </HStack>
  );
}
