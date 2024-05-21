import { ThemeProvider } from 'next-themes';
import { Providers } from '@/lib/context';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { VStack } from 'katcn';
import { Navbar } from '@/components/Navbar';

const iconFont = localFont({
  src: '../../../../packages/katcn/src/icons/fonts/icons.woff2',
  variable: '--font-icons',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
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
      className={`${inter.variable} ${iconFont.variable} bg-primary`}
      suppressHydrationWarning
    >
      <body className="h-full">
        <Providers socketUrl={process.env.NEXT_SOCKET_URL}>
          <VStack height="full" width="full">
            <Navbar />
            {children}
          </VStack>
        </Providers>
      </body>
    </html>
  );
}
