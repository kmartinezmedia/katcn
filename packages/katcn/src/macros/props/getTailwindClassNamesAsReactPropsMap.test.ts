import { describe, expect, it } from 'bun:test';
import { getTailwindClassNamesAsReactPropsMap } from './getTailwindClassNamesAsReactPropsMap';

describe('getTailwindClassNamesAsReactPropsMap', () => {
  it('Matches snapshot', () => {
    const value = getTailwindClassNamesAsReactPropsMap();
    expect(value).toMatchSnapshot();
  });
  it('Should return a mapping of tailwind classnames to katcn props', () => {
    const value = getTailwindClassNamesAsReactPropsMap();
    expect(value).toBeDefined();
    expect(value).toMatchObject({
      'leading-tight': {
        lineHeight: 'tight',
      },
    });
  });
});
