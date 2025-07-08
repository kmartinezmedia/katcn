import { SyntaxKind } from 'ts-morph';
import type { PrimitiveType, ValidHtmlTag } from '#types';
import { getPropertySignatureInfo } from './utils/propertySignatureUtils';
import { katcnComponentsSourceFile } from './utils/tsMorph';
import { typesToConstants } from './utils/typesToConstants';

const validHtmlTags = typesToConstants<ValidHtmlTag>('ValidHtmlTag');

function isValidHtmlTag(tag: string | ValidHtmlTag): tag is ValidHtmlTag {
  return validHtmlTags.includes(tag as ValidHtmlTag);
}

export function getHtmlFixtures() {
  const htmlToComponentMap: Record<string, string> = {};
  const defaultPropsForComponentMap: Record<
    string,
    Record<string, PrimitiveType>
  > = {};

  const components = katcnComponentsSourceFile.getDescendantsOfKind(
    SyntaxKind.FunctionDeclaration,
  );

  for (const component of components) {
    const { propertyName: name, jsdocTags } =
      getPropertySignatureInfo(component);

    if (!name) continue;
    if (!jsdocTags.html) continue;

    const htmlJsDoc = jsdocTags.html;

    const htmlTags = htmlJsDoc?.split(',') ?? [];
    if (htmlTags.length > 1) {
      for (const htmlTag of htmlTags) {
        if (isValidHtmlTag(htmlTag)) {
          htmlToComponentMap[htmlTag] = name;
          defaultPropsForComponentMap[name] = { as: htmlTag };
        }
      }
    } else {
      const htmlTag = htmlTags[0];
      if (isValidHtmlTag(htmlTag)) {
        htmlToComponentMap[htmlTag] = name;
      }
    }
  }

  /** For some reason bun macros require this to properly output the object */
  return { htmlToComponentMap, defaultPropsForComponentMap };
}
