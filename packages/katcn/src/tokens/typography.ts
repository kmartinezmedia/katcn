import type {
  FontFamilyConfig,
  FontFamilyGlobalConfig,
  FontSizeConfig,
  FontWeightConfig,
  FontWeightDescriptive,
  FontWeightNumeric,
  LineHeightConfig,
  TextTransformConfig,
} from '../types';

const sansFallbacks = ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'];
const serifFallbacks = ['Georgia', 'Times', 'Times New Roman', 'serif'];

export const fontFamilyGlobal: FontFamilyGlobalConfig = {
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

export const fontFamily: FontFamilyConfig = {
  display1: 'sans',
  display2: 'sans',
  display3: 'sans',
  title1: 'sans',
  title2: 'sans',
  title3: 'sans',
  title4: 'sans',
  headline1: 'sans',
  body1: 'sans',
  label1: 'sans',
  label2: 'sans',
  caption1: 'sans',
  caption2: 'sans',
  legal1: 'sans',
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

export const fontWeight: FontWeightConfig = {
  display1: 'black',
  display2: 'extrabold',
  display3: 'extrabold',
  title1: 'bold',
  title2: 'bold',
  title3: 'bold',
  title4: 'bold',
  headline1: 'semibold',
  body1: 'regular',
  label1: 'semibold',
  label2: 'regular',
  caption1: 'semibold',
  caption2: 'regular',
  legal1: 'semibold',
};

export const textTransform: TextTransformConfig = {
  display1: 'uppercase',
  display2: 'none',
  display3: 'none',
  title1: 'none',
  title2: 'none',
  title3: 'none',
  title4: 'none',
  headline1: 'none',
  body1: 'none',
  label1: 'none',
  label2: 'none',
  caption1: 'none',
  caption2: 'none',
  legal1: 'none',
};

export const xSmall = {
  fontSize: {
    display1: 46,
    display2: 37,
    display3: 33,
    title1: 29,
    title2: 25,
    title3: 21,
    title4: 17,
    headline1: 13,
    body1: 13,
    label1: 12,
    label2: 12,
    caption1: 11,
    caption2: 11,
    legal1: 10,
  } satisfies FontSizeConfig,
  lineHeight: {
    display1: 44,
    display2: 44,
    display3: 44,
    title1: 36,
    title2: 32,
    title3: 28,
    title4: 24,
    headline1: 16,
    body1: 16,
    label1: 16,
    label2: 16,
    caption1: 16,
    caption2: 16,
    legal1: 12,
  } satisfies LineHeightConfig,
};

export const small = {
  fontSize: {
    display1: 46,
    display2: 38,
    display3: 34,
    title1: 30,
    title2: 26,
    title3: 22,
    title4: 18,
    headline1: 14,
    body1: 14,
    label1: 13,
    label2: 13,
    caption1: 12,
    caption2: 12,
    legal1: 11,
  } satisfies FontSizeConfig,
  lineHeight: {
    ...xSmall.lineHeight,
    title1: 40,
    headline1: 20,
    body1: 20,
    legal1: 16,
  } satisfies LineHeightConfig,
};

export const medium = {
  fontSize: {
    display1: 47,
    display2: 39,
    display3: 35,
    title1: 31,
    title2: 27,
    title3: 23,
    title4: 19,
    headline1: 15,
    body1: 15,
    label1: 13,
    label2: 13,
    caption1: 12,
    caption2: 12,
    legal1: 11,
  } satisfies FontSizeConfig,
  lineHeight: {
    ...small.lineHeight,
    title2: 36,
    title3: 32,
  } satisfies LineHeightConfig,
};

export const large = {
  fontSize: {
    ...medium.fontSize,
    display1: 48,
    display2: 40,
    display3: 36,
    title1: 32,
    title2: 28,
    title3: 24,
    title4: 20,
    headline1: 16,
    body1: 16,
    label1: 14,
    label2: 14,
  } satisfies FontSizeConfig,
  lineHeight: {
    ...medium.lineHeight,
    title2: 36,
    title3: 32,
    headline1: 20,
    body1: 20,
    label1: 20,
    label2: 20,
  } satisfies LineHeightConfig,
};

export const xLarge = {
  fontSize: {
    display1: 50,
    display2: 42,
    display3: 38,
    title1: 34,
    title2: 30,
    title3: 26,
    title4: 22,
    headline1: 18,
    body1: 16,
    label1: 16,
    label2: 16,
    caption1: 14,
    caption2: 14,
    legal1: 13,
  } satisfies FontSizeConfig,
  lineHeight: {
    ...large.lineHeight,
    title1: 44,
    headline1: 24,
    body1: 24,
    caption1: 20,
    caption2: 20,
  } satisfies LineHeightConfig,
};

export const xxLarge = {
  fontSize: {
    display1: 52,
    display2: 44,
    display3: 40,
    title1: 36,
    title2: 32,
    title3: 28,
    title4: 26,
    headline1: 20,
    body1: 20,
    label1: 18,
    label2: 18,
    caption1: 16,
    caption2: 16,
    legal1: 15,
  } satisfies FontSizeConfig,
  lineHeight: {
    ...xLarge.lineHeight,
    title2: 40,
    title3: 36,
    headline1: 28,
    body1: 28,
    label1: 24,
    label2: 24,
    legal1: 20,
  } satisfies LineHeightConfig,
};

export const xxxLarge = {
  fontSize: {
    display1: 54,
    display2: 46,
    display3: 42,
    title1: 38,
    title2: 34,
    title3: 30,
    title4: 28,
    headline1: 22,
    body1: 22,
    label1: 20,
    label2: 20,
    caption1: 18,
    caption2: 18,
    legal1: 17,
  } satisfies FontSizeConfig,
  lineHeight: {
    ...xxLarge.lineHeight,
    title1: 48,
    title2: 44,
    title4: 32,
    label1: 28,
    label2: 28,
    caption1: 24,
    caption2: 24,
  } satisfies LineHeightConfig,
};
