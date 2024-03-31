'use client';

import { PlaygroundSocketContext } from '@/lib/context';
import {
  CodeEditor,
  type CodeEditorRefs,
  type OnChange,
  type OnMount,
} from '@/ui/monaco';
import { encode } from 'base64-url';
import { memo, useCallback, useContext, useRef, useState } from 'react';
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

  const onMount: OnMount = useCallback(async ({ editor, monaco, tsworker }) => {
    refs.current.editor = editor;
    refs.current.monaco = monaco;
    refs.current.tsworker = tsworker;
  }, []);

  const onChange: OnChange = useCallback(
    async (value) => {
      if (refs.current.monaco) {
        const stringToUri = refs.current.monaco.Uri.parse;
        const markers = refs.current.monaco?.editor
          ?.getModelMarkers({
            owner: 'typescript',
            resource: stringToUri('user.tsx'),
          })
          .filter(
            (marker) =>
              marker.message !==
              "'Example' is declared but its value is never read.",
          );

        if (markers?.length < 1) {
          console.log('errors', markers);
          if (value === undefined) return;
          const encoded = encode(value);
          hashRef.current = encoded;
          socket?.send(encoded);
        }
      }
    },
    [socket?.send],
  );

  return (
    <CodeEditor
      userCode={exampleCode}
      dtsLibs={dtsLibs}
      onMount={onMount}
      onChange={onChange}
    />
  );
});
