'use client';
import { useContext } from 'react';
import { PlaygroundContext } from '../../_playground-context';

export default function Page() {
  const { jsOutput } = useContext(PlaygroundContext);

  return (
    <pre>
      <code>{jsOutput}</code>
    </pre>
  );
}
