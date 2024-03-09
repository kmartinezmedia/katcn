import { describe, expect, it } from 'bun:test';
import app from './index';

const exampleCode = `
import { VStack, Text, Icon } from 'katcn';
import { getStyles } from 'katcn/getStyles';

export default function Example() {
  const customStyles = getStyles({
    borderWidth: 'thick',
    borderColor: 'warning',
    backgroundColor: 'accent-wash',
    elevation: '1',
  });

  return (
    <VStack backgroundColor="alert">
      <VStack width="1/2" backgroundColor="accent">
        <Text color="on-color" variant="display1" className={customStyles}>
          something
        </Text>
        <Icon name="addFile" size="lg" />
      </VStack>
    </VStack>
  )
 }
`;

describe('My first test', () => {
  it('Should return 200 Response', async () => {
    const req = new Request('http://localhost:3001/transform', {
      body: exampleCode,
      method: 'POST',
    });
    const res = await app.fetch(req);
    const data = await res.text();
    console.log(data);
    expect(res.status).toBe(200);
  });
});
