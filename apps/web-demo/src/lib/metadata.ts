import type { Metadata } from 'next';

export const siteUrl = 'https://katcn.dev';
export const siteName = 'katcn';
export const siteDescription =
  'Design System with utility-driven styling props ';
const twitterHandle = 'katmartinez08';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: siteName,
  description: siteDescription,
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: siteUrl,
    siteName: siteName,
    images: [
      {
        url: '/og.png',
        width: 800,
        height: 600,
        alt: siteName,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  keywords: [],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    site: twitterHandle,
    creator: twitterHandle,
    card: 'summary_large_image',
    images: [
      {
        url: '/og.png',
        width: 800,
        height: 600,
        alt: siteName,
      },
    ],
  },
} satisfies Metadata;
