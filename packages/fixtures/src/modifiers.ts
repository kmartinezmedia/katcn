import { getModifierFixtures } from '@katcn/tsmorph/getModifiers' with {
  type: 'macro',
};
import { getUnionAsArray } from '@katcn/tsmorph/getUnionAsArray' with {
  type: 'macro',
};
import type { StyleModifier } from '@katcn/types';

export const modifiers = getUnionAsArray<StyleModifier>('StyleModifier');

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
