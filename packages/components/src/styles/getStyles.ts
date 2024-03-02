import { clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';
import type { StyleProps } from '../types/props';
import type {
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
    classNames.push(`text-${color}`);
  }
  if (colorChecked) {
    classNames.push(`data-[state=checked]:text-${colorChecked}`);
  }

  if (display) {
    const classNameToAdd = {
      block: 'block',
      'inline-block': 'inline-block',
      inline: 'inline',
      flex: 'flex',
      'inline-flex': 'inline-flex',
      table: 'table',
      'inline-table': 'inline-table',
      'table-caption': 'table-caption',
      'table-cell': 'table-cell',
      'table-column': 'table-column',
      'table-column-group': 'table-column-group',
      'table-footer-group': 'table-footer-group',
      'table-header-group': 'table-header-group',
      'table-row-group': 'table-row-group',
      'table-row': 'table-row',
      'flow-root': 'flow-root',
      grid: 'grid',
      contents: 'contents',
    }[display];
    classNames.push(classNameToAdd);
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
  if (spacing) {
    classNames.push(`p-${spacing}`);
  }
  if (spacingHorizontal) {
    classNames.push(`px-${spacingHorizontal}`);
  }
  if (spacingVertical) {
    classNames.push(`py-${spacingVertical}`);
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
  if (offset) {
    classNames.push(`-m-${offset}`);
  }
  if (offsetVertical) {
    classNames.push(`-my-${offsetVertical}`);
  }
  if (offsetHorizontal) {
    classNames.push(`-mx-${offsetHorizontal}`);
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
  if (horizontalGap) {
    classNames.push(`gap-x-${horizontalGap}`);
  }
  if (verticalGap) {
    classNames.push(`gap-y-${horizontalGap}`);
  }
  if (backgroundColor) {
    classNames.push(`bg-${backgroundColor}`);
  }
  if (backgroundColorOnActive) {
    classNames.push(`active:bg-${backgroundColorOnActive}`);
  }
  if (backgroundColorOnFocus) {
    classNames.push(`focus:bg-${backgroundColorOnFocus}`);
  }
  if (backgroundColorOnHover) {
    classNames.push(`hover:bg-${backgroundColorOnHover}`);
  }

  if (backgroundColorOnChecked) {
    classNames.push(`data-[state=checked]:bg-${backgroundColorOnChecked}`);
  }

  if (borderColorOnActive) {
    if (borderColor) {
      classNames.push(`active:border-${borderColorOnActive}`);
    }
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

  if (borderColorOnChecked) {
    if (borderColor) {
      classNames.push(`data-[state=checked]:border-${borderColorOnChecked}`);
    }
    if (borderTopColor) {
      classNames.push(`data-[state=checked]:border-t-${borderColorOnChecked}`);
    }
    if (borderBottomColor) {
      classNames.push(`data-[state=checked]:border-b-${borderColorOnChecked}`);
    }
    if (borderStartColor) {
      classNames.push(`data-[state=checked]:border-s-${borderColorOnChecked}`);
    }
    if (borderEndColor) {
      classNames.push(`data-[state=checked]:border-e-${borderColorOnChecked}`);
    }
  }

  if (borderColorOnFocus) {
    if (borderColor) {
      classNames.push(`focus:border-${borderColorOnFocus}`);
    }
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

  if (borderColorOnHover) {
    if (borderColor) {
      classNames.push(`hover:border-${borderColorOnHover}`);
    }
    if (borderTopColor) {
      classNames.push(`hover:border-t-${borderColorOnHover}`);
    }
    if (borderBottomColor) {
      classNames.push(`hover:border-b-${borderColorOnHover}`);
    }
    if (borderStartColor) {
      classNames.push(`hover:border-s-${borderColorOnHover}`);
    }
    if (borderEndColor) {
      classNames.push(`hover:border-e-${borderColorOnHover}`);
    }
  }

  if (borderColorOnActive) {
    if (borderColor) {
      classNames.push(`active:border-${borderColorOnActive}`);
    }
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

  if (borderColor) {
    classNames.push(`border-${borderColor}`);
  }

  if (borderVerticalColor) {
    classNames.push(`border-y-${borderVerticalColor}`);
  }

  if (borderHorizontalColor) {
    classNames.push(`border-x-${borderHorizontalColor}`);
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

  if (borderRadius) {
    classNames.push(`rounded-${borderRadius}`);
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

  if (height) {
    const classNameToAdd =
      typeof height === 'number' ? `h-[${height}px]` : `h-${height}`;
    classNames.push(classNameToAdd);
  }

  if (minHeight) {
    const classNameToAdd =
      typeof minHeight === 'number'
        ? `min-h-[${minHeight}px]`
        : `min-h-${minHeight}`;
    classNames.push(classNameToAdd);
  }

  if (maxHeight) {
    const classNameToAdd =
      typeof maxHeight === 'number'
        ? `max-h-[${maxHeight}px]`
        : `max-h-${maxHeight}`;
    classNames.push(classNameToAdd);
  }
  if (width) {
    const classNameToAdd =
      typeof width === 'number' ? `w-[${width}px]` : `w-${width}`;
    classNames.push(classNameToAdd);
  }

  if (minWidth) {
    const classNameToAdd =
      typeof minWidth === 'number'
        ? `min-w-[${minWidth}px]`
        : `min-w-${minWidth}`;
    classNames.push(classNameToAdd);
  }

  if (maxWidth) {
    const classNameToAdd =
      typeof maxWidth === 'number'
        ? `max-w-[${maxWidth}px]`
        : `max-w-${maxWidth}`;
    classNames.push(classNameToAdd);
  }

  if (overflow) {
    classNames.push(`overflow-${overflow}`);
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

  if (direction) {
    const classNameToAdd = {
      horizontal: 'flex-row',
      vertical: 'flex-col',
      'horizontal-reverse': 'flex-row-reverse',
      'vertical-reverse': 'flex-col-reverse',
    }[direction];
    classNames.push(classNameToAdd);
  }

  if (grow !== undefined) {
    if (grow === false) {
      classNames.push('grow-0');
    } else {
      classNames.push('grow');
    }
  }

  if (shrink !== undefined) {
    if (shrink === false) {
      classNames.push('shrink-0');
    } else {
      classNames.push('shrink');
    }
  }
  if (wrap) {
    classNames.push('flex-wrap');
  }

  if (justifyContent) {
    classNames.push(`justify-${justifyContent}`);
  }

  if (alignItems) {
    classNames.push(`items-${alignItems}`);
  }

  if (alignContent) {
    classNames.push(`content-${alignContent}`);
  }

  if (iconSize) {
    classNames.push(`icon-size-${iconSize}`);
  }
  if (avatarSize) {
    classNames.push(`avatar-size-${avatarSize}`);
  }

  return twMerge(clsx(classNames, className));
};

export const cx = clsx;
