import { FileSystemRefreshResult, Project, type SourceFile } from 'ts-morph';
import { transformTsx } from './transformTsx';
import { transformCss } from './transformCss';
import { watch, type FSWatcher } from 'node:fs';
import { UniversalTokensConfig } from '../../types';
import { defaultTokensConfig } from '../../tokens';

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

interface TransformOptions {
  config?: UniversalTokensConfig;
  project: Project;
  outFile?: string;
  watch?: boolean;
}

export async function transform({
  config = defaultTokensConfig,
  project,
  outFile,
  watch: shouldWatch = false,
}: TransformOptions) {
  const watchers: FSWatcher[] = [];
  const registry = new CssRegistry();
  const sourceFiles = project.getSourceFiles();

  async function processFile(sourceFile: SourceFile, filePath: string) {
    // const relativeFilePath = path.relative(Bun.env.PWD, filePath);
    const content = sourceFile.getFullText();
    const { classNamesToKeep, varsToKeep, jsContent } = transformTsx({
      project: project,
      content,
      filePath,
    });

    registry.updateRegistry({ filePath, classNamesToKeep, varsToKeep });

    const fileHasCss = classNamesToKeep.size > 0 || varsToKeep.size > 0;

    if (fileHasCss) {
      const cssContent = await transformCss({
        config: config,
        classNamesToKeep: registry.allClassNamesToKeep,
        varsToKeep: registry.allVarsToKeep,
      });
      if (outFile) {
        await Bun.write(outFile, cssContent);
      }
      return { cssContent, jsContent };
    }
  }

  function createWatcher(filePath: string) {
    const watcher = watch(filePath, (event) => {
      if (event === 'change') {
        const sourceFile = project.getSourceFile(filePath);
        sourceFile?.refreshFromFileSystem().then((status) => {
          if (status === FileSystemRefreshResult.Updated) {
            processFile(sourceFile, filePath);
          }
        });
      }
    });
    watchers.push(watcher);
  }

  if (shouldWatch) {
    process.on('SIGINT', () => {
      // close watcher when Ctrl-C is pressed
      console.log('[katcn] Closing watcher...');
      watchers.map((watcher) => watcher.close());
      process.exit(0);
    });
  }

  return await Promise.all(
    sourceFiles.map(async (sourceFile) => {
      const filePath = sourceFile.getFilePath();
      if (filePath.endsWith('tsx')) {
        if (shouldWatch) {
          createWatcher(filePath);
        }
        return await processFile(sourceFile, filePath);
      }
    }),
  );
}
