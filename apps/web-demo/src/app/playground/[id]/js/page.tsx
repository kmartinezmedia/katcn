'use client';
import { PlaygroundDataContext } from '@/lib/context';
import { useContext } from 'react';

export default function Page() {
  const data = useContext(PlaygroundDataContext);
  return (
    <pre>
      <code>{data.js}</code>
    </pre>
  );
}
