import type { ModifierProps } from '@katcn/types';

import { getPropertiesAndJsdocTagsForType } from './propertySignatureUtils';

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
function getReactModifierPropsToTailwindModifierClassNamesMap() {
  const dataMap = {} as Record<keyof ModifierProps, string>;

  const propertiesAndJsdocData = getPropertiesAndJsdocTagsForType<
    ModifierProps,
    'tailwind'
  >('ModifierProps');

  for (const [propName, { jsdocTags }] of Object.entries(
    propertiesAndJsdocData,
  )) {
    if (jsdocTags.tailwind) {
      dataMap[propName as keyof ModifierProps] = jsdocTags.tailwind;
    }
  }

  return dataMap;
}

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
function getTailwindModifierClassNamesToReactPropsMap() {
  const dataMap: Record<string, keyof ModifierProps> = {};

  const propertiesAndJsdocData = getPropertiesAndJsdocTagsForType<
    ModifierProps,
    'tailwind'
  >('ModifierProps');

  for (const [propName, { jsdocTags }] of Object.entries(
    propertiesAndJsdocData,
  )) {
    if (jsdocTags.tailwind) {
      dataMap[jsdocTags.tailwind.replace(':', '')] =
        propName as keyof ModifierProps;
    }
  }

  return dataMap;
}

export function getModifierFixtures() {
  return {
    reactModifierPropsToTailwindModifierClassNamesMap:
      getReactModifierPropsToTailwindModifierClassNamesMap(),
    tailwindModifierClassNamesToReactPropsMap:
      getTailwindModifierClassNamesToReactPropsMap(),
  };
}
