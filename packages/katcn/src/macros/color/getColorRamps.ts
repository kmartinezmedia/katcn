import type { Hue } from '../../types';

export function createColorRamp(hue: Hue) {
  return [
    `${hue}-0`,
    `${hue}-1`,
    `${hue}-2`,
    `${hue}-3`,
    `${hue}-4`,
    `${hue}-5`,
    `${hue}-6`,
    `${hue}-7`,
    `${hue}-8`,
    `${hue}-9`,
    `${hue}-10`,
    `${hue}-11`,
    `${hue}-12`,
    `${hue}-13`,
    `${hue}-14`,
    `${hue}-15`,
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
