'use client';

import {
  CodeEditor,
  type CodeEditorRefs,
  type OnChange,
  type OnMount,
} from '@/ui/monaco';
import { kv } from '@vercel/kv';
import { encode } from 'base64-url';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import dtsLibs from 'server/dist/dtsLibs.json';

const exampleCode = `
import { VStack, Text, Icon } from 'katcn';
import { getStyles } from 'katcn/getStyles';

function Example() {
  const customStyles = getStyles({
    borderWidth: 'thick',
    borderColor: 'warning',
    backgroundColor: 'accent'
  });

  return (
    <VStack backgroundColor="alert">
      <VStack width="half" backgroundColor="accent">
        <Text color="on-color" variant="display1" className={customStyles}>
          something
        </Text>
        <Icon name="addFile" size="lg" />
      </VStack>
    </VStack>
  )
}
`
  .trimStart()
  .trimEnd();

interface EditorProps {
  params: { id: string };
  socketUrl: string;
}

interface EditorRefs extends CodeEditorRefs {
  socket: WebSocket | undefined;
}

export function Editor({ socketUrl, params }: EditorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [code, setCode] = useState<string>(exampleCode);
  const { id } = params;
  const hashRef = useRef<string>('');
  const refs = useRef<EditorRefs>({
    monaco: undefined,
    editor: undefined,
    tsworker: undefined,
    socket: undefined,
  });

  useEffect(() => {
    const websocket = new WebSocket(`${socketUrl}/${id}`);
    refs.current.socket = websocket;
    websocket.onmessage = async (ev) => {
      const { hash, ...data } = JSON.parse(ev.data);
      await kv.set(`${id}/${hash}`, data);
      router.push(`${pathname}?hash=${hash}`);
    };

    websocket.onclose = () => {
      websocket.close();
    };

    websocket.onerror = (error) => {
      throw error;
    };

    return () => {
      if (websocket.readyState === 1) {
        websocket.close();
      }
    };
  }, [id, socketUrl, router.push, pathname]);

  useEffect(() => {
    if (refs.current.monaco) {
      const markers = refs.current.monaco?.editor
        ?.getModelMarkers({})
        .filter(
          (marker) =>
            marker.message !==
            "'Example' is declared but its value is never read.",
        );

      if (markers?.length <= 1) {
        const encoded = encode(code);
        hashRef.current = encoded;
        refs.current?.socket?.send(encoded);
      }
    }
  }, [code]);

  const onMount: OnMount = useCallback(async ({ editor, monaco, tsworker }) => {
    refs.current.editor = editor;
    refs.current.monaco = monaco;
    refs.current.tsworker = tsworker;
  }, []);

  const onChange: OnChange = useCallback(async (value) => {
    const _code = value ?? '';
    setCode(_code);
  }, []);

  return (
    <CodeEditor
      userCode={exampleCode}
      dtsLibs={dtsLibs}
      onMount={onMount}
      onChange={onChange}
    />
  );
}
