import { entries, mapValues } from '../../helpers';
import { defaultTokensConfig, fontWeightMap } from '../../tokens';
import type {
  FontWeight,
  PaletteConfig,
  PaletteValue,
  TextVariant,
  TypographyConfig,
  UniversalTokensConfig,
} from '../../types';

function getPaletteVars(palette: PaletteConfig) {
  return mapValues(palette, (nestedConfig) => {
    return mapValues(nestedConfig, (value) => {
      const { hue, step, opacity = 1 } = value as PaletteValue;
      return `var(--color-${hue}-${step})`;
    });
  });
}

function getTypographyVars(typography: TypographyConfig) {
  const varsConfig = {
    'font-family': {} as Record<TextVariant, string>,
    'font-size': {} as Record<TextVariant, string>,
    'font-weight': fontWeightMap as Record<FontWeight, string>,
    'line-height': {} as Record<TextVariant, string>,
    'text-transform': {} as Record<TextVariant, string>,
  };

  for (const [key, variantConfig] of entries(typography)) {
    const {
      fontFamily = 'sans',
      fontSize,
      fontWeight = 'regular',
      lineHeight,
      textTransform = 'none',
    } = variantConfig;
    varsConfig['font-family'][key] = `var(--font-${fontFamily})`;
    varsConfig['font-size'][key] = `${fontSize}px`;
    varsConfig['font-weight'][key] = fontWeight;
    varsConfig['line-height'][key] = `${lineHeight}px`;
    varsConfig['text-transform'][key] = textTransform;
  }
  return varsConfig;
}

export function createTheme({
  fontFamily = defaultTokensConfig.fontFamily,
  hues = defaultTokensConfig.hues,
  huesChroma = defaultTokensConfig.huesChroma,
  huesLightness = defaultTokensConfig.huesLightness,
  palette = defaultTokensConfig.palette,
  typography = defaultTokensConfig.typography,
  borderRadius = defaultTokensConfig.borderRadius,
  borderWidth = defaultTokensConfig.borderWidth,
  spacing = defaultTokensConfig.spacing,
  iconSizes = defaultTokensConfig.iconSizes,
  avatarSizes = defaultTokensConfig.avatarSizes,
  zIndex = defaultTokensConfig.zIndex,
}: UniversalTokensConfig) {
  return {
    font: mapValues(fontFamily, (value) => `${value.fallbacks.join(', ')}`),
    hue: hues,
    'hue-lightness': huesLightness,
    'hue-chroma': huesChroma,
    color: {
      ...mapValues(hues, (value, key) => {
        return {
          '0': `oklch(var(--hue-lightness-0) var(--hue-chroma-0) var(--hue-${key}))`,
          '1': `oklch(var(--hue-lightness-1) var(--hue-chroma-1) var(--hue-${key}))`,
          '2': `oklch(var(--hue-lightness-2) var(--hue-chroma-2) var(--hue-${key}))`,
          '3': `oklch(var(--hue-lightness-3) var(--hue-chroma-3) var(--hue-${key}))`,
          '4': `oklch(var(--hue-lightness-4) var(--hue-chroma-4) var(--hue-${key}))`,
          '5': `oklch(var(--hue-lightness-5) var(--hue-chroma-5) var(--hue-${key}))`,
          '6': `oklch(var(--hue-lightness-6) var(--hue-chroma-6) var(--hue-${key}))`,
          '7': `oklch(var(--hue-lightness-7) var(--hue-chroma-7) var(--hue-${key}))`,
          '8': `oklch(var(--hue-lightness-8) var(--hue-chroma-8) var(--hue-${key}))`,
          '9': `oklch(var(--hue-lightness-9) var(--hue-chroma-9) var(--hue-${key}))`,
          '10': `oklch(var(--hue-lightness-10) var(--hue-chroma-10) var(--hue-${key}))`,
          '11': `oklch(var(--hue-lightness-11) var(--hue-chroma-11) var(--hue-${key}))`,
          '12': `oklch(var(--hue-lightness-12) var(--hue-chroma-12) var(--hue-${key}))`,
          '13': `oklch(var(--hue-lightness-13) var(--hue-chroma-13) var(--hue-${key}))`,
          '14': `oklch(var(--hue-lightness-14) var(--hue-chroma-14) var(--hue-${key}))`,
          '15': `oklch(var(--hue-lightness-15) var(--hue-chroma-15) var(--hue-${key}))`,
        };
      }),
      gray: {
        '0': `oklch(99% .018 ${hues.gray})`,
        '1': `oklch(95% .018 ${hues.gray})`,
        '2': `oklch(88% .018 ${hues.gray})`,
        '3': `oklch(80% .018 ${hues.gray})`,
        '4': `oklch(74% .018 ${hues.gray})`,
        '5': `oklch(68% .018 ${hues.gray})`,
        '6': `oklch(63% .018 ${hues.gray})`,
        '7': `oklch(58% .018 ${hues.gray})`,
        '8': `oklch(53% .018 ${hues.gray})`,
        '9': `oklch(49% .018 ${hues.gray})`,
        '10': `oklch(42% .018 ${hues.gray})`,
        '11': `oklch(35% .018 ${hues.gray})`,
        '12': `oklch(27% .018 ${hues.gray})`,
        '13': `oklch(20% .018 ${hues.gray})`,
        '14': `oklch(14% .018 ${hues.gray})`,
        '15': `oklch(11% .018 ${hues.gray})`,
      },
      carbon: {
        '0': `oklch(99% 0 ${hues.carbon})`,
        '1': `oklch(95% 0 ${hues.carbon})`,
        '2': `oklch(88% 0 ${hues.carbon})`,
        '3': `oklch(80% 0 ${hues.carbon})`,
        '4': `oklch(74% 0 ${hues.carbon})`,
        '5': `oklch(68% 0 ${hues.carbon})`,
        '6': `oklch(63% 0 ${hues.carbon})`,
        '7': `oklch(58% 0 ${hues.carbon})`,
        '8': `oklch(53% 0 ${hues.carbon})`,
        '9': `oklch(49% 0 ${hues.carbon})`,
        '10': `oklch(42% 0 ${hues.carbon})`,
        '11': `oklch(35% 0 ${hues.carbon})`,
        '12': `oklch(27% 0 ${hues.carbon})`,
        '13': `oklch(20% 0 ${hues.carbon})`,
        '14': `oklch(14% 0 ${hues.carbon})`,
        '15': `oklch(11% 0 ${hues.carbon})`,
      },
    },
    palette: getPaletteVars(palette),
    ...getTypographyVars(typography),
    'border-width': mapValues(borderWidth, (value) => `${value}px`),
    radii: mapValues(borderRadius, (value) => `${value}px`),
    'icon-size': mapValues(iconSizes, (value) => `${value}px`),
    'avatar-size': mapValues(avatarSizes, (value) => `${value}px`),
    spacing,
    zIndex,
  };
}
