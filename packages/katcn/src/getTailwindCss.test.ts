import { describe, expect, it } from 'bun:test';
import { getTailwindCss } from './getTailwindCss';
import { defaultTokensConfig } from './tokens';

describe('getTailwindCss', () => {
  it('getTailwindCss should return correct vars', () => {
    const css = getTailwindCss(defaultTokensConfig);
    expect(css).toBeDefined();
  });
});
