import plugin from 'tailwindcss/plugin';
import { Config } from 'tailwindcss/types/config';
import { defaultTokensConfig } from '../tokens/defaultTokensConfig';
import { alwaysPalette } from '../tokens/palette';
import { parseTokens } from '../tokens/utils/parseTokens';
import { UniversalTokensConfig } from '../types/tokens';
import { transformTsx } from './transformTsx';

interface TailwindPluginOptions {
  config?: UniversalTokensConfig;
}

const systemPlugin = plugin.withOptions(
  ({ config = defaultTokensConfig }: TailwindPluginOptions) => {
    const parsedTokens = parseTokens(config);
    return ({ addBase, matchUtilities }) => {
      addBase({
        ':root': {
          ...parsedTokens.colorMode.light.vars,
          ...parsedTokens.scaleMode.large.borderRadius.vars,
          ...parsedTokens.scaleMode.large.borderWidth.vars,
          ...parsedTokens.scaleMode.large.avatarSizes.vars,
          ...parsedTokens.scaleMode.large.iconSizes.vars,
          ...parsedTokens.scaleMode.large.spacing.vars,
          ...parsedTokens.scaleMode.large.fontFamily.vars,
          ...parsedTokens.scaleMode.large.fontSize.vars,
          ...parsedTokens.scaleMode.large.fontWeight.vars,
          ...parsedTokens.scaleMode.large.lineHeight.vars,
          ...parsedTokens.scaleMode.large.textTransform.vars,
        },
      });

      matchUtilities(
        {
          'icon-size': (value) => ({
            width: value,
            height: value,
            fontSize: value,
            lineHeight: value,
          }),
        },
        {
          values: parsedTokens.scaleMode.large.iconSizes.tailwindConfig,
        },
      );

      matchUtilities(
        {
          'avatar-size': (value) => ({
            width: value,
            height: value,
          }),
        },
        {
          values: parsedTokens.scaleMode.large.avatarSizes.tailwindConfig,
        },
      );

      matchUtilities(
        {
          case: (value) => ({
            'text-transform': value,
          }),
        },
        {
          values: parsedTokens.scaleMode.large.textTransform.tailwindConfig,
        },
      );

      matchUtilities(
        {
          'font-weight': (value) => ({
            'font-weight': value,
          }),
        },
        {
          values: parsedTokens.scaleMode.large.fontWeight.tailwindConfig,
        },
      );

      matchUtilities(
        {
          'font-size': (value) => ({
            'font-size': value,
          }),
        },
        {
          values: parsedTokens.scaleMode.large.fontSize.tailwindConfig,
        },
      );
    };
  },
  ({ config = defaultTokensConfig }: TailwindPluginOptions) => {
    const parsedTokens = parseTokens(config);
    const fontFamily = {
      ...parsedTokens.fontFamily,
      ...parsedTokens.scaleMode.large.fontFamily.tailwindConfig,
    };

    // Shared across all color groups (i.e. text color, border, background, etc)
    const corePalette =
      parsedTokens.colorMode.light.tailwindConfig.palette.core;

    const colors = {
      ...alwaysPalette,
      ...parsedTokens.colorMode.light.tailwindConfig.spectrum,
      ...corePalette,
    };

    const textColor = {
      ...colors,
      ...parsedTokens.colorMode.light.tailwindConfig.palette.foreground,
    };

    const backgroundColor = {
      ...colors,
      ...parsedTokens.colorMode.light.tailwindConfig.palette.background,
      ...parsedTokens.colorMode.light.tailwindConfig.palette.backgroundWash,
      ...parsedTokens.colorMode.light.tailwindConfig.palette.elevation,
    };

    const borderColor = {
      ...colors,
      ...parsedTokens.colorMode.light.tailwindConfig.palette.line,
    };

    const accentColor = colors;

    const lineHeight = parsedTokens.scaleMode.large.lineHeight.tailwindConfig;
    const spacing = parsedTokens.scaleMode.large.spacing.tailwindConfig;
    const borderRadius =
      parsedTokens.scaleMode.large.borderRadius.tailwindConfig;
    const borderWidth = parsedTokens.scaleMode.large.borderWidth.tailwindConfig;
    const boxShadow = parsedTokens.colorMode.light.tailwindConfig.elevation;
    const dropShadow = boxShadow;
    const outlineWidth = borderWidth;
    const aspectRatio = parsedTokens.aspectRatio;
    const zIndex = parsedTokens.zIndex;
    const gap = spacing;
    const padding = spacing;
    const space = spacing;
    const fill = backgroundColor;
    const caretColor = textColor;
    const placeholderColor = textColor;
    const textDecorationColor = textColor;
    const divideColor = borderColor;
    const outlineColor = borderColor;
    const ringColor = borderColor;
    const ringOffsetColor = borderColor;
    const stroke = borderColor;

    return {
      // darkMode: ['class', DARK_COLOR_MODE_CLASSNAME],
      // Guarantee that the dark mode class is not purged
      // safelist: [DARK_COLOR_MODE_CLASSNAME, ...safelist],
      theme: {
        extend: {
          aspectRatio,
          zIndex,
          // border
          borderRadius,
          borderWidth,
          outlineWidth,
          // shadows
          boxShadow,
          dropShadow,
          // typography
          fontFamily,
          lineHeight,
          // spacing
          spacing,
          gap,
          padding,
          space,
          // colors
          colors,
          backgroundColor,
          textColor,
          borderColor,
          accentColor,
          fill,
          caretColor,
          placeholderColor,
          textDecorationColor,
          divideColor,
          outlineColor,
          ringColor,
          ringOffsetColor,
          stroke,
        },
      },
    };
  },
);

export function createTailwindConfig(
  tailwindConfig: Config,
  systemConfig: UniversalTokensConfig = defaultTokensConfig,
): Config {
  const content = Array.isArray(tailwindConfig.content)
    ? { files: tailwindConfig.content }
    : tailwindConfig.content;

  const plugins = Array.isArray(tailwindConfig.plugins)
    ? tailwindConfig.plugins
    : [];

  return {
    ...tailwindConfig,
    content: {
      ...content,
      transform: {
        ...content.transform,
        tsx: transformTsx,
      },
    },
    plugins: [...plugins, systemPlugin({ config: systemConfig })],
  };
}
