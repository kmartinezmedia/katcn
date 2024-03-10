import crypto from 'node:crypto';
import { transformSync } from '@babel/core';

import {
  type CallExpression,
  Project,
  type SourceFile,
  SyntaxKind,
  type ts,
} from 'ts-morph';
import { extractStyleProps } from '#extractStyleProps';
import { getStyles } from '#getStyles';

const babelConfig = {
  presets: [['@babel/preset-typescript', { isTSX: true, allExtensions: true }]],
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
        importSource: 'katcn',
      },
    ],
  ],
  filename: '.turbo/placeholder-required-for-babel-to-transpile.ts',
};

function getCallExpressionName(
  callExpression: CallExpression<ts.CallExpression>,
) {
  return callExpression.getFirstChildByKind(SyntaxKind.Identifier)?.getText();
}

function getPropsForExpression({
  sourceFile,
  callExpression,
  classNames,
}: {
  sourceFile: SourceFile;
  callExpression: CallExpression<ts.CallExpression>;
  classNames: Set<string>;
}) {
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
      classNames.add(extractedProps.className);
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

export function transformTsx(content: string) {
  const tsConfigFilePath = `${process.env.PWD}/tsconfig.json`;

  const project = new Project({
    tsConfigFilePath,
    skipAddingFilesFromTsConfig: true,
  });

  const newContent = transformSync(content, babelConfig)?.code ?? '';

  const classNames = new Set<string>();
  const hashedName = crypto
    .createHash('md5')
    .update(newContent, 'utf8')
    .digest('hex');

  const sourceFile = project.createSourceFile(
    `${process.env.PWD}/.next/purge/${hashedName}.js`,
    newContent,
    { overwrite: true },
  );

  sourceFile.saveSync();
  const callExpressions = sourceFile.getDescendantsOfKind(
    SyntaxKind.CallExpression,
  );
  for (const callExpression of callExpressions) {
    if (isJsxCallExpression(callExpression)) {
      getPropsForExpression({ sourceFile, callExpression, classNames });
      for (const childCallExpression of callExpression
        .getChildrenOfKind(SyntaxKind.CallExpression)
        .filter(isJsxCallExpression)) {
        getPropsForExpression({
          sourceFile,
          callExpression: childCallExpression,
          classNames,
        });
      }
    }
    if (isGetStylesExpression(callExpression)) {
      getPropsForExpression({ sourceFile, callExpression, classNames });
    }
  }

  if (classNames.size > 0) {
    const classNamesAsString = Array.from(classNames).join(' ');
    return `<div className="${classNamesAsString}" />`;
  }

  return newContent;
}
