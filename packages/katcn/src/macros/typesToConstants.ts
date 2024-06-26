import path from 'node:path';
import { Project } from 'ts-morph';

const project = new Project();
export const sourceFile = project.addSourceFileAtPath(
  path.resolve(__dirname, '../types.ts'),
);

export function typesToConstants<TypeToReturn>(
  typeName: string,
): TypeToReturn[] {
  return (
    sourceFile
      .getTypeAlias(typeName)
      ?.getType()
      // @ts-expect-error compilerType.types is fine. https://ts-ast-viewer.com/
      .compilerType.types.map((item) => item.value)
      .filter((item: unknown) => item !== undefined)
  );
}
