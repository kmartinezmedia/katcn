import { SyntaxKind } from 'ts-morph';
import type { AllStyleProps } from '#types';
import { getTwPrefixAndPropName } from '../getTwPrefixAndPropName';
import { katcnTypesSourceFile } from '../tsMorph';

export type TwAsPropsMap = Record<string, AllStyleProps>;

/**
 * Used in tooling to convert tailwind classnames to react props
 *
 * This lookup map be used in conjuction with other ts-morph tooling
 * to convert `<div className="leading-tight" />` to
 * <Text lineHeight="tight" /> which then renders as <Text className="leading-tight" />
 *
 *
 * Returns:
 *  { leading: {lineHeight: 'tight'} }
 */
export function getTailwindClassNamesAsReactPropsMap() {
  const twToPropsMap: TwAsPropsMap = {};
  const typeRefs =
    katcnTypesSourceFile
      .getInterface('AllStyleProps')
      ?.getDescendantsOfKind(SyntaxKind.TypeReference) ?? [];

  for (const typeRef of typeRefs) {
    const identifier = typeRef.getFirstChildByKind(SyntaxKind.Identifier);
    if (!identifier) continue;
    const symbol = identifier.getSymbol();
    const members = symbol?.getMembers();
    if (!members) continue;
    const signatures = members.flatMap((member) =>
      member
        .getDeclarations()
        .filter((item) => !!item.isKind(SyntaxKind.PropertySignature)),
    );
    for (const signature of signatures) {
      const { twPrefix, name } = getTwPrefixAndPropName(signature);
      const type = signature.getType();

      if (type.isUnion()) {
        for (const unionType of type.getUnionTypes()) {
          if (unionType.isBooleanLiteral()) {
            twToPropsMap[twPrefix] = { [name]: true };
          }
          if (unionType.isStringLiteral()) {
            const propValue = unionType.getLiteralValue();
            if (typeof propValue === 'string') {
              const classname =
                twPrefix === '' ? `${propValue}` : `${twPrefix}-${propValue}`;
              twToPropsMap[classname] = { [name]: propValue };
            }
          }
        }
      }
    }
  }

  return twToPropsMap;
}
