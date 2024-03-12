/// <reference types="bun-types" />

import { Project, type ProjectOptions, ts } from 'ts-morph';

export function createTsMorphProject(opts?: ProjectOptions) {
  return new Project({
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      jsxImportSource: 'katcn',
    },
    skipAddingFilesFromTsConfig: false,
    ...opts,
  });
}
