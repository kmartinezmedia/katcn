import { afterEach, describe, expect, it } from 'bun:test';
import { getStyles } from '#getStyles';
import { createTsMorphProject } from './createTsMorphProject';
import { getSafelist } from './getSafelist';

function createSourceFile(code: string) {
  const project = createTsMorphProject({
    skipAddingFilesFromTsConfig: true,
  });

  return project.createSourceFile('test.tsx', code, { overwrite: true });
}

describe('getSafelist', () => {
  afterEach(() => {
    Bun.env.NODE_ENV = 'test';
  });

  it('Should handle arbitrary values', () => {
    const testCode = `
    import { VStack } from 'katcn';

    function Example() {
      return (
        <VStack bg="alert" height="[120px]" width="[120px]" />
      )
    }
  `;
    const sourceFile = createSourceFile(testCode);
    const safelist = getSafelist({
      sourceFile,
      safelistMap: new Map(),
    });
    expect(safelist).toContain('bg-alert');
    expect(safelist).toContain('h-[120px]');
    expect(safelist).toContain('w-[120px]');
  });

  it('Should handle ConditionalExpression', () => {
    const testCode = `
    import { VStack, Text, Icon } from 'katcn';
    import { getStyles } from 'katcn/getStyles';

    function Example({active}: {active: boolean}) {
      const customStyles = getStyles({
        border: true,
        borderColor: 'warning',
        bg: 'accent',
      });

      return (
        <VStack bg="alert">
          <VStack width="1/2" bg={active ? "alert" : "brand"}>
            <Text color="on-color" variant="display1" className={customStyles}>
              something
            </Text>
          </VStack>
        </VStack>
      )
    }
  `;
    const sourceFile = createSourceFile(testCode);
    const safelist = getSafelist({
      sourceFile,
      safelistMap: new Map(),
    });
    expect(safelist).toContain('w-1/2');
    expect(safelist).toContain('border');
    expect(safelist).toContain('border-warning');
    expect(safelist).toContain('bg-accent');
    expect(safelist).toContain('bg-alert');
    expect(safelist).toContain('bg-brand');
  });

  it('Should handle template literals as separate const', () => {
    let testCode = `
    import { VStack } from 'katcn';
    type Hue =
    | 'slate'
    | 'gray'
    | 'zinc'
    | 'neutral'
    | 'stone'
    | 'red'
    | 'orange'
    | 'amber'
    | 'yellow'
    | 'lime'
    | 'green'
    | 'emerald'
    | 'teal'
    | 'cyan'
    | 'sky'
    | 'blue'
    | 'indigo'
    | 'violet'
    | 'purple'
    | 'fuchsia'
    | 'pink'
    | 'rose'

    type HueStep =
    | '50'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';

    function Example({hue, step}: {hue: Hue, step: HueStep}) {
      const backgroundColor = PLACEHOLDER;
      return (
        <VStack bg={backgroundColor} />
      )
    }
  `;
    testCode = testCode.replace('PLACEHOLDER', '`${hue}-${step}` as const');

    const sourceFile = createSourceFile(testCode);
    const safelist = getSafelist({
      sourceFile,
      safelistMap: new Map(),
    });
    expect(safelist).toContain('bg-pink-50');
  });

  it('Should handle template literals inline', () => {
    let testCode = `
    import { VStack } from 'katcn';
    type Hue =
    | 'slate'
    | 'gray'
    | 'zinc'
    | 'neutral'
    | 'stone'
    | 'red'
    | 'orange'
    | 'amber'
    | 'yellow'
    | 'lime'
    | 'green'
    | 'emerald'
    | 'teal'
    | 'cyan'
    | 'sky'
    | 'blue'
    | 'indigo'
    | 'violet'
    | 'purple'
    | 'fuchsia'
    | 'pink'
    | 'rose'

    type HueStep =
    | '50'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';

    function Example({hue, step}: {hue: Hue, step: HueStep}) {
      return (
        <VStack bg={PLACEHOLDER} />
      )
    }
  `;
    testCode = testCode.replace('PLACEHOLDER', '`${hue}-${step}` as const');

    const sourceFile = createSourceFile(testCode);
    const safelist = getSafelist({
      sourceFile,
      safelistMap: new Map(),
    });
    expect(safelist).toContain('bg-purple-50');
  });
  it('Should handle vars', () => {
    const code = `
      import { Box } from 'katcn';

      function Example() {
        return <Box bg="accent" />;
      }
    `;
    const sourceFile = createSourceFile(code);
    const safelist = getSafelist({
      sourceFile,
      safelistMap: new Map(),
    });
    expect(safelist).toContain('bg-accent');
  });

  it('Should handle vars as separate const', () => {
    const code = `
      import { Box } from 'katcn';

      function Example() {
        const bg="accent"
        return <Box bg={bg} />;
      }
    `;
    const sourceFile = createSourceFile(code);
    const safelist = getSafelist({
      sourceFile,
      safelistMap: new Map(),
    });
    expect(safelist).toContain('bg-accent');
  });

  it('Should handle numeric dimensions', () => {
    const code = `
      import { Box } from 'katcn';

      function Example() {
        return <Box width="[100px]" height="[200px]" />;
      }
    `;
    const sourceFile = createSourceFile(code);
    const safelist = getSafelist({
      sourceFile,
      safelistMap: new Map(),
    });
    expect(safelist).toContain('w-[100px]');
    expect(safelist).toContain('h-[200px]');
  });

  it('Should handle numeric dimensions as separate const', () => {
    const code = `
      import { Box, VStack } from 'katcn';

      function Example() {
        const height = "[200px]";
        return (
          <VStack>
            <VStack>
              <Box width="[100px]" height={height} />
            </VStack>
          </VStack>
        )
      }
    `;
    const sourceFile = createSourceFile(code);
    const safelist = getSafelist({
      sourceFile,
      safelistMap: new Map(),
    });
    expect(safelist).toContain('w-[100px]');
    expect(safelist).toContain('h-[200px]');
  });
  it('Should handle statically defined prop lookups', () => {
    const code = `
      import { Pressable } from 'katcn';
      import { createVariants } from 'katcn/getStyles';
      import type { PressableProps } from 'katcn/types';

      const variants = createVariants({
        'primary-solid': {
          bg: 'black',
          color: 'white',
          _hover: { bg: 'gray-200' },
        },
        'primary-outline': {
          bg: 'transparent',
          _hover: { bg: 'gray-200' },
          color: 'accent',
          borderColor: 'accent',
        },
      })

      function Example({variant}: {variant: keyof typeof variants}) {
        return <Pressable width="full" {...variants[variant]} />;
      }
    `;
    const sourceFile = createSourceFile(code);
    const safelist = getSafelist({
      sourceFile,
      safelistMap: new Map(),
    });

    expect(safelist).toContain('w-full');
    expect(safelist).toContain('bg-black');
    expect(safelist).toContain('text-white');
    expect(safelist).toContain('hover:bg-gray-200');
    expect(safelist).toContain('bg-transparent');
    expect(safelist).toContain('text-accent');
    expect(safelist).toContain('border-accent');
    expect(safelist.length).toBe(7);
  });

  it('Should handle statically defined prop lookups when desctructured', () => {
    const code = `
      import { Pressable } from 'katcn';
      import { createVariants } from 'katcn/getStyles';

      const variants = createVariants({
        'primary-solid': {
          bg: 'black',
          color: 'white',
          _hover: { bg: 'gray-200' },
        }
      })

      function Example({variant}: {variant: keyof typeof variants}) {
        const { bg, color, hover } = variants[variant];
        return <Pressable width="full" bg={bg} color={color} hover={hover} />;
      }
    `;
    const sourceFile = createSourceFile(code);
    const safelist = getSafelist({
      sourceFile,
      safelistMap: new Map(),
    });

    expect(safelist).toContain('text-white');
    expect(safelist).toContain('bg-black');
    expect(safelist).toContain('w-full');
  });
  it('Should work with getStyles', () => {
    const classname = getStyles({
      bg: 'black',
      _hover: { bg: 'gray-200' },
      color: 'white',
      borderColor: 'transparent',
    });

    expect(classname).toBe(
      'bg-black hover:bg-gray-200 text-white border-transparent',
    );
  });
  it('Should work with nested objects in getStyles', () => {
    const classname = getStyles({
      bg: 'black',
      _hover: { bg: 'gray-200', _ariaExpanded: { bg: 'gray-300' } },
      color: 'white',
      borderColor: 'transparent',
    });

    expect(classname).toBe(
      'bg-black hover:bg-gray-200 hover:aria-expanded:bg-gray-300 text-white border-transparent',
    );
  });
  it('Should work with createVariants', () => {
    const code = `
      import { Pressable } from 'katcn';
      import { createVariants } from 'katcn/getStyles';

      const variants = createVariants({
        'primary-solid': {
          bg: 'black',
          _hover: { bg: 'gray-200' },
          color: 'white',
          borderColor: 'transparent',
        },
        'primary-outline': {
          bg: 'transparent',
          _hover: { bg: 'gray-200' },
          color: 'accent',
          borderColor: 'accent',
        }
      })

      function Example({variant}: {variant: keyof typeof variants}) {
        const variantProps = variants[variant];
        return <Pressable width="full" {...variantProps} />;
      }
    `;
    const sourceFile = createSourceFile(code);
    const safelist = getSafelist({
      sourceFile,
      safelistMap: new Map(),
    });
    expect(safelist).toContain('bg-black');
    expect(safelist).toContain('text-white');
    expect(safelist).toContain('text-accent');
    expect(safelist).toContain('bg-transparent');
    expect(safelist).toContain('border-accent');
    expect(safelist).toContain('hover:bg-gray-200');
  });
});
