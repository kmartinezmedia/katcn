import { typesToConstants } from '../macros/typesToConstants' with {
  type: 'macro',
};

import type { Hue, HueStep } from '../types';

export const hues = typesToConstants<Hue>('Hue');
export const hueSteps = typesToConstants<HueStep>('HueStep');
