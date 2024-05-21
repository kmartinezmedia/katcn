import { SyntaxKind } from 'ts-morph';
import type { StyleModifier } from '../types';
import { getTwPrefixAndPropName } from './getTwAsPropsMap';
import { sourceFile, typesToConstants } from './typesToConstants';

export const modifiers = typesToConstants<StyleModifier>('StyleModifier');

function propsAsTw(modifier: StyleModifier) {
  return modifier
    .replace('_', '')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

function getModifierPropTypes() {
  return (
    sourceFile
      .getInterface('ModifierProps')
      ?.getChildrenOfKind(SyntaxKind.PropertySignature) ?? []
  );
}

export function getModifierPropsAsTwMap() {
  const lookupMap = {} as Record<string, string>;
  const propTypes = getModifierPropTypes();

  for (const node of propTypes) {
    if (!node) continue;
    const { name, twPrefix } = getTwPrefixAndPropName(node);
    lookupMap[name] = twPrefix;
  }
  return lookupMap;
}

export function getModifierTwAsPropsMap() {
  const props = {} as Record<string, StyleModifier>;

  for (const modifier of modifiers) {
    props[propsAsTw(modifier)] = modifier;
  }
  return props;
}
