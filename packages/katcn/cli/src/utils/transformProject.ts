import { type FSWatcher, existsSync, watch } from 'node:fs';
import path from 'node:path';
import {
  FileSystemRefreshResult,
  type Project,
  type SourceFile,
} from 'ts-morph';
import { getSafelist } from './getSafelist';
import { type SafelistMap, prettifySafelist } from './prettifySafelist';

interface TransformOptions {
  project: Project;
  outDir?: string;
  watch?: boolean;
  pwd?: string;
}

type OnSourceFileChange = (sourceFile: SourceFile) => void;

export async function transformProject({
  project,
  outDir,
  watch: shouldWatch = false,
  pwd,
}: TransformOptions) {
  const watchers: FSWatcher[] = [];
  const sourceFiles = project.getSourceFiles();
  const outfile = outDir ? path.resolve(outDir, 'safelist.ts') : '';
  const safelistMap: SafelistMap = new Map();

  const shouldParseFile = (filePath: string) =>
    pwd && filePath.startsWith(pwd) && filePath.endsWith('tsx');

  const onChange: OnSourceFileChange = async (sFile) => {
    const filePath = sFile.getFilePath();
    if (shouldParseFile(filePath)) {
      // console.log('[katcn] parsing', filePath);
      const data = getSafelist({
        sourceFile: sFile,
        safelistMap,
      });
      if (outDir) {
        const safelist = await prettifySafelist(safelistMap);
        await Bun.write(outfile, safelist);
      }
    }
  };

  if (shouldWatch) {
    for (const sourceFile of project.getSourceFiles()) {
      const filePath = sourceFile.getFilePath();
      if (shouldParseFile(filePath) && existsSync(filePath)) {
        const filePath = sourceFile.getFilePath();
        const watchFn = watch(filePath, (event) => {
          if (event === 'change') {
            console.log('[katcn] file changed:', filePath);
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
    if (shouldParseFile(filePath)) {
      // console.log('[katcn] parsing', filePath);
      const data = getSafelist({
        sourceFile: sourceFile,
        safelistMap,
      });
    }
  }

  if (outDir) {
    const safelist = await prettifySafelist(safelistMap);
    await Bun.write(outfile, safelist);
  }

  return safelistMap;
}
