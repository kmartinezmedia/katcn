'use client';

import * as components from 'katcn';
import * as React from 'react';

const componentNames = Object.keys(components).join(', ');

export function Preview({ code }: { code: string }) {
  const fnString = new Function(`
  return function ({
    React,
    ${componentNames}
  }) {
    ${code}
    return Page;
  }
`)();

  const Comp = fnString({
    React,
    ...components,
  });

  return <Comp />;
}
