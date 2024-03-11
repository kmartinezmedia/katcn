import {
  type CallExpression,
  type Project,
  type SourceFile,
  SyntaxKind,
  type ts,
} from 'ts-morph';
import { extractStyleProps } from '#extractStyleProps';
import { getStyles } from '#getStyles';
import { Transpiler } from 'bun';
import path from 'node:path';

const varRegex = /--katcn-[^:,)\s]+/g;

const transpiler = new Transpiler({
  loader: 'tsx',
  tsconfig: {
    compilerOptions: {
      jsx: 'react-jsx',
      jsxImportSource: 'katcn',
    },
  },
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

interface TransformTsxOptiosn {
  project: Project;
  content: string;
  filePath: string;
}

export function transformTsx({
  project,
  content,
  filePath,
}: TransformTsxOptiosn) {
  const classNamesToKeep = new Set<string>();
  const varsToKeep = new Set<string>();

  const newContent = transpiler.transformSync(content);
  const relativeFilePath = path.relative(process.env.PWD, filePath);

  const foundVars = newContent.matchAll(varRegex);
  for (const variable of foundVars) {
    varsToKeep.add(variable[0]);
  }

  const sourceFile = project.createSourceFile(
    `${Bun.env.PWD}/.katcn/${relativeFilePath.replace('.tsx', '.js')}`,
    newContent,
    { overwrite: true },
  );

  sourceFile.saveSync();
  const callExpressions = sourceFile.getDescendantsOfKind(
    SyntaxKind.CallExpression,
  );
  for (const callExpression of callExpressions) {
    if (isJsxCallExpression(callExpression)) {
      getPropsForExpression({
        sourceFile,
        callExpression,
        classNamesToKeep,
      });
      for (const childCallExpression of callExpression
        .getChildrenOfKind(SyntaxKind.CallExpression)
        .filter(isJsxCallExpression)) {
        getPropsForExpression({
          sourceFile,
          callExpression: childCallExpression,
          classNamesToKeep,
        });
      }
    }
    if (isGetStylesExpression(callExpression)) {
      getPropsForExpression({
        sourceFile,
        callExpression,
        classNamesToKeep,
      });
    }
  }

  return { classNamesToKeep, varsToKeep };
}
