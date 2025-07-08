import { SyntaxKind } from 'ts-morph';
import type { PrimitiveType, ValidHtmlTag } from '../types';
import { katcnComponentsSourceFile } from './tsMorph';
import { typesToConstants } from './typesToConstants';

type HtmlAsComponent = {
  name: string;
  defaultProps: Record<string, PrimitiveType>;
};

const validHtmlTags = typesToConstants<ValidHtmlTag>('ValidHtmlTag');

function isValidHtmlTag(tag: string | ValidHtmlTag): tag is ValidHtmlTag {
  return validHtmlTags.includes(tag as ValidHtmlTag);
}

export function getHtmlTagAsReactComponentsMap() {
  const htmlAsComponentsMap: { [key in ValidHtmlTag]?: HtmlAsComponent } = {};

  const components = katcnComponentsSourceFile.getDescendantsOfKind(
    SyntaxKind.FunctionDeclaration,
  );

  for (const component of components) {
    const name = component.getName();
    if (!name) continue;
    const jsdocs = component.getJsDocs();
    const htmlJsDoc = jsdocs
      .flatMap((doc) => doc.getTags())
      .find((item) => item.getTagName() === 'html')
      ?.getText()
      .replace('@html ', '')
      .replaceAll(/\s/g, '')
      .trim();

    const htmlTags = htmlJsDoc?.split(',') ?? [];
    if (htmlTags.length > 1) {
      for (const htmlTag of htmlTags) {
        if (isValidHtmlTag(htmlTag)) {
          htmlAsComponentsMap[htmlTag] = {
            name,
            defaultProps: { as: htmlTag },
          };
        }
      }
    } else {
      const htmlTag = htmlTags[0];
      if (isValidHtmlTag(htmlTag)) {
        htmlAsComponentsMap[htmlTag] = {
          name,
          defaultProps: {},
        };
      }
    }
  }

  /** For some reason bun macros require this to properly output the object */
  return htmlAsComponentsMap;
}
