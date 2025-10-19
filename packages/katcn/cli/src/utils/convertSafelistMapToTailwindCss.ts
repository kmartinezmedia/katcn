import type { KatcnConfig } from '@katcn/types';
import prettier from 'prettier';
import { getTailwindCss } from '#getTailwindCss';
import { defaultTokensConfig } from '#tokens';
import type { SafelistMap } from '../types';
import { flattenSafelistMap } from './flattenSafelistMap';

export async function convertSafelistMapToTailwindCss(
  safelistMap: SafelistMap,
  config: KatcnConfig = defaultTokensConfig,
) {
  const flattenedSafelist = flattenSafelistMap(safelistMap);
  const sourceCss = flattenedSafelist
    .map((item) => `@source inline("${item}");`)
    .join('\n');

  const finalCss = `
    ${getTailwindCss(config)}
    ${sourceCss}
  `;

  return prettier.format(finalCss, {
    parser: 'css',
  });
}
