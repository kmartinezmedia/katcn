import 'react';

declare module 'react/jsx-dev-runtime' {
  export const Fragment: unique symbol;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  export function jsxDEV(type: any, props: any, ...args: any): any;
}

declare module 'react/jsx-runtime' {
  export const Fragment: unique symbol;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  export function jsx(type: any, props: any, ...args: any): any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  export function jsxs(type: any, props: any, ...args: any): any;
}
