'use client';

import { HStack, Icon, Pressable } from 'katcn';
import { useTheme } from 'next-themes';

export function Navbar() {
  const { setTheme, theme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <HStack
      spacing="4"
      alignItems="center"
      justifyContent="between"
      bg="primary"
    >
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
          size="full"
          fill="on-primary"
          suppressHydrationWarning
        />
      </Pressable>
    </HStack>
  );
}
