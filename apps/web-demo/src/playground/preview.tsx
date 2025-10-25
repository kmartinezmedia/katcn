'use client';

import * as components from 'katcn';
import { getStyles } from 'katcn/getStyles';
import * as React from 'react';
import { jsxDEV } from 'react/jsx-dev-runtime';
import { jsx, jsxs } from 'react/jsx-runtime';

const componentNames = Object.keys(components).join(', ');

type PreviewProps = {
  jsOutput: string;
  cssOutput: string;
};

export function Preview({ jsOutput, cssOutput }: PreviewProps) {
  if (!jsOutput) {
    return null;
  }

  const fnString = new Function(`
      function renderComp({ jsx, jsxDEV, jsxs, React, getStyles, ${componentNames} }) {
        ${jsOutput}
        return Example;
      }
      return renderComp;
    `)();

  const Comp = fnString({
    jsx,
    jsxDEV,
    jsxs,
    React,
    getStyles,
    ...components,
  });

  return (
    <div>
      <style>{cssOutput}</style>
      <Comp />
    </div>
  );
}
