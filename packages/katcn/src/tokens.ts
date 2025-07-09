import type {
  BorderRadiusConfig,
  BorderWidthConfig,
  FontFamilyGlobalConfig,
  KatcnConfig,
  ResponsiveConfig,
  SpacingConfig,
  TypographyConfig,
  ZIndexConfig,
} from '@katcn/types';

const lightColors = {
  brand: 'blue-500',
  'on-brand': 'zinc-50',
  accent: 'rose-600',
  'on-accent': 'zinc-50',
  alert: 'red-500',
  'on-alert': 'zinc-50',
  positive: 'green-500',
  'on-positive': 'zinc-50',
  warning: 'orange-500',
  'on-warning': 'zinc-50',
  primary: 'zinc-50',
  'on-primary': 'zinc-900',
  secondary: 'zinc-200',
  'on-secondary': 'zinc-600',
  tertiary: 'zinc-100',
  'on-tertiary': 'zinc-500',
  inverse: 'zinc-900',
  'on-inverse': 'zinc-50',
};

const darkColors = lightColors;

const sansFallbacks = ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'];
const serifFallbacks = ['Georgia', 'Times', 'Times New Roman', 'serif'];

const fontFamily: FontFamilyGlobalConfig = {
  icons: { fallbacks: ['icons', ...sansFallbacks], name: 'icons' },
  sans: { fallbacks: sansFallbacks, name: 'sans' },
  serif: { fallbacks: serifFallbacks, name: 'serif' },
  mono: {
    fallbacks: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
    name: 'mono',
  },
};

const typography: TypographyConfig = {
  display1: {
    fontSize: '6rem',
    fontWeight: 500,
    lineHeight: 1.5,
    fontFamily: 'sans',
  },
  display2: {
    fontSize: '3.5rem',
    fontWeight: 500,
    lineHeight: 1.5,
    fontFamily: 'sans',
  },
  display3: {
    fontSize: '2.5rem',
    fontWeight: 450,
    lineHeight: 1.5,
    fontFamily: 'sans',
  },
  display4: {
    fontSize: '2.5rem',
    fontWeight: 400,
    lineHeight: 1.5,
    fontFamily: 'sans',
  },
  title1: {
    fontSize: '1.75rem',
    fontWeight: 700,
    lineHeight: 1.5,
    fontFamily: 'sans',
  },
  title2: {
    fontSize: '1.75rem',
    fontWeight: 450,
    lineHeight: 1.5,
    fontFamily: 'sans',
  },
  title3: {
    fontSize: '1.375rem',
    fontWeight: 700,
    lineHeight: 1.5,
    fontFamily: 'sans',
  },
  title4: {
    fontSize: '1.375',
    fontWeight: 450,
    lineHeight: 1.5,
    fontFamily: 'sans',
  },
  headline: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.25,
    fontFamily: 'sans',
  },
  body: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
    fontFamily: 'sans',
  },
  label1: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.5,
    fontFamily: 'sans',
  },
  label2: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.5,
    fontFamily: 'sans',
  },
  label3: {
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: 1.5,
    fontFamily: 'sans',
  },
  label4: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.5,
    fontFamily: 'sans',
  },
  legal: {
    fontSize: '0.625rem',
    fontWeight: 400,
    lineHeight: 1.5,
    fontFamily: 'sans',
  },
};

const borderRadius: BorderRadiusConfig = {
  none: '0px',
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '16px',
  xl: '32px',
  // https://github.com/argyleink/open-props/blob/main/src/props.borders.css#L13C19-L13C22
  full: '1e5px',
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

const zIndex: ZIndexConfig = {
  auto: 'auto',
  '0': '0',
  '10': '10',
  '20': '20',
  '30': '30',
  '40': '40',
  '50': '50',
};

const responsive: ResponsiveConfig = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const defaultTokensConfig: KatcnConfig = {
  colorMode: {
    light: lightColors,
    dark: darkColors,
  },
  borderRadius,
  borderWidth,
  spacing,
  fontFamily,
  typography,
  zIndex,
  responsive,
  disablePreflight: false,
  autoInvertColors: true,
};
