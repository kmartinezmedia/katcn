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
    const classNameToAdd = `text-${color}`;
    classNames.push(classNameToAdd);
  }
  if (colorChecked) {
    const classNameToAdd = `data-[state=checked]:text-${colorChecked}`;
    classNames.push(classNameToAdd);
  }
  if (placeholderColor) {
    const classNameToAdd = `placeholder:text-${placeholderColor}`;
    classNames.push(classNameToAdd);
  }
  if (fontFamily) {
    const classNameToAdd = `font-${fontFamily}`;
    classNames.push(classNameToAdd);
  }
  if (fontSize) {
    const classNameToAdd = `font-size-${fontSize}`;
    classNames.push(classNameToAdd);
  }
  if (fontWeight) {
    const classNameToAdd = `font-weight-${fontWeight}`;
    classNames.push(classNameToAdd);
  }
  if (lineHeight) {
    const classNameToAdd = `line-height-${lineHeight}`;
    classNames.push(classNameToAdd);
  }
  if (textAlign) {
    const classNameToAdd = `text-${textAlign}`;
    classNames.push(classNameToAdd);
  }
  if (textTransform) {
    const classNameToAdd = `case-${textTransform}`;
    classNames.push(classNameToAdd);
  }
  if (spacingTop) {
    const classNameToAdd = `pt-${spacingTop}`;
    classNames.push(classNameToAdd);
  }
  if (spacingBottom) {
    const classNameToAdd = `pb-${spacingBottom}`;
    classNames.push(classNameToAdd);
  }
  if (spacingStart) {
    const classNameToAdd = `ps-${spacingStart}`;
    classNames.push(classNameToAdd);
  }
  if (spacingEnd) {
    const classNameToAdd = `pe-${spacingEnd}`;
    classNames.push(classNameToAdd);
  }
  if (offsetTop) {
    const classNameToAdd = `-mt-${offsetTop}`;
    classNames.push(classNameToAdd);
  }
  if (offsetBottom) {
    const classNameToAdd = `-mb-${offsetBottom}`;
    classNames.push(classNameToAdd);
  }
  if (offsetStart) {
    const classNameToAdd = `-ms-${offsetStart}`;
    classNames.push(classNameToAdd);
  }
  if (offsetEnd) {
    const classNameToAdd = `-me-${offsetEnd}`;
    classNames.push(classNameToAdd);
  }
  if (columnGap) {
    const classNameToAdd = `gap-x-${columnGap}`;
    classNames.push(classNameToAdd);
  }
  if (rowGap) {
    const classNameToAdd = `gap-y-${rowGap}`;
    classNames.push(classNameToAdd);
  }

  if (backgroundColor) {
    const classNameToAdd = `bg-${backgroundColor}`;
    classNames.push(classNameToAdd);
  }

  if (backgroundColorOnActive) {
    const classNameToAdd = `active:bg-${backgroundColorOnActive}`;
    classNames.push(classNameToAdd);
  }

  if (backgroundColorOnHover) {
    const classNameToAdd = `hover:bg-${backgroundColorOnHover}`;
    classNames.push(classNameToAdd);
  }

  if (backgroundColorOnChecked) {
    const classNameToAdd = `data-[state=checked]:bg-${backgroundColorOnChecked}`;
    classNames.push(classNameToAdd);
  }

  if (borderColorOnActive) {
    if (borderTopColor) {
      const classNameToAdd = `active:border-t-${borderColorOnActive}`;
      classNames.push(classNameToAdd);
    }
    if (borderBottomColor) {
      const classNameToAdd = `active:border-b-${borderColorOnActive}`;
      classNames.push(classNameToAdd);
    }
    if (borderStartColor) {
      const classNameToAdd = `active:border-s-${borderColorOnActive}`;
      classNames.push(classNameToAdd);
    }
    if (borderEndColor) {
      const classNameToAdd = `active:border-e-${borderColorOnActive}`;
      classNames.push(classNameToAdd);
    }
  }

  if (borderColorOnFocus) {
    if (borderTopColor) {
      const classNameToAdd = `focus:border-t-${borderColorOnFocus}`;
      classNames.push(classNameToAdd);
    }
    if (borderBottomColor) {
      const classNameToAdd = `focus:border-b-${borderColorOnFocus}`;
      classNames.push(classNameToAdd);
    }
    if (borderStartColor) {
      const classNameToAdd = `focus:border-s-${borderColorOnFocus}`;
      classNames.push(classNameToAdd);
    }
    if (borderEndColor) {
      const classNameToAdd = `focus:border-e-${borderColorOnFocus}`;
      classNames.push(classNameToAdd);
    }
  }

  if (borderTopColor) {
    const classNameToAdd = `border-t-${borderTopColor}`;
    classNames.push(classNameToAdd);
  }
  if (borderBottomColor) {
    const classNameToAdd = `border-b-${borderBottomColor}`;
    classNames.push(classNameToAdd);
  }
  if (borderStartColor) {
    const classNameToAdd = `border-s-${borderStartColor}`;
    classNames.push(classNameToAdd);
  }
  if (borderEndColor) {
    const classNameToAdd = `border-e-${borderEndColor}`;
    classNames.push(classNameToAdd);
  }
  if (borderTopStartRadius) {
    const classNameToAdd = `rounded-ss-${borderTopStartRadius}`;
    classNames.push(classNameToAdd);
  }
  if (borderTopEndRadius) {
    const classNameToAdd = `rounded-se-${borderTopEndRadius}`;
    classNames.push(classNameToAdd);
  }
  if (borderBottomStartRadius) {
    const classNameToAdd = `rounded-es-${borderBottomStartRadius}`;
    classNames.push(classNameToAdd);
  }
  if (borderBottomEndRadius) {
    const classNameToAdd = `rounded-ee-${borderBottomEndRadius}`;
    classNames.push(classNameToAdd);
  }
  if (borderWidth) {
    const classNameToAdd = `border-${borderWidth}`;
    classNames.push(classNameToAdd);
  }
  if (borderVerticalWidth) {
    const classNameToAdd = `border-y-${borderVerticalWidth}`;
    classNames.push(classNameToAdd);
  }
  if (borderHorizontalWidth) {
    const classNameToAdd = `border-x-${borderHorizontalWidth}`;
    classNames.push(classNameToAdd);
  }
  if (borderStartWidth) {
    const classNameToAdd = `border-s-${borderStartWidth}`;
    classNames.push(classNameToAdd);
  }
  if (borderEndWidth) {
    const classNameToAdd = `border-e-${borderEndWidth}`;
    classNames.push(classNameToAdd);
  }
  if (borderTopWidth) {
    const classNameToAdd = `border-t-${borderTopWidth}`;
    classNames.push(classNameToAdd);
  }
  if (borderBottomWidth) {
    const classNameToAdd = `border-b-${borderBottomWidth}`;
    classNames.push(classNameToAdd);
  }
  if (borderedTop) {
    const classNameToAdd = 'border-t-thin';
    classNames.push(classNameToAdd);
  }
  if (borderedBottom) {
    const classNameToAdd = 'border-b-thin';
    classNames.push(classNameToAdd);
  }
  if (borderedStart) {
    const classNameToAdd = 'border-s-thin';
    classNames.push(classNameToAdd);
  }
  if (borderedEnd) {
    const classNameToAdd = 'border-e-thin';
    classNames.push(classNameToAdd);
  }
  if (height) {
    const classNameToAdd = `h-${height}`;
    classNames.push(classNameToAdd);
  }
  if (minHeight) {
    const classNameToAdd = `min-h-${minHeight}`;
    classNames.push(classNameToAdd);
  }
  if (maxHeight) {
    const classNameToAdd = `max-h-${maxHeight}`;
    classNames.push(classNameToAdd);
  }
  if (width) {
    const classNameToAdd = `w-${width}`;
    classNames.push(classNameToAdd);
  }
  if (minWidth) {
    const classNameToAdd = `min-w-${minWidth}`;
    classNames.push(classNameToAdd);
  }
  if (maxWidth) {
    const classNameToAdd = `max-w-${maxWidth}`;
    classNames.push(classNameToAdd);
  }
  if (overflowX) {
    const classNameToAdd = `overflow-x-${overflowX}`;
    classNames.push(classNameToAdd);
  }
  if (overflowY) {
    const classNameToAdd = `overflow-y-${overflowY}`;
    classNames.push(classNameToAdd);
  }
  if (position) {
    const classNameToAdd = position;
    classNames.push(classNameToAdd);
  }
  if (zIndex) {
    const classNameToAdd = `z-${zIndex}`;
    classNames.push(classNameToAdd);
  }
  if (opacity) {
    const classNameToAdd = `opacity-${opacity}`;
    classNames.push(classNameToAdd);
  }
  if (contentFit) {
    const classNameToAdd = `object-${contentFit}`;
    classNames.push(classNameToAdd);
  }

  if (iconSize) {
    const classNameToAdd = `icon-size-${iconSize}`;
    classNames.push(classNameToAdd);
  }
  if (avatarSize) {
    const classNameToAdd = `avatar-size-${avatarSize}`;
    classNames.push(classNameToAdd);
  }

  return twMerge(clsx(classNames, className));
};
