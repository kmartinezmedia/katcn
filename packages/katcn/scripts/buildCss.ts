import path from 'node:path';
import {
  createBase,
  createPreflight,
  createTheme,
  createUtilities,
  cssTemplate,
} from 'katcn/macros';
import { defaultTokensConfig } from 'katcn/tokens';
import prettier from 'prettier';
import { createWatcher } from './_createWatcher';

const outDir = `${Bun.env.PWD}/dist`;

async function writeCss() {
  const preflight = createPreflight();
  const base = createBase(defaultTokensConfig);
  const darkTheme = createTheme({ colorMode: 'dark' });
  const xSmall = createTheme({ scaleMode: 'xSmall' });
  const small = createTheme({ scaleMode: 'small' });
  const medium = createTheme({ scaleMode: 'medium' });
  const xLarge = createTheme({ scaleMode: 'xLarge' });
  const xxLarge = createTheme({ scaleMode: 'xxLarge' });
  const xxxLarge = createTheme({ scaleMode: 'xxxLarge' });
  const utilities = createUtilities();

  const cssContent = cssTemplate`
@layer base {
  ${preflight}
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
  const outFile = `${outDir}/index.css`;
  const formattedContent = await prettier.format(cssContent, {
    parser: 'css',
  });
  // console.log(formattedContent);
  Bun.write(outFile, formattedContent);
}

if (Bun.argv.includes('--watch')) {
  const srcEntry = `${Bun.env.PWD}/src`;
  const scriptsEntry = `${Bun.env.PWD}/scripts`;
  createWatcher(srcEntry, writeCss);
  createWatcher(scriptsEntry, writeCss);
}

await writeCss();
