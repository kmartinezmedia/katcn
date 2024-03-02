import {
  type ColorMode,
  type ColorsConfig,
  type ElevationConfig,
  type FontFamilyGlobalConfig,
  type FontWeightConfig,
  type Hue,
  type HueStep,
  type PaletteConfig,
  type PaletteType,
  type ScaleMode,
  type UniversalTokensConfig,
} from '../../types/tokens';
import { entries } from '../../utils/entries';
import { mapValues } from '../../utils/mapValues';
import { fontWeightMap } from '../typography';

export const KATCN_PREFIX = 'katcn';

/* -------------------------------------------------------------------------- */
/*                              CSS VAR PREFIXES                              */
/* -------------------------------------------------------------------------- */
export const COLOR_PREFIX = `${KATCN_PREFIX}-color`;
export const ELEVATION_PREFIX = `${KATCN_PREFIX}-elevation`;
export const FONT_FAMILY_PREFIX = `${KATCN_PREFIX}-font`;
export const ICON_SIZE_PREFIX = `${KATCN_PREFIX}-icon-size`;
export const AVATAR_SIZE_PREFIX = `${KATCN_PREFIX}-avatar-size`;
export const BORDER_RADIUS_PREFIX = `${KATCN_PREFIX}-border-radius`;
export const BORDER_WIDTH_PREFIX = `${KATCN_PREFIX}-border-width`;
export const SPACING_PREFIX = `${KATCN_PREFIX}-spacing`;
export const FONT_SIZE_PREFIX = `${KATCN_PREFIX}-font-size`;
export const LINE_HEIGHT_PREFIX = `${KATCN_PREFIX}-line-height`;
export const FONT_WEIGHT_PREFIX = `${KATCN_PREFIX}-font-weight`;
export const TEXT_TRANSFORM_PREFIX = `${KATCN_PREFIX}-text-transform`;

/* -------------------------------------------------------------------------- */
/*                               MODE CLASSNAMES                              */
/* -------------------------------------------------------------------------- */
export const DARK_COLOR_MODE_CLASSNAME = `${KATCN_PREFIX}-color-mode-dark`;
export const LIGHT_COLOR_MODE_CLASSNAME = `${KATCN_PREFIX}-color-mode-light`;
export const XSMALL_SCALE_MODE_CLASSNAME = `${KATCN_PREFIX}-scale-mode-xsmall`;
export const SMALL_SCALE_MODE_CLASSNAME = `${KATCN_PREFIX}-scale-mode-small`;
export const MEDIUM_SCALE_MODE_CLASSNAME = `${KATCN_PREFIX}-scale-mode-medium`;
export const LARGE_SCALE_MODE_CLASSNAME = `${KATCN_PREFIX}-scale-mode-large`;
export const XLARGE_SCALE_MODE_CLASSNAME = `${KATCN_PREFIX}-scale-mode-xlarge`;
export const XXLARGE_SCALE_MODE_CLASSNAME = `${KATCN_PREFIX}-scale-mode-xxlarge`;
export const XXXLARGE_SCALE_MODE_CLASSNAME = `${KATCN_PREFIX}-scale-mode-xxxlarge`;

/* -------------------------------------------------------------------------- */
/*                           DEFAULT MODE CLASSNAMES                          */
/* -------------------------------------------------------------------------- */
export const DEFAULT_COLOR_MODE_CLASSNAME = LIGHT_COLOR_MODE_CLASSNAME;
export const DEFAULT_SCALE_MODE_CLASSNAME = LARGE_SCALE_MODE_CLASSNAME;

/* -------------------------------------------------------------------------- */
/*                               FONT VARIABLES                               */
/* -------------------------------------------------------------------------- */
export const FONT_ICONS_CSS_VAR = `--${KATCN_PREFIX}-font-icons`;
export const FONT_SANS_CSS_VAR = `--${KATCN_PREFIX}-font-sans`;
export const FONT_SANS_BETA_CSS_VAR = `--${KATCN_PREFIX}-font-sans-beta`;
export const FONT_SANS_CONDENSED_CSS_VAR = `--${KATCN_PREFIX}-font-sans-condensed`;
export const FONT_SERIF_DISPLAY_CSS_VAR = `--${KATCN_PREFIX}-font-serif-display`;
export const FONT_SERIF_TEXT_CSS_VAR = `--${KATCN_PREFIX}-font-serif-text`;

function transformColorMode(colors: ColorsConfig) {
  const { palette, spectrum, elevation } = colors;
  const rootVars: Record<string, string> = {};

  const tailwindConfig = {
    spectrum: {} as Record<Hue, Record<HueStep, string>>,
    palette: {} as {
      [key in PaletteType]: Record<keyof PaletteConfig[key], string>;
    },
    elevation: {} as Record<keyof ElevationConfig, string>,
  };

  function addSpectrumColor(hue: Hue, hueStep: HueStep, value: string) {
    const name = `--${COLOR_PREFIX}-${hue}-${hueStep}`;
    rootVars[name] = value;
    if (!tailwindConfig.spectrum[hue]) {
      tailwindConfig.spectrum[hue] = {} as Record<HueStep, string>;
    }
    tailwindConfig.spectrum[hue][hueStep] = `rgb(var(${name}))`;
  }

  for (const [paletteType, paletteConfig] of entries(palette)) {
    for (const [paletteKey, { hue, step, opacity }] of entries(paletteConfig)) {
      addSpectrumColor(hue, step, spectrum[hue][step]);
      if (!(paletteType in tailwindConfig.palette)) {
        // @ts-expect-error we fill this object later
        tailwindConfig.palette[paletteType] = {};
      }
      const name = `--${KATCN_PREFIX}-${paletteType}-color-${paletteKey}`;
      rootVars[name] = `var(--${COLOR_PREFIX}-${hue}-${step})`;
      // @ts-expect-error this is fine
      tailwindConfig.palette[paletteType][paletteKey] = opacity
        ? `rgb(var(${name}) / ${opacity})`
        : `rgb(var(${name}))`;
    }
  }

  for (const [elevationVariant, elevationValue] of entries(elevation)) {
    const value = elevationValue
      .map(
        ({ color, offsetX, offsetY, blurRadius, spreadRadius }) =>
          `${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px ${color}`,
      )
      .join(', ');

    const name = `--${KATCN_PREFIX}-elevation-${elevationVariant}`;
    rootVars[name] = value;
    tailwindConfig.elevation[elevationVariant] = `var(--${name})`;
  }

  return {
    vars: rootVars,
    tailwindConfig,
  };
}

function transformFontWeight(config: FontWeightConfig) {
  const rootVars: Record<string, string> = {};
  const tailwindConfig = {} as Record<string, string>;
  for (const [variant, value = 'regular'] of entries(config)) {
    const rootVarKey = `--${FONT_WEIGHT_PREFIX}-${variant}`;
    const rootVarValue = fontWeightMap[value];
    rootVars[rootVarKey] = rootVarValue;
    tailwindConfig[variant] = `var(${rootVarKey})`;
  }

  return {
    vars: rootVars,
    tailwindConfig: {
      ...fontWeightMap,
      ...tailwindConfig,
    },
  };
}

function transformString<T extends Record<string, string>>(
  prefix: string,
  config: T,
  transformValue?: (value: string) => string,
) {
  const rootVars: Record<string, string> = {};
  const tailwindConfig = {} as Record<string, string>;
  for (const [variant, value] of entries(config)) {
    const rootVarKey = `--${prefix}-${variant}`;
    const rootVarValue = transformValue ? transformValue(value) : value;
    rootVars[rootVarKey] = rootVarValue;
    tailwindConfig[variant] = `var(${rootVarKey})`;
  }
  return {
    vars: rootVars,
    tailwindConfig,
  };
}

function transformNumeric<T extends Record<string, number>>(
  prefix: string,
  config: T,
) {
  if (!config) {
    return {
      _vars: {},
      tailwindConfig: {},
    };
  }
  const rootVars: Record<string, string> = {};
  const tailwindConfig = {} as Record<string, string>;
  for (const [variant, value] of entries(config)) {
    const rootVarKey = `--${prefix}-${variant}`;
    const rootVarValue = `${value}px`;
    rootVars[rootVarKey] = rootVarValue;
    tailwindConfig[variant] = `var(${rootVarKey})`;
  }
  return {
    vars: rootVars,
    tailwindConfig,
  };
}

function transformFontFamilyGlobal(fontFamily: FontFamilyGlobalConfig) {
  return mapValues(fontFamily, (value, alias) => {
    const { fallbacks = [] } = value ?? {};
    return [`var(--${FONT_FAMILY_PREFIX}-${alias})`, ...fallbacks];
  });
}

type WebTokens = Omit<
  UniversalTokensConfig,
  'colorMode' | 'scaleMode' | 'fontFamily' | 'elevation'
> & {
  fontFamily: ReturnType<typeof transformFontFamilyGlobal>;
  colorMode: Record<ColorMode, ReturnType<typeof transformColorMode>>;
  scaleMode: Record<
    ScaleMode,
    {
      fontFamily: ReturnType<typeof transformString>;
      fontSize: ReturnType<typeof transformNumeric>;
      fontWeight: ReturnType<typeof transformFontWeight>;
      lineHeight: ReturnType<typeof transformNumeric>;
      textTransform: ReturnType<typeof transformString>;
      borderRadius: ReturnType<typeof transformNumeric>;
      borderWidth: ReturnType<typeof transformNumeric>;
      spacing: ReturnType<typeof transformNumeric>;
      avatarSizes: ReturnType<typeof transformNumeric>;
      iconSizes: ReturnType<typeof transformNumeric>;
    }
  >;
};

export function parseTokens(config: UniversalTokensConfig): WebTokens {
  const { colorMode, scaleMode, fontFamily } = config;

  return {
    ...config,
    colorMode: {
      light: transformColorMode(colorMode.light),
      dark: transformColorMode(colorMode.dark),
    },
    scaleMode: mapValues(
      scaleMode,
      ({
        borderRadius,
        borderWidth,
        spacing,
        fontSize,
        lineHeight,
        fontFamily,
        fontWeight,
        textTransform,
        avatarSizes,
        iconSizes,
      }) => {
        return {
          fontFamily: transformString(
            FONT_FAMILY_PREFIX,
            fontFamily,
            (val) => `var(--${FONT_FAMILY_PREFIX}-${val})`,
          ),
          fontSize: transformNumeric(FONT_SIZE_PREFIX, fontSize),
          fontWeight: transformFontWeight(fontWeight),
          lineHeight: transformNumeric(LINE_HEIGHT_PREFIX, lineHeight),
          textTransform: transformString(TEXT_TRANSFORM_PREFIX, textTransform),
          borderRadius: transformNumeric(BORDER_RADIUS_PREFIX, borderRadius),
          borderWidth: transformNumeric(BORDER_WIDTH_PREFIX, borderWidth),
          spacing: transformNumeric(SPACING_PREFIX, spacing),
          avatarSizes: transformNumeric(AVATAR_SIZE_PREFIX, avatarSizes),
          iconSizes: transformNumeric(ICON_SIZE_PREFIX, iconSizes),
        };
      },
    ),
    fontFamily: transformFontFamilyGlobal(fontFamily),
  };
}
