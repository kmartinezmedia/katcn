import { defaultTokensConfig } from '#tokens/defaultTokensConfig';
import { mapValues } from '../../helpers';
import type { ScaleMode, UniversalTokensConfig } from '../../types';

export function createTypography(
  scaleMode: ScaleMode,
  config: UniversalTokensConfig = defaultTokensConfig,
) {
  const typeConfig = config.scaleMode[scaleMode];
  const fontFamily = mapValues(typeConfig.fontFamily, (value) => {
    return {
      '0': `oklch(99% .03 ${value})`,
      '1': `oklch(95% .06 ${value})`,
      '2': `oklch(88% .12 ${value})`,
      '3': `oklch(80% .14 ${value})`,
      '4': `oklch(74% .16 ${value})`,
      '5': `oklch(68% .19 ${value})`,
      '6': `oklch(63% .20 ${value})`,
      '7': `oklch(58% .21 ${value})`,
      '8': `oklch(53% .20 ${value})`,
      '9': `oklch(49% .19 ${value})`,
      '10': `oklch(42% .17 ${value})`,
      '11': `oklch(35% .15 ${value})`,
      '12': `oklch(27% .12 ${value})`,
      '13': `oklch(20% .09 ${value})`,
      '14': `oklch(14% .07 ${value})`,
      '15': `oklch(11% .05 ${value})`,
    };
  });

  return {
    // fontFamily: config.fontFamily,
    // fontSize: config.fontSize,
    // lineHeight: config.lineHeight,
    // textTransform: config.textTransform,
  };
}
