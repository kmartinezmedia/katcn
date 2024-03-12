import path from 'node:path';
import { Project, SourceFile } from 'ts-morph';

let typesToConstantsProject: Project;
let typesToConstantsSourceFile: SourceFile;

export function typesToConstants<TypeToReturn>(
  typeName: string,
): TypeToReturn[] {
  if (!typesToConstantsProject) {
    typesToConstantsProject = new Project();
  }
  if (!typesToConstantsSourceFile) {
    typesToConstantsSourceFile = typesToConstantsProject.addSourceFileAtPath(
      path.resolve(__dirname, '../../types/tokenTypes.ts'),
    );
  }

  return (
    typesToConstantsSourceFile
      .getTypeAlias(typeName)
      ?.getType()
      // @ts-expect-error compilerType.types is fine. https://ts-ast-viewer.com/
      .compilerType.types.map((item) => item.value)
      .filter(Boolean)
  );
}
