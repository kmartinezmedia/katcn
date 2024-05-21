import {
  TwAsPropsMap,
  getTwAsPropsMapAsString,
} from '../macros/getTwAsPropsMap' assert { type: 'macro' };

const twPropsMapAsString = getTwAsPropsMapAsString();

export function getTwAsPropsMap(): TwAsPropsMap {
  return JSON.parse(twPropsMapAsString);
}
