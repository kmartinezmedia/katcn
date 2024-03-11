import path from 'node:path';

import { Project } from 'ts-morph';

const typesFile = path.resolve(__dirname, '../../types/tokenTypes.ts');

const project = new Project();
const typeFile = project.addSourceFileAtPath(typesFile);

export function typesToConstants<TypeToReturn>(
  typeName: string,
): TypeToReturn[] {
  return (
    typeFile
      .getTypeAlias(typeName)
      ?.getType()
      // @ts-expect-error compilerType.types is fine. https://ts-ast-viewer.com/
      .compilerType.types.map((item) => item.value)
      .filter(Boolean)
  );
}
