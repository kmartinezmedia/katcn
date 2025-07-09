import { getUnionAsArray } from '@katcn/tsmorph/getUnionAsArray' with {
  type: 'macro',
};

import type { StyleProp } from '@katcn/types';

export const styleProps = getUnionAsArray<StyleProp>('StyleProp');
