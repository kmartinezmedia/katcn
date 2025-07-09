import { typesSourceFile } from './project';

export function getUnionAsArray<TypeToReturn>(
  typeName: string,
): TypeToReturn[] {
  return (
    typesSourceFile
      .getTypeAlias(typeName)
      ?.getType()
      // @ts-expect-error compilerType.types is fine. https://ts-ast-viewer.com/
      .compilerType.types.map((item) => item.value)
      .filter((item: unknown) => item !== undefined)
  );
}
