import path from 'node:path';
import { Project } from 'ts-morph';

export const project = new Project();
export const typesSourceFile = project.addSourceFileAtPath(
  path.resolve(__dirname, '../../types/src/index.ts'),
);
export const componentsSourceFile = project.addSourceFileAtPath(
  path.resolve(__dirname, '../../katcn/src/components.tsx'),
);
