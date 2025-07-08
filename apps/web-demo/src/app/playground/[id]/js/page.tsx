'use client';
import { useContext } from 'react';
import { PlaygroundDataContext } from '@/lib/context';

export default function Page() {
  const data = useContext(PlaygroundDataContext);
  return (
    <pre>
      <code>{data.js}</code>
    </pre>
  );
}
