import { clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';
import { StyleProps } from '../types/props';
import {
  BackgroundColor,
  BorderRadius,
  BorderWidth,
  Elevation,
  ForegroundColor,
  LineColor,
  TextVariant,
} from '../types/tokens';

const lineColors: LineColor[] = [
  'accent',
  'alert',
  'brand',
  'positive',
  'warning',
  'primary',
  'secondary',
  'white',
  'black',
  'transparent',
];
const borderWidths: BorderWidth[] = ['none', 'thin', 'medium', 'thick'];
const borderRadii: BorderRadius[] = [
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'full',
];
const foregroundColors: ForegroundColor[] = [
  'accent',
  'alert',
  'brand',
  'positive',
  'warning',
  'primary',
  'secondary',
  'tertiary',
  'white',
  'black',
  'transparent',
];
const backgroundColors: BackgroundColor[] = [
  'accent',
  'alert',
  'brand',
  'positive',
  'warning',
  'primary',
  'secondary',
  'white',
  'black',
  'transparent',
];
const textVariants: TextVariant[] = [
  'display1',
  'title1',
  'title2',
  'title3',
  'title4',
  'headline1',
  'body1',
  'label1',
  'label2',
  'caption1',
  'caption2',
  'legal1',
];
const elevations: Elevation[] = ['1', '2', '3'];

const twMerge = extendTailwindMerge({
  cacheSize: 0,
  extend: {
    theme: {
      borderColor: lineColors,
      borderWidth: borderWidths,
      borderRadius: borderRadii,
    },
  },
  override: {
    classGroups: {
      'text-color': [{ text: foregroundColors }],
      'bg-color': [{ bg: backgroundColors }],
      'font-family': [{ font: ['icons', ...textVariants] }],
      leading: [{ leading: textVariants }],
      shadow: [{ shadow: elevations }],
    },
    conflictingClassGroups: {},
  },
});

export interface GetStylesParams extends StyleProps {
  className?: string;
}

export const getStyles = ({
  color,
  colorChecked,
  placeholderColor,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  textAlign,
  textTransform,
  spacing,
  spacingHorizontal = spacing,
  spacingVertical = spacing,
  spacingTop = spacingVertical,
  spacingBottom = spacingVertical,
  spacingStart = spacingHorizontal,
  spacingEnd = spacingHorizontal,
  offset,
  offsetVertical = offset,
  offsetHorizontal = offset,
  offsetTop = offsetVertical,
  offsetBottom = offsetVertical,
  offsetStart = offsetHorizontal,
  offsetEnd = offsetHorizontal,
  columnGap,
  rowGap,
  backgroundColor,
  backgroundColorOnActive,
  backgroundColorOnHover,
  backgroundColorOnChecked,
  borderColor,
  borderColorOnActive,
  borderColorOnFocus,
  borderVerticalColor = borderColor,
  borderHorizontalColor = borderColor,
  borderTopColor = borderVerticalColor,
  borderBottomColor = borderVerticalColor,
  borderStartColor = borderHorizontalColor,
  borderEndColor = borderHorizontalColor,
  borderRadius,
  borderTopStartRadius = borderRadius,
  borderTopEndRadius = borderRadius,
  borderBottomStartRadius = borderRadius,
  borderBottomEndRadius = borderRadius,
  bordered,
  borderedHorizontal = bordered,
  borderedVertical = bordered,
  borderedTop = borderedVertical,
  borderedBottom = borderedVertical,
  borderedStart = borderedHorizontal,
  borderedEnd = borderedHorizontal,
  borderWidth = bordered ? 'thin' : undefined,
  borderVerticalWidth = borderedVertical ? 'thin' : undefined,
  borderHorizontalWidth = borderedHorizontal ? 'thin' : undefined,
  borderStartWidth = borderedStart ? 'thin' : undefined,
  borderEndWidth = borderedEnd ? 'thin' : undefined,
  borderTopWidth = borderedTop ? 'thin' : undefined,
  borderBottomWidth = borderedBottom ? 'thin' : undefined,
  height,
  minHeight,
  maxHeight,
  width,
  minWidth,
  maxWidth,
  overflow,
  overflowX = overflow,
  overflowY = overflow,
  position,
  zIndex,
  opacity,
  contentFit,
  iconSize,
  avatarSize,
  className,
}: GetStylesParams) => {
  const classNames = [];

  if (color) {
    classNames.push(`text-${color}`);
  }
  if (colorChecked) {
    classNames.push(`data-[state=checked]:text-${colorChecked}`);
  }
  if (placeholderColor) {
    classNames.push(`placeholder:text-${placeholderColor}`);
  }
  if (fontFamily) {
    classNames.push(`font-${fontFamily}`);
  }
  if (fontSize) {
    classNames.push(`font-size-${fontSize}`);
  }
  if (fontWeight) {
    classNames.push(`font-weight-${fontWeight}`);
  }
  if (lineHeight) {
    classNames.push(`line-height-${lineHeight}`);
  }
  if (textAlign) {
    classNames.push(`text-${textAlign}`);
  }
  if (textTransform) {
    classNames.push(`case-${textTransform}`);
  }
  if (spacingTop) {
    classNames.push(`pt-${spacingTop}`);
  }
  if (spacingBottom) {
    classNames.push(`pb-${spacingBottom}`);
  }
  if (spacingStart) {
    classNames.push(`ps-${spacingStart}`);
  }
  if (spacingEnd) {
    classNames.push(`pe-${spacingEnd}`);
  }
  if (offsetTop) {
    classNames.push(`-mt-${offsetTop}`);
  }
  if (offsetBottom) {
    classNames.push(`-mb-${offsetBottom}`);
  }
  if (offsetStart) {
    classNames.push(`-ms-${offsetStart}`);
  }
  if (offsetEnd) {
    classNames.push(`-me-${offsetEnd}`);
  }
  if (columnGap) {
    classNames.push(`gap-x-${columnGap}`);
  }
  if (rowGap) {
    classNames.push(`gap-y-${rowGap}`);
  }

  if (backgroundColor) {
    classNames.push(`bg-${backgroundColor}`);
  }

  if (backgroundColorOnActive) {
    classNames.push(`active:bg-${backgroundColorOnActive}`);
  }

  if (backgroundColorOnHover) {
    classNames.push(`hover:bg-${backgroundColorOnHover}`);
  }

  if (backgroundColorOnChecked) {
    classNames.push(`data-[state=checked]:bg-${backgroundColorOnChecked}`);
  }

  if (borderColorOnActive) {
    if (borderTopColor) {
      classNames.push(`active:border-t-${borderColorOnActive}`);
    }
    if (borderBottomColor) {
      classNames.push(`active:border-b-${borderColorOnActive}`);
    }
    if (borderStartColor) {
      classNames.push(`active:border-s-${borderColorOnActive}`);
    }
    if (borderEndColor) {
      classNames.push(`active:border-e-${borderColorOnActive}`);
    }
  }

  if (borderColorOnFocus) {
    if (borderTopColor) {
      classNames.push(`focus:border-t-${borderColorOnFocus}`);
    }
    if (borderBottomColor) {
      classNames.push(`focus:border-b-${borderColorOnFocus}`);
    }
    if (borderStartColor) {
      classNames.push(`focus:border-s-${borderColorOnFocus}`);
    }
    if (borderEndColor) {
      classNames.push(`focus:border-e-${borderColorOnFocus}`);
    }
  }

  if (borderTopColor) {
    classNames.push(`border-t-${borderTopColor}`);
  }
  if (borderBottomColor) {
    classNames.push(`border-b-${borderBottomColor}`);
  }
  if (borderStartColor) {
    classNames.push(`border-s-${borderStartColor}`);
  }
  if (borderEndColor) {
    classNames.push(`border-e-${borderEndColor}`);
  }
  if (borderTopStartRadius) {
    classNames.push(`rounded-ss-${borderTopStartRadius}`);
  }
  if (borderTopEndRadius) {
    classNames.push(`rounded-se-${borderTopEndRadius}`);
  }
  if (borderBottomStartRadius) {
    classNames.push(`rounded-es-${borderBottomStartRadius}`);
  }
  if (borderBottomEndRadius) {
    classNames.push(`rounded-ee-${borderBottomEndRadius}`);
  }
  if (borderWidth) {
    classNames.push(`border-${borderWidth}`);
  }
  if (borderVerticalWidth) {
    classNames.push(`border-y-${borderVerticalWidth}`);
  }
  if (borderHorizontalWidth) {
    classNames.push(`border-x-${borderHorizontalWidth}`);
  }
  if (borderStartWidth) {
    classNames.push(`border-s-${borderStartWidth}`);
  }
  if (borderEndWidth) {
    classNames.push(`border-e-${borderEndWidth}`);
  }
  if (borderTopWidth) {
    classNames.push(`border-t-${borderTopWidth}`);
  }
  if (borderBottomWidth) {
    classNames.push(`border-b-${borderBottomWidth}`);
  }
  if (borderedTop) {
    classNames.push('border-t-thin');
  }
  if (borderedBottom) {
    classNames.push('border-b-thin');
  }
  if (borderedStart) {
    classNames.push('border-s-thin');
  }
  if (borderedEnd) {
    classNames.push('border-e-thin');
  }
  if (height) {
    classNames.push(`h-${height}`);
  }
  if (minHeight) {
    classNames.push(`min-h-${minHeight}`);
  }
  if (maxHeight) {
    classNames.push(`max-h-${maxHeight}`);
  }
  if (width) {
    classNames.push(`w-${width}`);
  }
  if (minWidth) {
    classNames.push(`min-w-${minWidth}`);
  }
  if (maxWidth) {
    classNames.push(`max-w-${maxWidth}`);
  }
  if (overflowX) {
    classNames.push(`overflow-x-${overflowX}`);
  }
  if (overflowY) {
    classNames.push(`overflow-y-${overflowY}`);
  }
  if (position) {
    classNames.push(position);
  }
  if (zIndex) {
    classNames.push(`z-${zIndex}`);
  }
  if (opacity) {
    classNames.push(`opacity-${opacity}`);
  }
  if (contentFit) {
    classNames.push(`object-${contentFit}`);
  }

  if (iconSize) {
    classNames.push(`icon-size-${iconSize}`);
  }
  if (avatarSize) {
    classNames.push(`avatar-size-${avatarSize}`);
  }
  // if (colorMode === 'dark') {
  //   classNames.push(colorMode);
  // }

  return twMerge(clsx(classNames, className));
};
