import crypto from 'node:crypto';
import { transformSync } from '@babel/core';

import { CallExpression, Project, SourceFile, SyntaxKind, ts } from 'ts-morph';
import { extractStyleProps } from '../styles/extractStyleProps';

const tsConfigFilePath = `${process.env.PWD}/tsconfig.json`;

const project = new Project({
  tsConfigFilePath,
  skipAddingFilesFromTsConfig: true,
});

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

function getPropsForExpression({
  sourceFile,
  callExpression,
  classNames,
}: {
  sourceFile: SourceFile;
  callExpression: CallExpression<ts.CallExpression>;
  classNames: Set<string>;
}) {
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

    const componentName = callExpression.getArguments()[0].getText();
    if (!componentName) {
      console.log(callExpression.getText());
    }

    const extractedProps = extractStyleProps(propsObject, componentName);
    if (extractedProps?.className) {
      classNames.add(extractedProps.className);
    }
  }
}

const jsxFnNames = ['jsxDEV', 'jsx', 'jsxs', '_jsxDEV', '_jsx', '_jsxs'];
function isJsxCallExpression(
  callExpression: CallExpression<ts.CallExpression>,
) {
  const fnCalled = callExpression
    .getFirstChildByKind(SyntaxKind.Identifier)
    ?.getText();

  return fnCalled && jsxFnNames.includes(fnCalled);
}

export function transformTsx(content: string) {
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
  }

  if (classNames.size > 0) {
    const classNamesAsString = Array.from(classNames).join(' ');
    return `<div className="${classNamesAsString}" />`;
  }

  return newContent;
}
