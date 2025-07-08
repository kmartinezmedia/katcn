import { entries } from '../helpers';
import type { ModifierProps } from '../types';
import { getPropertiesAndJsdocTagsForType } from './utils/propertySignatureUtils';

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
const getReactModifierPropsToTailwindModifierClassNamesMap = () => {
  const dataMap = {} as Record<keyof ModifierProps, string>;

  const propertiesAndJsdocData = getPropertiesAndJsdocTagsForType<
    ModifierProps,
    'tailwind'
  >('ModifierProps');

  for (const [propName, { jsdocTags }] of entries(propertiesAndJsdocData)) {
    if (jsdocTags.tailwind) {
      dataMap[propName] = jsdocTags.tailwind;
    }
  }

  return dataMap;
};

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
const getTailwindModifierClassNamesToReactPropsMap = () => {
  const dataMap: Record<string, keyof ModifierProps> = {};

  const propertiesAndJsdocData = getPropertiesAndJsdocTagsForType<
    ModifierProps,
    'tailwind'
  >('ModifierProps');

  for (const [propName, { jsdocTags }] of entries(propertiesAndJsdocData)) {
    if (jsdocTags.tailwind) {
      dataMap[jsdocTags.tailwind.replace(':', '')] = propName;
    }
  }

  return dataMap;
};

export function getModifierFixtures() {
  return {
    reactModifierPropsToTailwindModifierClassNamesMap:
      getReactModifierPropsToTailwindModifierClassNamesMap(),
    tailwindModifierClassNamesToReactPropsMap:
      getTailwindModifierClassNamesToReactPropsMap(),
  };
}
