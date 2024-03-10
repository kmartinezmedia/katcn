import { createBase, createTheme, createUtilities, css } from '#macros';
import type { UniversalTokensConfig } from '#types';
import prettier from 'prettier';

interface WriteCssOptions {
  out: string;
  config?: UniversalTokensConfig;
  safelist?: string[];
  scaleMode?: {
    xSmall?: boolean;
    small?: boolean;
    medium?: boolean;
    large?: boolean;
    xLarge?: boolean;
    xxLarge?: boolean;
    xxxLarge?: boolean;
  };
  colorMode?: {
    light?: boolean;
    dark?: boolean;
  };
}

export async function writeCss({ out, config }: WriteCssOptions) {
  const base = createBase(config);
  const utilities = createUtilities();
  const darkTheme = createTheme({ colorMode: 'dark', config });
  const xSmall = createTheme({ scaleMode: 'xSmall', config });
  const small = createTheme({ scaleMode: 'small', config });
  const medium = createTheme({ scaleMode: 'medium', config });
  const xLarge = createTheme({ scaleMode: 'xLarge', config });
  const xxLarge = createTheme({ scaleMode: 'xxLarge', config });
  const xxxLarge = createTheme({ scaleMode: 'xxxLarge', config });

  const cssContent = css`
@layer base {
  :where(html) {
    ${base}
  }
}
@layer theme {
  [data-theme='dark'] {
    ${darkTheme}
  }
  [data-scale='xSmall'] {
    ${xSmall}
  }
  [data-scale='small'] {
    ${small}
  }
  [data-scale='medium'] {
    ${medium}
  }
  [data-scale='xLarge'] {
    ${xLarge}
  }
  [data-scale='xxLarge'] {
    ${xxLarge}
  }
  [data-scale='xxxLarge'] {
    ${xxxLarge}
  }
}
@layer utilities {
  ${utilities}
}
`;

  /** Lightning css to purge final stylesheet */
  const formattedContent = await prettier.format(cssContent, {
    parser: 'css',
  });
  // console.log(formattedContent);
  Bun.write(out, formattedContent);
  // const preflight = Bun.file(`${Bun.env.PWD}/src/css/preflight.css`);
  // await Bun.write(`${outDir}/preflight.css`, preflight);
}
