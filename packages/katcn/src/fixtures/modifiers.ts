import {
  getModifierPropsAsTwMap,
  getModifierTwAsPropsMap,
} from '../macros/getModifierPropsAsTwMap' with { type: 'macro' };
import { typesToConstants } from '../macros/typesToConstants' with {
  type: 'macro',
};
import type { StyleModifier } from '../types';

export const modifiers = typesToConstants<StyleModifier>('StyleModifier');
export const modifierPropsAsTwMap = getModifierPropsAsTwMap();
export const modifierTwAsPropsMap = getModifierTwAsPropsMap();
