/// <reference types="bun-types" />

import path from 'node:path';
import { Transpiler } from 'bun';
import {
  type Expression,
  type JsxAttribute,
  type JsxOpeningElement,
  type JsxSelfClosingElement,
  type Node,
  type SourceFile,
  SyntaxKind,
  type VariableDeclaration,
  type ts,
} from 'ts-morph';
import { extractStyleProps, getStyles } from '../../getStyles';
import type { KatcnStyleSheet } from '../css/stylesheet';

const varRegex = /--[^:,\s")]+/g;
const transpiler = new Transpiler({
  loader: 'tsx',
  tsconfig: {
    compilerOptions: {
      jsx: 'react-jsx',
      jsxImportSource: 'katcn',
    },
  },
  autoImportJSX: false,
  macro: {
    'katcn/getStyles': {
      getStyles: 'katcn/getStyles',
    },
  },
});

interface GetPropsForExpressionOptions {
  sourceFile: SourceFile;
  jsxElement: JsxOpeningElement | JsxSelfClosingElement;
}

function findVariableDeclaration(
  variableName: string,
  startNode: Node,
): VariableDeclaration | undefined {
  // Search within the current scope
  let currentScope: Node | undefined = startNode;

  while (currentScope) {
    // Get all variable declarations in the current scope
    const varDeclarations = currentScope.getDescendantsOfKind(
      SyntaxKind.VariableDeclaration,
    );

    // Find a variable declaration that matches the variable name
    const declaration = varDeclarations.find(
      (decl) => decl.getName() === variableName,
    );

    if (declaration) {
      return declaration; // Return the matching declaration
    }

    // Move up to the parent scope
    currentScope = currentScope.getParent();
  }

  // If we reach here, no matching declaration was found in any of the parent scopes
  return undefined;
}

function processExpression(
  name: string,
  expression: Expression<ts.Expression>,
): Record<string, unknown> | undefined {
  if (expression.isKind(SyntaxKind.StringLiteral)) {
    return {
      [name]: expression.getLiteralValue(),
    };
  }

  if (expression.isKind(SyntaxKind.NumericLiteral)) {
    const props = {
      [name]: expression.getLiteralValue(),
    };
    return props;
  }

  if (expression.isKind(SyntaxKind.TrueKeyword)) {
    return {
      [name]: true,
    };
  }

  if (expression.isKind(SyntaxKind.FalseKeyword)) {
    return {
      [name]: false,
    };
  }

  if (expression.isKind(SyntaxKind.ConditionalExpression)) {
    const expressionWhenTrue = expression
      .getWhenTrue()
      .asKind(SyntaxKind.StringLiteral);

    if (expressionWhenTrue) {
      const stringWhenTrue = expressionWhenTrue.getLiteralValue();
      return { [name]: stringWhenTrue };
    }

    const expressionWhenFalse = expression
      .getWhenFalse()
      .asKind(SyntaxKind.StringLiteral);

    if (expressionWhenFalse) {
      const stringWhenFalse = expressionWhenFalse.getLiteralValue();
      return {
        [name]: stringWhenFalse,
      };
    }
    // TODO: handle if conditional is not resolved
  }
}

function processGetStyles(expression: Expression<ts.Expression>) {
  // this is getStyles fn or something similar
  const propsObjectLiteralExpression = expression.getFirstDescendantByKind(
    SyntaxKind.ObjectLiteralExpression,
  );
  const properties = propsObjectLiteralExpression?.getProperties();
  if (!properties) return;
  const props: Record<string, unknown> = {};
  for (const prop of properties) {
    if (prop.isKind(SyntaxKind.PropertyAssignment)) {
      const propName = prop.getNameNode().getText();
      const propValue = prop.getInitializer();
      if (propValue?.isKind(SyntaxKind.StringLiteral)) {
        props[propName] = propValue.getLiteralValue();
      }
    }
  }

  return props;
}

function processCallExpression(expression: Expression<ts.Expression>) {
  const fnCalled = expression
    .getFirstChildByKind(SyntaxKind.Identifier)
    ?.getText();

  if (fnCalled === 'getStyles') {
    return processGetStyles(expression);
  }
}

function processJsxAttributeInitializer(
  name: string,
  sourceFile: SourceFile,
  initializer: ReturnType<JsxAttribute['getInitializer']>,
): Record<string, unknown> | undefined {
  if (!initializer) return;
  /**
    import { Box } from 'katcn';

    function Example1() {
      return <Box backgroundColor="accent" />;
    }

    */

  if (initializer.isKind(SyntaxKind.StringLiteral)) {
    return {
      [name]: initializer.getLiteralValue(),
    };
  }

  /**
    import { Box } from 'katcn';

    function Example2() {
      const backgroundColor="accent";
      return <Box backgroundColor={backgroundColor} />;
    }

    const backgroundColor="accent";
    function Example3() {
      return <Box backgroundColor={backgroundColor} />;
    }
    */

  if (initializer.isKind(SyntaxKind.JsxExpression)) {
    const expression = initializer.getExpression();
    if (!expression) return;

    if (expression.isKind(SyntaxKind.Identifier)) {
      const identifierName = expression.getText();

      const variableDeclarationForExpression = findVariableDeclaration(
        identifierName,
        sourceFile,
      );

      const variableDeclarationForExpressionInitializer =
        variableDeclarationForExpression?.getInitializer();

      const isCallExpression =
        variableDeclarationForExpressionInitializer?.isKind(
          SyntaxKind.CallExpression,
        );

      if (variableDeclarationForExpressionInitializer) {
        if (isCallExpression) {
          return processCallExpression(
            variableDeclarationForExpressionInitializer,
          );
        }

        return processExpression(
          name,
          variableDeclarationForExpressionInitializer,
        );
      }
    }

    // Dynamic props
    const identifierType = expression?.getType();
    if (identifierType?.isUnion()) {
      const unionTypes = identifierType.getUnionTypes();
      const classnames: string[] = [];
      for (const unionType of unionTypes) {
        const dynamicValue = unionType.getText().replaceAll('"', '');
        const props = { [name]: dynamicValue };
        const classname = getStyles(props);
        classnames.push(classname);
      }
      return { className: classnames.join(' ') };
    }

    return processExpression(name, expression);
  }
}

function processJsxElement({
  sourceFile,
  jsxElement,
}: GetPropsForExpressionOptions) {
  const allProps: Set<Record<string, unknown>> = new Set();

  const componentName = jsxElement.getTagNameNode().getText();
  const isCustomComponent = componentName[0] === componentName[0].toUpperCase();

  if (!isCustomComponent) {
    const classnameProp = jsxElement.getAttribute('className');
    if (classnameProp) {
      if (classnameProp.isKind(SyntaxKind.JsxSpreadAttribute)) return;
      if (!classnameProp.isKind(SyntaxKind.JsxAttribute)) return;
      const classNameInitializer = classnameProp.getInitializer();
      const props = processJsxAttributeInitializer(
        'className',
        sourceFile,
        classNameInitializer,
      );
      if (props) {
        allProps.add(props);
      }
    }
  }

  if (isCustomComponent) {
    const attributes = jsxElement.getAttributes();
    for (const attribute of attributes) {
      // TODO: handle spread attributes
      if (attribute.isKind(SyntaxKind.JsxSpreadAttribute)) continue;
      const name = attribute.getNameNode().getText();
      const isChildrenProp = name === 'children';

      if (isChildrenProp) continue;
      const initializer = attribute?.getInitializer();
      const props = processJsxAttributeInitializer(
        name,
        sourceFile,
        initializer,
      );

      if (props) {
        allProps.add(props);
      }
    }
  }
  return allProps;
}

function isKatcnComponent(jsxElement: Node): boolean {
  const identifier = jsxElement.getFirstChildByKind(SyntaxKind.Identifier);
  const symbol = identifier?.getSymbol();
  const declarations = symbol?.getDeclarations();
  if (declarations) {
    for (const declaration of declarations) {
      const importDeclaration = declaration.getFirstAncestorByKind(
        SyntaxKind.ImportDeclaration,
      );
      /**
       * Only extract props from allowed packages.
       * This is to avoid any performance issues by unnecessarily extracting props from all packages
       */
      if (importDeclaration) {
        const importPath = importDeclaration.getModuleSpecifierValue();
        // if katcn then go straight to extracting props
        if (importPath.startsWith('katcn')) {
          return true;
        }
      }
    }
  }

  // If the component wasn't imported, it might be a global or declared in the file
  return false;
}

export function transformTsx({
  stylesheet,
  sourceFile,
  removeImports,
}: {
  sourceFile: SourceFile;
  stylesheet: KatcnStyleSheet;
  removeImports?: boolean;
}) {
  const content = sourceFile.getFullText();
  const filePath = sourceFile.getFilePath();
  const safelist = stylesheet.safelist.get(filePath) ?? new Set<string>();
  const varsRegistry = stylesheet.varsSafelist;
  const foundVars = content.matchAll(varRegex);
  for (const variable of foundVars) {
    varsRegistry.add(variable[0]);
  }

  const openingElements = sourceFile.getDescendantsOfKind(
    SyntaxKind.JsxOpeningElement,
  );
  const selfClosingElements = sourceFile.getDescendantsOfKind(
    SyntaxKind.JsxSelfClosingElement,
  );

  for (const jsxElement of [...openingElements, ...selfClosingElements]) {
    // determine if component is from package
    const componentName = jsxElement.getTagNameNode().getText();
    const isValidComponent = isKatcnComponent(jsxElement);
    if (isValidComponent) {
      const finalProps: Record<string, unknown> = {};
      const propsSet = processJsxElement({
        sourceFile,
        jsxElement,
      });
      if (propsSet) {
        for (const propObject of propsSet) {
          for (const prop in propObject) {
            const propValue = propObject[prop];
            if (prop === 'className') {
              finalProps[prop] = `${
                finalProps?.className ?? ''
              } ${propValue}`.trimStart();
            } else {
              finalProps[prop] = propValue;
            }
          }
        }
      }

      const { className } = extractStyleProps(finalProps, componentName);
      if (className) {
        safelist.add(className);
      } else {
        console.log('No className for element', {
          element: jsxElement.getText(),
          props: finalProps,
        });
      }
    }
  }

  stylesheet.safelist.set(filePath, safelist);

  const jsContent = transpiler.transformSync(content);
  const parsedPath = path.parse(filePath);
  const transformedSourceFile = sourceFile
    .getProject()
    .createSourceFile(filePath.replace(parsedPath.ext, '.min.js'), jsContent, {
      overwrite: true,
    });

  if (removeImports) {
    for (const importDecl of transformedSourceFile.getImportDeclarations()) {
      importDecl.remove();
    }
  }

  return {
    stylesheet,
    js: sourceFile.getFullText(), // ensures the sourceFile is updated
    jsTransformed: transformedSourceFile.getFullText(),
  };
}
