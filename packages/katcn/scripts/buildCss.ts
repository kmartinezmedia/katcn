import { KatcnStyleSheet } from 'katcn/macros';
import { defaultTokensConfig } from 'katcn/tokens';
import prettier from 'prettier';
import { createWatcher } from './_createWatcher';

const outDir = `${Bun.env.PWD}/dist`;

async function writeCss() {
  const stylesheet = new KatcnStyleSheet({
    config: defaultTokensConfig,
    includePreflight: true,
    colorMode: 'all',
    scaleMode: 'all',
  });
  const cssContent = stylesheet.css;
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
