import { jsxDEV as jsxDevOriginal } from 'react/jsx-dev-runtime';
import { jsx as jsxOriginal, jsxs as jsxsOriginal } from 'react/jsx-runtime';

import { extractStyleProps } from './styles/extractStyleProps';
import { GetStylesParams } from './styles/getStyles';

export { Fragment } from 'react';

/** Client components */
export function jsx(
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  type: any,
  props: GetStylesParams,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  key: any,
) {
  const finalProps = extractStyleProps(props);
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
  const finalProps = extractStyleProps(props);
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
  const finalProps = extractStyleProps(props);
  // console.log('jsxDEV from katcn');
  return jsxDevOriginal(type, finalProps, maybeKey, source, self);
}
