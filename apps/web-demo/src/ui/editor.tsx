'use client';
import { setId } from '@/actions/id';
import {
  CodeEditor,
  type CodeEditorRefs,
  type CodeEditorProps,
  type OnChange,
  type DtsLibs,
  type OnMount,
} from 'docgen';
import { HStack, Pressable, Text } from 'katcn';
import { encode } from 'base64-url';
import { useEffect, useRef, useState } from 'react';

const exampleCode = `
import { VStack, Text, Icon, getStyles } from 'katcn';

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
  dtsLibs: DtsLibs;
  serverUrl: string;
  userId?: string;
}

export function Editor({ serverUrl, userId: _userId, dtsLibs }: EditorProps) {
  const [userId, setUserId] = useState<string | undefined>(_userId);
  const [count, setCount] = useState(0);
  const wsRef = useRef<WebSocket | null>(null);
  const refs = useRef<CodeEditorRefs>({
    monaco: undefined,
    editor: undefined,
    tsworker: undefined,
  });

  useEffect(() => {
    if (!_userId) {
      setId().then((val) => {
        console.log('set userID', val);
        setUserId(val);
      });
    }
  }, [_userId]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const wsUrl = serverUrl.replace('http', 'ws').replace('https', 'ws');
    if (userId) {
      const websocket = new WebSocket(`${wsUrl}/ws/${userId}`);
      wsRef.current = websocket;
      websocket.onopen = () => {
        console.log('WebSocket Connected');
      };

      websocket.onopen = () => {
        // websocket.send(JSON.stringify({ count }));
      };

      // websocket.onmessage = (ev) => {
      //   console.log(ev.data);
      //   if (ev.data.type === 'update') {
      //     refs.current?.editor?.setValue(ev.data.code);
      //   }
      // };

      // websocket.onclose = () => {
      //   console.log('WebSocket Disconnected');
      // };

      // websocket.onerror = (error) => {
      //   console.log(`WebSocket Error: ${error}`);
      // };

      return () => {
        websocket.close();
      };
    }
  }, []);

  const onMount: OnMount = async ({ editor, monaco, tsworker }) => {
    refs.current.editor = editor;
    refs.current.monaco = monaco;
    refs.current.tsworker = tsworker;
  };

  const onChange: OnChange = async (value, changeEvent) => {
    const code = value ?? '';
    const monaco = refs.current?.monaco;
    const editor = monaco?.editor;

    if (editor) {
      const markers = editor
        ?.getModelMarkers({})
        .filter(
          (marker) =>
            marker.message !==
            "'Example' is declared but its value is never read.",
        );

      if (markers?.length <= 1) {
        const encoded = encode(code);
        console.log('send data to server');
        wsRef.current?.send(
          JSON.stringify({ type: 'client-update', userId, code: encoded }),
        );
      }
    }
  };

  if (!userId || !serverUrl) {
    return <h1>loading...</h1>;
  }

  return (
    <HStack width="full">
      <CodeEditor
        userCode={exampleCode}
        dtsLibs={dtsLibs}
        onMount={onMount}
        onChange={onChange}
      />
      <Pressable
        backgroundColor="accent"
        onClick={() => setCount((prev) => prev + 1)}
      >
        <Text variant="label1" color="on-color">
          {count}
        </Text>
      </Pressable>
      <iframe
        title="Preview"
        src={`${serverUrl}/preview/${userId}`}
        width="half"
        height="100vh"
      />
    </HStack>
  );
}
