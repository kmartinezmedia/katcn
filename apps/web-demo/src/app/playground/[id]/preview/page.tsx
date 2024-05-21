'use client';

import { PlaygroundDataContext } from '@/lib/context';
import { getStyles } from 'katcn/getStyles';
import { useContext } from 'react';
import { jsxDEV } from 'react/jsx-dev-runtime';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import * as components from 'katcn';

const componentNames = Object.keys(components).join(', ');

export default function Page() {
  const { css, js } = useContext(PlaygroundDataContext);

  if (!css || !js) {
    return null;
  }

  const fnString = new Function(`
      function renderComp({ jsx, jsxDEV, jsxs, React, getStyles, ${componentNames} }) {
        ${js}
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
      <style>{css}</style>
      <Comp />
    </div>
  );
}
