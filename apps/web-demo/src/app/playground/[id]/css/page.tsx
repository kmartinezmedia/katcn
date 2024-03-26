'use client';
import formatCode from '@/actions/format';
import { PlaygroundDataContext } from '@/lib/context';
import { useContext, useEffect, useState } from 'react';

export default function Page() {
  const data = useContext(PlaygroundDataContext);
  const [code, setCode] = useState<string>();
  const css = data.css;

  useEffect(() => {
    formatCode({ code: css, parser: 'css' }).then((formattedCode) => {
      setCode(formattedCode);
    });
  }, [css]);

  return (
    <pre style={{ textWrap: 'pretty' }}>
      <code>{code}</code>
    </pre>
  );
}
