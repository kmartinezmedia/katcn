import type {
  ColorMode,
  PaletteValue,
  UniversalTokensConfig,
} from '../../types';
import { mapValues } from '../../helpers';
import { defaultTokensConfig } from '#tokens/defaultTokensConfig';

export function createPalette(
  colorMode: ColorMode,
  config: UniversalTokensConfig = defaultTokensConfig,
) {
  const palette = config.colorMode[colorMode].palette;
  return {
    color: mapValues(palette, (nestedConfig) => {
      return mapValues(nestedConfig, (value) => {
        const { hue, step, opacity = 1 } = value as PaletteValue;
        return `oklch(from var(--color-${hue}-${step}) l c h / ${opacity})`;
      });
    }),
  };
}
