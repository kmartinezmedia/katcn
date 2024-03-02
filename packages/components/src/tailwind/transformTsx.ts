/// <reference types="bun-types" />

import { Transpiler, hash } from 'bun';

import { CallExpression, Project, SourceFile, SyntaxKind, ts } from 'ts-morph';
import { extractStyleProps } from '../styles/extractStyleProps';

const tsConfigFilePath = `${Bun.env.PWD}/tsconfig.json`;

const project = new Project({
  tsConfigFilePath,
  skipAddingFilesFromTsConfig: true,
});

const tsxTranspiler = new Transpiler({
  loader: 'tsx',
  macro: {
    'katcn/styles/getStyles': {
      getStyles: 'katcn/styles/getStyles',
    },
  },
});

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
      /**
       * import {Text} from "katcn/ui/Text";
       * export default function Home() {
       *   return jsxDEV(Text, {
       *     color: "alert", // this is the prop
       *     backgroundColor: "accent", // this is the prop
       *     children: "something"
       *   }, undefined, false, undefined, this);
       * }
       */
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
    if (extractedProps.className) {
      classNames.add(extractedProps.className);
    }
  }
}

function isJsxCallExpression(
  callExpression: CallExpression<ts.CallExpression>,
) {
  const fnCalled = callExpression
    .getFirstChildByKind(SyntaxKind.Identifier)
    ?.getText();

  return fnCalled === 'jsxDEV' || fnCalled === 'jsx';
}

export function transformTsx(content: string) {
  const newContent = tsxTranspiler.transformSync(content);

  //   console.info(
  //     `
  // /* -------------------------------------------------------------------------- */
  // /*                                   BEFORE                                   */
  // /* -------------------------------------------------------------------------- */
  // `,
  //     content,
  //   );

  //   console.info(
  //     `
  //   /* -------------------------------------------------------------------------- */
  //   /*                                    AFTER                                   */
  //   /* -------------------------------------------------------------------------- */
  //   `,
  //     newContent,
  //   );

  const classNames = new Set<string>();
  const hashedName = hash(newContent);
  const sourceFile = project.createSourceFile(
    `${Bun.env.PWD}/.next/purge/${hashedName}.js`,
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
