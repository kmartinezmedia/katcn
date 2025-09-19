'use client';

import { HStack, Pressable, Text } from 'katcn';
import Link from 'next/link';
import { useParams, useSelectedLayoutSegment } from 'next/navigation';

interface TabProps {
  segment: 'css' | 'js' | 'preview' | 'css-safelist' | 'css-tailwind';
  children: React.ReactNode;
}

function Tab({ segment, children }: TabProps) {
  const params = useParams();
  const activeSegment = useSelectedLayoutSegment();
  const active = activeSegment === segment;

  return (
    <Pressable
      bg={active ? 'accent' : 'secondary'}
      roundedTop="md"
      spacing="2"
      asChild
    >
      <Link href={`/playground/${params.id}/${segment}`}>
        <Text variant="body" color={active ? 'on-accent' : 'on-secondary'}>
          {children}
        </Text>
      </Link>
    </Pressable>
  );
}

export default function Tabs() {
  return (
    <HStack gap="1">
      <Tab segment="preview">Preview</Tab>
      <Tab segment="css-safelist">CSS Safelist</Tab>
      <Tab segment="css-tailwind">CSS Tailwind</Tab>
      <Tab segment="css">CSS Output</Tab>
      <Tab segment="js">{'JS (transformed)'}</Tab>
    </HStack>
  );
}
