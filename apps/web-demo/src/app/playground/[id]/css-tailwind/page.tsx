'use client';
import { useContext } from 'react';
import { PlaygroundContext } from '../../_playground-context';

export default function Page() {
  const { cssInput } = useContext(PlaygroundContext);
  return (
    <pre style={{ textWrap: 'pretty' }}>
      <code>{cssInput}</code>
    </pre>
  );
}
