import type { PaletteConfig } from '../types/tokens';

const lightPalette: PaletteConfig = {
  core: {
    brand: { hue: 'purple', step: '500' },
    accent: { hue: 'blue', step: '500' },
    alert: { hue: 'red', step: '500' },
    positive: { hue: 'green', step: '500' },
    warning: { hue: 'orange', step: '500' },
  },
  background: {
    primary: { hue: 'gray', step: '50' },
    secondary: { hue: 'gray', step: '100' },
  },
  backgroundWash: {
    'alert-wash': { hue: 'red', step: '100' },
    'brand-wash': { hue: 'purple', step: '100' },
    'accent-wash': { hue: 'blue', step: '100' },
    'positive-wash': { hue: 'green', step: '100' },
    'warning-wash': { hue: 'orange', step: '100' },
  },
  elevation: {
    'elevation-1': { hue: 'stone', step: '50' },
    'elevation-2': { hue: 'stone', step: '50' },
    'elevation-3': { hue: 'stone', step: '50' },
    scrim: { hue: 'zinc', step: '500', opacity: '0.6' },
  },
  foreground: {
    primary: { hue: 'zinc', step: '900' },
    secondary: { hue: 'zinc', step: '800' },
    tertiary: { hue: 'zinc', step: '600' },
    'on-color': { hue: 'zinc', step: '50' },
  },
  line: {
    primary: { hue: 'zinc', step: '300' },
    secondary: { hue: 'zinc', step: '200' },
  },
};

const darkPalette: PaletteConfig = {
  core: {
    brand: { hue: 'purple', step: '300' },
    accent: { hue: 'blue', step: '300' },
    alert: { hue: 'red', step: '300' },
    positive: { hue: 'green', step: '300' },
    warning: { hue: 'orange', step: '300' },
  },
  background: {
    primary: { hue: 'gray', step: '950' },
    secondary: { hue: 'gray', step: '800' },
  },
  backgroundWash: {
    'alert-wash': { hue: 'red', step: '900' },
    'brand-wash': { hue: 'purple', step: '900' },
    'accent-wash': { hue: 'blue', step: '900' },
    'positive-wash': { hue: 'green', step: '900' },
    'warning-wash': { hue: 'orange', step: '900' },
  },
  elevation: {
    'elevation-1': { hue: 'stone', step: '800' },
    'elevation-2': { hue: 'stone', step: '700' },
    'elevation-3': { hue: 'stone', step: '600' },
    scrim: { hue: 'zinc', step: '200', opacity: '0.6' },
  },
  foreground: {
    primary: { hue: 'zinc', step: '100' },
    secondary: { hue: 'zinc', step: '200' },
    tertiary: { hue: 'zinc', step: '400' },
    'on-color': { hue: 'zinc', step: '50' },
  },
  line: {
    primary: { hue: 'zinc', step: '700' },
    secondary: { hue: 'zinc', step: '800' },
  },
};

const alwaysPalette = {
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
};

export { alwaysPalette, darkPalette, lightPalette };
