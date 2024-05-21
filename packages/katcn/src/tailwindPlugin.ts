import tailwindColors from 'tailwindcss/colors';
import plugin from 'tailwindcss/plugin';
import { hueSteps, hues } from './fixtures/colors';
import { fontFamily } from './fixtures/typography';
import { entries, flattenObj, mapKeys, mapValues } from './helpers';
import { defaultTokensConfig } from './tokens';
import type {
  ColorMode,
  FontWeight,
  FontWeightNumeric,
  NowConfig,
  TypographyConfig,
} from './types';

const fontWeightMap: Record<FontWeight, FontWeightNumeric> = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
};

const fullHex = (hex: string) => {
  const oldr = hex.slice(1, 2);
  const oldg = hex.slice(2, 3);
  const oldb = hex.slice(3, 4);

  const r = Number.parseInt(oldr + oldr, 16);
  const g = Number.parseInt(oldg + oldg, 16);
  const b = Number.parseInt(oldb + oldb, 16);
  return { r, g, b };
};

// convert hex to rgb
const hex2rgb = (hex: string) => {
  if (hex.length === 4) {
    return fullHex(hex);
  }

  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);

  return { r, g, b };
};

/**
 * tailwindcss-animate
 * https://github.com/jamiebuilds/tailwindcss-animate/blob/main/index.js
 */
function filterDefault(values: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(values).filter(([key]) => key !== 'DEFAULT'),
  );
}

const lightToMarkSpectrumMap = {
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

function getSpectrumVars(colorMode?: ColorMode) {
  /** Convert tailwind colors to comma separated rgb values
   * for use in CSS variables
   */
  const spectrumVars: Record<string, string> = {};
  const spectrumTailwindConfig: Record<string, Record<string, string>> = {};
  for (const hue of hues) {
    for (const step of hueSteps) {
      const hueColor = tailwindColors[hue];
      const finalStep =
        colorMode === 'dark' ? lightToMarkSpectrumMap[step] : step;
      const stepColor = hueColor[finalStep];
      const stepColorAsRgb = hex2rgb(stepColor);
      if (!stepColorAsRgb) {
        throw new Error(`Invalid color ${stepColor}`);
      }
      const { r, g, b } = stepColorAsRgb;
      spectrumVars[`${hue}-${step}`] = `${r} ${g} ${b}`;
      const twConfigForHue = spectrumTailwindConfig[hue];
      if (!twConfigForHue) {
        spectrumTailwindConfig[hue] = {};
      }
      spectrumTailwindConfig[hue][step] = `rgb(var(--${hue}-${step}))`;
    }
  }
  return {
    vars: spectrumVars,
    config: spectrumTailwindConfig,
  };
}

function getPaletteVars(colorMode: ColorMode, palette: Record<string, string>) {
  return mapValues(palette, (value) => {
    const isCustomColor =
      value.includes('#') ||
      value.includes('rgb') ||
      value.includes('hsl') ||
      value.includes('hsv') ||
      value.includes('oklch') ||
      value.includes('oklab');
    if (isCustomColor) {
      return value;
    }
    return `rgb(var(--${value}))`;
  });
}

function getTypographyVars(typography: TypographyConfig) {
  const varsConfig = {
    'font-size': {} as Record<string, string>,
    'line-height': {} as Record<string, string>,
  };

  for (const [key, variantConfig] of entries(typography)) {
    const { lineHeight = 'normal', fontSize } = variantConfig;
    varsConfig['font-size'][key] = fontSize;
    varsConfig['line-height'][key] = lineHeight;
  }
  return varsConfig;
}

function getVars(config: NowConfig) {
  const { colorMode, typography, spacing, zIndex } = config;

  const darkVars = {
    ...getSpectrumVars('dark').vars,
  };

  const rootVars = {
    ...getSpectrumVars('light').vars,
    ...getPaletteVars('light', colorMode.light),
    ...getTypographyVars(typography),
    spacing,
    zIndex,
  };

  return {
    rootVars,
    darkVars,
  };
}

type TailwindPluginOpts =
  | {
      disableVars?: boolean;
      config: NowConfig;
    }
  | NowConfig;

function parseOpts(opts: TailwindPluginOpts) {
  let config: NowConfig = defaultTokensConfig;
  let disableVars = false;

  if ('config' in opts) {
    config = opts.config;
    if ('disableVars' in opts && typeof opts.disableVars === 'boolean') {
      disableVars = opts.disableVars;
    }
  } else {
    config = opts;
  }
  return { config, disableVars };
}

export const tailwindPlugin = plugin.withOptions(
  (opts: TailwindPluginOpts) => {
    const { config, disableVars } = parseOpts(opts);

    // biome-ignore lint/complexity/useArrowFunction: <explanation>
    return function ({
      addBase,
      matchUtilities,
      addUtilities,
      addVariant,
      theme,
    }) {
      const { rootVars, darkVars } = getVars(config);

      /** katcn config */
      if (!disableVars) {
        addBase({
          ':root': mapKeys(flattenObj(rootVars), (_, key) => `--${key}`),
          '.dark': mapKeys(flattenObj(darkVars), (_, key) => `--${key}`),
        });
      }

      /** katcn config */
      matchUtilities(
        {
          'text-v': (name) => {
            const fontWeight = config.typography[name].fontWeight ?? 'normal';
            return {
              'line-height': `var(--line-height-${name})`,
              'font-size': `var(--font-size-${name})`,
              'font-weight':
                fontWeightMap[fontWeight as keyof typeof fontWeightMap] ??
                fontWeight,
              'font-family': `var(--font-${
                config.typography[name].fontFamily ?? 'sans'
              })`,
            };
          },
        },
        {
          values: mapValues(config.typography, (_, name) => name),
        },
      );

      /**
       * tailwindcss-animate
       * https://github.com/jamiebuilds/tailwindcss-animate/blob/main/index.js
       */
      addUtilities({
        '@keyframes enter': theme('keyframes.enter'),
        '@keyframes exit': theme('keyframes.exit'),
        '.animate-in': {
          animationName: 'enter',
          animationDuration: theme('animationDuration.DEFAULT'),
          '--tw-enter-opacity': 'initial',
          '--tw-enter-scale': 'initial',
          '--tw-enter-rotate': 'initial',
          '--tw-enter-translate-x': 'initial',
          '--tw-enter-translate-y': 'initial',
        },
        '.animate-out': {
          animationName: 'exit',
          animationDuration: theme('animationDuration.DEFAULT'),
          '--tw-exit-opacity': 'initial',
          '--tw-exit-scale': 'initial',
          '--tw-exit-rotate': 'initial',
          '--tw-exit-translate-x': 'initial',
          '--tw-exit-translate-y': 'initial',
        },
      });

      /**
       * tailwindcss-animate
       * https://github.com/jamiebuilds/tailwindcss-animate/blob/main/index.js
       */
      matchUtilities(
        {
          'fade-in': (value) => ({ '--tw-enter-opacity': value }),
          'fade-out': (value) => ({ '--tw-exit-opacity': value }),
        },
        { values: theme('animationOpacity') },
      );

      /**
       * tailwindcss-animate
       * https://github.com/jamiebuilds/tailwindcss-animate/blob/main/index.js
       */
      matchUtilities(
        {
          'zoom-in': (value) => ({ '--tw-enter-scale': value }),
          'zoom-out': (value) => ({ '--tw-exit-scale': value }),
        },
        { values: theme('animationScale') },
      );

      /**
       * tailwindcss-animate
       * https://github.com/jamiebuilds/tailwindcss-animate/blob/main/index.js
       */
      matchUtilities(
        {
          'spin-in': (value) => ({ '--tw-enter-rotate': value }),
          'spin-out': (value) => ({ '--tw-exit-rotate': value }),
        },
        { values: theme('animationRotate') },
      );

      /**
       * tailwindcss-animate
       * https://github.com/jamiebuilds/tailwindcss-animate/blob/main/index.js
       */
      matchUtilities(
        {
          'slide-in-from-top': (value) => ({
            '--tw-enter-translate-y': `-${value}`,
          }),
          'slide-in-from-bottom': (value) => ({
            '--tw-enter-translate-y': value,
          }),
          'slide-in-from-left': (value) => ({
            '--tw-enter-translate-x': `-${value}`,
          }),
          'slide-in-from-right': (value) => ({
            '--tw-enter-translate-x': value,
          }),
          'slide-out-to-top': (value) => ({
            '--tw-exit-translate-y': `-${value}`,
          }),
          'slide-out-to-bottom': (value) => ({
            '--tw-exit-translate-y': value,
          }),
          'slide-out-to-left': (value) => ({
            '--tw-exit-translate-x': `-${value}`,
          }),
          'slide-out-to-right': (value) => ({
            '--tw-exit-translate-x': value,
          }),
        },
        { values: theme('animationTranslate') },
      );

      /**
       * tailwindcss-animate
       * https://github.com/jamiebuilds/tailwindcss-animate/blob/main/index.js
       */
      matchUtilities(
        { duration: (value) => ({ animationDuration: value }) },
        { values: filterDefault(theme('animationDuration')) },
      );

      /**
       * tailwindcss-animate
       * https://github.com/jamiebuilds/tailwindcss-animate/blob/main/index.js
       */
      matchUtilities(
        { delay: (value) => ({ animationDelay: value }) },
        { values: theme('animationDelay') },
      );

      /**
       * tailwindcss-animate
       * https://github.com/jamiebuilds/tailwindcss-animate/blob/main/index.js
       */
      matchUtilities(
        { ease: (value) => ({ animationTimingFunction: value }) },
        { values: filterDefault(theme('animationTimingFunction')) },
      );

      /**
       * tailwindcss-animate
       * https://github.com/jamiebuilds/tailwindcss-animate/blob/main/index.js
       */
      addUtilities({
        '.running': { animationPlayState: 'running' },
        '.paused': { animationPlayState: 'paused' },
      });

      /**
       * tailwindcss-animate
       * https://github.com/jamiebuilds/tailwindcss-animate/blob/main/index.js
       */
      matchUtilities(
        { 'fill-mode': (value) => ({ animationFillMode: value }) },
        { values: theme('animationFillMode') },
      );

      /**
       * tailwindcss-animate
       * https://github.com/jamiebuilds/tailwindcss-animate/blob/main/index.js
       */
      matchUtilities(
        { direction: (value) => ({ animationDirection: value }) },
        { values: theme('animationDirection') },
      );

      /**
       * tailwindcss-animate
       * https://github.com/jamiebuilds/tailwindcss-animate/blob/main/index.js
       */
      matchUtilities(
        { repeat: (value) => ({ animationIterationCount: value }) },
        { values: theme('animationRepeat') },
      );

      addVariant('cmdkGroup', '& [cmdk-group]');
      addVariant('cmdkGroupHeading', '& [cmdk-group-heading]');
      addVariant('cmdkGroupItems', '& [cmdk-group-items]');
      addVariant('cmdkItem', '& [cmdk-item]');
      addVariant('cmdkItemSvg', '& [cmdk-item] svg');
      addVariant('cmdkInput', '& [cmdk-input]');
      addVariant('cmdkInputSvg', '& [cmdk-input-wrapper] svg');
    };
  },
  function plugin(opts: TailwindPluginOpts = defaultTokensConfig) {
    const { config } = parseOpts(opts);
    const { config: spectrumTailwindConfig } = getSpectrumVars();

    const semanticColors = mapValues(
      config.colorMode.light,
      (_, key) => `var(--${key})`,
    );

    return {
      theme: {
        extend: {
          /**
           * tailwindcss-animate
           * https://github.com/jamiebuilds/tailwindcss-animate/blob/main/index.js
           */
          animationFillMode: {
            none: 'none',
            forwards: 'forwards',
            backwards: 'backwards',
            both: 'both',
          },
          /**
           * tailwindcss-animate
           * https://github.com/jamiebuilds/tailwindcss-animate/blob/main/index.js
           */
          animationDirection: {
            normal: 'normal',
            reverse: 'reverse',
            alternate: 'alternate',
            'alternate-reverse': 'alternate-reverse',
          },
          /**
           * tailwindcss-animate
           * https://github.com/jamiebuilds/tailwindcss-animate/blob/main/index.js
           */
          animationRepeat: {
            0: '0',
            1: '1',
            infinite: 'infinite',
          },
          keyframes: {
            /**
             * shadcn create react app
             */
            'accordion-down': {
              from: { height: '0' },
              to: { height: 'var(--radix-accordion-content-height)' },
            },
            /**
             * shadcn create react app
             */
            'accordion-up': {
              from: { height: 'var(--radix-accordion-content-height)' },
              to: { height: '0' },
            },
            /**
             * tailwind.config.js from Radix UI Dropdown docs
             * https://www.radix-ui.com/primitives/docs/components/dropdown-menu
             */
            slideDownAndFade: {
              from: { opacity: '0', transform: 'translateY(-2px)' },
              to: { opacity: '1', transform: 'translateY(0)' },
            },
            /**
             * tailwind.config.js from Radix UI Dropdown docs
             * https://www.radix-ui.com/primitives/docs/components/dropdown-menu
             */
            slideLeftAndFade: {
              from: { opacity: '0', transform: 'translateX(2px)' },
              to: { opacity: '1', transform: 'translateX(0)' },
            },
            /**
             * tailwind.config.js from Radix UI Dropdown docs
             * https://www.radix-ui.com/primitives/docs/components/dropdown-menu
             */
            slideUpAndFade: {
              from: { opacity: '0', transform: 'translateY(2px)' },
              to: { opacity: '1', transform: 'translateY(0)' },
            },
            /**
             * tailwind.config.js from Radix UI Dropdown docs
             * https://www.radix-ui.com/primitives/docs/components/dropdown-menu
             */
            slideRightAndFade: {
              from: { opacity: '0', transform: 'translateX(-2px)' },
              to: { opacity: '1', transform: 'translateX(0)' },
            },
            /**
             * tailwind.config.js from Radix UI Dialog docs
             * https://www.radix-ui.com/primitives/docs/components/dialog
             */
            overlayShow: {
              from: { opacity: '0' },
              to: { opacity: '1' },
            },
            /**
             * tailwind.config.js from Radix UI Dialog docs
             * https://www.radix-ui.com/primitives/docs/components/dialog
             */
            contentShow: {
              from: {
                opacity: '0',
                transform: 'translate(-50%, -48%) scale(0.96)',
              },
              to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
            },
            /**
             * tailwindcss-animate
             * https://github.com/jamiebuilds/tailwindcss-animate/blob/main/index.js
             */
            enter: {
              from: {
                opacity: 'var(--tw-enter-opacity, 1)',
                transform:
                  'translate3d(var(--tw-enter-translate-x, 0), var(--tw-enter-translate-y, 0), 0) scale3d(var(--tw-enter-scale, 1), var(--tw-enter-scale, 1), var(--tw-enter-scale, 1)) rotate(var(--tw-enter-rotate, 0))',
              },
            },
            /**
             * tailwindcss-animate
             * https://github.com/jamiebuilds/tailwindcss-animate/blob/main/index.js
             */
            exit: {
              to: {
                opacity: 'var(--tw-exit-opacity, 1)',
                transform:
                  'translate3d(var(--tw-exit-translate-x, 0), var(--tw-exit-translate-y, 0), 0) scale3d(var(--tw-exit-scale, 1), var(--tw-exit-scale, 1), var(--tw-exit-scale, 1)) rotate(var(--tw-exit-rotate, 0))',
              },
            },
          },
          animation: {
            'accordion-down': 'accordion-down 0.2s ease-out',
            'accordion-up': 'accordion-up 0.2s ease-out',
            /**
             * tailwind.config.js from Radix UI Dropdown docs
             * https://www.radix-ui.com/primitives/docs/components/dropdown-menu
             */
            slideDownAndFade:
              'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
            /**
             * tailwind.config.js from Radix UI Dropdown docs
             * https://www.radix-ui.com/primitives/docs/components/dropdown-menu
             */
            slideLeftAndFade:
              'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
            /**
             * tailwind.config.js from Radix UI Dropdown docs
             * https://www.radix-ui.com/primitives/docs/components/dropdown-menu
             */
            slideUpAndFade:
              'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
            /**
             * tailwind.config.js from Radix UI Dropdown docs
             * https://www.radix-ui.com/primitives/docs/components/dropdown-menu
             */
            slideRightAndFade:
              'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
            /**
             * tailwind.config.js from Radix UI Dialog docs
             * https://www.radix-ui.com/primitives/docs/components/dialog
             */
            overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
            /**
             * tailwind.config.js from Radix UI Dialog docs
             * https://www.radix-ui.com/primitives/docs/components/dialog
             */
            contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
          },
          /** katcn config */
          fontFamily: Object.fromEntries(
            fontFamily.map((name) => [name, [`var(--font-${name})`]]),
          ),
          /** katcn config */
          fontSize: mapValues(config.typography, (_, key) => [
            `var(--font-size-${key})`,
            `var(--line-height-${key})`,
          ]) as Record<string, [string, string]>,
          /** katcn config */
          colors: {
            ...spectrumTailwindConfig,
            ...semanticColors,
          },
          /**
           * tailwindcss-animate
           * https://github.com/jamiebuilds/tailwindcss-animate/blob/main/index.js
           */
          animationOpacity: ({ theme }) => ({
            DEFAULT: 0,
            ...theme('opacity'),
          }),
          /**
           * tailwindcss-animate
           * https://github.com/jamiebuilds/tailwindcss-animate/blob/main/index.js
           */
          animationTranslate: ({ theme }) => ({
            DEFAULT: '100%',
            ...theme('translate'),
          }),
          /**
           * tailwindcss-animate
           * https://github.com/jamiebuilds/tailwindcss-animate/blob/main/index.js
           */
          animationScale: ({ theme }) => ({
            DEFAULT: 0,
            ...theme('scale'),
          }),
          /**
           * tailwindcss-animate
           * https://github.com/jamiebuilds/tailwindcss-animate/blob/main/index.js
           */
          animationRotate: ({ theme }) => ({
            DEFAULT: '30deg',
            ...theme('rotate'),
          }),
          /**
           * tailwindcss-animate
           * https://github.com/jamiebuilds/tailwindcss-animate/blob/main/index.js
           */
          animationDelay: ({ theme }) => ({
            ...theme('transitionDelay'),
          }),
          /**
           * tailwindcss-animate
           * https://github.com/jamiebuilds/tailwindcss-animate/blob/main/index.js
           */
          animationDuration: ({ theme }) => ({
            0: '0ms',
            ...theme('transitionDuration'),
          }),
          /**
           * tailwindcss-animate
           * https://github.com/jamiebuilds/tailwindcss-animate/blob/main/index.js
           */
          animationTimingFunction: ({ theme }) => ({
            ...theme('transitionTimingFunction'),
          }),
        },
      },
    };
  },
);
