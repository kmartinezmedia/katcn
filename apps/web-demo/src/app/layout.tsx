import { VStack } from 'katcn';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { Navbar } from '@/components/Navbar';
import { Providers } from '@/lib/context';
import './globals.css';
// import './katcn.css';

const iconFont = localFont({
  src: '../../../../packages/icons/src/fonts/icons.woff2',
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
        <Providers>
          <VStack height="full" width="full">
            <Navbar />
            {children}
          </VStack>
        </Providers>
      </body>
    </html>
  );
}
