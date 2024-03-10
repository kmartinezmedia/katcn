import { defaultTokensConfig } from '#tokens/defaultTokensConfig';
import { css } from '#macros/css';
import { createBase, createTheme, createUtilities } from '#macros';
import prettier from 'prettier';
import { watch } from 'node:fs';
import path from 'node:path';

const base = createBase(defaultTokensConfig);
const theme = createTheme(defaultTokensConfig);
const utilities = createUtilities();

const cssContent = css`
@layer base {
  :where(html) {
    ${base.spectrum}
  }
}
@layer theme {
  :where(html) {
    ${theme.light.palette}
  }

  [data-theme='dark'] {
    ${theme.dark.palette}
  }
}
@layer utilities {
  ${utilities.backgroundColor}
  ${utilities.color}
  ${utilities.borderColor}
}
`;
const outDir = `${Bun.env.PWD}/dist`;

async function writeCss() {
  const outFile = `${outDir}/index.css`;
  const formattedContent = await prettier.format(cssContent, {
    parser: 'css',
  });
  // console.log(formattedContent);
  await Bun.write(outFile, formattedContent);
  // const preflight = Bun.file(`${Bun.env.PWD}/src/css/preflight.css`);
  // await Bun.write(`${outDir}/preflight.css`, preflight);
}

function createWatcher(dir: string) {
  return watch(
    path.dirname(dir),
    { recursive: true },
    async (_event, filename) => {
      console.info(`katcn update: ${filename}`, import.meta.file);
      await writeCss();
    },
  );
}

if (Bun.argv.includes('--watch')) {
  const srcEntry = path.resolve(import.meta.dirname, 'src');
  const scriptsEntry = path.resolve(import.meta.dirname, 'scripts');
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
