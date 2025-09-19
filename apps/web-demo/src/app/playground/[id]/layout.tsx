'use client';

import { HStack, VStack } from 'katcn';
import { use } from 'react';
import PlaygroundContextProvider from '../_playground-context';
import Editor from './_editor';
import Tabs from './_tabs';

type LayoutProps = React.PropsWithChildren<{
  params: Promise<{
    id: string;
  }>;
}>;

export default function Layout({ children, params }: LayoutProps) {
  const { id } = use(params);
  return (
    <PlaygroundContextProvider id={id}>
      <HStack width="full">
        <VStack width="1/2">
          <Editor />
        </VStack>
        <VStack width="1/2" height="screen" overflow="scroll">
          <Tabs />
          {children}
        </VStack>
      </HStack>
    </PlaygroundContextProvider>
  );
}
