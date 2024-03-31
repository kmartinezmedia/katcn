import type { Project } from 'ts-morph';
import { defaultTokensConfig } from '../../tokens';
import type { UniversalTokensConfig } from '../../types';
import {
  type OnSourceFileChange,
  transformWatchers,
} from './transformWatchers';
import { transformSourceFile } from './transformSourceFile';
import { type KatcnStyleSheetOpts, KatcnStyleSheet } from '../css/stylesheet';

interface TransformOptions {
  config?: UniversalTokensConfig;
  project: Project;
  outFile?: string;
  watch?: boolean;
  disablePreflight?: boolean;
  scaleMode?: KatcnStyleSheetOpts['scaleMode'];
  colorMode?: KatcnStyleSheetOpts['colorMode'];
}

export async function transformProject({
  config = defaultTokensConfig,
  project,
  outFile,
  watch: shouldWatch = false,
  disablePreflight = false,
  scaleMode = 'all',
  colorMode = 'all',
}: TransformOptions) {
  const sourceFiles = project.getSourceFiles('**/*.tsx');
  const stylesheet = new KatcnStyleSheet({
    config,
    disablePreflight,
    scaleMode,
    colorMode,
  });

  const onChange: OnSourceFileChange = async (sFile) => {
    transformSourceFile({
      stylesheet,
      sourceFile: sFile,
      config,
    });
    if (outFile) {
      await Bun.write(outFile, stylesheet.css);
    }
  };

  if (shouldWatch) {
    transformWatchers({ project, onChange });
  }

  for (const sourceFile of sourceFiles) {
    transformSourceFile({ sourceFile, config, stylesheet });
    console.log(stylesheet.css);
  }

  if (outFile) {
    await Bun.write(outFile, stylesheet.css);
  }

  return stylesheet.css;
}
