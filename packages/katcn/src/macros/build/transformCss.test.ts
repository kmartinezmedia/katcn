import { describe, expect, it } from 'bun:test';
import { transformCss } from './transformCss';

describe('transformCss', () => {
  it('Should return correct css', async () => {
    const css = await transformCss({
      classNamesToKeep: new Set(['color-alert', 'backgroundColor-positive']),
    });
    console.log(css);
    expect(css).toBeDefined();
  });
});
