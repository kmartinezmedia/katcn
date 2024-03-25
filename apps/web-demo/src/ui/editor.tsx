'use client';
import { setId } from '@/actions/id';
import {
  CodeEditor,
  type CodeEditorRefs,
  type OnChange,
  type DtsLibs,
  type OnMount,
} from 'docgen';
import { HStack } from 'katcn';
import { encode } from 'base64-url';
import { Socket } from './socket';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Preview } from './preview';

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
  dtsLibs: DtsLibs;
  socketUrl: string;
  userId?: string;
}

export const Editor = memo(function Editor({
  userId: _userId,
  socketUrl,
  dtsLibs,
}: EditorProps) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [data, setData] = useState<{ css: string; js: string }>({
    css: '',
    js: '',
  });
  const [userId, setUserId] = useState<string | undefined>(_userId);

  useEffect(() => {
    if (!_userId) {
      setId().then((val) => {
        setUserId(val);
      });
    }
  }, [_userId]);

  if (!userId) {
    return <h1>loading...</h1>;
  }

  return (
    <HStack width="full">
      <Socket
        url={`${socketUrl}/${userId}`}
        onConnect={setSocket}
        onMessage={setData}
      />
      {socket && <EditorInner socket={socket} dtsLibs={dtsLibs} />}
      {!!data.css && !!data.js && <Preview css={data.css} js={data.js} />}
    </HStack>
  );
});

export const EditorInner = memo(function EditorInner({
  socket,
  dtsLibs,
}: { dtsLibs: DtsLibs; socket: WebSocket }) {
  const [code, setCode] = useState<string>(exampleCode);
  const hashRef = useRef<string>('');
  const refs = useRef<CodeEditorRefs>({
    monaco: undefined,
    editor: undefined,
    tsworker: undefined,
  });

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
        socket.send(encoded);
      }
    }
  }, [code, socket]);

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
});
