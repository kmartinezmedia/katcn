import '#katcn/styles.css';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { Providers } from '@/lib/context';

const iconFont = localFont({
  src: '../../../../packages/katcn/src/icons/fonts/icons.woff2',
  variable: '--katcn-font-icons',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--katcn-font-sans',
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
        <Providers socketUrl={process.env.SOCKET_URL}>{children}</Providers>
      </body>
    </html>
  );
}
