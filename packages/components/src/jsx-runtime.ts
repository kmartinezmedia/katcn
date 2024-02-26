import { jsxDEV as jsxDevOriginal } from 'react/jsx-dev-runtime';
import { jsx as jsxOriginal, jsxs as jsxsOriginal } from 'react/jsx-runtime';

import { clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';
import { StyleProps } from '~/types/props';
import {
  BackgroundColor,
  BorderRadius,
  BorderWidth,
  Elevation,
  ForegroundColor,
  LineColor,
  TextVariant,
} from '~/types/tokens';

interface GetStylesParams extends StyleProps {
  className?: string;
}

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

class ClassManager {
  public safelistSet = new Set<string>();

  get safelist() {
    return Array.from(this.safelistSet);
  }

  add(className: string) {
    this.safelistSet.add(className);
  }
}

export const classManager = new ClassManager();

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
    classManager.add(classNameToAdd);
  }
  if (colorChecked) {
    const classNameToAdd = `data-[state=checked]:text-${colorChecked}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (placeholderColor) {
    const classNameToAdd = `placeholder:text-${placeholderColor}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (fontFamily) {
    const classNameToAdd = `font-${fontFamily}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (fontSize) {
    const classNameToAdd = `font-size-${fontSize}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (fontWeight) {
    const classNameToAdd = `font-weight-${fontWeight}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (lineHeight) {
    const classNameToAdd = `line-height-${lineHeight}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (textAlign) {
    const classNameToAdd = `text-${textAlign}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (textTransform) {
    const classNameToAdd = `case-${textTransform}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (spacingTop) {
    const classNameToAdd = `pt-${spacingTop}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (spacingBottom) {
    const classNameToAdd = `pb-${spacingBottom}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (spacingStart) {
    const classNameToAdd = `ps-${spacingStart}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (spacingEnd) {
    const classNameToAdd = `pe-${spacingEnd}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (offsetTop) {
    const classNameToAdd = `-mt-${offsetTop}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (offsetBottom) {
    const classNameToAdd = `-mb-${offsetBottom}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (offsetStart) {
    const classNameToAdd = `-ms-${offsetStart}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (offsetEnd) {
    const classNameToAdd = `-me-${offsetEnd}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (columnGap) {
    const classNameToAdd = `gap-x-${columnGap}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (rowGap) {
    const classNameToAdd = `gap-y-${rowGap}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }

  if (backgroundColor) {
    const classNameToAdd = `bg-${backgroundColor}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }

  if (backgroundColorOnActive) {
    const classNameToAdd = `active:bg-${backgroundColorOnActive}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }

  if (backgroundColorOnHover) {
    const classNameToAdd = `hover:bg-${backgroundColorOnHover}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }

  if (backgroundColorOnChecked) {
    const classNameToAdd = `data-[state=checked]:bg-${backgroundColorOnChecked}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }

  if (borderColorOnActive) {
    if (borderTopColor) {
      const classNameToAdd = `active:border-t-${borderColorOnActive}`;
      classNames.push(classNameToAdd);
      classManager.add(classNameToAdd);
    }
    if (borderBottomColor) {
      const classNameToAdd = `active:border-b-${borderColorOnActive}`;
      classNames.push(classNameToAdd);
      classManager.add(classNameToAdd);
    }
    if (borderStartColor) {
      const classNameToAdd = `active:border-s-${borderColorOnActive}`;
      classNames.push(classNameToAdd);
      classManager.add(classNameToAdd);
    }
    if (borderEndColor) {
      const classNameToAdd = `active:border-e-${borderColorOnActive}`;
      classNames.push(classNameToAdd);
      classManager.add(classNameToAdd);
    }
  }

  if (borderColorOnFocus) {
    if (borderTopColor) {
      const classNameToAdd = `focus:border-t-${borderColorOnFocus}`;
      classNames.push(classNameToAdd);
      classManager.add(classNameToAdd);
    }
    if (borderBottomColor) {
      const classNameToAdd = `focus:border-b-${borderColorOnFocus}`;
      classNames.push(classNameToAdd);
      classManager.add(classNameToAdd);
    }
    if (borderStartColor) {
      const classNameToAdd = `focus:border-s-${borderColorOnFocus}`;
      classNames.push(classNameToAdd);
      classManager.add(classNameToAdd);
    }
    if (borderEndColor) {
      const classNameToAdd = `focus:border-e-${borderColorOnFocus}`;
      classNames.push(classNameToAdd);
      classManager.add(classNameToAdd);
    }
  }

  if (borderTopColor) {
    const classNameToAdd = `border-t-${borderTopColor}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (borderBottomColor) {
    const classNameToAdd = `border-b-${borderBottomColor}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (borderStartColor) {
    const classNameToAdd = `border-s-${borderStartColor}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (borderEndColor) {
    const classNameToAdd = `border-e-${borderEndColor}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (borderTopStartRadius) {
    const classNameToAdd = `rounded-ss-${borderTopStartRadius}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (borderTopEndRadius) {
    const classNameToAdd = `rounded-se-${borderTopEndRadius}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (borderBottomStartRadius) {
    const classNameToAdd = `rounded-es-${borderBottomStartRadius}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (borderBottomEndRadius) {
    const classNameToAdd = `rounded-ee-${borderBottomEndRadius}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (borderWidth) {
    const classNameToAdd = `border-${borderWidth}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (borderVerticalWidth) {
    const classNameToAdd = `border-y-${borderVerticalWidth}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (borderHorizontalWidth) {
    const classNameToAdd = `border-x-${borderHorizontalWidth}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (borderStartWidth) {
    const classNameToAdd = `border-s-${borderStartWidth}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (borderEndWidth) {
    const classNameToAdd = `border-e-${borderEndWidth}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (borderTopWidth) {
    const classNameToAdd = `border-t-${borderTopWidth}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (borderBottomWidth) {
    const classNameToAdd = `border-b-${borderBottomWidth}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (borderedTop) {
    const classNameToAdd = 'border-t-thin';
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (borderedBottom) {
    const classNameToAdd = 'border-b-thin';
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (borderedStart) {
    const classNameToAdd = 'border-s-thin';
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (borderedEnd) {
    const classNameToAdd = 'border-e-thin';
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (height) {
    const classNameToAdd = `h-${height}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (minHeight) {
    const classNameToAdd = `min-h-${minHeight}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (maxHeight) {
    const classNameToAdd = `max-h-${maxHeight}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (width) {
    const classNameToAdd = `w-${width}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (minWidth) {
    const classNameToAdd = `min-w-${minWidth}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (maxWidth) {
    const classNameToAdd = `max-w-${maxWidth}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (overflowX) {
    const classNameToAdd = `overflow-x-${overflowX}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (overflowY) {
    const classNameToAdd = `overflow-y-${overflowY}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (position) {
    const classNameToAdd = position;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (zIndex) {
    const classNameToAdd = `z-${zIndex}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (opacity) {
    const classNameToAdd = `opacity-${opacity}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (contentFit) {
    const classNameToAdd = `object-${contentFit}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }

  if (iconSize) {
    const classNameToAdd = `icon-size-${iconSize}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }
  if (avatarSize) {
    const classNameToAdd = `avatar-size-${avatarSize}`;
    classNames.push(classNameToAdd);
    classManager.add(classNameToAdd);
  }

  return twMerge(clsx(classNames, className));
};

function extractStyleProps(props: GetStylesParams) {
  const {
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
    spacingHorizontal,
    spacingVertical,
    spacingTop,
    spacingBottom,
    spacingStart,
    spacingEnd,
    offset,
    offsetVertical,
    offsetHorizontal,
    offsetTop,
    offsetBottom,
    offsetStart,
    offsetEnd,
    columnGap,
    rowGap,
    backgroundColor,
    backgroundColorOnActive,
    backgroundColorOnHover,
    backgroundColorOnChecked,
    borderColor,
    borderColorOnActive,
    borderColorOnFocus,
    borderVerticalColor,
    borderHorizontalColor,
    borderTopColor,
    borderBottomColor,
    borderStartColor,
    borderEndColor,
    borderRadius,
    borderTopStartRadius,
    borderTopEndRadius,
    borderBottomStartRadius,
    borderBottomEndRadius,
    bordered,
    borderedHorizontal,
    borderedVertical,
    borderedTop,
    borderedBottom,
    borderedStart,
    borderedEnd,
    borderWidth,
    borderVerticalWidth,
    borderHorizontalWidth,
    borderStartWidth,
    borderEndWidth,
    borderTopWidth,
    borderBottomWidth,
    height,
    minHeight,
    maxHeight,
    width,
    minWidth,
    maxWidth,
    overflow,
    overflowX,
    overflowY,
    position,
    zIndex,
    opacity,
    contentFit,
    iconSize,
    avatarSize,
    className,
    ...otherProps
  } = props;

  const finalClassName = getStyles({
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
    spacingHorizontal,
    spacingVertical,
    spacingTop,
    spacingBottom,
    spacingStart,
    spacingEnd,
    offset,
    offsetVertical,
    offsetHorizontal,
    offsetTop,
    offsetBottom,
    offsetStart,
    offsetEnd,
    columnGap,
    rowGap,
    backgroundColor,
    backgroundColorOnActive,
    backgroundColorOnHover,
    backgroundColorOnChecked,
    borderColor,
    borderColorOnActive,
    borderColorOnFocus,
    borderVerticalColor,
    borderHorizontalColor,
    borderTopColor,
    borderBottomColor,
    borderStartColor,
    borderEndColor,
    borderRadius,
    borderTopStartRadius,
    borderTopEndRadius,
    borderBottomStartRadius,
    borderBottomEndRadius,
    bordered,
    borderedHorizontal,
    borderedVertical,
    borderedTop,
    borderedBottom,
    borderedStart,
    borderedEnd,
    borderWidth,
    borderVerticalWidth,
    borderHorizontalWidth,
    borderStartWidth,
    borderEndWidth,
    borderTopWidth,
    borderBottomWidth,
    height,
    minHeight,
    maxHeight,
    width,
    minWidth,
    maxWidth,
    overflow,
    overflowX,
    overflowY,
    position,
    zIndex,
    opacity,
    contentFit,
    iconSize,
    avatarSize,
    className,
  });
  console.log('finalClassName', finalClassName);
  console.log('safelist', classManager.safelist);

  return { ...otherProps, className: finalClassName };
}

export { Fragment } from 'react';

/** Client components */
export function jsx(
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  type: any,
  props: GetStylesParams,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  key: any,
) {
  const finalProps = extractStyleProps(props);
  return jsxOriginal(type, finalProps, key);
}

/** Server components */
export function jsxs(
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  type: any,
  { backgroundColor, className, ...props }: GetStylesParams,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  key: any,
) {
  const finalProps = extractStyleProps(props);
  return jsxsOriginal(type, finalProps, key);
}

export function jsxDEV(
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  type: any,
  props: GetStylesParams,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  maybeKey: any,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  source: any,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  self: any,
) {
  const finalProps = extractStyleProps(props);
  return jsxDevOriginal(type, finalProps, maybeKey, source, self);
}
