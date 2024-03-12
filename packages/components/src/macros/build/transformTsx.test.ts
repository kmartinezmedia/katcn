import { describe, expect, it } from 'bun:test';
import { transformTsx } from './transformTsx';
import { createTsMorphProject } from '../tsmorph/createTsMorphProject';

const testCode = `
import { VStack, Text, Icon, getStyles } from 'katcn';

function Example() {
  const customStyles = getStyles({
    borderWidth: 'thick',
    borderColor: 'warning',
    backgroundColor: 'accent-wash',
    elevation: '1',
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
`;
describe('transformTsx', () => {
  it('Should return correct js data', async () => {
    const project = createTsMorphProject({
      skipAddingFilesFromTsConfig: true,
    });
    const sourceFile = project.createSourceFile('test.tsx', testCode);
    const data = transformTsx(sourceFile);
    console.log(data);
    expect(data).toBeDefined();
  });
});
