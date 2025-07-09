/// <reference types="bun-types" />

import { decode } from 'base64-url';
import { Transpiler } from 'bun';
import type { SafelistMap } from 'katcn/cli/types';
import { convertSafelistMapToCss } from 'katcn/cli/utils/convertSafelistMapToCss';
import { createTsMorphProject } from 'katcn/cli/utils/createTsMorphProject';
import { processSafelistForSourceFile } from 'katcn/cli/utils/processSafelistForSourceFile';
import type { SourceFile } from 'ts-morph';

const transpiler = new Transpiler({
  loader: 'tsx',
  tsconfig: {
    compilerOptions: {
      jsx: 'react-jsx',
    },
  },
  autoImportJSX: false,
});

const defaultExample = `
import { VStack, Text, Icon } from 'katcn';
import { getStyles } from 'katcn/getStyles';

function Example() {
  const customStyles = getStyles({
    borderWidth: '2',
    borderColor: 'warning',
    bg: 'accent'
  });

  return (
    <VStack bg="alert">
      <VStack width="1/2" bg="accent">
        <Text color="on-accent" variant="display1" className={customStyles}>
          something
        </Text>
        <Icon name="addFile" size="4" />
      </VStack>
    </VStack>
  )
}
`;

class Database {
  project = createTsMorphProject({ skipAddingFilesFromTsConfig: true });
  defaultCode: { js: string; css: string } = { js: '', css: '' };

  async init() {
    const defaultSourceFile = this.createSourceFile('default', defaultExample);
    this.defaultCode = await this.process(defaultSourceFile);
  }

  createSourceFile(id: string, code: string) {
    return this.project.createSourceFile(`${id}.tsx`, code, {
      overwrite: true,
    });
  }

  async process(sourceFile: SourceFile) {
    const safelistMap: SafelistMap = new Map();

    const imports = sourceFile.getImportDeclarations();
    for (const importDeclaration of imports) {
      importDeclaration.remove();
    }
    const js = transpiler.transformSync(sourceFile.getFullText());
    processSafelistForSourceFile({ safelistMap, sourceFile });
    const css = await convertSafelistMapToCss(safelistMap);

    return { js, css };
  }

  async get(id: string | 'default') {
    if (id === 'default') {
      return this.defaultCode;
    }
    const sourceFile = this.project.getSourceFile(`${id}.tsx`);
    if (!sourceFile) {
      return this.defaultCode;
    }
    return await this.process(sourceFile);
  }

  async set(id: string, _code: string) {
    const codeAsString = decode(_code);
    const sourceFile = this.createSourceFile(id, codeAsString);
    return await this.process(sourceFile);
  }
}

const database = new Database();

export default database;
