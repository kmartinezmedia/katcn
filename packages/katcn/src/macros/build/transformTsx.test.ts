import { describe, expect, it } from 'bun:test';
import { KatcnStyleSheet } from '../css/stylesheet';
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
    const data = transformTsx({
      sourceFile,
      stylesheet: new KatcnStyleSheet(),
    });
    expect(data).toBeDefined();
  });

  it.only('Should handle arbitrary values', () => {
    const testCode = `
    import { VStack } from 'katcn';

    function Example() {
      return (
        <VStack backgroundColor="alert" height={120} width={120} />
      )
    }
  `;
    const sourceFile = createSourceFile(testCode);
    const data = transformTsx({
      sourceFile,
      stylesheet: new KatcnStyleSheet(),
    });
    const classnames = data.stylesheet.classnames;
    expect(classnames).toContain('height-[120px]');
    expect(classnames).toContain('width-[120px]');
  });

  it('Should handle ConditionalExpression', () => {
    const testCode = `
    import { VStack, Text, Icon, getStyles } from 'katcn';

    function Example({active}: {active: boolean}) {
      const customStyles = getStyles({
        borderWidth: 'thick',
        borderColor: 'warning',
        backgroundColor: 'accent-wash',
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
    const data = transformTsx({
      sourceFile,
      stylesheet: new KatcnStyleSheet(),
    });
    const classnames = data.stylesheet.classnames;
    expect(classnames).toContain('borderWidth-thick');
    expect(classnames).toContain('borderColor-warning');
    expect(classnames).toContain('backgroundColor-accent-wash');
    expect(classnames).toContain('backgroundColor-accent');
    expect(classnames).toContain('backgroundColor-brand');
  });

  it('Should handle template literals as separate const', () => {
    let testCode = `
    import { VStack } from 'katcn';
    type Hue =
    | 'magenta'
    | 'pink'
    | 'rose'
    | 'red'
    | 'sunset'
    | 'orange'
    | 'nude'
    | 'brown'
    | 'yellow'
    | 'citron'
    | 'lime'
    | 'green'
    | 'mint'
    | 'teal'
    | 'cyan'
    | 'blue'
    | 'indigo'
    | 'purple'
    | 'gray'
    | 'carbon';

  type HueStep =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15;

    function Example({hue, step}: {hue: Hue, step: HueStep}) {
      const backgroundColor = PLACEHOLDER;
      return (
        <VStack backgroundColor={backgroundColor} />
      )
    }
  `;
    testCode = testCode.replace('PLACEHOLDER', '`${hue}-${step}` as const');

    const sourceFile = createSourceFile(testCode);
    const data = transformTsx({
      sourceFile,
      stylesheet: new KatcnStyleSheet(),
    });
    const classnames = data.stylesheet.classnames;
    expect(classnames).toContain('backgroundColor-magenta-0');
  });

  it('Should handle template literals inline', () => {
    let testCode = `
    import { VStack } from 'katcn';
    type Hue =
    | 'magenta'
    | 'pink'
    | 'rose'
    | 'red'
    | 'sunset'
    | 'orange'
    | 'nude'
    | 'brown'
    | 'yellow'
    | 'citron'
    | 'lime'
    | 'green'
    | 'mint'
    | 'teal'
    | 'cyan'
    | 'blue'
    | 'indigo'
    | 'purple'
    | 'gray'
    | 'carbon';

  type HueStep =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15;

    function Example({hue, step}: {hue: Hue, step: HueStep}) {
      return (
        <VStack backgroundColor={PLACEHOLDER} />
      )
    }
  `;
    testCode = testCode.replace('PLACEHOLDER', '`${hue}-${step}` as const');

    const sourceFile = createSourceFile(testCode);
    const data = transformTsx({
      sourceFile,
      stylesheet: new KatcnStyleSheet(),
    });
    const classnames = data.stylesheet.classnames;
    expect(classnames).toContain('backgroundColor-magenta-0');
  });
  it('Should handle vars', () => {
    const code = `
      import { Box } from 'katcn';

      function Example() {
        return <Box backgroundColor="accent" />;
      }
    `;
    const sourceFile = createSourceFile(code);
    const data = transformTsx({
      sourceFile,
      stylesheet: new KatcnStyleSheet(),
    });
    expect(data.stylesheet.classnames.has('backgroundColor-accent')).toBeTrue();
  });

  it.only('Should handle vars as separate const', () => {
    const code = `
      import { Box } from 'katcn';

      function Example() {
        const backgroundColor="accent"
        return <Box backgroundColor={backgroundColor} />;
      }
    `;
    const sourceFile = createSourceFile(code);
    const data = transformTsx({
      sourceFile,
      stylesheet: new KatcnStyleSheet(),
    });

    expect(data.stylesheet.classnames.has('backgroundColor-accent')).toBeTrue();
  });

  it('Should handle numeric dimensions', () => {
    const code = `
      import { Box } from 'katcn';

      function Example() {
        return <Box width={100} height={200} />;
      }
    `;
    const sourceFile = createSourceFile(code);
    const data = transformTsx({
      sourceFile,
      stylesheet: new KatcnStyleSheet(),
    });
    expect(data.stylesheet.classnames.has('width-[100px]')).toBeTrue();
    expect(data.stylesheet.classnames.has('height-[200px]')).toBeTrue();
  });

  it('Should handle numeric dimensions as separate const', () => {
    const code = `
      import { Box, VStack } from 'katcn';

      function Example() {
        const height = 200;
        return (
          <VStack>
            <VStack>
              <Box width={100} height={height} />
            </VStack>
          </VStack>
        )
      }
    `;
    const sourceFile = createSourceFile(code);
    const data = transformTsx({
      sourceFile,
      stylesheet: new KatcnStyleSheet(),
    });
    expect(data.stylesheet.classnames.has('width-[100px]')).toBeTrue();
    expect(data.stylesheet.classnames.has('height-[200px]')).toBeTrue();
  });
});
