import path from 'node:path';
import { FileSystemRefreshResult, Project, type SourceFile } from 'ts-morph';
import { transformTsx } from './_transformTsx';
import { transformCss } from './_transformCss';
import type { UniversalTokensConfig } from '#types';
import { defaultTokensConfig } from '#tokens/defaultTokensConfig';
import { watch, type FSWatcher } from 'node:fs';

class CssRegistry {
  classNamesToKeep = new Map<string, Set<string>>();
  varsToKeep = new Map<string, Set<string>>();

  get allClassNamesToKeep() {
    return new Set(
      Array.from(this.classNamesToKeep.values()).flatMap((item) => {
        return Array.from(item.values()).flatMap((item) => {
          return item.trimStart().trimEnd().split(' ');
        });
      }),
    );
  }

  get allVarsToKeep() {
    return new Set(
      Array.from(this.varsToKeep.values()).flatMap((item) => [
        ...item.values(),
      ]),
    );
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

interface CssPurgerOptions {
  config?: UniversalTokensConfig;
  outFile?: string;
  watch?: boolean;
}

export class CssPurger {
  project: Project;
  watchers: FSWatcher[] = [];
  config: UniversalTokensConfig = defaultTokensConfig;
  outFile: string;
  watch: boolean;
  registry: CssRegistry;

  constructor({
    config = defaultTokensConfig,
    outFile = path.resolve(Bun.env.PWD, '.katcn/styles.css'),
    watch = false,
  }: CssPurgerOptions) {
    this.config = config;
    this.outFile = outFile;
    this.watch = watch;
    this.project = new Project({
      tsConfigFilePath: path.resolve(Bun.env.PWD, 'tsconfig.json'),
      skipAddingFilesFromTsConfig: false,
    });
    this.registry = new CssRegistry();

    if (watch) {
      process.on('SIGINT', () => {
        // close watcher when Ctrl-C is pressed
        console.log('[katcn] Closing watcher...');
        this.watchers.map((watcher) => watcher.close());
        process.exit(0);
      });
    }
  }

  createWatcher(filePath: string) {
    const watcher = watch(filePath, (event) => {
      if (event === 'change') {
        const sourceFile = this.project.getSourceFile(filePath);
        sourceFile?.refreshFromFileSystem().then((status) => {
          if (status === FileSystemRefreshResult.Updated) {
            this.processFile(sourceFile, filePath);
          }
        });
      }
    });
    this.watchers.push(watcher);
  }

  async processFile(sourceFile: SourceFile, filePath: string) {
    // const relativeFilePath = path.relative(Bun.env.PWD, filePath);
    const content = sourceFile.getFullText();
    const { classNamesToKeep, varsToKeep } = transformTsx({
      project: this.project,
      content,
      filePath,
    });

    this.registry.updateRegistry({ filePath, classNamesToKeep, varsToKeep });

    const fileHasCss = classNamesToKeep.size > 0 || varsToKeep.size > 0;

    if (fileHasCss) {
      const cssContent = await transformCss({
        config: this.config,
        classNamesToKeep: this.registry.allClassNamesToKeep,
        varsToKeep: this.registry.allVarsToKeep,
      });
      await Bun.write(this.outFile, cssContent);
    }
  }

  async processFiles() {
    const sourceFiles = this.project.getSourceFiles();
    await Promise.all(
      sourceFiles.map(async (sourceFile) => {
        const filePath = sourceFile.getFilePath();
        if (filePath.endsWith('tsx')) {
          if (this.watch) {
            this.createWatcher(filePath);
          }
          await this.processFile(sourceFile, filePath);
        }
      }),
    );
  }
}
