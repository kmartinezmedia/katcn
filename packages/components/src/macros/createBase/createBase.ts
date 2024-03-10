import { createSpectrum } from '#macros/createBase/createSpectrum';
import { createTypography } from '#macros/createBase/createTypography';
import { defaultTokensConfig } from '#tokens/defaultTokensConfig';
import { UniversalTokensConfig } from '../../types';

export function createBase(
  config: UniversalTokensConfig = defaultTokensConfig,
) {
  return {
    spectrum: createSpectrum('light', config),
    typography: createTypography('large', config),
  };
}
