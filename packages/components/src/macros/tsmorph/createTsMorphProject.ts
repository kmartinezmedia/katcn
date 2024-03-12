/// <reference types="bun-types" />

import path from 'path';
import { Project, ProjectOptions, ts } from 'ts-morph';

export function createTsMorphProject(opts?: ProjectOptions) {
  return new Project({
    tsConfigFilePath: Bun.env?.PWD
      ? path.resolve(Bun.env.PWD, 'tsconfig.json')
      : undefined,
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      jsxImportSource: 'katcn',
    },
    skipAddingFilesFromTsConfig: false,
    ...opts,
  });
}
