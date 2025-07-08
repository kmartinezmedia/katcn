import { getReactModifierPropsToTailwindModifierClassNamesMap } from '../macros/modifiers/getReactModifierPropsToTailwindModifierClassNamesMap' with {
  type: 'macro',
};
import { getTailwindModifierClassNamesToReactPropsMap } from '../macros/modifiers/getTailwindModifierClassNamesToReactPropsMap' with {
  type: 'macro',
};
import { typesToConstants } from '../macros/typesToConstants' with {
  type: 'macro',
};
import type { StyleModifier } from '../types';

export const modifiers = typesToConstants<StyleModifier>('StyleModifier');

/**
 * Used in tooling to convert katcn props to tailwind classnames
 *
 * This lookup map be used in conjuction with other ts-morph tooling
 * to convert to <Box _hover={{ bg: 'red-500' }} /> to
 * `<Box className="hover:bg-red-500" />`
 *
 * Returns:
 *  { _hover: 'hover', ...other modifiers }
 */
export const reactModifierPropsToTailwindModifierClassNamesMap =
  getReactModifierPropsToTailwindModifierClassNamesMap();

/**
 * Used in tooling to convert plain tailwind classnames to katcn props
 *
 * This lookup map be used in conjuction with other ts-morph tooling
 * to convert `<div className="hover:bg-red-500" />` to
 * <Box _hover={{ bg: 'red-500' }} />
 *
 * Returns:
 *  { hover: '_hover', ...other modifiers }
 */
export const tailwindModifierClassNamesToReactPropsMap =
  getTailwindModifierClassNamesToReactPropsMap();
