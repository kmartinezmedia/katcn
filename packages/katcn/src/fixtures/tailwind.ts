import { getTwAsPropsMapAsString } from '../macros/getTwAsPropsMap' with {
  type: 'macro',
};
import type { TwAsPropsMap } from '../macros/getTwAsPropsMap';

const twPropsMapAsString = getTwAsPropsMapAsString();

export function getTwAsPropsMap(): TwAsPropsMap {
  return JSON.parse(twPropsMapAsString);
}
