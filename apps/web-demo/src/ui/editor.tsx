'use client';
import { setId } from '@/actions/id';
import {
  CodeEditor,
  type CodeEditorRefs,
  type OnChange,
  type DtsLibs,
  type OnMount,
} from 'docgen';
import { HStack, Icon, VStack, getStyles, Text } from 'katcn';
import { encode } from 'base64-url';
import { jsx } from 'katcn/jsx-runtime';
import { jsxDEV } from 'katcn/jsx-dev-runtime';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

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

export const Editor = memo(function Editor({
  userId: _userId,
  ...props
}: EditorProps) {
  const [userId, setUserId] = useState<string | undefined>(_userId);
  useEffect(() => {
    if (!_userId) {
      setId().then((val) => {
        console.log('set userID', val);
        setUserId(val);
      });
    }
  }, [_userId]);

  if (!userId) {
    return <h1>loading...</h1>;
  }

  return <EditorInner {...props} userId={userId} />;
});

function Preview({ css, js }: { css: string; js: string }) {
  console.log({
    css,
    js,
    jsx,
  });

  if (!!css && !!js) {
    const fnString = new Function(`
      function renderComp({ jsx, jsxDEV, VStack, Text, Icon, getStyles }) {
        ${js}
        return Example;
      }
      return renderComp;
    `)();

    const Comp = fnString({ jsx, jsxDEV, VStack, Text, Icon, getStyles });
    // Comp.displayName = 'PreviewComponent';
    console.log(Comp);
    return (
      <div>
        <style>{css}</style>
        <Comp />
      </div>
    );
  }
}

export const EditorInner = memo(function EditorInner({
  serverUrl,
  userId,
  dtsLibs,
}: Required<EditorProps>) {
  const [data, setData] = useState<{ hash: string; js: string; css: string }>({
    hash: '',
    js: '',
    css: '',
  });
  const [code, setCode] = useState<string>(exampleCode);
  const hashRef = useRef<string>('');
  const wsRef = useRef<WebSocket | null>(null);
  const refs = useRef<CodeEditorRefs>({
    monaco: undefined,
    editor: undefined,
    tsworker: undefined,
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const wsUrl = serverUrl.replace('http', 'ws').replace('https', 'ws');
    const websocket = new WebSocket(`${wsUrl}/ws/${userId}`);
    wsRef.current = websocket;
    // window.socket = websocket;
    websocket.onopen = () => {
      console.log('NextJS WebSocket Connected');
    };

    websocket.onmessage = async (ev) => {
      console.log('NextJS WebSocket message');
      const data = JSON.parse(ev.data);
      setData(data);
    };

    websocket.onclose = () => {
      console.log('Nextjs WebSocket Disconnected');
      websocket.close();
    };

    // websocket.onerror = (error) => {
    //   console.log(`WebSocket Error: ${error}`);
    // };

    return () => {
      websocket.close();
    };
  }, []);

  const onMount: OnMount = useCallback(async ({ editor, monaco, tsworker }) => {
    refs.current.editor = editor;
    refs.current.monaco = monaco;
    refs.current.tsworker = tsworker;
  }, []);

  const onChange: OnChange = useCallback(async (value) => {
    const _code = value ?? '';
    const monaco = refs.current?.monaco;
    const editor = monaco?.editor;
    setCode(_code);
    if (editor) {
      const markers = editor
        ?.getModelMarkers({})
        .filter(
          (marker) =>
            marker.message !==
            "'Example' is declared but its value is never read.",
        );

      if (markers?.length <= 1) {
        const encoded = encode(_code);
        hashRef.current = encoded;
        wsRef.current?.send(encoded);
      }
    }
  }, []);

  return (
    <HStack width="full">
      <CodeEditor
        userCode={exampleCode}
        dtsLibs={dtsLibs}
        onMount={onMount}
        onChange={onChange}
      />
      <Preview css={data.css} js={data.js} />
    </HStack>
  );
});
