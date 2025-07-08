import path from 'node:path';
import { Project } from 'ts-morph';

const project = new Project();
export const katcnTypesSourceFile = project.addSourceFileAtPath(
  path.resolve(__dirname, '../types.ts'),
);

export const katcnComponentsSourceFile = project.addSourceFileAtPath(
  path.resolve(__dirname, '../components.tsx'),
);
