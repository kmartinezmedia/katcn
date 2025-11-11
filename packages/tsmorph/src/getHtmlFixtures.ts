import type { PrimitiveType } from '@katcn/types';
import { SyntaxKind } from 'ts-morph';
import { componentsSourceFile } from './project';
import { getPropertySignatureInfo } from './propertySignatureUtils';

export function getHtmlFixtures() {
  const htmlToComponentMap: Record<string, string> = {};
  const defaultPropsForComponentMap: Record<
    string,
    Record<string, PrimitiveType>
  > = {};

  const components = componentsSourceFile.getDescendantsOfKind(
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
        htmlToComponentMap[htmlTag] = name;
        defaultPropsForComponentMap[name] = { as: htmlTag };
      }
    } else {
      const htmlTag = htmlTags[0];

      htmlToComponentMap[htmlTag.trim()] = name;
    }
  }

  /** For some reason bun macros require this to properly output the object */
  return { htmlToComponentMap, defaultPropsForComponentMap };
}
