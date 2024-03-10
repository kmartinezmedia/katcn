import { clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';
import type {
  BackgroundColor,
  BorderRadius,
  BorderWidth,
  ForegroundColor,
  LineColor,
  StyleProps,
  TextVariant,
} from './types';

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
  display,
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
  horizontalGap,
  verticalGap,
  direction,
  grow,
  shrink,
  wrap,
  justifyContent,
  alignItems,
  alignContent,
  backgroundColor,
  backgroundColorOnActive,
  backgroundColorOnFocus,
  backgroundColorOnHover,
  backgroundColorOnChecked,
  borderColor,
  borderColorOnActive,
  borderColorOnChecked,
  borderColorOnFocus,
  borderColorOnHover,
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
}: GetStylesParams) => {
  const classNames = [];

  if (color) {
    classNames.push(`color-${color}`);
  }
  if (colorChecked) {
    classNames.push(`data-[state=checked]:color-${colorChecked}`);
  }

  if (display) {
    classNames.push(display);
  }

  if (placeholderColor) {
    classNames.push(`placeholder:color-${placeholderColor}`);
  }
  if (fontFamily) {
    classNames.push(`fontFamily-${fontFamily}`);
  }
  if (fontSize) {
    classNames.push(`fontSize-${fontSize}`);
  }
  if (fontWeight) {
    classNames.push(`fontWeight-${fontWeight}`);
  }
  if (lineHeight) {
    classNames.push(`lineHeight-${lineHeight}`);
  }
  if (textAlign) {
    classNames.push(`textAlign-${textAlign}`);
  }
  if (textTransform) {
    classNames.push(`textTransform-${textTransform}`);
  }
  if (spacing) {
    classNames.push(`spacing-${spacing}`);
  }
  if (spacingHorizontal) {
    classNames.push(`spacingHorizontal-${spacingHorizontal}`);
  }
  if (spacingVertical) {
    classNames.push(`spacingVertical-${spacingVertical}`);
  }
  if (spacingTop) {
    classNames.push(`spacingTop-${spacingTop}`);
  }
  if (spacingBottom) {
    classNames.push(`spacingBottom-${spacingBottom}`);
  }
  if (spacingStart) {
    classNames.push(`spacingStart-${spacingStart}`);
  }
  if (spacingEnd) {
    classNames.push(`spacingEnd-${spacingEnd}`);
  }
  if (offset) {
    classNames.push(`offset-${offset}`);
  }
  if (offsetVertical) {
    classNames.push(`offsetVertical-${offsetVertical}`);
  }
  if (offsetHorizontal) {
    classNames.push(`offsetHorizontal-${offsetHorizontal}`);
  }
  if (offsetTop) {
    classNames.push(`offsetTop-${offsetTop}`);
  }
  if (offsetBottom) {
    classNames.push(`offsetBottom-${offsetBottom}`);
  }
  if (offsetStart) {
    classNames.push(`offsetStart-${offsetStart}`);
  }
  if (offsetEnd) {
    classNames.push(`offsetEnd-${offsetEnd}`);
  }
  if (horizontalGap) {
    classNames.push(`horizontalGap-${horizontalGap}`);
  }
  if (verticalGap) {
    classNames.push(`verticalGap-${horizontalGap}`);
  }
  if (backgroundColor) {
    classNames.push(`backgroundColor-${backgroundColor}`);
  }
  if (backgroundColorOnActive) {
    classNames.push(`backgroundColorOnActive-${backgroundColorOnActive}`);
  }
  if (backgroundColorOnFocus) {
    classNames.push(`backgroundColorOnFocus-${backgroundColorOnFocus}`);
  }
  if (backgroundColorOnHover) {
    classNames.push(`backgroundColorOnHover-${backgroundColorOnHover}`);
  }

  if (backgroundColorOnChecked) {
    classNames.push(`backgroundColorOnChecked:bg-${backgroundColorOnChecked}`);
  }

  if (borderColorOnActive) {
    if (borderColor) {
      classNames.push(`borderColorOnActive-${borderColorOnActive}`);
    }
    if (borderTopColor) {
      classNames.push(`borderColorOnActive-t-${borderColorOnActive}`);
    }
    if (borderBottomColor) {
      classNames.push(`borderColorOnActive-b-${borderColorOnActive}`);
    }
    if (borderStartColor) {
      classNames.push(`borderColorOnActive-s-${borderColorOnActive}`);
    }
    if (borderEndColor) {
      classNames.push(`borderColorOnActive-e-${borderColorOnActive}`);
    }
  }

  if (borderColorOnChecked) {
    if (borderColor) {
      classNames.push(`borderColorOnChecked-${borderColorOnChecked}`);
    }
    if (borderTopColor) {
      classNames.push(`borderColorOnChecked-t-${borderColorOnChecked}`);
    }
    if (borderBottomColor) {
      classNames.push(`borderColorOnChecked-b-${borderColorOnChecked}`);
    }
    if (borderStartColor) {
      classNames.push(`borderColorOnChecked-s-${borderColorOnChecked}`);
    }
    if (borderEndColor) {
      classNames.push(`borderColorOnChecked-e-${borderColorOnChecked}`);
    }
  }

  if (borderColorOnFocus) {
    if (borderColor) {
      classNames.push(`borderColorOnFocus-${borderColorOnFocus}`);
    }
    if (borderTopColor) {
      classNames.push(`borderColorOnFocus-t-${borderColorOnFocus}`);
    }
    if (borderBottomColor) {
      classNames.push(`borderColorOnFocus-b-${borderColorOnFocus}`);
    }
    if (borderStartColor) {
      classNames.push(`borderColorOnFocus-s-${borderColorOnFocus}`);
    }
    if (borderEndColor) {
      classNames.push(`borderColorOnFocus-e-${borderColorOnFocus}`);
    }
  }

  if (borderColorOnHover) {
    if (borderColor) {
      classNames.push(`borderColorOnHover-${borderColorOnHover}`);
    }
    if (borderTopColor) {
      classNames.push(`borderColorOnHover-t-${borderColorOnHover}`);
    }
    if (borderBottomColor) {
      classNames.push(`borderColorOnHover-b-${borderColorOnHover}`);
    }
    if (borderStartColor) {
      classNames.push(`borderColorOnHover-s-${borderColorOnHover}`);
    }
    if (borderEndColor) {
      classNames.push(`borderColorOnHover-e-${borderColorOnHover}`);
    }
  }

  if (borderColorOnActive) {
    if (borderColor) {
      classNames.push(`borderColorOnActive-${borderColorOnActive}`);
    }
    if (borderTopColor) {
      classNames.push(`borderColorOnActive-t-${borderColorOnActive}`);
    }
    if (borderBottomColor) {
      classNames.push(`borderColorOnActive-b-${borderColorOnActive}`);
    }
    if (borderStartColor) {
      classNames.push(`borderColorOnActive-s-${borderColorOnActive}`);
    }
    if (borderEndColor) {
      classNames.push(`borderColorOnActive-e-${borderColorOnActive}`);
    }
  }

  if (borderColorOnFocus) {
    if (borderTopColor) {
      classNames.push(`borderColorOnFocus-t-${borderColorOnFocus}`);
    }
    if (borderBottomColor) {
      classNames.push(`borderColorOnFocus-b-${borderColorOnFocus}`);
    }
    if (borderStartColor) {
      classNames.push(`borderColorOnFocus-s-${borderColorOnFocus}`);
    }
    if (borderEndColor) {
      classNames.push(`borderColorOnFocus-e-${borderColorOnFocus}`);
    }
  }

  if (borderColor) {
    classNames.push(`borderColor-${borderColor}`);
  }

  if (borderVerticalColor) {
    classNames.push(`borderVerticalColor-${borderVerticalColor}`);
  }

  if (borderHorizontalColor) {
    classNames.push(`borderHorizontalColor-${borderHorizontalColor}`);
  }

  if (borderTopColor) {
    classNames.push(`borderTopColor-${borderTopColor}`);
  }

  if (borderBottomColor) {
    classNames.push(`borderBottomColor-${borderBottomColor}`);
  }

  if (borderStartColor) {
    classNames.push(`borderStartColor-${borderStartColor}`);
  }

  if (borderEndColor) {
    classNames.push(`borderEndColor-${borderEndColor}`);
  }

  if (borderRadius) {
    classNames.push(`borderRadius-${borderRadius}`);
  }

  if (borderTopStartRadius) {
    classNames.push(`borderTopStartRadius-${borderTopStartRadius}`);
  }

  if (borderTopEndRadius) {
    classNames.push(`borderTopEndRadius-${borderTopEndRadius}`);
  }

  if (borderBottomStartRadius) {
    classNames.push(`borderBottomStartRadius-${borderBottomStartRadius}`);
  }

  if (borderBottomEndRadius) {
    classNames.push(`borderBottomEndRadius-${borderBottomEndRadius}`);
  }

  if (borderWidth) {
    classNames.push(`borderWidth-${borderWidth}`);
  }

  if (borderVerticalWidth) {
    classNames.push(`borderVerticalWidth-${borderVerticalWidth}`);
  }

  if (borderHorizontalWidth) {
    classNames.push(`borderHorizontalWidth-${borderHorizontalWidth}`);
  }

  if (borderStartWidth) {
    classNames.push(`borderStartWidth-${borderStartWidth}`);
  }

  if (borderEndWidth) {
    classNames.push(`borderEndWidth-${borderEndWidth}`);
  }

  if (borderTopWidth) {
    classNames.push(`borderTopWidth-${borderTopWidth}`);
  }

  if (borderBottomWidth) {
    classNames.push(`borderBottomWidth-${borderBottomWidth}`);
  }

  if (height) {
    const classNameToAdd =
      typeof height === 'number' ? `height-[${height}px]` : `height-${height}`;
    classNames.push(classNameToAdd);
  }

  if (minHeight) {
    const classNameToAdd =
      typeof minHeight === 'number'
        ? `minHeight-[${minHeight}px]`
        : `minHeight-${minHeight}`;
    classNames.push(classNameToAdd);
  }

  if (maxHeight) {
    const classNameToAdd =
      typeof maxHeight === 'number'
        ? `maxHeight-[${maxHeight}px]`
        : `maxHeight-${maxHeight}`;
    classNames.push(classNameToAdd);
  }
  if (width) {
    const classNameToAdd =
      typeof width === 'number' ? `width-[${width}px]` : `width-${width}`;
    classNames.push(classNameToAdd);
  }

  if (minWidth) {
    const classNameToAdd =
      typeof minWidth === 'number'
        ? `minWidth-[${minWidth}px]`
        : `minWidth-${minWidth}`;
    classNames.push(classNameToAdd);
  }

  if (maxWidth) {
    const classNameToAdd =
      typeof maxWidth === 'number'
        ? `maxWidth-[${maxWidth}px]`
        : `maxWidth-${maxWidth}`;
    classNames.push(classNameToAdd);
  }

  if (overflow) {
    classNames.push(`overflow-${overflow}`);
  }

  if (overflowX) {
    classNames.push(`overflowX-${overflowX}`);
  }
  if (overflowY) {
    classNames.push(`overflowY-${overflowY}`);
  }
  if (position) {
    classNames.push(`position-${position}`);
  }
  if (zIndex) {
    classNames.push(`zIndex-${zIndex}`);
  }
  if (opacity) {
    classNames.push(`opacity-${opacity}`);
  }
  if (contentFit) {
    classNames.push(`contentFit-${contentFit}`);
  }

  if (direction) {
    classNames.push(`direction-${direction}`);
  }

  if (grow !== undefined) {
    classNames.push(`grow-${grow}`);
  }

  if (shrink !== undefined) {
    classNames.push(`shrink-${shrink}`);
  }
  if (wrap) {
    classNames.push(`wrap=${wrap}`);
  }

  if (justifyContent) {
    classNames.push(`justifyContent-${justifyContent}`);
  }

  if (alignItems) {
    classNames.push(`alignItems-${alignItems}`);
  }

  if (alignContent) {
    classNames.push(`alignContent-${alignContent}`);
  }

  if (iconSize) {
    classNames.push(`iconSize-${iconSize}`);
  }
  if (avatarSize) {
    classNames.push(`avatarSize-${avatarSize}`);
  }

  return twMerge(clsx(classNames, className));
};

export const cx = clsx;
