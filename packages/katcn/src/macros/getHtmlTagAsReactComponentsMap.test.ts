/// <reference types="bun-types" />

import { describe, expect, it } from 'bun:test';
import { getHtmlTagAsReactComponentsMap } from './getHtmlTagAsReactComponentsMap';

describe('getHtmlTagAsReactComponentsMap', () => {
  it('Matches snapshot', () => {
    const value = getHtmlTagAsReactComponentsMap();
    expect(value).toMatchSnapshot();
  });

  it('Should return a map of html components to react components', () => {
    const htmlAsComponentsMap = getHtmlTagAsReactComponentsMap();
    expect(htmlAsComponentsMap).toBeDefined();
    expect(htmlAsComponentsMap.div).toBeDefined();
    expect(htmlAsComponentsMap.p).toMatchObject({
      name: 'Text',
      defaultProps: { as: 'p' },
    });
  });
});
