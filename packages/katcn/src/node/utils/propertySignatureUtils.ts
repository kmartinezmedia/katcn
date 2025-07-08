import type { FunctionDeclaration, PropertySignature } from 'ts-morph';
import { SyntaxKind } from 'ts-morph';
import { katcnTypesSourceFile } from './tsMorph';

/**
 *
 * @param propertySignature The key:value pair of a type definition
 * Looks at each key:value pair in a type and if the property
 * has a jsdoc with tags, it will extract the property name and the
 * jsdoc tags associated with the property.
 *
 * @example
 * type StyleProps = {
 *  * @tailwind bg
 *  backgroundColor?: Color;
 * }
 *
 * Will return { propertyName: 'backgroundColor', jsdocTags: { tailwind: 'bg' } }
 */
export function getPropertySignatureInfo<T extends string>(
  propertySignature: PropertySignature | FunctionDeclaration,
) {
  const propertyName = propertySignature.getName() as T;

  const data = {
    propertyName: propertyName as T,
    jsdocTags: {} as Record<string, string>,
  };

  for (const jsdocTag of propertySignature.getJsDocs()) {
    const tags = jsdocTag.getTags();
    for (const tag of tags) {
      const tagName = tag.getTagName();
      const tagValue = tag.getCommentText();
      if (tagName && tagValue) {
        data.jsdocTags[tagName] = tagValue;
      }
    }
  }

  return data;
}

function getOptionsForPropertySignature(
  propertySignature: PropertySignature,
): string[] {
  const type = propertySignature.getType();
  const options: string[] = [];

  if (type.isUnion()) {
    for (const unionType of type.getUnionTypes()) {
      if (unionType.isBooleanLiteral()) {
        options.push('boolean');
      }
      if (unionType.isStringLiteral()) {
        const propValue = unionType.getLiteralValue();
        if (typeof propValue === 'string') {
          options.push(propValue);
        }
      }
    }
  }

  if (type.isString()) {
    options.push('string');
  }

  if (type.isBoolean()) {
    options.push('boolean');
  }

  return options;
}

export function getPropertiesAndJsdocTagsForType<Type, JSDocTag extends string>(
  typeName: string,
) {
  type PropertyName = Extract<keyof Type, string>;
  type PropertiesData = {
    [key in PropertyName]: {
      jsdocTags: Record<JSDocTag, string>;
      options: string[];
    };
  };
  const propertySignatures: PropertySignature[] = [];

  const data: PropertiesData = {} as PropertiesData;

  const typeDef = katcnTypesSourceFile.getInterface(typeName);

  const builtInPropertySignatures =
    typeDef?.getChildrenOfKind(SyntaxKind.PropertySignature) ?? [];

  propertySignatures.push(...builtInPropertySignatures);

  const typeRefs =
    typeDef?.getDescendantsOfKind(SyntaxKind.TypeReference) ?? [];

  for (const typeRef of typeRefs) {
    const identifier = typeRef?.getFirstChildByKind(SyntaxKind.Identifier);
    if (!identifier) continue;

    const symbol = identifier.getSymbol();
    const members = symbol?.getMembers();
    if (!members) continue;
    const propertySignaturesForTypeReference = members.flatMap((member) =>
      member
        .getDeclarations()
        .filter((item) => !!item.isKind(SyntaxKind.PropertySignature)),
    );

    propertySignatures.push(...propertySignaturesForTypeReference);
  }

  for (const propertySignature of propertySignatures) {
    const { propertyName, jsdocTags } =
      getPropertySignatureInfo<PropertyName>(propertySignature);
    const options = getOptionsForPropertySignature(propertySignature);
    data[propertyName] = { jsdocTags, options };
  }

  return data;
}
