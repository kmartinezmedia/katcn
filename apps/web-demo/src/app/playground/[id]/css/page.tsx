'use client';
import { useContext } from 'react';
import { PlaygroundDataContext } from '../_provider';

export default function Page() {
  const data = useContext(PlaygroundDataContext);

  return (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
    <div dangerouslySetInnerHTML={{ __html: data.formattedCss }} />
  );
}
