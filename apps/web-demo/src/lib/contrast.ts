import { APCAcontrast, displayP3toY, sRGBtoY } from 'apca-w3';
import { clampChroma, converter, oklch, type Rgb } from 'culori';
import {
  type RGBColor,
  rgb as wcagRgbScore,
  score as wcagScore,
} from 'wcag-contrast';

const rgbConverter = converter('rgb');

function calcApcaP3(fgP3: Rgb, bgP3: Rgb) {
  // Calculate Y
  const fgY = displayP3toY([
    Math.max(fgP3.r, 0),
    Math.max(fgP3.g, 0),
    Math.max(fgP3.b, 0),
  ]);

  const bgY = displayP3toY([
    Math.max(bgP3.r, 0),
    Math.max(bgP3.g, 0),
    Math.max(bgP3.b, 0),
  ]);

  const contrast = APCAcontrast(fgY, bgY);
  console.log('apca contrast', contrast);
  return Number(contrast);
}

function calcApcaSrgb(fgRgb: Rgb, bgRgb: Rgb) {
  // Calculate Y
  const fgY = sRGBtoY([
    Math.round(Math.max(fgRgb.r * 255, 0)),
    Math.round(Math.max(fgRgb.g * 255, 0)),
    Math.round(Math.max(fgRgb.b * 255, 0)),
  ]);

  const bgY = sRGBtoY([
    Math.round(Math.max(bgRgb.r * 255, 0)),
    Math.round(Math.max(bgRgb.g * 255, 0)),
    Math.round(Math.max(bgRgb.b * 255, 0)),
  ]);

  const contrast = APCAcontrast(fgY, bgY);
  console.log('apca contrast', contrast);
  return Number(contrast);
}

function rgb1to256(value: number) {
  return Math.round(Number.parseFloat(value.toFixed(4)) * 255);
}

function calcWcag(fgRgb: Rgb, bgRgb: Rgb) {
  // Compose arrays
  const fgArray: RGBColor = [
    rgb1to256(fgRgb.r),
    rgb1to256(fgRgb.g),
    rgb1to256(fgRgb.b),
  ];
  const bgArray: RGBColor = [
    rgb1to256(bgRgb.r),
    rgb1to256(bgRgb.g),
    rgb1to256(bgRgb.b),
  ];

  return wcagRgbScore(fgArray, bgArray);
}

function roundToDP(number: number, dp: number) {
  return Math.floor(number * 10 ** dp) / 10 ** dp;
}

function healOklch(color: string) {
  const _oklch = oklch(color);
  if (!_oklch) {
    throw new Error('Invalid color');
  }
  _oklch.l = _oklch.l === undefined ? 0 : roundToDP(_oklch.l, 7);
  _oklch.c = _oklch.c === undefined ? 0 : roundToDP(_oklch.c, 16);
  _oklch.h = _oklch.h === undefined ? 0 : roundToDP(_oklch.h, 16);
  _oklch.alpha = _oklch.alpha === undefined ? 1 : roundToDP(_oklch.alpha, 4);
  return _oklch;
}

function toRgbInColorSpace(color: string, colorSpace: 'srgb' | 'p3') {
  if (colorSpace === 'srgb') {
    const clampedOklch = clampChroma(color, 'oklch');
    const _rgb = rgbConverter(clampedOklch);
    if (_rgb) {
      return _rgb;
    }
  }

  if (colorSpace === 'p3') {
    const healedOklch = healOklch(color);
    const _rgb = rgbConverter(healedOklch);
    if (_rgb) {
      return _rgb;
    }
  }

  throw new Error('Invalid color');
}

function apcaScore(contrast: number) {
  if (contrast >= 75) return 'AAA';
  if (contrast >= 60) return 'AA';
  if (contrast >= 50) return 'AA Large';
  return 'Fail';
}

export function getColorContrast({
  foreground: _foreground,
  background: _background,
  contrastModel,
  colorSpace,
}: {
  foreground: string;
  background: string;
  contrastModel: 'wcag' | 'apca';
  colorSpace: 'srgb' | 'p3';
}) {
  const foreground = toRgbInColorSpace(_foreground, colorSpace);
  const background = toRgbInColorSpace(_background, colorSpace);

  if (contrastModel === 'wcag') {
    const contrast = calcWcag(foreground, background);
    return {
      type: 'wcag',
      contrast: contrast.toFixed(2),
      details: wcagScore(contrast),
    };
  }

  if (colorSpace === 'p3') {
    const contrast = calcApcaP3(foreground, background);
    return {
      type: 'apca',
      contrast: contrast,
      details: apcaScore(contrast),
    };
  }
  const contrast = calcApcaSrgb(foreground, background);
  return {
    type: 'apca',
    contrast: contrast,
    details: apcaScore(contrast),
  };
}
