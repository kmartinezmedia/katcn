'use server';

import { redirect } from 'next/navigation';
import { transformCode } from '@/actions/transform-code';
import { db } from '@/lib/firebase/firebase-admin';

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
`;

export default async function Home() {
  const id = crypto.randomUUID();
  const data = await transformCode({ id, jsInput: exampleCode });
  await db.collection('playground').doc(id).set(data);
  redirect(`/playground/${id}`);
}
