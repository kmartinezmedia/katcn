import { decode } from 'base64-url';
import { transformSourceFile } from 'katcn/macros';
import { createTsMorphProject } from 'katcn/macros';

const defaultExample = `
import { VStack, Text, Icon, getStyles } from 'katcn';

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
  defaultJs = this.project.createSourceFile('default.tsx', defaultExample, {
    overwrite: true,
  });
  defaultCss = this.project.createSourceFile('default.css', '', {
    overwrite: true,
  });
  defaultCode = transformSourceFile({
    sourceFile: this.defaultJs,
    removeImports: true,
  });

  get(id: string) {
    const js = this.project.getSourceFile(`${id}.tsx`);
    const css = this.project.getSourceFile(`${id}.css`);
    return {
      js: js ? js.getText() : this.defaultCode.js,
      css: css ? css.getText() : this.defaultCode.css,
    };
  }

  set(id: string, _code: string) {
    const codeAsString = decode(_code);
    const sourceFile = this.project.createSourceFile(
      `${id}.tsx`,
      codeAsString,
      { overwrite: true },
    );
    const code = transformSourceFile({
      sourceFile: sourceFile,
      removeImports: true,
      includePreflightCss: false,
    });
    console.log(code);
    return { js: code.js, css: code.css };
  }
}

export default new Database();
