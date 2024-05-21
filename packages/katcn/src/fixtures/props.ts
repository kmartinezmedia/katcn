import { typesToConstants } from '../macros/typesToConstants' with {
  type: 'macro',
};
import type { StyleProp } from '../types';

export const styleProps = typesToConstants<StyleProp>('StyleProp');

export function isStyleProp(prop: string): prop is StyleProp {
  return (
    styleProps.includes(prop as StyleProp) ||
    prop === 'className' ||
    prop === 'variant'
  );
}
