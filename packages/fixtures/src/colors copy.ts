import { getUnionAsArray } from '@katcn/tsmorph/getUnionAsArray' with {
  type: 'macro',
};

import type { Hue, HueStep } from '@katcn/types';

export const hues = getUnionAsArray<Hue>('Hue');
export const hueSteps = getUnionAsArray<HueStep>('HueStep');
