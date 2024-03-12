/// <reference types="bun-types" />

import { Transpiler } from 'bun';
import {
  type CallExpression,
  type SourceFile,
  SyntaxKind,
  type ts,
} from 'ts-morph';
import { extractStyleProps, getStyles } from '../../getStyles';

const varRegex = /--katcn-[^:,\s")]+/g;

Bun.env.NODE_ENV;
const transpiler = new Transpiler({
  loader: 'tsx',
  define: { 'process.env.NODE_ENV': 'production' },
  tsconfig: {
    compilerOptions: {
      jsx: 'react-jsx',
      jsxImportSource: 'katcn',
    },
  },
  autoImportJSX: false,
  macro: {
    katcn: {
      getStyles: 'katcn/getStyles',
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
  classNamesToKeep?: Set<string>;
}

function getPropsForExpression({
  sourceFile,
  callExpression,
  classNamesToKeep = new Set<string>(),
}: GetPropsForExpressionOptions) {
  const fnName = getCallExpressionName(callExpression);
  const props = callExpression.getFirstChildByKind(
    SyntaxKind.ObjectLiteralExpression,
  );

  if (props) {
    const properties = props.getProperties();
    const propsObject = {} as Record<string, unknown>;
    for (const property of properties) {
      if (property.isKind(SyntaxKind.PropertyAssignment)) {
        const name = property.getName();
        const value = property.getInitializer();
        if (name !== 'children' && value) {
          if (value.isKind(SyntaxKind.StringLiteral)) {
            propsObject[name] = value.getLiteralValue();
          }
        }
      }
      if (property.isKind(SyntaxKind.ShorthandPropertyAssignment)) {
        const name = property.getName();
        const valueDeclaration = sourceFile.getVariableDeclaration(name);
        const value = valueDeclaration?.getInitializer();
        if (name !== 'children' && value) {
          if (value.isKind(SyntaxKind.StringLiteral)) {
            propsObject[name] = value.getLiteralValue();
          }
        }
      }
    }

    let extractedProps = {} as ReturnType<typeof extractStyleProps>;

    if (fnName === 'getStyles') {
      // TODO: Find where getStyles is applied and use that component name?
      extractedProps.className = getStyles(propsObject);
    } else {
      // get import for the call expression's first argument is a component aka not a string
      const firstArg = callExpression.getArguments()[0];
      const firstArgText = firstArg.getText();
      if (firstArg.isKind(SyntaxKind.StringLiteral)) {
        // this is a native html element i.e. 'body', 'div', etc
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
      classNamesToKeep.add(extractedProps.className);
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

export function transformTsx(sourceFile: SourceFile) {
  const project = sourceFile.getProject();
  const content = sourceFile.getFullText();
  const filePath = sourceFile.getFilePath();

  const classNamesToKeep = new Set<string>();
  const varsToKeep = new Set<string>();

  const jsContent = transpiler.transformSync(content);

  const foundVars = jsContent.matchAll(varRegex);
  for (const variable of foundVars) {
    varsToKeep.add(variable[0]);
  }

  const sourceFile2 = project.createSourceFile(
    `transformTsx/${filePath}`,
    jsContent,
    {
      overwrite: true,
    },
  );

  const callExpressions = sourceFile2.getDescendantsOfKind(
    SyntaxKind.CallExpression,
  );
  for (const callExpression of callExpressions) {
    if (isJsxCallExpression(callExpression)) {
      getPropsForExpression({
        sourceFile: sourceFile2,
        callExpression,
        classNamesToKeep,
      });
      for (const childCallExpression of callExpression
        .getChildrenOfKind(SyntaxKind.CallExpression)
        .filter(isJsxCallExpression)) {
        getPropsForExpression({
          sourceFile: sourceFile2,
          callExpression: childCallExpression,
          classNamesToKeep,
        });
      }
    }
    if (isGetStylesExpression(callExpression)) {
      getPropsForExpression({
        sourceFile: sourceFile2,
        callExpression,
        classNamesToKeep,
      });
    }
  }

  // ensure classNames are split by spaces and unique
  const finalClassNamesToKeep = new Set<string>();
  for (const className of classNamesToKeep) {
    const splitClassNames = className.trimStart().trimEnd().split(' ');
    for (const splitClassName of splitClassNames) {
      finalClassNamesToKeep.add(splitClassName);
    }
  }

  return {
    classNamesToKeep: finalClassNamesToKeep,
    varsToKeep,
    jsContent,
  };
}
