import { decode } from 'base64-url';
import { transformSourceFile } from 'katcn/macros';
import { createTsMorphProject } from 'katcn/macros';
import type { SourceFile } from 'ts-morph';

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

class Database {
  project = createTsMorphProject({ skipAddingFilesFromTsConfig: true });
  defaultCode: { js: string; css: string };

  constructor() {
    const defaultSourceFile = this.createSourceFile('default', defaultExample);
    this.defaultCode = this.process(defaultSourceFile);
  }

  createSourceFile(id: string, code: string) {
    return this.project.createSourceFile(`${id}.tsx`, code, {
      overwrite: true,
    });
  }

  process(sourceFile: SourceFile) {
    const data = transformSourceFile({
      sourceFile: sourceFile,
      removeImports: true,
      disablePreflight: true,
      disableTreeshake: true,
    });
    return data;
  }

  get(id: string | 'default') {
    if (id === 'default') {
      return this.defaultCode;
    }
    const sourceFile = this.project.getSourceFile(`${id}.tsx`);
    return this.process(sourceFile);
  }

  set(id: string, _code: string) {
    const codeAsString = decode(_code);
    const sourceFile = this.createSourceFile(id, codeAsString);
    return this.process(sourceFile);
  }
}

export default new Database();
