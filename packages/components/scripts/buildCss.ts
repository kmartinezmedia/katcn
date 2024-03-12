import { watch } from 'node:fs';
import path from 'node:path';
import {
  createBase,
  createPreflight,
  createTheme,
  createUtilities,
  cssTemplate,
} from 'katcn/macros';
import prettier from 'prettier';
import { defaultTokensConfig } from '#tokens';

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

function createWatcher(dir: string) {
  return watch(dir, { recursive: true }, async (_event, filename) => {
    console.info(`katcn update: ${filename}`, import.meta.file);
    writeCss();
  });
}

if (Bun.argv.includes('--watch')) {
  const srcEntry = path.resolve(import.meta.dirname, '../src');
  const scriptsEntry = path.resolve(import.meta.dirname, '../scripts');
  const srcWatcher = createWatcher(srcEntry);
  const scriptsWatcher = createWatcher(scriptsEntry);

  process.on('SIGINT', () => {
    // close watcher when Ctrl-C is pressed
    console.info('Closing watcher...', import.meta.file);
    srcWatcher.close();
    scriptsWatcher.close();

    process.exit(0);
  });
}

await writeCss();
