import { KatcnStyleSheet } from 'katcn/macros';
import prettier from 'prettier';
import { defaultTokensConfig } from '../src/tokens';
import { createWatcher } from './_createWatcher';

const outDir = `${Bun.env.PWD}/dist`;

async function writeCss() {
  const stylesheet = new KatcnStyleSheet({
    config: defaultTokensConfig,
    disablePreflight: false,
  });
  const cssContent = stylesheet.cssTemplate;
  const outFile = `${outDir}/index.css`;
  const formattedContent = await prettier.format(cssContent, {
    parser: 'css',
  });
  Bun.write(outFile, formattedContent);
}

if (Bun.argv.includes('--watch')) {
  const srcEntry = `${Bun.env.PWD}/src`;
  const scriptsEntry = `${Bun.env.PWD}/scripts`;
  createWatcher(srcEntry, writeCss);
  createWatcher(scriptsEntry, writeCss);
}

await writeCss();
