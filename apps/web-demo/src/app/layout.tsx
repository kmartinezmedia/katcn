import { Providers } from '@/lib/context';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import '#katcn/styles.css';

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
    <html lang="en" className={`${inter.variable} ${iconFont.variable}`}>
      <body>
        <Providers socketUrl={process.env.NEXT_SOCKET_URL}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
