import { hues } from '#fixtures/colors';
import { fontFamily } from '#fixtures/typography';
import { entries } from './helpers';
import type { Hue, HueStep, KatcnConfig } from './types';

const lightToDarkSpectrumMap = {
  '950': '50',
  '900': '100',
  '800': '200',
  '700': '300',
  '600': '400',
  '500': '500',
  '400': '600',
  '300': '700',
  '200': '800',
  '100': '900',
  '50': '950',
} as const;

function getTypographyVars(config: KatcnConfig) {
  const vars: Record<string, string> = {};

  for (const family of fontFamily) {
    vars[`font-${family}`] = config.fontFamily[family].name;
  }

  for (const [key, variantConfig] of entries(config.typography)) {
    const {
      lineHeight = 'normal',
      fontSize,
      fontFamily,
      fontWeight,
    } = variantConfig;
    vars[`text-${key}`] = `${fontSize}`;
    vars[`leading-${key}`] = `${lineHeight}`;
    vars[`font-weight-${key}`] = `${fontWeight}`;
    vars[`font-${key}`] = `var(--font-${fontFamily})`;
  }
  return vars;
}

function isCustomColor(value: string) {
  return (
    value.includes('#') ||
    value.includes('rgb') ||
    value.includes('hsl') ||
    value.includes('hsv') ||
    value.includes('oklch') ||
    value.includes('oklab')
  );
}

export const getCss = (config: KatcnConfig) => {
  const css = ['@import "tailwindcss";'];

  /** https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually
   * If you want your dark theme to be driven by a CSS selector instead of the prefers-color-scheme media query,
   * override the dark variant to use your custom selector:
   */
  css.push('@custom-variant dark (&:where(.dark, .dark *));');

  let themeCss = '@theme {';
  let darkCss = '.dark {';

  for (const [key, value] of entries(getTypographyVars(config))) {
    themeCss += `--${key}: ${value};`;
  }

  for (const [key, value] of entries(config.colorMode.light)) {
    if (isCustomColor(value)) {
      themeCss += `--color-${key}: ${value};`;
    } else {
      themeCss += `--color-${key}: var(--color-${value});`;
    }
  }

  for (const [key, value] of entries(config.colorMode.dark)) {
    const [hue, hueStep] = value.split('-') as [Hue, HueStep];
    const isValidHue = hues.includes(hue);
    const darkModeValue =
      isValidHue && config.autoInvertColors
        ? `${hue}-${lightToDarkSpectrumMap[hueStep]}`
        : value;
    const lightModeValue = config.colorMode.light[key];
    if (lightModeValue !== darkModeValue) {
      if (isCustomColor(darkModeValue)) {
        darkCss += `--color-${key}: ${darkModeValue};`;
      } else {
        darkCss += `--color-${key}: var(--color-${darkModeValue});`;
      }
    }
  }

  css.push(themeCss, '}\n', darkCss, '}\n');

  for (const [key] of entries(config.typography)) {
    css.push(`
	    @utility text-variant-${key} {
	      line-height: var(--line-height-${key});
	      font-size: var(--font-size-${key});
	      font-weight: var(--font-weight-${key});
	      font-family: var(--font-${config.typography[key].fontFamily ?? 'sans'});
	    }
	  `);
  }

  return css.map((c) => c.trim()).join('\n');
};
