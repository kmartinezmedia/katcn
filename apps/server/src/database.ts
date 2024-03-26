import { decode } from 'base64-url';
import { transformSourceFile } from 'katcn/macros';
import { createTsMorphProject } from 'katcn/macros';
import type { SourceFile } from 'ts-morph';
import path from 'node:path';
import prettier from 'prettier';
import { codeToHtml } from 'shiki';

const distDir = path.resolve(import.meta.dirname, '../dist');

const defaultExample = `
import { VStack, Text, Icon } from 'katcn';
import { getStyles } from 'katcn/getStyles';

function Example() {
  const customStyles = getStyles({
    borderWidth: 'thick',
    borderColor: 'warning',
    backgroundColor: 'accent'
  });

  return (
    <VStack backgroundColor="alert">
      <VStack width="half" backgroundColor="accent">
        <Text color="on-color" variant="display1" className={customStyles}>
          something
        </Text>
        <Icon name="addFile" size="lg" />
      </VStack>
    </VStack>
  )
}
`;

const project = createTsMorphProject({ skipAddingFilesFromTsConfig: true });

function createSourceFile(id: string, code: string) {
  return project.createSourceFile(`${id}.tsx`, code, {
    overwrite: true,
  });
}

async function process(sourceFile: SourceFile) {
  const id = sourceFile.getBaseNameWithoutExtension();
  const data = transformSourceFile({
    sourceFile: sourceFile,
    removeImports: true,
    includePreflightCss: false,
  });

  await Bun.write(`${distDir}/${id}.json`, JSON.stringify(data, null, 2));
  // todo: check that if formatted fails everything is good
  let formattedCss = data.css;
  // const formatted = await $`bunx biome format | ${data.css}`.text();
  // console.log(formatted);
  if (data.css) {
    formattedCss = await prettier.format(data.css, {
      useTabs: false,
      tabWidth: 2,
      trailingComma: 'all',
      printWidth: 100,
      parser: 'css',
    });
    formattedCss = await codeToHtml(formattedCss, {
      lang: 'css',
      theme: 'dracula',
    });
  }
  return { ...data, formattedCss };
}

const defaultSourceFile = createSourceFile('default', defaultExample);

let defaultCode = { css: '', js: '', formattedCss: '' };

class Database {
  async get(id: string | 'default') {
    const cachedData = await Bun.file(
      `${distDir}/playground/${id}.json`,
    )?.json();
    if (cachedData) {
      return cachedData;
    }
    return defaultCode;
  }

  async set(id: string, _code: string) {
    const codeAsString = decode(_code);
    const sourceFile = createSourceFile(id, codeAsString);
    const data = await process(sourceFile);
    return data;
  }
}

process(defaultSourceFile).then((data) => {
  defaultCode = data;
});

export default new Database();
export { process, defaultSourceFile };
