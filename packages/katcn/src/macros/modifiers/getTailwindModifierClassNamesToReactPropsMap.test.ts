import { describe, expect, it } from 'bun:test';
import { getTailwindModifierClassNamesToReactPropsMap } from './getTailwindModifierClassNamesToReactPropsMap';

describe('getTailwindModifierClassNamesToReactPropsMap', () => {
  it('Matches snapshot', () => {
    const value = getTailwindModifierClassNamesToReactPropsMap();
    expect(value).toMatchSnapshot();
  });
  it('Should return a mapping of tailwind modifier classnames (without colon separator) to katcn modifier props', () => {
    const value = getTailwindModifierClassNamesToReactPropsMap();
    expect(value).toBeDefined();
    expect(value).toMatchObject({
      hover: '_hover',
    });
  });
});
