import { jsxDEV as jsxDevOriginal } from 'react/jsx-dev-runtime';
import { jsx as jsxOriginal, jsxs as jsxsOriginal } from 'react/jsx-runtime';

import { extractStyleProps } from './styles/extractStyleProps';
import type { GetStylesParams } from './styles/getStyles';

/** https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
 * From react docs:
 * If you’re a library author and you are implementing the /jsx-runtime entry point for your library,
 * keep in mind that there is a case in which even the new transform has to fall back to createElement for backwards compatibility.
 * In that case, it will auto-import createElement directly from the root entry point specified by importSource.
 */
export { Fragment, createElement } from 'react';

/** Client components */
export function jsx(
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  type: any,
  props: GetStylesParams,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  key: any,
) {
  const componentName = typeof type === 'string' ? type : type.displayName;
  const finalProps = extractStyleProps(props, componentName);
  return jsxOriginal(type, finalProps, key);
}

/** Server components */
export function jsxs(
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  type: any,
  { backgroundColor, className, ...props }: GetStylesParams,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  key: any,
) {
  const componentName = typeof type === 'string' ? type : type.displayName;
  const finalProps = extractStyleProps(props, componentName);
  return jsxsOriginal(type, finalProps, key);
}

export function jsxDEV(
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  type: any,
  props: GetStylesParams,
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
