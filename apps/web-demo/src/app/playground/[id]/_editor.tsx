'use client';

import {
  CodeEditor,
  type CodeEditorRefs,
  type OnChange,
  type OnMount,
} from '@/ui/monaco';
import { encode } from 'base64-url';
import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { PlaygroundSocketContext } from './_provider';
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

export default memo(function Editor() {
  const socket = useContext(PlaygroundSocketContext);
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
        socket?.send(encoded);
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
