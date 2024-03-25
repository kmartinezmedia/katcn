'use client';
import { useContext } from 'react';
import { PlaygroundDataContext } from '../_provider';

export default function Page() {
  const data = useContext(PlaygroundDataContext);
  return (
    <pre>
      <code>{data.css}</code>
    </pre>
  );
}
