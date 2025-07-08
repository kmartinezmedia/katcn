import { describe, expect, it } from 'bun:test';
import { getCss } from './getCss';
import { defaultTokensConfig } from './tokens';

describe('getCss', () => {
  it('getCss should return correct vars', () => {
    const css = getCss(defaultTokensConfig);
    expect(css).toBeDefined();
  });
});
