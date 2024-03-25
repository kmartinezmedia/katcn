import { type FSWatcher, existsSync, watch } from 'node:fs';
import {
  FileSystemRefreshResult,
  type Project,
  type SourceFile,
} from 'ts-morph';

export type OnSourceFileChange = (sourceFile: SourceFile) => void;

export interface TransformWatcherOptions {
  sourceFile: SourceFile;
  onChange: OnSourceFileChange;
}

export function createTransformWatcher({
  sourceFile,
  onChange,
}: TransformWatcherOptions) {
  const filePath = sourceFile.getFilePath();
  return watch(filePath, (event) => {
    if (event === 'change') {
      console.log('[katcn] File changed:', filePath);
      sourceFile?.refreshFromFileSystem().then((status) => {
        if (status === FileSystemRefreshResult.Updated) {
          onChange(sourceFile);
        }
      });
    }
  });
}

export interface TransformWatchersOptions {
  project: Project;
  onChange: OnSourceFileChange;
}

export function transformWatchers({
  project,
  onChange,
}: TransformWatchersOptions) {
  const watchers: FSWatcher[] = [];

  for (const sourceFile of project.getSourceFiles()) {
    const filePath = sourceFile.getFilePath();
    if (filePath.endsWith('tsx') && existsSync(filePath)) {
      watchers.push(createTransformWatcher({ sourceFile, onChange }));
    }
  }

  process.on('SIGINT', () => {
    // close watcher when Ctrl-C is pressed
    console.log('[katcn] Closing watcher...');
    watchers.map((watcher) => watcher.close());
    process.exit(0);
  });
}
