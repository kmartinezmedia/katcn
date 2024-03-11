import path from 'node:path';

import { Project, SourceFile, SyntaxKind } from 'ts-morph';

const relativePath = path.resolve(
  import.meta.dirname,
  '../types/tokenTypes.ts',
);

const cache = new Map<string, { project: Project; sourceFile: SourceFile }>();

export function typesToObject<TypeToReturn>(
  typeName: string,
  fileWithTypes = relativePath,
): {
  name: keyof TypeToReturn;
  description: string;
  value: string;
  isOptional: boolean;
}[] {
  let project: Project;
  let sourceFile: SourceFile;
  if (cache.has(fileWithTypes)) {
    const cacheData = cache.get(fileWithTypes)!;
    project = cacheData.project;
    sourceFile = cacheData.sourceFile;
  } else {
    project = new Project();
    sourceFile = project.addSourceFileAtPath(fileWithTypes);
  }

  const props =
    sourceFile
      .getInterface(typeName)
      ?.getChildrenOfKind(SyntaxKind.PropertySignature)
      .map((item) => {
        const name = item.getSymbol()?.getName() as keyof TypeToReturn;
        const isOptional = item.hasQuestionToken();

        const value = item
          .getType()
          .getUnionTypes()
          .map((item) => item.getText())
          .map((item) => item.replace(/"/g, ''))
          .sort((a, b) => a.localeCompare(b))
          .join(', ');

        const description = item
          ?.getJsDocs()
          ?.map((item) => item.getCommentText())
          .join(' ');

        return { interface: typeName, name, value, description, isOptional };
      })
      .filter(Boolean) ?? [];

  return props;
}
