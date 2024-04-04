import type {
  AvatarSizeConfig,
  BorderRadiusConfig,
  BorderWidthConfig,
  FontFamilyGlobalConfig,
  FontWeightDescriptive,
  FontWeightNumeric,
  HuesChromaConfig,
  HuesConfig,
  HuesLightnessConfig,
  IconSizeConfig,
  PaletteConfig,
  SpacingConfig,
  TypographyConfig,
  UniversalTokensConfig,
  ZIndexConfig,
} from './types';

const hues: HuesConfig = {
  magenta: 331.6,
  pink: 4.6,
  rose: 7.4,
  red: 27.4,
  sunset: 33.9,
  orange: 42.7,
  nude: 42.5,
  brown: 68.8,
  yellow: 82.9,
  citron: 109.8,
  lime: 133.2,
  green: 154.4,
  mint: 164.9,
  teal: 194.8,
  cyan: 224.1,
  blue: 261,
  indigo: 273.3,
  purple: 289,
  gray: 248.1,
  carbon: 0,
};

const huesLightness: HuesLightnessConfig = {
  '0': '99%',
  '1': '95%',
  '2': '88%',
  '3': '80%',
  '4': '74%',
  '5': '68%',
  '6': '63%',
  '7': '58%',
  '8': '53%',
  '9': '49%',
  '10': '42%',
  '11': '35%',
  '12': '27%',
  '13': '20%',
  '14': '14%',
  '15': '11%',
};

const huesChroma: HuesChromaConfig = {
  '0': 0.03,
  '1': 0.06,
  '2': 0.12,
  '3': 0.14,
  '4': 0.16,
  '5': 0.19,
  '6': 0.2,
  '7': 0.21,
  '8': 0.2,
  '9': 0.19,
  '10': 0.17,
  '11': 0.15,
  '12': 0.12,
  '13': 0.09,
  '14': 0.07,
  '15': 0.05,
};

const palette: PaletteConfig = {
  core: {
    brand: { hue: 'purple', step: 9 },
    accent: { hue: 'blue', step: 9 },
    alert: { hue: 'red', step: 9 },
    positive: { hue: 'green', step: 9 },
    warning: { hue: 'orange', step: 9 },
  },
  background: {
    primary: { hue: 'gray', step: 0 },
    secondary: { hue: 'gray', step: 2 },
  },
  foreground: {
    primary: { hue: 'gray', step: 13 },
    secondary: { hue: 'gray', step: 14 },
    tertiary: { hue: 'gray', step: 9 },
    'on-color': { hue: 'gray', step: 0 },
  },
  line: {
    primary: { hue: 'gray', step: 14 },
    secondary: { hue: 'gray', step: 9 },
  },
};

const sansFallbacks = ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'];
const serifFallbacks = ['Georgia', 'Times', 'Times New Roman', 'serif'];

const fontFamily: FontFamilyGlobalConfig = {
  icons: { fallbacks: ['icons', ...sansFallbacks], name: 'icons' },
  sans: { fallbacks: sansFallbacks, name: 'sans' },
  'sans-condensed': { fallbacks: sansFallbacks, name: 'sans-condensed' },
  'serif-text': { fallbacks: serifFallbacks, name: 'serif-text' },
  'serif-display': { fallbacks: serifFallbacks, name: 'serif-display' },
  mono: {
    fallbacks: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
    name: 'mono',
  },
};

const typography: TypographyConfig = {
  display1: {
    fontFamily: 'sans',
    fontSize: '48px',
    lineHeight: '44px',
    fontWeight: 'black',
    textTransform: 'uppercase',
  },
  display2: {
    fontFamily: 'sans',
    fontSize: '40px',
    lineHeight: '44px',
    fontWeight: 'extrabold',
  },
  display3: {
    fontFamily: 'sans',
    fontSize: '36px',
    lineHeight: '44px',
    fontWeight: 'extrabold',
  },
  title1: {
    fontFamily: 'sans',
    fontSize: '32px',
    lineHeight: '40px',
    fontWeight: 'bold',
  },
  title2: {
    fontFamily: 'sans',
    fontSize: '28px',
    lineHeight: '36px',
    fontWeight: 'bold',
  },
  title3: {
    fontFamily: 'sans',
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: 'bold',
  },
  title4: {
    fontFamily: 'sans',
    fontSize: '20px',
    lineHeight: '24px',
    fontWeight: 'bold',
  },
  headline1: {
    fontFamily: 'sans',
    fontSize: '16px',
    lineHeight: '20px',
    fontWeight: 'semibold',
  },
  body1: {
    fontFamily: 'sans',
    fontSize: '16px',
    lineHeight: '20px',
  },
  label1: {
    fontFamily: 'sans',
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 'semibold',
  },
  label2: {
    fontFamily: 'sans',
    fontSize: '14px',
    lineHeight: '20px',
  },
  caption1: {
    fontFamily: 'sans',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 'semibold',
  },
  caption2: {
    fontFamily: 'sans',
    fontSize: '12px',
    lineHeight: '16px',
  },
  legal1: {
    fontFamily: 'sans',
    fontSize: '11px',
    lineHeight: '16px',
    fontWeight: 'semibold',
  },
};

const borderRadius: BorderRadiusConfig = {
  none: '0px',
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '16px',
  xl: '32px',
  full: '9999px',
};

const borderWidth: BorderWidthConfig = {
  none: '0px',
  thin: '1px',
  medium: '2px',
  thick: '4px',
};

const spacing: SpacingConfig = {
  px: '1px',
  '0': '0px',
  '0.5': '0.125rem',
  '1': '0.25rem',
  '1.5': '0.375rem',
  '2': '0.5rem',
  '2.5': '0.625rem',
  '3': '0.75rem',
  '3.5': '0.875rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '7': '1.75rem',
  '8': '2rem',
  '9': '2.25rem',
  '10': '2.5rem',
  '11': '2.75rem',
  '12': '3rem',
  '14': '3.5rem',
  '16': '4rem',
  '20': '5rem',
  '24': '6rem',
  '28': '7rem',
  '32': '8rem',
  '36': '9rem',
  '40': '10rem',
  '44': '11rem',
  '48': '12rem',
  '52': '13rem',
  '56': '14rem',
  '60': '15rem',
  '64': '16rem',
  '72': '18rem',
  '80': '20rem',
  '96': '24rem',
};

const avatarSizes: AvatarSizeConfig = {
  sm: '16px',
  md: '24px',
  lg: '32px',
};

const iconSizes: IconSizeConfig = {
  sm: '16px',
  md: '24px',
  lg: '32px',
};

const zIndex: ZIndexConfig = {
  auto: 'auto',
  '0': '0',
  '10': '10',
  '20': '20',
  '30': '30',
  '40': '40',
  '50': '50',
};

export const defaultTokensConfig: UniversalTokensConfig = {
  palette,
  hues,
  huesChroma,
  huesLightness,
  borderRadius,
  borderWidth,
  spacing,
  avatarSizes,
  iconSizes,
  zIndex,
  fontFamily,
  typography,
};

export const alwaysPalette = {
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
};

export const fontWeightMap: Record<FontWeightDescriptive, FontWeightNumeric> = {
  thin: '100',
  extralight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
};
