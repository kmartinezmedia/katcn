'use client';

import { HStack, Pressable, Text } from 'katcn';
import Link from 'next/link';
import { useParams, useSelectedLayoutSegment } from 'next/navigation';

export default function Tabs() {
  const params = useParams();
  const segment = useSelectedLayoutSegment();
  console.log(segment);
  return (
    <HStack gap="1">
      <Pressable
        backgroundColor={segment === 'preview' ? 'accent' : 'secondary'}
        borderTopRadius="md"
        spacing="2"
        asChild
      >
        <Link href={`/playground/${params.id}/preview`}>
          <Text variant="body1">Preview</Text>
        </Link>
      </Pressable>
      <Pressable
        backgroundColor={segment === 'css' ? 'accent' : 'secondary'}
        borderTopRadius="md"
        spacing="2"
        asChild
      >
        <Link href={`/playground/${params.id}/css`}>
          <Text variant="body1">CSS</Text>
        </Link>
      </Pressable>
      <Pressable
        backgroundColor={segment === 'js' ? 'accent' : 'secondary'}
        borderTopRadius="md"
        spacing="2"
        asChild
      >
        <Link href={`/playground/${params.id}/js`}>
          <Text variant="body1">JS</Text>
        </Link>
      </Pressable>
    </HStack>
  );
}
