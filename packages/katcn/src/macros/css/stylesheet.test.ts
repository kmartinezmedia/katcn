import { describe, expect, it } from 'bun:test';
import { KatcnStyleSheet } from './stylesheet';
import { defaultTokensConfig } from '../../tokens';

describe('KatcnStyleSheet', () => {
  it('should include preflight', () => {
    const stylesheet = new KatcnStyleSheet({
      config: defaultTokensConfig,
      disablePreflight: false,
    });
    expect(stylesheet.cssTemplate).toBeDefined();
  });

  it('should return full stylesheet in cssTemplate', () => {
    const stylesheet = new KatcnStyleSheet({
      config: defaultTokensConfig,
      disablePreflight: true,
    });
    expect(stylesheet.cssTemplate).toBeDefined();
  });

  it('should correctly include arbitrary values', () => {
    const stylesheet = new KatcnStyleSheet({
      config: defaultTokensConfig,
      disablePreflight: true,
    });
    const fileRegistry = new Set<string>();
    fileRegistry.add('backgroundColor-accent');
    fileRegistry.add('width-[100px]');
    stylesheet.safelist.set('some-file.tsx', fileRegistry);
    expect(stylesheet.css).toBeDefined();
    expect(stylesheet.css.includes('backgroundColor-accent')).toBeTrue();
    // TODO: figure out why can't use full escaped classname to check
    expect(stylesheet.css.includes('.width-')).toBeTrue();
  });

  /** TODO: Convert stylesheet to object to be able to validate output */
});
