import type { Hue } from '../../types';

export function createColorRamp(hue: Hue) {
  return [
    `--katcn-color-${hue}-0`,
    `--katcn-color-${hue}-1`,
    `--katcn-color-${hue}-2`,
    `--katcn-color-${hue}-3`,
    `--katcn-color-${hue}-4`,
    `--katcn-color-${hue}-5`,
    `--katcn-color-${hue}-6`,
    `--katcn-color-${hue}-7`,
    `--katcn-color-${hue}-8`,
    `--katcn-color-${hue}-9`,
    `--katcn-color-${hue}-10`,
    `--katcn-color-${hue}-11`,
    `--katcn-color-${hue}-12`,
    `--katcn-color-${hue}-13`,
    `--katcn-color-${hue}-14`,
    `--katcn-color-${hue}-15`,
  ];
}

export function getColorRamps() {
  return {
    magenta: createColorRamp('magenta'),
    pink: createColorRamp('pink'),
    rose: createColorRamp('rose'),
    red: createColorRamp('red'),
    sunset: createColorRamp('sunset'),
    orange: createColorRamp('orange'),
    nude: createColorRamp('nude'),
    brown: createColorRamp('brown'),
    yellow: createColorRamp('yellow'),
    citron: createColorRamp('citron'),
    lime: createColorRamp('lime'),
    green: createColorRamp('green'),
    mint: createColorRamp('mint'),
    teal: createColorRamp('teal'),
    cyan: createColorRamp('cyan'),
    blue: createColorRamp('blue'),
    indigo: createColorRamp('indigo'),
    purple: createColorRamp('purple'),
    gray: createColorRamp('gray'),
    carbon: createColorRamp('carbon'),
  };
}
