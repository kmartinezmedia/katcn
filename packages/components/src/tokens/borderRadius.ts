import type { BorderRadiusConfig } from '../types';

const compactBorderRadius: BorderRadiusConfig = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 24,
  full: 9999,
};

const normalBorderRadius: BorderRadiusConfig = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 32,
  full: 9999,
};

export { compactBorderRadius, normalBorderRadius };
