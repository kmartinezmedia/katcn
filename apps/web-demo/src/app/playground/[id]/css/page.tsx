'use client';
import formatCode from '@/actions/format';
import { useContext, useEffect, useState } from 'react';
import { PlaygroundDataContext } from '../_provider';

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
