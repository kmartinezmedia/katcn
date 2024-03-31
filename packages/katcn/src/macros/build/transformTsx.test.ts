import { describe, expect, it } from 'bun:test';
import { createTsMorphProject } from '../tsmorph/createTsMorphProject';
import { transformTsx } from './transformTsx';

function createSourceFile(code: string) {
  const project = createTsMorphProject({
    skipAddingFilesFromTsConfig: true,
  });
  return project.createSourceFile('test.tsx', code, { overwrite: true });
}

describe('transformTsx', () => {
  it('Should return correct js data', async () => {
    const testCode = `
      import { VStack, Text, Icon, getStyles } from 'katcn';

      function Example({active}: {active: boolean}) {
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
    const sourceFile = createSourceFile(testCode);
    const data = transformTsx(sourceFile);
    expect(data).toBeDefined();
  });
  it('Should handle ConditionalExpression', () => {
    const testCode = `
    import { VStack, Text, Icon, getStyles } from 'katcn';

    function Example({active}: {active: boolean}) {
      const customStyles = getStyles({
        borderWidth: 'thick',
        borderColor: 'warning',
        backgroundColor: 'accent-wash',
        elevation: '1',
      });

      return (
        <VStack backgroundColor="alert">
          <VStack width="half" backgroundColor={active ? "accent" : "brand"}>
            <Text color="on-color" variant="display1" className={customStyles}>
              something
            </Text>
            <Icon name="addFile" size="lg" />
          </VStack>
        </VStack>
      )
    }
  `;
    const sourceFile = createSourceFile(testCode);
    const data = transformTsx(sourceFile);
    const { classNamesToKeep } = data;
    expect(classNamesToKeep).toContain('backgroundColor-accent');
    expect(classNamesToKeep).toContain('backgroundColor-brand');
  });
});
