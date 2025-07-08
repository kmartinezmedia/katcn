import prettier from 'prettier';
import { getCss } from '#getCss';
import { defaultTokensConfig } from '#tokens';
import type { KatcnConfig } from '#types';
import type { SafelistMap } from '../types';
import { flattenSafelistMap } from './flattenSafelistMap';

export async function convertSafelistMapToCss(
  safelistMap: SafelistMap,
  config: KatcnConfig = defaultTokensConfig,
) {
  const flattenedSafelist = flattenSafelistMap(safelistMap);
  const sourceCss = flattenedSafelist
    .map((item) => `@source inline("${item}");`)
    .join('\n');

  const finalCss = `
    ${getCss(config)}
    ${sourceCss}
  `;

  return prettier.format(finalCss, {
    parser: 'css',
  });
}
