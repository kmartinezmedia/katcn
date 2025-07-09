/// <reference types="bun-types" />

import { describe, expect, it } from 'bun:test';
import type { AllStyleProps, ModifierProps } from '@katcn/types';
import { getPropertiesAndJsdocTagsForType } from './propertySignatureUtils';

describe('getPropertiesAndJsdocTagsForType', () => {
  it('Matches snapshot for AllStyleProps', () => {
    const value = getPropertiesAndJsdocTagsForType<AllStyleProps, 'tailwind'>(
      'AllStyleProps',
    );
    expect(value).toMatchSnapshot();
  });
  it('Matches snapshot for ModifierProps', () => {
    const value = getPropertiesAndJsdocTagsForType<ModifierProps, 'tailwind'>(
      'ModifierProps',
    );
    expect(value).toMatchSnapshot();
  });

  it('Should return a map of prop names and their jsdoc tag info', () => {
    const value = getPropertiesAndJsdocTagsForType<AllStyleProps, 'tailwind'>(
      'AllStyleProps',
    );
    expect(value).toBeDefined();
    expect(value.alignContent.jsdocTags).toMatchObject({
      tailwind: 'content',
    });
  });
});
