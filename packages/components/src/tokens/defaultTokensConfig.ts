import type { UniversalTokensConfig } from '../types';
import { compactBorderRadius, normalBorderRadius } from './borderRadius';
import { compactBorderWidths, normalBorderWidths } from './borderWidth';
import { darkElevation, lightElevation } from './elevation';
import { aspectRatio, zIndex } from './layout';
import { darkPalette, lightPalette } from './palette';
import {
  compactAvatarSizes,
  compactIconSizes,
  normalAvatarSizes,
  normalIconSizes,
} from './sizes';
import { compactSpacing, normalSpacing } from './spacing';
import { spectrum } from './spectrum';
import {
  fontFamily,
  fontFamilyGlobal,
  fontWeight,
  large,
  medium,
  small,
  textTransform,
  xLarge,
  xSmall,
  xxLarge,
  xxxLarge,
} from './typography';

const compactTokens = {
  fontFamily,
  fontWeight,
  textTransform,
  avatarSizes: compactAvatarSizes,
  iconSizes: compactIconSizes,
  borderRadius: compactBorderRadius,
  borderWidth: compactBorderWidths,
  spacing: compactSpacing,
};

const normalTokens = {
  fontFamily,
  fontWeight,
  textTransform,
  avatarSizes: normalAvatarSizes,
  iconSizes: normalIconSizes,
  borderRadius: normalBorderRadius,
  borderWidth: normalBorderWidths,
  spacing: normalSpacing,
};

export const defaultTokensConfig: UniversalTokensConfig = {
  colorMode: {
    light: {
      palette: lightPalette,
      spectrum: spectrum,
      elevation: lightElevation,
    },
    dark: {
      palette: darkPalette,
      spectrum: spectrum,
      elevation: darkElevation,
    },
  },
  scaleMode: {
    xSmall: {
      ...compactTokens,
      ...xSmall,
    },
    small: {
      ...compactTokens,
      ...small,
    },
    medium: {
      ...compactTokens,
      ...medium,
    },
    large: {
      ...normalTokens,
      ...large,
    },
    xLarge: {
      ...normalTokens,
      ...xLarge,
    },
    xxLarge: {
      ...normalTokens,
      ...xxLarge,
    },
    xxxLarge: {
      ...normalTokens,
      ...xxxLarge,
    },
  },
  aspectRatio,
  fontFamily: fontFamilyGlobal,
  zIndex,
};
