'use client';

import * as components from 'katcn';
import * as React from 'react';
import { getStyles } from 'katcn/getStyles';

const componentNames = Object.keys(components).join(', ');

export function Preview({ code }: { code: string }) {
  const fnString = new Function(`
  return function ({
    React,
    getStyles,
    ${componentNames}
  }) {
    ${code}
    return Page;
  }
`)();

  const Comp = fnString({
    React,
    getStyles,
    ...components,
  });

  return <Comp />;
}
