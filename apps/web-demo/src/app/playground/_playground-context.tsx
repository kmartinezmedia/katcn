'use client';

import { createContext, useEffect, useState } from 'react';
import { transformCode } from '@/actions/transformCode';

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

const exampleCode = `
import { VStack, Text, Icon } from 'katcn';
import { getStyles } from 'katcn/getStyles';

function Example() {
  const customStyles = getStyles({
    borderWidth: '2',
    borderColor: 'warning',
    bg: 'accent'
  });

  return (
    <VStack bg="alert">
      <VStack width="1/2" bg="accent">
        <Text color="on-accent" variant="display1" className={customStyles}>
          something
        </Text>
        <Icon name="addFile" size="4" />
      </VStack>
    </VStack>
  )
}
`
  .trimStart()
  .trimEnd();

const noop = () => {};

export const PlaygroundContext = createContext({
  cssSafelist: '',
  cssInput: '',
  cssOutput: '',
  jsInput: '',
  jsOutput: '',
  setJsInput: noop as SetState<string>,
});

export default function PlaygroundContextProvider({
  id,
  children,
}: React.PropsWithChildren<{ id: string }>) {
  const [cssSafelist, setCssSafelist] = useState('');
  const [cssInput, setCssInput] = useState('');
  const [cssOutput] = useState('');
  const [jsInput, setJsInput] = useState(exampleCode);
  const [jsOutput, setJsOutput] = useState('');

  useEffect(() => {
    console.log('user input changed');
    transformCode(id, jsInput).then(({ css, cssSafelist, js }) => {
      setCssInput(css);
      setCssSafelist(cssSafelist);
      setJsOutput(js);
    });
  }, [id, jsInput]);

  return (
    <PlaygroundContext.Provider
      value={{
        cssInput,
        cssOutput,
        cssSafelist,
        jsInput,
        jsOutput,
        setJsInput,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
}
