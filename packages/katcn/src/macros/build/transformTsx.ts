/// <reference types="bun-types" />

import { Transpiler } from 'bun';
import {
  type CallExpression,
  type SourceFile,
  SyntaxKind,
  type ts,
} from 'ts-morph';
import { extractStyleProps, getStyles } from '../../getStyles';
import { KatcnStyleSheet } from '../css/stylesheet';

const varRegex = /--katcn-[^:,\s")]+/g;

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
    'katcn/macros/color/getColorRamps': {
      getColorRamps: 'katcn/macros/color/getColorRamps',
    },
  },
});

function getCallExpressionName(
  callExpression: CallExpression<ts.CallExpression>,
) {
  return callExpression.getFirstChildByKind(SyntaxKind.Identifier)?.getText();
}

interface GetPropsForExpressionOptions {
  sourceFile: SourceFile;
  callExpression: CallExpression<ts.CallExpression>;
  safelist: Set<string>;
}

function getPropsForExpression({
  sourceFile,
  callExpression,
  safelist,
}: GetPropsForExpressionOptions) {
  const fnName = getCallExpressionName(callExpression);
  const parentFn = callExpression.getFirstAncestorByKind(
    SyntaxKind.FunctionExpression,
  );
  const props = callExpression.getFirstChildByKind(
    SyntaxKind.ObjectLiteralExpression,
  );
  const propsObject = {} as Record<string, unknown>;
  let extractedProps = {} as ReturnType<typeof extractStyleProps>;

  if (props) {
    const properties = props.getProperties();
    for (const property of properties) {
      if (property.isKind(SyntaxKind.PropertyAssignment)) {
        const name = property.getName();
        if (name === 'children') continue;

        const value = property.getInitializer();
        if (!value) continue;

        if (value.isKind(SyntaxKind.StringLiteral)) {
          propsObject[name] = value.getLiteralValue();
        }

        if (value.isKind(SyntaxKind.NumericLiteral)) {
          propsObject[name] = value.getLiteralValue();
        }

        if (value.isKind(SyntaxKind.TrueKeyword)) {
          propsObject[name] = true;
        }

        if (value.isKind(SyntaxKind.FalseKeyword)) {
          propsObject[name] = false;
        }

        if (value.isKind(SyntaxKind.ConditionalExpression)) {
          const valueWhenTrue = value
            .getWhenTrue()
            .asKind(SyntaxKind.StringLiteral);

          if (valueWhenTrue) {
            const stringWhenTrue = valueWhenTrue.getLiteralValue();
            const classNameWhenTrue = getStyles({ [name]: stringWhenTrue });
            safelist.add(classNameWhenTrue);
          }

          const valueWhenFalse = value
            .getWhenFalse()
            .asKind(SyntaxKind.StringLiteral);

          if (valueWhenFalse) {
            const stringWhenFalse = valueWhenFalse.getLiteralValue();
            const classNameWhenFalse = getStyles({
              [name]: stringWhenFalse,
            });
            safelist.add(classNameWhenFalse);
          }
          // TODO: handle if conditional is not resolved
        }
      }

      /**
       * Handle shorthand properties
       * @example
       *
        import { Box } from 'katcn';

        function Example1() {
          return <Box backgroundColor="accent" />;
        }

        function Example2() {
          const backgroundColor="accent";
          return <Box backgroundColor={backgroundColor} />;
        }

        const backgroundColor="accent";
        function Example3() {
          return <Box backgroundColor={backgroundColor} />;
        }
       */
      if (property.isKind(SyntaxKind.ShorthandPropertyAssignment)) {
        const name = property.getName();
        if (name === 'children') continue;
        const valueDeclaration =
          sourceFile.getVariableDeclaration(name) ??
          // the var might be scoped to the parent function aka component
          parentFn?.getVariableDeclaration(name);

        if (valueDeclaration) {
          const valueDeclarationInitializer = valueDeclaration.getInitializer();
          if (!valueDeclarationInitializer) continue;

          if (valueDeclarationInitializer.isKind(SyntaxKind.StringLiteral)) {
            propsObject[name] = valueDeclarationInitializer.getLiteralValue();
          }

          if (valueDeclarationInitializer.isKind(SyntaxKind.NumericLiteral)) {
            propsObject[name] = valueDeclarationInitializer.getLiteralValue();
          }

          if (valueDeclarationInitializer.isKind(SyntaxKind.TrueKeyword)) {
            propsObject[name] = true;
          }

          if (valueDeclarationInitializer.isKind(SyntaxKind.FalseKeyword)) {
            propsObject[name] = false;
          }
        }
      }
    }
  }

  if (fnName === 'getStyles') {
    // TODO: Find where getStyles is applied and use that component name?
    extractedProps.className = getStyles(propsObject);
  } else {
    /** Process component props, which are not in style props */
    /**
     * Process first arg of expression to see if we can process props
     * @example
     * jsx('div', { className: 'text-red-500' }) // not a component
     * jsx(Text, { variant: 'body1' }) // component
     */
    const firstArg = callExpression.getArguments()[0];
    const firstArgText = firstArg.getText();
    if (firstArg.isKind(SyntaxKind.StringLiteral)) {
      // this is a native html element i.e. 'body', 'div', etc
      // TODO: extract className prop
    } else {
      // this is a component
      const symbol = firstArg.getSymbol();
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
              extractedProps = extractStyleProps(propsObject, firstArgText);
            }
          }
        }
      }
    }
  }

  if (extractedProps?.className) {
    const splitClassNames = extractedProps.className
      .trimStart()
      .trimEnd()
      .split(' ');
    for (const splitClassName of splitClassNames) {
      safelist.add(splitClassName);
    }
  }
}

const jsxFnNames = ['jsxDEV', 'jsx', 'jsxs', '_jsxDEV', '_jsx', '_jsxs'];

function isJsxCallExpression(
  callExpression: CallExpression<ts.CallExpression>,
) {
  const fnCalled = getCallExpressionName(callExpression);
  return fnCalled && jsxFnNames.includes(fnCalled);
}

function isGetStylesExpression(
  callExpression: CallExpression<ts.CallExpression>,
) {
  const fnCalled = callExpression
    .getFirstChildByKind(SyntaxKind.Identifier)
    ?.getText();

  return fnCalled === 'getStyles';
}

export function transformTsx({
  stylesheet = new KatcnStyleSheet(),
  sourceFile,
  removeImports,
}: {
  sourceFile: SourceFile;
  stylesheet?: KatcnStyleSheet;
  removeImports?: boolean;
}) {
  const content = sourceFile.getFullText();
  const filePath = sourceFile.getFilePath();
  let safelist = stylesheet.safelist.get(filePath);
  const varsRegistry = stylesheet.varsSafelist;

  if (!safelist) {
    safelist = new Set<string>();
    stylesheet.safelist.set(filePath, safelist);
  }

  const jsContent = transpiler.transformSync(content);

  const foundVars = jsContent.matchAll(varRegex);
  for (const variable of foundVars) {
    varsRegistry.add(variable[0]);
  }

  /**
   * Infer classnames from dynamic props based on types
   */
  const jsxSelfClosingElements = sourceFile.getDescendantsOfKind(
    SyntaxKind.JsxSelfClosingElement,
  );
  const jsxOpeningElements = sourceFile.getDescendantsOfKind(
    SyntaxKind.JsxOpeningElement,
  );
  for (const jsxSelfClosingElement of [
    ...jsxSelfClosingElements,
    ...jsxOpeningElements,
  ]) {
    if (jsxSelfClosingElement.getAttributes().length === 0) continue;
    const props = jsxSelfClosingElement.getAttributes();
    for (const prop of props) {
      if (prop.isKind(SyntaxKind.JsxSpreadAttribute)) continue;
      if (prop.isKind(SyntaxKind.JsxAttribute)) {
        const propName = prop.getNameNode().getText();
        const propValue = prop.getInitializer();
        if (propValue?.isKind(SyntaxKind.JsxExpression)) {
          const expression = propValue.getExpression();
          const identifierType = expression?.getType();
          if (identifierType?.isUnion()) {
            const unionTypes = identifierType.getUnionTypes();
            for (const unionType of unionTypes) {
              const dynamicValue = unionType.getText().replaceAll('"', '');
              const dynamicClassname = getStyles({
                [propName]: dynamicValue,
              });
              safelist.add(dynamicClassname);
            }
          }
        }
      }
    }
  }

  sourceFile.replaceWithText(jsContent);

  const callExpressions = sourceFile.getDescendantsOfKind(
    SyntaxKind.CallExpression,
  );
  for (const callExpression of callExpressions) {
    if (isJsxCallExpression(callExpression)) {
      getPropsForExpression({
        sourceFile,
        callExpression,
        safelist,
      });
      for (const childCallExpression of callExpression
        .getChildrenOfKind(SyntaxKind.CallExpression)
        .filter(isJsxCallExpression)) {
        getPropsForExpression({
          sourceFile,
          callExpression: childCallExpression,
          safelist,
        });
      }
    }
    if (isGetStylesExpression(callExpression)) {
      getPropsForExpression({
        sourceFile,
        callExpression,
        safelist,
      });
    }
  }

  if (removeImports) {
    for (const importDecl of sourceFile.getImportDeclarations()) {
      importDecl.remove();
    }
  }

  return {
    stylesheet,
    js: sourceFile.getFullText(), // ensures the sourceFile is updated
  };
}
