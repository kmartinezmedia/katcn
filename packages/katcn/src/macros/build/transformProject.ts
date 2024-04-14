import {
  FileSystemRefreshResult,
  type Project,
  type SourceFile,
} from 'ts-morph';
import { defaultTokensConfig } from '../../tokens';
import type { UniversalTokensConfig } from '../../types';
import { KatcnStyleSheet } from '../css/stylesheet';
import { transformTsx } from './transformTsx';
import { existsSync, type FSWatcher, watch } from 'node:fs';

interface TransformOptions {
  config?: UniversalTokensConfig;
  project: Project;
  outFile?: string;
  watch?: boolean;
  disablePreflight?: boolean;
}

type OnSourceFileChange = (sourceFile: SourceFile) => void;

export async function transformProject({
  config = defaultTokensConfig,
  project,
  outFile,
  watch: shouldWatch = false,
  disablePreflight = false,
}: TransformOptions) {
  const watchers: FSWatcher[] = [];
  const sourceFiles = project.getSourceFiles();
  const stylesheet = new KatcnStyleSheet({
    config,
    disablePreflight,
  });

  const onChange: OnSourceFileChange = async (sFile) => {
    const filePath = sFile.getFilePath();
    console.log('Parsing', filePath);
    const data = transformTsx({
      sourceFile: sFile,
      stylesheet,
    });
    if (outFile) {
      await Bun.write(outFile, stylesheet.css);
    }
  };

  if (shouldWatch) {
    for (const sourceFile of project.getSourceFiles()) {
      const filePath = sourceFile.getFilePath();
      if (filePath.endsWith('tsx') && existsSync(filePath)) {
        const filePath = sourceFile.getFilePath();
        const watchFn = watch(filePath, (event) => {
          if (event === 'change') {
            console.log('[katcn] File changed:', filePath);
            sourceFile?.refreshFromFileSystem().then((status) => {
              if (status === FileSystemRefreshResult.Updated) {
                onChange(sourceFile);
              }
            });
          }
        });
        watchers.push(watchFn);
      }
    }

    process.on('SIGINT', () => {
      // close watcher when Ctrl-C is pressed
      console.log('[katcn] Closing watcher...');
      watchers.map((watcher) => watcher.close());
      process.exit(0);
    });
  }

  for (const sourceFile of sourceFiles) {
    const filePath = sourceFile.getFilePath();
    console.log('Parsing', filePath);
    const data = transformTsx({
      sourceFile: sourceFile,
      stylesheet,
    });
  }

  if (outFile) {
    await Bun.write(outFile, stylesheet.css);
  }

  return stylesheet.css;
}
