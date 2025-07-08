import {
  type MemberExpression,
  type Node,
  type ObjectLiteralExpression,
  type SourceFile,
  SyntaxKind,
} from 'ts-morph';
import { withDefaultProps } from '#components';
import { modifiers } from '#fixtures/modifiers';
import { isStyleProp } from '#fixtures/props';
import { getStyles } from '#getStyles';
import type { SafelistMap } from '../types';
import { flattenSafelist } from './flattenSafelist';

function getVar(variableName: string, startNode: Node): Node | undefined {
  // Search within the current scope
  let currentScope: Node | undefined = startNode;

  while (currentScope) {
    // Get all variable declarations in the current scope
    const varDecls = currentScope.getDescendantsOfKind(
      SyntaxKind.VariableDeclaration,
    );

    // Find a variable declaration that matches the variable name
    const declaration = varDecls.find(
      (decl) => decl.getName() === variableName,
    );

    if (declaration) {
      const initializer = declaration.getInitializer();
      if (initializer) {
        return initializer;
      }
    }

    // Move up to the parent scope
    currentScope = currentScope.getParent();
  }
  // If we reach here, no matching declaration was found in any of the parent scopes
  return undefined;
}

function processElementAccessExpression(el: MemberExpression) {
  let classname = '';
  if (el) {
    const varDecl = el
      .getFirstChildByKind(SyntaxKind.Identifier)
      ?.getSymbol()
      ?.getValueDeclaration();

    if (varDecl?.isKind(SyntaxKind.VariableDeclaration)) {
      // confirm variable is using createVariants helper
      const createVariantsFn = varDecl?.getFirstChildByKind(
        SyntaxKind.CallExpression,
      );

      if (createVariantsFn) {
        const firstArgument = createVariantsFn.getArguments()[0];
        if (firstArgument.isKind(SyntaxKind.ObjectLiteralExpression)) {
          const propAssignments = firstArgument.getChildrenOfKind(
            SyntaxKind.PropertyAssignment,
          );
          for (const propAssignment of propAssignments) {
            const allObjectLiteralExpressions =
              propAssignment.getChildrenOfKind(
                SyntaxKind.ObjectLiteralExpression,
              );
            for (const objectLiteralExpression of allObjectLiteralExpressions) {
              const props = getPropsFromObjectLiteralExpression(
                objectLiteralExpression,
              );
              if (!props) continue;
              const classnameForProps = getStyles(props, { twMerge: false });
              classname = classname
                ? `${classname} ${classnameForProps}`
                : classnameForProps;
            }
          }
        }
      }
    }
  }

  if (classname) {
    return {
      className: classname,
    };
  }
}

const errorsShown = new Set<string>();

function processNodeTypes(
  name: string,
  node: Node,
): Record<string, unknown> | undefined {
  if (!isStyleProp(name)) return;
  const nodeType = node?.getType();
  if (!nodeType) return;
  if (nodeType.isUnion()) {
    const unionTypes = nodeType.getUnionTypes();
    const classnames: string[] = [];
    for (const unionType of unionTypes) {
      const dynamicValue = unionType.getLiteralValue();
      const props = { [name]: dynamicValue };
      const classname = getStyles(props, { twMerge: false });
      classnames.push(classname);
    }
    if (classnames.length >= 10) {
      const length = classnames.length;
      const fileToCheck = node.getSourceFile().getFilePath();
      const valueToCheck = node.getText();
      const nodeId = `${fileToCheck}:${valueToCheck}`;

      if (process.env.NODE_ENV !== 'test') {
        if (!errorsShown.has(nodeId)) {
          errorsShown.add(nodeId);
          console.error(
            `--------------------------------------------------------------------------
${length} PERMUTATIONS WILL BE INCLUDED IN CSS DUE TO DYNAMIC STYLE PROPS

CHECK THE FOLLOWING:
--------------------------------------------------------------------------
File                : ${fileToCheck}
Prop                : ${name}
TS type source      : ${valueToCheck}
# Generated classes : ${length}
--------------------------------------------------------------------------

`.trim(),
          );
        }
      }
    }

    const props = { className: classnames.join(' ') };
    return props;
  }

  const value = nodeType.getLiteralValue();
  const props = { [name]: value };
  return props;
}

function getPropsFromObjectLiteralExpression(
  objectLiteralExpression?: ObjectLiteralExpression,
) {
  const properties = objectLiteralExpression?.getProperties();
  if (!properties) return;
  const props: Record<string, unknown> = {};

  for (const prop of properties) {
    if (prop.isKind(SyntaxKind.PropertyAssignment)) {
      const propName = prop.getNameNode().getText();
      const propValue = prop.getInitializer();
      if (propValue?.isKind(SyntaxKind.StringLiteral)) {
        props[propName] = propValue.getLiteralValue();
      }
      if (propValue?.isKind(SyntaxKind.NumericLiteral)) {
        props[propName] = propValue.getLiteralValue();
      }
      if (propValue?.isKind(SyntaxKind.TrueKeyword)) {
        props[propName] = true;
      }
      if (propValue?.isKind(SyntaxKind.FalseKeyword)) {
        props[propName] = false;
      }
      if (propValue?.isKind(SyntaxKind.ObjectLiteralExpression)) {
        if (modifiers.includes(propName as (typeof modifiers)[number])) {
          props[propName] = getPropsFromObjectLiteralExpression(propValue);
        }
      }
    }
  }

  return props;
}

export function processSafelistForSourceFile({
  safelistMap,
  sourceFile,
}: {
  safelistMap: SafelistMap;
  sourceFile: SourceFile;
}) {
  const filePath = sourceFile.getFilePath();
  const safelist = safelistMap.get(filePath) ?? new Set<string>();
  const imports = sourceFile.getImportDeclarations();
  const nowImports = imports.filter(
    (item) => item.getModuleSpecifierValue() === 'katcn',
  );
  const usedNowComponents = nowImports
    .map((item) => item.getNamedImports())
    .flatMap((item) => item.map((item) => item.getName()));

  const jsxElements = sourceFile
    .getDescendantsOfKind(SyntaxKind.JsxOpeningElement)
    .filter((item) =>
      usedNowComponents.includes(item.getTagNameNode().getText()),
    );

  const jsxSelfClosingElements = sourceFile
    .getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement)
    .filter((item) =>
      usedNowComponents.includes(item.getTagNameNode().getText()),
    );

  const propsArray = [...jsxElements, ...jsxSelfClosingElements]
    .flatMap(
      (
        jsxElement,
      ): (undefined | [string, Record<string, unknown> | undefined])[] => {
        const componentName = jsxElement.getTagNameNode().getText();
        return jsxElement.getAttributes().map((attribute) => {
          let name: string | undefined;
          let node: Node | undefined;

          /** Handle spread attributes */
          if (attribute.isKind(SyntaxKind.JsxSpreadAttribute)) {
            node = attribute.getExpression();
          }

          /** Handle regular jsx attributes */
          if (attribute.isKind(SyntaxKind.JsxAttribute)) {
            name = attribute.getNameNode().getText();
            node = attribute.getInitializer() as Node;

            /** This is prop without value like `border` and is implicitly true */
            if (node === undefined) {
              if (attribute.getType().isBooleanLiteral()) {
                return [componentName, { [name]: true }];
              }
              return;
            }
          }

          if (!node) return;

          if (node.isKind(SyntaxKind.JsxExpression)) {
            const expression = node.getExpression();
            if (!expression) return;

            if (expression?.isKind(SyntaxKind.Identifier)) {
              const value = expression.getText();
              const varDecl = getVar(value, node.getSourceFile());

              if (varDecl) {
                node = varDecl;
              }
            } else {
              node = expression;
            }
          }

          if (name) {
            if (node.isKind(SyntaxKind.AsExpression)) {
              return [componentName, processNodeTypes(name, node)];
            }

            if (node.isKind(SyntaxKind.StringLiteral)) {
              return [
                componentName,
                {
                  [name]: node.getLiteralValue(),
                },
              ];
            }

            if (node.isKind(SyntaxKind.NumericLiteral)) {
              const props = {
                [name]: node.getLiteralValue(),
              };
              return [componentName, props];
            }

            if (node.isKind(SyntaxKind.TrueKeyword)) {
              return [
                componentName,
                {
                  [name]: true,
                },
              ];
            }

            if (node.isKind(SyntaxKind.FalseKeyword)) {
              return [
                componentName,
                {
                  [name]: false,
                },
              ];
            }

            if (node.isKind(SyntaxKind.ObjectLiteralExpression)) {
              return [
                componentName,
                {
                  [name]: getPropsFromObjectLiteralExpression(node),
                },
              ];
            }

            if (node.isKind(SyntaxKind.TemplateExpression)) {
              const props = processNodeTypes(name, node);
              return [componentName, props];
            }

            if (node.isKind(SyntaxKind.ConditionalExpression)) {
              const classNames: string[] = [];
              const expressionWhenTrue = node
                .getWhenTrue()
                .asKind(SyntaxKind.StringLiteral);

              if (expressionWhenTrue) {
                const stringWhenTrue = expressionWhenTrue.getLiteralValue();
                classNames.push(
                  getStyles({ [name]: stringWhenTrue }, { twMerge: false }),
                );
              }

              const expressionWhenFalse = node
                .getWhenFalse()
                .asKind(SyntaxKind.StringLiteral);

              if (expressionWhenFalse) {
                const stringWhenFalse = expressionWhenFalse.getLiteralValue();
                classNames.push(
                  getStyles({ [name]: stringWhenFalse }, { twMerge: false }),
                );
              }
              return [componentName, { className: classNames.join(' ') }];
              // TODO: handle if conditional is not resolved
            }
          }

          if (node.isKind(SyntaxKind.ElementAccessExpression)) {
            const props = processElementAccessExpression(node);
            if (props) {
              return [componentName, props];
            }
          }

          if (node.isKind(SyntaxKind.PropertyAccessExpression)) {
            const elAccessExp = node
              .getExpression()
              ?.getSymbol()
              ?.getValueDeclaration()
              ?.asKind(SyntaxKind.VariableDeclaration)
              ?.getVariableStatement()
              ?.getFirstDescendantByKind(SyntaxKind.ElementAccessExpression);
            if (elAccessExp) {
              const props = processElementAccessExpression(elAccessExp);
              if (props) {
                return [componentName, props];
              }
            }
          }
        });
      },
    )
    .filter(Boolean);

  const addToSafelist = (
    componentName: string,
    props?: Record<string, unknown>,
  ) => {
    if (props) {
      const withDefaultPropsFn =
        withDefaultProps[componentName as keyof typeof withDefaultProps];
      const finalProps = withDefaultPropsFn?.(props) ?? props;
      const className = getStyles(finalProps, { twMerge: false });
      if (className.includes('undefined')) {
        throw new Error(
          `Invalid classname: ${className} for component: ${componentName}
          `,
        );
      }
      safelist.add(className);
    }
  };

  for (const val of propsArray) {
    if (val) {
      const [componentName, props] = val;
      addToSafelist(componentName, props);
    }
  }

  const styleFnImports = imports
    .filter((item) => item.getModuleSpecifierValue() === 'katcn/getStyles')
    .flatMap((item) => item.getNamedImports());

  for (const styleFn of styleFnImports) {
    // Get the identifier to which 'createVariants' is imported
    const identifier = styleFn.getNameNode();
    const fnName = identifier.getText();
    if (fnName === 'cx') {
      break;
    }

    // Find all references of this identifier across the project
    const references = identifier
      .findReferences()
      .flatMap((ref) => ref.getReferences());

    for (const reference of references) {
      let componentName = '';
      const node = reference.getNode();
      const parent = node.getParentIfKind(SyntaxKind.CallExpression);
      const varParent = node.getFirstAncestorByKind(
        SyntaxKind.VariableDeclaration,
      );

      /** Find which jsx element this is being used in */
      const varIdentifier = varParent?.getFirstChildByKind(
        SyntaxKind.Identifier,
      );

      if (varIdentifier) {
        const varReferences = varIdentifier.findReferencesAsNodes();
        for (const varReference of varReferences) {
          const jsxElement =
            varReference.getFirstAncestorByKind(SyntaxKind.JsxOpeningElement) ??
            varReference.getFirstAncestorByKind(
              SyntaxKind.JsxSelfClosingElement,
            );

          if (jsxElement) {
            componentName = jsxElement.getTagNameNode().getText();
          }
        }
      }

      if (fnName === 'createVariants') {
        // key: value where the value is the style props
        const variantDefs = parent
          ?.getFirstChildByKind(SyntaxKind.ObjectLiteralExpression)
          ?.getChildrenOfKind(SyntaxKind.PropertyAssignment);

        if (!variantDefs) continue;

        for (const variantObj of variantDefs) {
          const variantStyleObj = variantObj.getFirstChildByKind(
            SyntaxKind.ObjectLiteralExpression,
          );
          const props = getPropsFromObjectLiteralExpression(variantStyleObj);
          addToSafelist(componentName, props);
        }
      } else {
        const objLiteralExpression = parent?.getFirstChildByKind(
          SyntaxKind.ObjectLiteralExpression,
        );
        if (objLiteralExpression) {
          const props =
            getPropsFromObjectLiteralExpression(objLiteralExpression);
          addToSafelist(componentName, props);
        }
      }
    }
  }

  const flattenedSafelist = flattenSafelist(safelist);
  safelistMap.set(filePath, new Set(flattenedSafelist));
  return flattenedSafelist;
}
