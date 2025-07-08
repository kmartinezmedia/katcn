import { getTailwindClassNamesAsReactPropsMap } from '../macros/props/getTailwindClassNamesAsReactPropsMap' with {
  type: 'macro',
};
import { typesToConstants } from '../macros/typesToConstants' with {
  type: 'macro',
};

import type { StyleProp } from '../types';

export const styleProps = typesToConstants<StyleProp>('StyleProp');

export const tailwindClassNamesAsReactPropsMap =
  getTailwindClassNamesAsReactPropsMap();
