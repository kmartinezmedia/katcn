import { UniversalTokensConfig } from '../../types';
import { createPalette } from '#macros/createTheme/createPalette';
import { createTypography } from '#macros/createTheme/createTypography';
import { defaultTokensConfig } from '#tokens/defaultTokensConfig';

export function createTheme(
  config: UniversalTokensConfig = defaultTokensConfig,
) {
  return {
    light: {
      palette: createPalette('light', config),
    },
    dark: {
      palette: createPalette('dark', config),
    },
    xSmall: {
      typography: createTypography('xSmall', config),
    },
  };
}
