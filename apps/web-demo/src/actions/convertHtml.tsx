'use server';

import {
  defaultPropsForComponentMap,
  htmlToComponentMap,
} from '@katcn/fixtures/html';
import { tailwindModifierClassNamesToReactPropsMap } from '@katcn/fixtures/modifiers';
import { getTailwindClassNamesAsReactPropsMap } from '@katcn/tsmorph/getTailwindClassNamesAsReactPropsMap';
import type { AllStyleProps, PrimitiveType, StyleModifier } from '@katcn/types';
import { execa } from 'execa';
import jsxlike from 'jsxlike';
import { getCss } from 'katcn/getCss';
import { defaultTokensConfig } from 'katcn/tokens';
import prettier from 'prettier';
import { createElement } from 'react';
import {
  type JsxOpeningElement,
  type JsxSelfClosingElement,
  Node,
  Project,
  printNode,
  SyntaxKind,
  ts,
} from 'ts-morph';

const project = new Project({
  skipAddingFilesFromTsConfig: true,
});

const tailwindClassNamesAsReactPropsMap =
  getTailwindClassNamesAsReactPropsMap();

function getPropsForClassName(className: string) {
  if (className in tailwindClassNamesAsReactPropsMap) {
    return tailwindClassNamesAsReactPropsMap[className];
  }
}

type AttributeReturnValue =
  | ts.JsxExpression
  | ts.ObjectLiteralExpression
  | ts.ArrayLiteralExpression
  | ts.NumericLiteral
  | ts.TrueLiteral
  | ts.FalseLiteral
  | ts.StringLiteral;

function getAttributeValue(
  value: PrimitiveType | Record<string, PrimitiveType> | PrimitiveType[],
  depth = 0,
): AttributeReturnValue {
  if (typeof value === 'string') {
    return ts.factory.createStringLiteral(value);
  }

  if (typeof value === 'number') {
    return ts.factory.createNumericLiteral(value);
  }

  if (typeof value === 'boolean') {
    const booleanValue =
      value === true ? ts.factory.createTrue() : ts.factory.createFalse();
    return ts.factory.createJsxExpression(undefined, booleanValue);
  }
  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      const arrayPortion = ts.factory.createArrayLiteralExpression(
        value.map((item) => getAttributeValue(item, depth + 1)),
      );

      if (depth === 0) {
        return ts.factory.createJsxExpression(undefined, arrayPortion);
      }
      return arrayPortion;
    }

    const objectPortion = ts.factory.createObjectLiteralExpression(
      Object.entries(value).map(([key, value]) => {
        return ts.factory.createPropertyAssignment(
          ts.factory.createIdentifier(key),
          getAttributeValue(value, depth + 1),
        );
      }),
    );

    if (depth === 0) {
      return ts.factory.createJsxExpression(undefined, objectPortion);
    }

    return objectPortion;
  }

  throw new Error(`Unsupported value type: ${typeof value}`);
}

function swapForComponent(
  node: JsxOpeningElement | JsxSelfClosingElement,
  importsToAdd: Set<string>,
) {
  const identifier = node.getTagNameNode();
  const htmlTag = identifier?.getText();
  const newComponent = htmlToComponentMap[htmlTag];

  if (newComponent) {
    /** Add import to top of file */
    importsToAdd.add(newComponent);

    /** Ensure default props are set on component variation */
    if (newComponent in defaultPropsForComponentMap) {
      const defaultProps = defaultPropsForComponentMap[newComponent];
      for (const [key, value] of Object.entries(defaultProps)) {
        node.addAttribute({
          name: key,
          initializer: printNode(getAttributeValue(value)),
        });
      }
    }

    /** Replace jsx opening elements or self closing tags with html tag with katcn Component name */
    node.getTagNameNode().replaceWithText(newComponent);

    if (Node.isJsxOpeningElement(node) && node.getChildCount() > 0) {
      const parentJsxElement = node.getParent().asKind(SyntaxKind.JsxElement);
      const closingElement = parentJsxElement
        ?.getClosingElement()
        ?.getTagNameNode();
      /** Replace jsx closing tag for elements with children to match it's opening tag */
      if (closingElement?.getText() !== newComponent) {
        closingElement?.replaceWithText(newComponent);
      }
    }
  }
}

/**
 * TODO
 * - Parse style string and convert to props
 * - See if tailwind has API for taking style object and returning tailwind classnames
 */
export async function convertHtml(_html: string) {
  // TODO: temp hack since tailwind ui templates use an always color for bg
  const html = _html.replaceAll('bg-white', 'primary');
  /**
   * TODO this isn't best lib to use
   * - this is making it so that self closing img tags are doubled up
   * - svg attributes are not being converted
   */
  const htmlAsJsx = jsxlike(html).replaceAll('/ />', ' />');

  const { stdout: css } = await execa('tailwindcss', ['-i', '-'], {
    input: getCss(defaultTokensConfig),
  });

  const before = `function Page() {
    return (
      <>
        ${htmlAsJsx}
      </>
    );
  } `;
  const beforeSourceFile = project.createSourceFile('before.tsx', before, {
    overwrite: true,
  });
  const afterSourceFile = project.createSourceFile(
    'after.tsx',
    beforeSourceFile.getFullText(),
    {
      overwrite: true,
    },
  );

  const openingElement = afterSourceFile.getDescendantsOfKind(
    SyntaxKind.JsxOpeningElement,
  );
  const jsxSelfClosingElements = afterSourceFile.getDescendantsOfKind(
    SyntaxKind.JsxSelfClosingElement,
  );

  const importsToAdd = new Set<string>();

  for (const node of [...openingElement, ...jsxSelfClosingElements]) {
    /** Swap for katcn component if applicable */
    swapForComponent(node, importsToAdd);
    const attributes = node.getAttributes();

    // Catch all for any unmatched classnames
    let unmatchedClassnames = '';
    const modifierMap = {} as Record<StyleModifier, AllStyleProps>;

    for (const attribute of attributes) {
      if (attribute.isKind(SyntaxKind.JsxAttribute)) {
        const attributeName = attribute.getNameNode().getText();
        if (attributeName === 'dangerouslySetInnerHTML') {
          attribute.remove();
          break;
        }
        if (attributeName === 'class' || attributeName === 'className') {
          const initializer = attribute.getInitializer();
          if (initializer?.isKind(SyntaxKind.StringLiteral)) {
            const fullClassName = initializer.getLiteralValue();
            const classNameAsArray = fullClassName.split(' ');
            for (const item of classNameAsArray) {
              const isModifier = item.includes(':');
              if (isModifier) {
                const [modifier, propName] = item.split(':');
                const modifierMatch =
                  tailwindModifierClassNamesToReactPropsMap[modifier];
                if (modifierMatch) {
                  const modifierProps = getPropsForClassName(propName);
                  if (modifierProps) {
                    modifierMap[modifierMatch] = {
                      ...modifierMap[modifierMatch],
                      ...modifierProps,
                    };
                  }
                } else {
                  unmatchedClassnames = `${unmatchedClassnames} ${item}`;
                }
              } else {
                const styleProps = getPropsForClassName(item);
                if (styleProps) {
                  for (const [key, value] of Object.entries(styleProps)) {
                    node.addAttribute({
                      name: key,
                      initializer: printNode(
                        getAttributeValue(value as PrimitiveType),
                      ),
                    });
                  }
                } else {
                  unmatchedClassnames = `${unmatchedClassnames} ${item}`;
                }
              }
            }
            attribute.remove();
          }
        }
      }
    }

    for (const [key, value] of Object.entries(modifierMap)) {
      node.addAttribute({
        name: key,
        initializer: printNode(getAttributeValue(value as PrimitiveType)),
      });
    }

    if (unmatchedClassnames) {
      node.addAttribute({
        name: 'className',
        initializer: printNode(getAttributeValue(unmatchedClassnames.trim())),
      });
    }
  }

  const codeWithoutImports = afterSourceFile.getFullText();

  afterSourceFile.addImportDeclaration({
    moduleSpecifier: 'katcn',
    namedImports: [...importsToAdd],
  });

  const [prettyCode, prettyCss] = await Promise.all([
    prettier.format(afterSourceFile.getFullText(), {
      parser: 'babel',
      tabWidth: 2,
      useTabs: false,
    }),
    prettier.format(css, {
      parser: 'css',
    }),
  ]);

  const style = createElement('style', {
    // biome-ignore lint/security/noDangerouslySetInnerHtml: this is fine
    dangerouslySetInnerHTML: { __html: css },
  });

  return {
    style,
    preview: codeWithoutImports,
    code: prettyCode,
    css: prettyCss,
    html,
    ast: 'TODO',
  };
}
