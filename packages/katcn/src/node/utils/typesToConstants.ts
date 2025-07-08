import { katcnTypesSourceFile } from './tsMorph';

export function typesToConstants<TypeToReturn>(
  typeName: string,
): TypeToReturn[] {
  return (
    katcnTypesSourceFile
      .getTypeAlias(typeName)
      ?.getType()
      // @ts-expect-error compilerType.types is fine. https://ts-ast-viewer.com/
      .compilerType.types.map((item) => item.value)
      .filter((item: unknown) => item !== undefined)
  );
}
