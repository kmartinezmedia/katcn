import path from 'node:path';
import { type Node, Project, SyntaxKind } from 'ts-morph';
import type { AllStyleProps } from '../types';

const project = new Project();
const sourceFile = project.addSourceFileAtPath(
  path.resolve(__dirname, '../types.ts'),
);

const firstLetterCapitalizedRegex = /[a-zA-Z]/; // Precompile regeximport type { StyleModifier } from '../types';

function isFirstLetterCapitalized(text: string): boolean {
  const firstAlphabeticCharacter = text.match(firstLetterCapitalizedRegex);
  return (
    firstAlphabeticCharacter !== null &&
    firstAlphabeticCharacter[0] === firstAlphabeticCharacter[0].toUpperCase()
  );
}

export function getTwPrefixAndPropName(node: Node) {
  let twPrefix = '';
  const signature = node.asKindOrThrow(SyntaxKind.PropertySignature);
  const name = signature.getName();
  const jsdocs = signature.getJsDocs();
  const tailwindJsdoc = jsdocs
    .flatMap((doc) => doc.getTags())
    .find((item) => item.getTagName() === 'tailwind')
    ?.getText();

  if (tailwindJsdoc) {
    twPrefix = tailwindJsdoc
      .replace('@tailwind ', '')
      .replaceAll(/\s/g, '')
      .trim();

    if (isFirstLetterCapitalized(twPrefix)) {
      twPrefix = '';
    }
  }

  return { twPrefix, name: `${name}` };
}

export type TwAsPropsMap = Record<string, AllStyleProps>;

export function getTwAsPropsMapAsString(): string {
  const twToPropsMap: TwAsPropsMap = {};
  const typeRefs =
    sourceFile
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

  /** For some reason bun macros require this to properly output the object */
  return JSON.stringify(twToPropsMap);
}
