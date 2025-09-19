'use client';

import { ThemeProvider } from 'next-themes';

interface ProvidersProps extends React.PropsWithChildren {}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      enableColorScheme={true}
      disableTransitionOnChange
      storageKey="katcn"
      themes={['light', 'dark']}
      value={{ light: 'light', dark: 'dark' }}
    >
      {children}
    </ThemeProvider>
  );
}
