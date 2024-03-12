export class CssRegistry {
  classNamesToKeep = new Map<string, Set<string>>();
  varsToKeep = new Map<string, Set<string>>();

  get allClassNamesToKeep() {
    const allClassNames = new Set<string>();

    for (const classNames of this.classNamesToKeep.values()) {
      for (const className of classNames) {
        const splitClassName = className.trimStart().trimEnd().split(' ');
        for (const sClassName of splitClassName) {
          allClassNames.add(sClassName);
        }
      }
    }

    return allClassNames;
  }

  get allVarsToKeep() {
    const allVars = new Set<string>();

    for (const vars of this.varsToKeep.values()) {
      for (const v of vars) {
        allVars.add(v);
      }
    }
    return allVars;
  }

  updateRegistry({
    filePath,
    classNamesToKeep,
    varsToKeep,
  }: {
    filePath: string;
    classNamesToKeep: Set<string>;
    varsToKeep: Set<string>;
  }) {
    this.classNamesToKeep.set(filePath, classNamesToKeep);
    this.varsToKeep.set(filePath, varsToKeep);
  }
}
