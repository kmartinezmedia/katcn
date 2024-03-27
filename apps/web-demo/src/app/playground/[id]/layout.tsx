'use client';

import { HStack, VStack } from 'katcn';
import Editor from './_editor';
import Tabs from './_tabs';

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <HStack width="full">
      <VStack width="half">
        <Editor />
      </VStack>
      <VStack width="half" height="100vh" overflow="scroll">
        <Tabs />
        {children}
      </VStack>
    </HStack>
  );
}
