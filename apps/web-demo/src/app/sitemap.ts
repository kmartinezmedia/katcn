import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString().split('T')[0];
  return [
    {
      url: siteUrl,
      lastModified,
    },
    {
      url: `${siteUrl}/bookmarks`,
      lastModified,
    },
  ];
}
