/// <reference types="bun-types" />

import { describe, expect, it } from 'bun:test';
import { defaultPropsForComponentMap, htmlToComponentMap } from './html';
import {
  modifiers,
  reactModifierPropsToTailwindModifierClassNamesMap,
  tailwindModifierClassNamesToReactPropsMap,
} from './modifiers';
import { styleProps } from './props';

describe('fixtures', () => {
  it('modifiers > modifiers matches snapshot', () => {
    expect(modifiers).toMatchSnapshot();
  });
  it('modifiers > reactModifierPropsToTailwindModifierClassNamesMap', () => {
    expect(reactModifierPropsToTailwindModifierClassNamesMap).toMatchSnapshot();
  });
  it('modifiers > tailwindModifierClassNamesToReactPropsMap', () => {
    expect(tailwindModifierClassNamesToReactPropsMap).toMatchSnapshot();
  });
  it('props > styleProps matches snapshot', () => {
    expect(styleProps).toMatchSnapshot();
  });
  it('html > htmlToComponentMap matches snapshot', () => {
    expect(htmlToComponentMap).toMatchSnapshot();
  });
  it('html > defaultPropsForComponentMap matches snapshot', () => {
    expect(defaultPropsForComponentMap).toMatchSnapshot();
  });
});
