'use client';

import * as components from 'katcn';
import { getStyles } from 'katcn/getStyles';
import * as React from 'react';
import { useContext } from 'react';
import { jsxDEV } from 'react/jsx-dev-runtime';
import { jsx, jsxs } from 'react/jsx-runtime';
import { PlaygroundContext } from '../../_playground-context';

const componentNames = Object.keys(components).join(', ');

export default function Page() {
  const { jsOutput, cssOutput } = useContext(PlaygroundContext);

  if (!jsOutput) {
    return null;
  }
  console.log(jsOutput);

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
