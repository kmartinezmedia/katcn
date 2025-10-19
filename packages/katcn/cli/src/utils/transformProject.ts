import { existsSync, type FSWatcher, watch } from 'node:fs';
import type { KatcnConfig } from '@katcn/types';
import {
  FileSystemRefreshResult,
  type Project,
  type SourceFile,
} from 'ts-morph';
import { defaultTokensConfig } from '#tokens';
import type { SafelistMap } from '../types';
import { convertSafelistMapToTailwindCss } from './convertSafelistMapToTailwindCss';
import { processSafelistForSourceFile } from './processSafelistForSourceFile';

interface TransformOptions {
  project: Project;
  output?: string;
  watch?: boolean;
  pwd?: string;
  config?: KatcnConfig;
}

type OnSourceFileChange = (sourceFile: SourceFile) => void;

export async function transformProject({
  project,
  output,
  watch: shouldWatch = false,
  pwd,
  config = defaultTokensConfig,
}: TransformOptions) {
  const watchers: FSWatcher[] = [];
  const sourceFiles = project.getSourceFiles();
  const safelistMap: SafelistMap = new Map();

  const writeSafelist = async () => {
    if (output) {
      const css = await convertSafelistMapToTailwindCss(safelistMap, config);
      await Bun.write(output, css);
    }
  };

  const shouldParseFile = (filePath: string) =>
    pwd &&
    filePath.startsWith(pwd) &&
    (filePath.endsWith('tsx') || filePath.endsWith('css'));

  const onChange: OnSourceFileChange = async (sFile) => {
    const absoluteFilePath = sFile.getFilePath();
    if (shouldParseFile(absoluteFilePath)) {
      console.log('[katcn] parsing', absoluteFilePath);
      processSafelistForSourceFile({
        sourceFile: sFile,
        safelistMap,
      });
      await writeSafelist();
    }
  };

  if (shouldWatch) {
    console.log('[katcn] Watching for changes to project');
    for (const sourceFile of project.getSourceFiles()) {
      const absoluteFilePath = sourceFile.getFilePath();
      if (shouldParseFile(absoluteFilePath) && existsSync(absoluteFilePath)) {
        const absoluteFilePath = sourceFile.getFilePath();
        const watchFn = watch(absoluteFilePath, (event) => {
          console.log(`[katcn] Watching ${absoluteFilePath}`);
          if (event === 'change') {
            console.log('[katcn] file changed:', absoluteFilePath);
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
    const absoluteFilePath = sourceFile.getFilePath();
    if (shouldParseFile(absoluteFilePath)) {
      // console.log('[katcn] parsing', filePath);
      processSafelistForSourceFile({
        sourceFile: sourceFile,
        safelistMap,
      });
    }
  }
  console.log('[katcn] done parsing');

  await writeSafelist();

  return safelistMap;
}
