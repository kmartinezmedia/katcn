import { getModifierFixtures } from '../node/getModifierFixtures';
import { typesToConstants } from '../node/utils/typesToConstants' with {
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
export const {
  reactModifierPropsToTailwindModifierClassNamesMap,
  tailwindModifierClassNamesToReactPropsMap,
} = getModifierFixtures();
