/// <reference types="bun-types" />

import { Transpiler, hash } from 'bun';

import { Project, SyntaxKind } from 'ts-morph';
import { extractStyleProps } from '../styles/extractStyleProps';

const tsConfigFilePath = `${Bun.env.PWD}/tsconfig.json`;

console.log('tsConfigFilePath', tsConfigFilePath);

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

export function transformTsx(content: string) {
  console.info(
    `
/* -------------------------------------------------------------------------- */
/*                                   BEFORE                                   */
/* -------------------------------------------------------------------------- */
`,
    content,
  );
  const newContent = tsxTranspiler.transformSync(content);

  console.info(
    `
  /* -------------------------------------------------------------------------- */
  /*                                    AFTER                                   */
  /* -------------------------------------------------------------------------- */
  `,
    newContent,
  );

  let className = '';

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
      const extractedProps = extractStyleProps(propsObject);
      if (extractedProps.className) {
        className = extractedProps.className;
      }
    }
  }
  if (className) {
    return `<div className="${className}" />`;
  }
  return newContent;
}
