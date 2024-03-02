import { Text } from 'katcn/ui/Text';
import { VStack } from 'katcn/ui/VStack';

export default function Home() {
  return (
    <VStack backgroundColor="alert">
      <VStack width="1/2" backgroundColor="accent">
        <Text color="on-color" variant="display1">
          something
        </Text>
      </VStack>
    </VStack>
  );
}
