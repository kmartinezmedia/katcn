import { getStyles } from 'katcn/styles/getStyles';
import { Text } from 'katcn/ui/Text';

const className = getStyles({ backgroundColor: 'accent', color: 'primary' });

export default function Home() {
  return <Text className={className}>something</Text>;
}
