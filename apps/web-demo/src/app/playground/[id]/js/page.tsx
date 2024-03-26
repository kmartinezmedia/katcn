'use server';

import type { PlaygroundData, PlaygroundPageProps } from '@/types';
import { kv } from '@vercel/kv';

export default async function Page({
  params,
  searchParams,
}: PlaygroundPageProps) {
  const data = await kv.get<PlaygroundData>(
    `${params.id}/${searchParams.hash}`,
  );
  if (!data) return null;
  return (
    <pre>
      <code>{data.js}</code>
    </pre>
  );
}
