import type { PaletteConfig } from '../types';

const lightPalette: PaletteConfig = {
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
    secondary: { hue: 'gray', step: 12 },
    tertiary: { hue: 'gray', step: 9 },
    muted: { hue: 'gray', step: 8 },
    'on-color': { hue: 'gray', step: 0 },
  },
  line: {
    primary: { hue: 'gray', step: 12 },
    secondary: { hue: 'gray', step: 9 },
    tertiary: { hue: 'gray', step: 7 },
    muted: { hue: 'gray', step: 3 },
  },
};

const darkPalette: PaletteConfig = {
  core: {
    brand: { hue: 'purple', step: 9 },
    accent: { hue: 'blue', step: 9 },
    alert: { hue: 'red', step: 9 },
    positive: { hue: 'green', step: 9 },
    warning: { hue: 'orange', step: 9 },
    // disabled: 'gray-30',
  },
  background: {
    primary: { hue: 'gray', step: 1 },
    secondary: { hue: 'gray', step: 3 },
  },
  foreground: {
    primary: { hue: 'gray', step: 14 },
    secondary: { hue: 'gray', step: 13 },
    tertiary: { hue: 'gray', step: 9 },
    muted: { hue: 'gray', step: 8 },
    'on-color': { hue: 'gray', step: 0 },
  },
  line: {
    primary: { hue: 'gray', step: 12 },
    secondary: { hue: 'gray', step: 9 },
    tertiary: { hue: 'gray', step: 7 },
    muted: { hue: 'gray', step: 3 },
  },
};

const alwaysPalette = {
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
};

export { alwaysPalette, darkPalette, lightPalette };
