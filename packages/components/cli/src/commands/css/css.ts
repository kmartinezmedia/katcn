import type { Props } from 'bluebun';
import path from 'node:path';
import { FileSystemRefreshResult, Project, type SourceFile } from 'ts-morph';
import { transformTsx } from './_transformTsx';
import { type FSWatcher, watch } from 'node:fs';

interface CssProps extends Props {
  options: {
    watch?: boolean;
  };
}

export default {
  name: 'css',
  description: '',
  run: async (props: CssProps) => {
    const classNamesMap = new Map<string, string[]>();
    const project = new Project({
      tsConfigFilePath: path.resolve(Bun.env.PWD, 'tsconfig.json'),
      skipAddingFilesFromTsConfig: false,
    });

    const sourceFiles = project.getSourceFiles();
    const watchers: FSWatcher[] = [];

    async function writeTailwind() {
      const classNamesAsString = Array.from(classNamesMap.values())
        .join(' ')
        .replaceAll(',', ' ')
        .trimStart()
        .trimEnd();

      const outFile = `${Bun.env.PWD}/.katcn/css.tsx`;
      const content = `export default function Placeholder() {
  return <span className='${classNamesAsString}' />
}`;
      Bun.write(outFile, content);
    }

    function processFile(sourceFile: SourceFile, filePath: string) {
      const relativeFilePath = path.relative(Bun.env.PWD, filePath);
      const content = sourceFile.getFullText();
      const classNames = transformTsx({ project, content, filePath });
      classNamesMap.set(filePath, classNames);
      if (classNames.length) {
        console.log(`[katcn] ${relativeFilePath}: ${classNames.join(' ')}`);
        writeTailwind();
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

    for (const sourceFile of sourceFiles) {
      const filePath = sourceFile.getFilePath();
      if (filePath.endsWith('tsx')) {
        if (props.options.watch) {
          createWatcher(filePath);
        }
        processFile(sourceFile, filePath);
      }
    }

    if (props.options.watch) {
      process.on('SIGINT', () => {
        // close watcher when Ctrl-C is pressed
        console.log('[katcn] Closing watcher...');
        watchers.map((watcher) => watcher.close());
        process.exit(0);
      });
    }

    writeTailwind();
  },
};
