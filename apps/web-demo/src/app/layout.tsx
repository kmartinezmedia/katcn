import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const iconFont = localFont({
  src: '../../../../packages/components/src/icons/fonts/icons.woff2',
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
      <body>{children}</body>
    </html>
  );
}
