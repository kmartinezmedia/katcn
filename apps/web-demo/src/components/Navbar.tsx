'use client';

import { HStack, Icon, Pressable, Text } from 'katcn';
import Link from 'next/link';
import { useTheme } from 'next-themes';

export function Navbar() {
  const { setTheme, theme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <HStack spacing="4" alignItems="center" justifyContent="between">
      <HStack gap="4">
        <Text variant="label4" textDecoration="underline" color="brand" asChild>
          <Link href="/playground">Playground</Link>
        </Text>
        <Text variant="label4" textDecoration="underline" color="brand" asChild>
          <Link href="/converter">Converter</Link>
        </Text>
      </HStack>
      <Pressable
        bg="secondary"
        rounded="full"
        size="10"
        display="flex"
        alignItems="center"
        justifyContent="center"
        onClick={toggleTheme}
      >
        <Icon
          name={theme === 'dark' ? 'sun' : 'moon'}
          size="8"
          fill="on-primary"
          suppressHydrationWarning
        />
      </Pressable>
    </HStack>
  );
}
