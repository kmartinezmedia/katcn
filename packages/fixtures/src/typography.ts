import { getUnionAsArray } from '@katcn/tsmorph/getUnionAsArray' with {
  type: 'macro',
};

import type { FontFamilyGlobalAlias } from '@katcn/types';

export const fontFamily = getUnionAsArray<FontFamilyGlobalAlias>(
  'FontFamilyGlobalAlias',
);
