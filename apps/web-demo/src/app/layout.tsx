import { VStack } from 'katcn';
import { Geist, Inconsolata } from 'next/font/google';
import localFont from 'next/font/local';
import { Providers } from '@/lib/context';
import './globals.css';

const iconFont = localFont({
  src: '../../../../packages/icons/src/fonts/icons.woff2',
  variable: '--font-icons',
});

const sans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

const mono = Inconsolata({
  subsets: ['latin'],
  variable: '--font-mono',
});

export { metadata } from '@/lib/metadata';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${iconFont.variable} bg-primary`}
      suppressHydrationWarning
    >
      <body className="h-full">
        <Providers>
          <VStack height="full" width="full">
            {/* <Navbar /> */}
            {children}
          </VStack>
        </Providers>
      </body>
    </html>
  );
}
