import { describe, expect, it } from 'bun:test';
import path from 'node:path';
import { Project, ts } from 'ts-morph';
import { transformProject } from './transformProject';

const webDemoTsConfig = path.resolve(
  import.meta.dirname,
  '../../../../../apps/web-demo/tsconfig.json',
);

const project = new Project({
  compilerOptions: {
    jsx: ts.JsxEmit.ReactJSX,
    jsxImportSource: 'katcn',
  },
  skipAddingFilesFromTsConfig: false,
  tsConfigFilePath: webDemoTsConfig,
});

describe('transformProject', () => {
  it('Should handle web demo', async () => {
    const css = await transformProject({
      project,
      watch: false,
    });
    expect(css).toBeDefined();
  });
});
