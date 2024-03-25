import { mapValues } from '../../helpers';
import { defaultTokensConfig, spacing, zIndex } from '../../tokens';
import type { UniversalTokensConfig } from '../../types';
import { createTheme } from './createTheme';

export function createBase(
  config: UniversalTokensConfig = defaultTokensConfig,
) {
  const theme = createTheme({
    colorMode: 'light',
    scaleMode: 'large',
    config,
  });
  return {
    font: mapValues(
      config.fontFamily,
      (value) => `${value.fallbacks.join(', ')}`,
    ),
    color: {
      ...mapValues(config.colorMode.light.spectrum, (value) => {
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
      }),
      gray: {
        '0': `oklch(99% .01 ${config.colorMode.light.spectrum.gray})`,
        '1': `oklch(95% .01 ${config.colorMode.light.spectrum.gray})`,
        '2': `oklch(88% .01 ${config.colorMode.light.spectrum.gray})`,
        '3': `oklch(80% .01 ${config.colorMode.light.spectrum.gray})`,
        '4': `oklch(74% .01 ${config.colorMode.light.spectrum.gray})`,
        '5': `oklch(68% .01 ${config.colorMode.light.spectrum.gray})`,
        '6': `oklch(63% .01 ${config.colorMode.light.spectrum.gray})`,
        '7': `oklch(58% .01 ${config.colorMode.light.spectrum.gray})`,
        '8': `oklch(53% .01 ${config.colorMode.light.spectrum.gray})`,
        '9': `oklch(49% .01 ${config.colorMode.light.spectrum.gray})`,
        '10': `oklch(42% .01 ${config.colorMode.light.spectrum.gray})`,
        '11': `oklch(35% .01 ${config.colorMode.light.spectrum.gray})`,
        '12': `oklch(27% .01 ${config.colorMode.light.spectrum.gray})`,
        '13': `oklch(20% .01 ${config.colorMode.light.spectrum.gray})`,
        '14': `oklch(14% .01 ${config.colorMode.light.spectrum.gray})`,
        '15': `oklch(11% .01 ${config.colorMode.light.spectrum.gray})`,
      },
    },
    ...theme,
    spacing,
    zIndex,
  };
}
