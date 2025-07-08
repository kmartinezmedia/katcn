import { describe, expect, it } from 'bun:test';
import { getReactModifierPropsToTailwindModifierClassNamesMap } from './getReactModifierPropsToTailwindModifierClassNamesMap';

describe('getReactModifierPropsToTailwindModifierClassNamesMap', () => {
  it('Matches snapshot', () => {
    const value = getReactModifierPropsToTailwindModifierClassNamesMap();
    expect(value).toMatchSnapshot();
  });
  it('Should return a mapping of katcn modifier props to tailwind modifier classnames', () => {
    const value = getReactModifierPropsToTailwindModifierClassNamesMap();
    expect(value).toBeDefined();
    expect(value).toMatchObject({
      _hover: 'hover:',
    });
  });
});
