import 'server-only';

import { db } from '@/lib/firebase/firebase-admin';
import type { Playground } from '@/lib/playground/types';
import { transformPlaygroundCode } from './transform-playground-code';

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

export async function createPlayground() {
  const id = crypto.randomUUID();

  const { cssInput, cssOutput, cssSafelist, jsOutput } =
    await transformPlaygroundCode({
      id,
      jsInput: exampleCode,
    });

  const data: Playground = {
    id,
    jsInput: exampleCode,
    cssInput,
    cssOutput,
    cssSafelist,
    jsOutput,
  };

  await db.doc(`playgrounds/${id}`).set(data);

  return data;
}
