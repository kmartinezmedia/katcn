'use server';

import type { PlaygroundData, PlaygroundPageProps } from '@/types';
import { kv } from '@vercel/kv';
import { codeToHtml } from 'shiki';

export default async function Page({
  params,
  searchParams,
}: PlaygroundPageProps) {
  const data = await kv.get<PlaygroundData>(
    `${params.id}/${searchParams.hash}`,
  );
  if (!data) return null;
  const shikkiCode = codeToHtml(data.css, { lang: 'css', theme: 'dracula' });
  return shikkiCode;
}
