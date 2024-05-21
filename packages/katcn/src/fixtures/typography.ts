import { typesToConstants } from '../macros/typesToConstants' with {
  type: 'macro',
};

import type { FontFamilyGlobalAlias } from '../types';

export const fontFamily = typesToConstants<FontFamilyGlobalAlias>(
  'FontFamilyGlobalAlias',
);
