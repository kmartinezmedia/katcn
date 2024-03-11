import { describe, expect, it } from 'bun:test';
import { transformCss } from './_transformCss';

describe('transformCss', () => {
  it('Should return correct css', async () => {
    const css = await transformCss({
      classNamesToKeep: new Set(['color-alert', 'backgroundColor-positive']),
    });
    expect(css).toBeDefined();
  });
});
