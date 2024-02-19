import path from 'node:path';

import { Project, SyntaxKind } from 'ts-morph';

const typesFile = path.resolve(
  import.meta.dirname,
  '../../../src/tokens/types.ts',
);

const project = new Project();
const typeFile = project.addSourceFileAtPath(typesFile);

export function typesToObject<TypeToReturn>(
  typeName: string,
): {
  name: keyof TypeToReturn;
  description: string;
  value: string;
  isOptional: boolean;
}[] {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore dts-bundler doesn't like import.meta but this file isn't bundled directly anyways
  const props =
    typeFile
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
