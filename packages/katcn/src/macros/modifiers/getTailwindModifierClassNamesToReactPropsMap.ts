import { SyntaxKind } from 'ts-morph';
import type { ModifierProps } from '../../types';
import { getTwPrefixAndPropName } from '../getTwPrefixAndPropName';
import { katcnTypesSourceFile } from '../tsMorph';

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
export function getTailwindModifierClassNamesToReactPropsMap() {
  const lookupMap = {} as Record<string, keyof ModifierProps>;
  const modifierPropsTypeDefinition =
    katcnTypesSourceFile
      .getInterface('ModifierProps')
      ?.getChildrenOfKind(SyntaxKind.PropertySignature) ?? [];

  for (const propertySignature of modifierPropsTypeDefinition) {
    if (!propertySignature) continue;
    const { name, twPrefix } = getTwPrefixAndPropName(propertySignature);
    lookupMap[twPrefix.replace(':', '')] = name as keyof ModifierProps;
  }
  return lookupMap;
}
