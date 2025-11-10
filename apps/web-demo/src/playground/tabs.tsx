'use client';

import { doc } from 'firebase/firestore';
import { getStyles } from 'katcn/getStyles';
import { useState } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { type Tab, Tabs } from '@/components/Tabs';
import { db } from '@/lib/firebase/firebase-client';
import { Preview } from './preview';
import type { Playground, PlaygroundTabID } from './types';

const tabs = [
  { tabId: 'preview', label: 'Preview' },
  { tabId: 'css-safelist', label: 'CSS Safelist' },
  { tabId: 'css-tailwind', label: 'CSS Tailwind' },
  { tabId: 'css', label: 'CSS' },
  { tabId: 'js', label: 'JS' },
] satisfies Tab<PlaygroundTabID>[];

const codeStyles = getStyles({
  fontFamily: 'mono',
});

export default function PlaygroundTabs({ id }: { id: string }) {
  const [activeTabId, setActiveTabId] = useState<PlaygroundTabID>('preview');
  const [value, loading, error] = useDocument(doc(db, `playground/${id}`));

  if (loading) {
    return null;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const data = value?.data() as Playground;
  if (!data) {
    return null;
  }

  const { cssInput, cssOutput, cssSafelist, jsOutput } = data;

  let content = null;

  if (
    activeTabId === 'css' ||
    activeTabId === 'css-tailwind' ||
    activeTabId === 'css-safelist' ||
    activeTabId === 'js'
  ) {
    const codeContent = {
      css: cssOutput,
      'css-safelist': cssSafelist,
      'css-tailwind': cssInput,
      js: jsOutput,
    }[activeTabId];

    content = (
      <pre style={{ textWrap: 'pretty' }}>
        <code className={codeStyles}>{codeContent}</code>
      </pre>
    );
  }

  if (activeTabId === 'preview') {
    content = <Preview jsOutput={jsOutput} cssOutput={cssOutput} />;
  }

  return (
    <Tabs tabs={tabs} activeTabId={activeTabId} onTabChange={setActiveTabId}>
      {content}
    </Tabs>
  );
}
