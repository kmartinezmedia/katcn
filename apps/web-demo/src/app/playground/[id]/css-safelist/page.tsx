'use client';
import { useContext } from 'react';
import { PlaygroundContext } from '../../_playground-context';

export default function Page() {
  const { cssSafelist } = useContext(PlaygroundContext);

  return (
    <pre style={{ textWrap: 'pretty' }}>
      <code>{cssSafelist}</code>
    </pre>
  );
}
