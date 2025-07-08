import { typesToConstants } from '../node/utils/typesToConstants' with {
  type: 'macro',
};

import type { StyleProp } from '../types';

export const styleProps = typesToConstants<StyleProp>('StyleProp');
