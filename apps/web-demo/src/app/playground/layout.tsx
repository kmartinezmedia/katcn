import { VStack, HStack, Pressable, Text } from 'katcn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface PlaygroundParams extends React.PropsWithChildren {
  id: string;
}

export default function Layout({ children }: PlaygroundParams) {
  const pathname = usePathname();
  return (
    <HStack width="full">
      <VStack spacing="4">
        <HStack gap="1">
          <Pressable
            backgroundColor={
              pathname === '/playground/preview' ? 'accent' : 'secondary'
            }
            borderTopRadius="md"
            spacing="2"
            asChild
          >
            <Link href="/playground/preview">
              <Text variant="body1">Preview</Text>
            </Link>
          </Pressable>
          <Pressable
            backgroundColor={
              pathname === '/playground/css' ? 'accent' : 'secondary'
            }
            borderTopRadius="md"
            spacing="2"
            asChild
          >
            <Link href="/playground/css">
              <Text variant="body1">CSS</Text>
            </Link>
          </Pressable>
          <Pressable
            backgroundColor={
              pathname === '/playground/js' ? 'accent' : 'secondary'
            }
            borderTopRadius="md"
            spacing="2"
            asChild
          >
            <Link href="/playground/css">
              <Text variant="body1">JS</Text>
            </Link>
          </Pressable>
        </HStack>
        {children}
      </VStack>
    </HStack>
  );
}
