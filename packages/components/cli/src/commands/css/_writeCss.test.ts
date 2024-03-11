import { describe, expect, it } from 'bun:test';
import { writeCss } from './_writeCss';

describe('writeCss', () => {
  it('Should return correct css', async () => {
    const css = await writeCss({
      safelist: ['color-alert', 'backgroundColor-positive'],
    });
    // console.log(css);
    expect(css).toBeDefined();
  });
});
