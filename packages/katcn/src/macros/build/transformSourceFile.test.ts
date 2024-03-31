import { describe, expect, it } from 'bun:test';
import { createTsMorphProject } from '../tsmorph/createTsMorphProject';
import { transformSourceFile } from './transformSourceFile';

const project = createTsMorphProject({ skipAddingFilesFromTsConfig: true });

function createSourceFile(id: string, code: string) {
  return project.createSourceFile(`${id}.tsx`, code, {
    overwrite: true,
  });
}

describe('transformSourceFile', () => {
  it('Should handle vars', () => {
    const code = `
      import { Box } from 'katcn';

      function Example() {
        return <Box backgroundColor="accent" />;
      }
    `;
    const sourceFile = createSourceFile('vars', code);
    const val = transformSourceFile({
      sourceFile,
      disablePreflight: true,
    });
    expect(val.css).toBeDefined();
  });
  it('Should handle numeric dimensions', () => {
    const code = `
      import { Box } from 'katcn';

      function Example() {
        return <Box width={100} height={200} />;
      }
    `;
    const sourceFile = createSourceFile('dimensions', code);
    const val = transformSourceFile({
      sourceFile,
      disablePreflight: true,
    });
    expect(val.css).toBeDefined();
  });
});
