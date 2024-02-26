/// <reference types="bun-types" />

import { Transpiler } from 'bun';
import { classManager } from 'katcn/jsx-runtime';
import { tailwindPlugin } from 'katcn/tailwind/tailwind.plugin';
import { defaultTokensConfig } from 'katcn/tokens/defaultTokensConfig';
import type { Config } from 'tailwindcss';

const transpiler = new Transpiler({
  loader: 'tsx',
  tsconfig: {
    compilerOptions: {
      jsxImportSource: 'katcn',
    },
  },
  macro: {
    'katcn/styles/getStyles': {
      getStyles: 'katcn/styles/getStyles',
    },
  },
});

const config: Config = {
  safelist: classManager.safelist,
  content: {
    files: [
      './src/pages/**/*.{ts,tsx,mdx}',
      './src/components/**/*.{ts,tsx,mdx}',
      './src/app/**/*.{ts,tsx,mdx}',
    ],
    transform: {
      tsx: (content) => {
        console.info(
          `
/* -------------------------------------------------------------------------- */
/*                                   BEFORE                                   */
/* -------------------------------------------------------------------------- */
`,
          content,
        );
        const newContent = transpiler.transformSync(content);

        console.info(
          `
        /* -------------------------------------------------------------------------- */
        /*                                    AFTER                                   */
        /* -------------------------------------------------------------------------- */
        `,
          newContent,
        );

        return newContent;
      },
    },
  },
  theme: {},
  plugins: [tailwindPlugin({ config: defaultTokensConfig })],
};

export default config;
