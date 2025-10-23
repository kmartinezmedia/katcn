import { redirect } from 'next/navigation';

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
  const response = await fetch('http://localhost:3000/api/playground', {
    method: 'POST',
    body: JSON.stringify({
      jsInput: exampleCode,
    }),
  });

  const { id } = await response.json();

  return redirect(`/playground/${id}`);
}
