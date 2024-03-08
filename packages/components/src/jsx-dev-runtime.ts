import { jsxDEV as jsxDevOriginal } from 'react/jsx-dev-runtime';
import { extractStyleProps } from '#extractStyleProps';
import type { StyleProps } from './types';
export { Fragment, createElement } from 'react';

interface Props extends StyleProps {
  className?: string;
}

export function jsxDEV(
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  type: any,
  props: Props,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  maybeKey: any,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  source: any,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  self: any,
) {
  const componentName = typeof type === 'string' ? type : type.displayName;
  const finalProps = extractStyleProps(props, componentName);
  return jsxDevOriginal(type, finalProps, maybeKey, source, self);
}
