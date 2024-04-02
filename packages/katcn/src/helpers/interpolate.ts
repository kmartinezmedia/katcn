import { clamp } from './clamp';

type ExtrapolateType = 'extend' | 'identity' | 'clamp';

export function interpolate(
  input: number,
  inputRange: number[],
  outputRange: number[],
  options: {
    easing?: (input: number) => number;
    extrapolate?: ExtrapolateType;
    extrapolateLeft?: ExtrapolateType;
    extrapolateRight?: ExtrapolateType;
  } = {},
): number {
  const {
    easing,
    extrapolate = 'extend',
    extrapolateLeft = extrapolate,
    extrapolateRight = extrapolate,
  } = options;

  // Validate input and output ranges
  if (inputRange.length !== outputRange.length) {
    throw new Error('inputRange and outputRange must have the same length');
  }

  // Find the segment the input is currently in
  let segmentIndex =
    inputRange.findIndex((value, i) => input < value && i > 0) - 1;
  if (segmentIndex === -2) {
    segmentIndex = inputRange.length - 2; // Use the last segment if input is beyond the input range
  }

  let extrapolationType = extrapolate;
  if (segmentIndex < 0) {
    extrapolationType = extrapolateLeft;
  } else if (segmentIndex >= inputRange.length - 2) {
    extrapolationType = extrapolateRight;
  }

  // Apply extrapolation
  if (extrapolationType === 'clamp') {
    if (segmentIndex < 0) {
      return outputRange[0];
    }
    if (segmentIndex >= inputRange.length - 2) {
      return outputRange[outputRange.length - 1];
    }
  } else if (extrapolationType === 'identity') {
    return input;
  }
  // 'extend' extrapolation is handled by the normal interpolation logic below

  // Determine the start and end of the current segment
  const inputStart = inputRange[segmentIndex];
  const inputEnd = inputRange[segmentIndex + 1];
  const outputStart = outputRange[segmentIndex];
  const outputEnd = outputRange[segmentIndex + 1];

  // Calculate the ratio of the input within the current segment
  let ratio = (input - inputStart) / (inputEnd - inputStart);
  ratio = clamp(ratio, 0, 1); // Ensure the ratio is between 0 and 1

  // Apply easing if provided
  if (easing) {
    ratio = easing(ratio);
  }

  // Perform the interpolation
  return outputStart + ratio * (outputEnd - outputStart);
}
