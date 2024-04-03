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

  it('should combine multiple pages', () => {
    const stylesheet = new KatcnStyleSheet({
      config: defaultTokensConfig,
      disablePreflight: true,
    });
    const file1Registry = new Set<string>();
    const file2Registry = new Set<string>();
    stylesheet.safelist.set('file1.tsx', file1Registry);
    stylesheet.safelist.set('file2.tsx', file2Registry);

    file1Registry.add('backgroundColor-accent');
    file1Registry.add('width-[100px]');
    file1Registry.add('height-[100px]');

    file2Registry.add('backgroundColor-alert');
    file2Registry.add('width-[200px]');
    file2Registry.add('height-[200px]');

    expect(stylesheet.css).toBeDefined();
    expect(stylesheet.css.includes('backgroundColor-accent')).toBeTrue();
    expect(stylesheet.css.includes('backgroundColor-alert')).toBeTrue();
    expect(stylesheet.css.includes('.width-')).toBeTrue();
    // TODO: figure out why can't use full escaped classname to check
  });

  /** TODO: Convert stylesheet to object to be able to validate output */
});
