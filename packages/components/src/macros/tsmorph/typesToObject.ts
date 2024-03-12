import path from 'node:path';
import { Project, type SourceFile, SyntaxKind } from 'ts-morph';

let typesToObjectProject: Project;
let typesToObjectSourceFile: SourceFile;

export function typesToObject<TypeToReturn>(typeName: string): {
  name: keyof TypeToReturn;
  description: string;
  value: string;
  isOptional: boolean;
}[] {
  if (!typesToObjectProject) {
    typesToObjectProject = new Project();
  }
  if (!typesToObjectSourceFile) {
    typesToObjectSourceFile = typesToObjectProject.addSourceFileAtPath(
      path.resolve(__dirname, '../../types/tokenTypes.ts'),
    );
  }

  const props =
    typesToObjectSourceFile
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
