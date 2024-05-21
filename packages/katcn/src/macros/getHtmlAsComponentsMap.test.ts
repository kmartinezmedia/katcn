/// <reference types="bun-types" />

import { describe, expect, it } from 'bun:test';
import { getHtmlAsComponentsMapAsString } from './getHtmlAsComponentsMap';

const htmlAsComponentsMap = JSON.parse(getHtmlAsComponentsMapAsString());

describe('getHtmlAsComponentsMap', () => {
  it('Should return a map of html components', () => {
    expect(htmlAsComponentsMap).toBeDefined();
    expect(htmlAsComponentsMap.div).toBeDefined();
    expect(htmlAsComponentsMap.p).toMatchObject({
      name: 'Text',
      defaultProps: { as: 'p' },
    });
  });
});
