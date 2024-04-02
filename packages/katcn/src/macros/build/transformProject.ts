import type { Project } from 'ts-morph';
import { defaultTokensConfig } from '../../tokens';
import type { UniversalTokensConfig } from '../../types';
import { KatcnStyleSheet } from '../css/stylesheet';
import { transformTsx } from './transformTsx';
import {
  type OnSourceFileChange,
  transformWatchers,
} from './transformWatchers';

interface TransformOptions {
  config?: UniversalTokensConfig;
  project: Project;
  outFile?: string;
  watch?: boolean;
  disablePreflight?: boolean;
}

export async function transformProject({
  config = defaultTokensConfig,
  project,
  outFile,
  watch: shouldWatch = false,
  disablePreflight = false,
}: TransformOptions) {
  const sourceFiles = project.getSourceFiles('**/*.tsx');
  const stylesheet = new KatcnStyleSheet({
    config,
    disablePreflight,
  });

  const onChange: OnSourceFileChange = async (sFile) => {
    transformTsx({
      sourceFile: sFile,
      stylesheet,
    });
    if (outFile) {
      await Bun.write(outFile, stylesheet.css);
    }
  };

  if (shouldWatch) {
    transformWatchers({ project, onChange });
  }

  for (const sourceFile of sourceFiles) {
    transformTsx({
      sourceFile: sourceFile,
      stylesheet,
    });
  }

  if (outFile) {
    await Bun.write(outFile, stylesheet.css);
  }

  return stylesheet.css;
}
