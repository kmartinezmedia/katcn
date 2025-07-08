import { SyntaxKind } from 'ts-morph';

import { getTwPrefixAndPropName } from '../getTwPrefixAndPropName';
import { katcnTypesSourceFile } from '../tsMorph';

/**
 * Used in tooling to convert react modifier props to tailwind classnames
 *
 * This lookup map be used in conjuction with other ts-morph tooling
 * to convert to <Box _hover={{ bg: 'red-500' }} /> to
 * `<Box className="hover:bg-red-500" />`
 *
 * Returns:
 *  { _hover: 'hover', ...other modifiers }
 */
export function getReactModifierPropsToTailwindModifierClassNamesMap() {
  const lookupMap = {} as Record<string, string>;
  const modifierPropsTypeDefinition =
    katcnTypesSourceFile
      .getInterface('ModifierProps')
      ?.getChildrenOfKind(SyntaxKind.PropertySignature) ?? [];

  for (const propertySignature of modifierPropsTypeDefinition) {
    if (!propertySignature) continue;
    const { name, twPrefix } = getTwPrefixAndPropName(propertySignature);
    lookupMap[name] = twPrefix;
  }
  return lookupMap;
}
