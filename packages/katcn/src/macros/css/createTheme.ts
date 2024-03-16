import { mapValues } from '../../helpers';
import { defaultTokensConfig } from '../../tokens';
import type {
  ColorMode,
  PaletteValue,
  ScaleMode,
  UniversalTokensConfig,
} from '../../types';

interface CreateThemeOpts {
  colorMode?: ColorMode;
  scaleMode?: ScaleMode;
  config?: UniversalTokensConfig;
}

function createPalette(
  colorMode: ColorMode,
  config: UniversalTokensConfig = defaultTokensConfig,
) {
  const palette = config.colorMode[colorMode].palette;
  return mapValues(palette, (nestedConfig) => {
    return mapValues(nestedConfig, (value) => {
      const { hue, step, opacity = 1 } = value as PaletteValue;
      return `var(--katcn-color-${hue}-${step})`;
    });
  });
}

export function createTheme({
  colorMode,
  scaleMode,
  config = defaultTokensConfig,
}: CreateThemeOpts) {
  const colorModeTheme = colorMode
    ? {
        palette: createPalette(colorMode, config),
      }
    : {};

  const scaleModeTheme = scaleMode
    ? {
        'font-family': mapValues(
          config.scaleMode.large.fontFamily,
          (value) => `var(--katcn-font-${value})`,
        ),
        'font-size': mapValues(
          config.scaleMode[scaleMode].fontSize,
          (value) => `${value}px`,
        ),
        'font-weight': mapValues(
          config.scaleMode[scaleMode].textTransform,
          (value) => value,
        ),
        'line-height': mapValues(
          config.scaleMode[scaleMode].lineHeight,
          (value) => `${value}px`,
        ),
        'text-transform': mapValues(
          config.scaleMode[scaleMode].textTransform,
          (value) => value,
        ),
        'border-width': mapValues(
          config.scaleMode[scaleMode].borderWidth,
          (value) => `${value}px`,
        ),
        radii: mapValues(
          config.scaleMode[scaleMode].borderRadius,
          (value) => `${value}px`,
        ),
        'icon-size': mapValues(
          config.scaleMode[scaleMode].iconSizes,
          (value) => `${value}px`,
        ),
        'avatar-size': mapValues(
          config.scaleMode[scaleMode].avatarSizes,
          (value) => `${value}px`,
        ),
      }
    : {};

  return {
    ...colorModeTheme,
    ...scaleModeTheme,
  };
}
