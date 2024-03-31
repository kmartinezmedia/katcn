import { describe, expect, it } from 'bun:test';
import { createTsMorphProject } from '../tsmorph/createTsMorphProject';
import { transformSourceFile } from './transformSourceFile';
import { Project, ts } from 'ts-morph';
import path from 'node:path';
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
  });
});
