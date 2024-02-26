import type { Metadata } from 'next';

export const siteUrl = 'https://my-website.com';
export const siteName = 'My Website';
export const siteDescription =
  'lorem ipsum dolor sit amet, consectetur adipiscing elit.';
const twitterHandle = '@TODO';

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
