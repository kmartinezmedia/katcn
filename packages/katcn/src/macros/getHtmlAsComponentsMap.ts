import path from 'node:path';
import { Project, SyntaxKind } from 'ts-morph';
import type { PrimitiveType } from '../types';

const project = new Project();
const sourceFile = project.addSourceFileAtPath(
  path.resolve(__dirname, '../components.tsx'),
);

interface HtmlAsComponent {
  name: string;
  defaultProps: Record<string, PrimitiveType>;
}

export type HtmlAsComponentMap = Record<
  keyof React.JSX.IntrinsicElements,
  HtmlAsComponent
>;

export function getHtmlAsComponentsMapAsString(): string {
  const htmlAsComponentsMap: Record<string, HtmlAsComponent> = {};

  const components = sourceFile.getDescendantsOfKind(
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

    const htmlElements = htmlJsDoc?.split(',') ?? [];
    if (htmlElements.length > 1) {
      for (const htmlElement of htmlElements) {
        htmlAsComponentsMap[htmlElement] = {
          name,
          defaultProps: { as: htmlElement },
        };
      }
    } else {
      htmlAsComponentsMap[htmlElements[0]] = {
        name,
        defaultProps: {},
      };
    }
  }

  /** For some reason bun macros require this to properly output the object */
  return JSON.stringify(htmlAsComponentsMap);
}
