'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const createPlayground = async () => {
      try {
        const response = await fetch('/api/playground', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsInput: exampleCode,
          }),
        });

        const { id } = await response.json();
        router.push(`/playground/${id}`);
      } catch (error) {
        console.error('Failed to create playground:', error);
      }
    };

    createPlayground();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Creating playground...</h1>
        <p className="text-gray-600">
          Please wait while we set up your playground.
        </p>
      </div>
    </div>
  );
}
