import type {
  AvatarProps,
  BoxProps,
  HStackProps,
  IconProps,
  TextInputProps,
  TextProps,
  VStackProps,
} from './components';
import type { StyleProps } from './types';

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
  spacingX,
  spacingY,
  spacingTop,
  spacingBottom,
  spacingStart,
  spacingEnd,
  offset,
  offsetX,
  offsetY,
  offsetTop,
  offsetBottom,
  offsetStart,
  offsetEnd,
  gapX,
  gapY,
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
  borderXColor,
  borderYColor,
  borderTopColor,
  borderBottomColor,
  borderStartColor,
  borderEndColor,
  borderRadius,
  borderTopRadius,
  borderBottomRadius,
  borderStartRadius,
  borderEndRadius,
  borderTopStartRadius,
  borderTopEndRadius,
  borderBottomStartRadius,
  borderBottomEndRadius,
  borderWidth,
  borderXWidth,
  borderYWidth,
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
  const classNames = new Set<string>();

  if (color) {
    classNames.add(`color-${color}`);
  }
  if (colorChecked) {
    classNames.add(`data-[state=checked]:color-${colorChecked}`);
  }

  if (display) {
    classNames.add(`display-${display}`);
  }

  if (placeholderColor) {
    classNames.add(`placeholder:color-${placeholderColor}`);
  }
  if (fontFamily) {
    classNames.add(`fontFamily-${fontFamily}`);
  }
  if (fontSize) {
    classNames.add(`fontSize-${fontSize}`);
  }
  if (fontWeight) {
    classNames.add(`fontWeight-${fontWeight}`);
  }
  if (lineHeight) {
    classNames.add(`lineHeight-${lineHeight}`);
  }
  if (textAlign) {
    classNames.add(`textAlign-${textAlign}`);
  }
  if (textTransform) {
    classNames.add(`textTransform-${textTransform}`);
  }
  if (spacing) {
    const classNameToAdd =
      typeof spacing === 'number'
        ? `spacing-[${spacing}px]`
        : `spacing-${spacing}`;
    classNames.add(classNameToAdd);
  }
  if (spacingX) {
    const classNameToAdd =
      typeof spacingX === 'number'
        ? `spacingX-[${spacingX}px]`
        : `spacingX-${spacingX}`;
    classNames.add(classNameToAdd);
  }
  if (spacingY) {
    const classNameToAdd =
      typeof spacingY === 'number'
        ? `spacingY-[${spacingY}px]`
        : `spacingY-${spacingY}`;
    classNames.add(classNameToAdd);
  }
  if (spacingTop) {
    const classNameToAdd =
      typeof spacingTop === 'number'
        ? `spacingTop-[${spacingTop}px]`
        : `spacingTop-${spacingTop}`;
    classNames.add(classNameToAdd);
  }
  if (spacingBottom) {
    const classNameToAdd =
      typeof spacingBottom === 'number'
        ? `spacingBottom-[${spacingBottom}px]`
        : `spacingBottom-${spacingBottom}`;
    classNames.add(classNameToAdd);
  }
  if (spacingStart) {
    const classNameToAdd =
      typeof spacingStart === 'number'
        ? `spacingStart-[${spacingStart}px]`
        : `spacingStart-${spacingStart}`;
    classNames.add(classNameToAdd);
  }
  if (spacingEnd) {
    const classNameToAdd =
      typeof spacingEnd === 'number'
        ? `spacingEnd-[${spacingEnd}px]`
        : `spacingEnd-${spacingEnd}`;
    classNames.add(classNameToAdd);
  }
  if (offset) {
    const classNameToAdd =
      typeof offset === 'number' ? `offset-[${offset}px]` : `offset-${offset}`;
    classNames.add(classNameToAdd);
  }
  if (offsetY) {
    const classNameToAdd =
      typeof offsetY === 'number'
        ? `offsetY-[${offsetY}px]`
        : `offsetY-${offsetY}`;
    classNames.add(classNameToAdd);
  }
  if (offsetX) {
    const classNameToAdd =
      typeof offsetX === 'number'
        ? `offsetX-[${offsetX}px]`
        : `offsetX-${offsetX}`;
    classNames.add(classNameToAdd);
  }
  if (offsetTop) {
    const classNameToAdd =
      typeof offsetTop === 'number'
        ? `offsetTop-[${offsetTop}px]`
        : `offsetTop-${offsetTop}`;
    classNames.add(classNameToAdd);
  }
  if (offsetBottom) {
    const classNameToAdd =
      typeof offsetBottom === 'number'
        ? `offsetBottom-[${offsetBottom}px]`
        : `offsetBottom-${offsetBottom}`;
    classNames.add(classNameToAdd);
  }
  if (offsetStart) {
    const classNameToAdd =
      typeof offsetStart === 'number'
        ? `offsetStart-[${offsetStart}px]`
        : `offsetStart-${offsetStart}`;
    classNames.add(classNameToAdd);
  }
  if (offsetEnd) {
    const classNameToAdd =
      typeof offsetEnd === 'number'
        ? `offsetEnd-[${offsetEnd}px]`
        : `offsetEnd-${offsetEnd}`;
    classNames.add(classNameToAdd);
  }
  if (gapX) {
    const classNameToAdd =
      typeof gapX === 'number' ? `gapX-[${gapX}px]` : `gapX-${gapX}`;
    classNames.add(classNameToAdd);
  }
  if (gapY) {
    const classNameToAdd =
      typeof gapY === 'number' ? `gapY-[${gapY}px]` : `gapY-${gapY}`;
    classNames.add(classNameToAdd);
  }
  if (backgroundColor) {
    classNames.add(`backgroundColor-${backgroundColor}`);
  }
  if (backgroundColorOnActive) {
    classNames.add(`backgroundColorOnActive-${backgroundColorOnActive}`);
  }
  if (backgroundColorOnFocus) {
    classNames.add(`backgroundColorOnFocus-${backgroundColorOnFocus}`);
  }
  if (backgroundColorOnHover) {
    classNames.add(`backgroundColorOnHover-${backgroundColorOnHover}`);
  }

  if (backgroundColorOnChecked) {
    classNames.add(`backgroundColorOnChecked:bg-${backgroundColorOnChecked}`);
  }

  if (borderColorOnActive) {
    if (borderColor) {
      classNames.add(`borderColorOnActive-${borderColorOnActive}`);
    }
    if (borderTopColor) {
      classNames.add(`borderColorOnActive-t-${borderColorOnActive}`);
    }
    if (borderBottomColor) {
      classNames.add(`borderColorOnActive-b-${borderColorOnActive}`);
    }
    if (borderStartColor) {
      classNames.add(`borderColorOnActive-s-${borderColorOnActive}`);
    }
    if (borderEndColor) {
      classNames.add(`borderColorOnActive-e-${borderColorOnActive}`);
    }
  }

  if (borderColorOnChecked) {
    if (borderColor) {
      classNames.add(`borderColorOnChecked-${borderColorOnChecked}`);
    }
    if (borderTopColor) {
      classNames.add(`borderColorOnChecked-t-${borderColorOnChecked}`);
    }
    if (borderBottomColor) {
      classNames.add(`borderColorOnChecked-b-${borderColorOnChecked}`);
    }
    if (borderStartColor) {
      classNames.add(`borderColorOnChecked-s-${borderColorOnChecked}`);
    }
    if (borderEndColor) {
      classNames.add(`borderColorOnChecked-e-${borderColorOnChecked}`);
    }
  }

  if (borderColorOnFocus) {
    if (borderColor) {
      classNames.add(`borderColorOnFocus-${borderColorOnFocus}`);
    }
    if (borderTopColor) {
      classNames.add(`borderColorOnFocus-t-${borderColorOnFocus}`);
    }
    if (borderBottomColor) {
      classNames.add(`borderColorOnFocus-b-${borderColorOnFocus}`);
    }
    if (borderStartColor) {
      classNames.add(`borderColorOnFocus-s-${borderColorOnFocus}`);
    }
    if (borderEndColor) {
      classNames.add(`borderColorOnFocus-e-${borderColorOnFocus}`);
    }
  }

  if (borderColorOnHover) {
    if (borderColor) {
      classNames.add(`borderColorOnHover-${borderColorOnHover}`);
    }
    if (borderTopColor) {
      classNames.add(`borderColorOnHover-t-${borderColorOnHover}`);
    }
    if (borderBottomColor) {
      classNames.add(`borderColorOnHover-b-${borderColorOnHover}`);
    }
    if (borderStartColor) {
      classNames.add(`borderColorOnHover-s-${borderColorOnHover}`);
    }
    if (borderEndColor) {
      classNames.add(`borderColorOnHover-e-${borderColorOnHover}`);
    }
  }

  if (borderColorOnActive) {
    if (borderColor) {
      classNames.add(`borderColorOnActive-${borderColorOnActive}`);
    }
    if (borderTopColor) {
      classNames.add(`borderColorOnActive-t-${borderColorOnActive}`);
    }
    if (borderBottomColor) {
      classNames.add(`borderColorOnActive-b-${borderColorOnActive}`);
    }
    if (borderStartColor) {
      classNames.add(`borderColorOnActive-s-${borderColorOnActive}`);
    }
    if (borderEndColor) {
      classNames.add(`borderColorOnActive-e-${borderColorOnActive}`);
    }
  }

  if (borderColorOnFocus) {
    if (borderTopColor) {
      classNames.add(`borderColorOnFocus-t-${borderColorOnFocus}`);
    }
    if (borderBottomColor) {
      classNames.add(`borderColorOnFocus-b-${borderColorOnFocus}`);
    }
    if (borderStartColor) {
      classNames.add(`borderColorOnFocus-s-${borderColorOnFocus}`);
    }
    if (borderEndColor) {
      classNames.add(`borderColorOnFocus-e-${borderColorOnFocus}`);
    }
  }

  if (borderColor) {
    classNames.add(`borderColor-${borderColor}`);
  }

  if (borderYColor) {
    classNames.add(`borderYColor-${borderYColor}`);
  }

  if (borderXColor) {
    classNames.add(`borderXColor-${borderXColor}`);
  }

  if (borderTopColor) {
    classNames.add(`borderTopColor-${borderTopColor}`);
  }

  if (borderBottomColor) {
    classNames.add(`borderBottomColor-${borderBottomColor}`);
  }

  if (borderStartColor) {
    classNames.add(`borderStartColor-${borderStartColor}`);
  }

  if (borderEndColor) {
    classNames.add(`borderEndColor-${borderEndColor}`);
  }

  if (borderRadius) {
    classNames.add(`borderRadius-${borderRadius}`);
  }
  if (borderTopRadius) {
    classNames.add(`borderTopRadius-${borderTopRadius}`);
  }

  if (borderBottomRadius) {
    classNames.add(`borderBottomRadius-${borderBottomRadius}`);
  }

  if (borderStartRadius) {
    classNames.add(`borderStartRadius-${borderStartRadius}`);
  }

  if (borderEndRadius) {
    classNames.add(`borderEndRadius-${borderEndRadius}`);
  }

  if (borderTopStartRadius) {
    classNames.add(`borderTopStartRadius-${borderTopStartRadius}`);
  }

  if (borderTopEndRadius) {
    classNames.add(`borderTopEndRadius-${borderTopEndRadius}`);
  }

  if (borderBottomStartRadius) {
    classNames.add(`borderBottomStartRadius-${borderBottomStartRadius}`);
  }

  if (borderBottomEndRadius) {
    classNames.add(`borderBottomEndRadius-${borderBottomEndRadius}`);
  }

  if (borderWidth) {
    classNames.add(`borderWidth-${borderWidth}`);
  }

  if (borderYWidth) {
    classNames.add(`borderYWidth-${borderYWidth}`);
  }

  if (borderXWidth) {
    classNames.add(`borderXWidth-${borderXWidth}`);
  }

  if (borderStartWidth) {
    classNames.add(`borderStartWidth-${borderStartWidth}`);
  }

  if (borderEndWidth) {
    classNames.add(`borderEndWidth-${borderEndWidth}`);
  }

  if (borderTopWidth) {
    classNames.add(`borderTopWidth-${borderTopWidth}`);
  }

  if (borderBottomWidth) {
    classNames.add(`borderBottomWidth-${borderBottomWidth}`);
  }

  if (height) {
    const classNameToAdd =
      typeof height === 'number' ? `height-[${height}px]` : `height-${height}`;
    classNames.add(classNameToAdd);
  }

  if (minHeight) {
    const classNameToAdd =
      typeof minHeight === 'number'
        ? `minHeight-[${minHeight}px]`
        : `minHeight-${minHeight}`;
    classNames.add(classNameToAdd);
  }

  if (maxHeight) {
    const classNameToAdd =
      typeof maxHeight === 'number'
        ? `maxHeight-[${maxHeight}px]`
        : `maxHeight-${maxHeight}`;
    classNames.add(classNameToAdd);
  }
  if (width) {
    const classNameToAdd =
      typeof width === 'number' ? `width-[${width}px]` : `width-${width}`;
    classNames.add(classNameToAdd);
  }

  if (minWidth) {
    const classNameToAdd =
      typeof minWidth === 'number'
        ? `minWidth-[${minWidth}px]`
        : `minWidth-${minWidth}`;
    classNames.add(classNameToAdd);
  }

  if (maxWidth) {
    const classNameToAdd =
      typeof maxWidth === 'number'
        ? `maxWidth-[${maxWidth}px]`
        : `maxWidth-${maxWidth}`;
    classNames.add(classNameToAdd);
  }

  if (overflow) {
    classNames.add(`overflow-${overflow}`);
  }

  if (overflowX) {
    classNames.add(`overflowX-${overflowX}`);
  }
  if (overflowY) {
    classNames.add(`overflowY-${overflowY}`);
  }
  if (position) {
    classNames.add(`position-${position}`);
  }
  if (zIndex) {
    classNames.add(`zIndex-${zIndex}`);
  }
  if (opacity) {
    classNames.add(`opacity-${opacity}`);
  }
  if (contentFit) {
    classNames.add(`contentFit-${contentFit}`);
  }

  if (direction) {
    classNames.add(`flexDirection-${direction}`);
  }

  if (grow !== undefined) {
    classNames.add(`grow-${grow}`);
  }

  if (shrink !== undefined) {
    classNames.add(`shrink-${shrink}`);
  }
  if (wrap) {
    classNames.add(`wrap-${wrap}`);
  }

  if (justifyContent) {
    classNames.add(`justifyContent-${justifyContent}`);
  }

  if (alignItems) {
    classNames.add(`alignItems-${alignItems}`);
  }

  if (alignContent) {
    classNames.add(`alignContent-${alignContent}`);
  }

  if (iconSize) {
    classNames.add(`iconSize-${iconSize}`);
  }
  if (avatarSize) {
    classNames.add(`avatarSize-${avatarSize}`);
  }

  if (className) {
    classNames.add(className);
  }

  return Array.from(classNames).join(' ');
};

type StyleProp = keyof StyleProps | 'children' | 'asChild';
type ComponentPropsMap = {
  Avatar: Omit<AvatarProps, StyleProp>;
  Icon: Omit<IconProps, StyleProp>;
  Box: BoxProps;
  HStack: Omit<HStackProps, StyleProp>;
  VStack: Omit<VStackProps, StyleProp>;
  Text: Omit<TextProps, StyleProp>;
  TextInput: Omit<TextInputProps, StyleProp>;
};

export function extractStyleProps(
  _props: GetStylesParams,
  componentName?: string,
): Record<string, unknown> & { className?: string } {
  const props = { ..._props };
  const defaults = {} as StyleProps;

  switch (componentName) {
    case 'Avatar': {
      const { size, shape } = props as ComponentPropsMap['Avatar'];
      defaults.avatarSize = size;
      defaults.borderRadius = shape;
      // @ts-expect-error this is fine
      props.size = undefined;
      // @ts-expect-error this is fine
      props.shape = undefined;
      break;
    }

    case 'Icon': {
      const { size } = props as ComponentPropsMap['Icon'];
      defaults.iconSize = size;
      defaults.color = 'primary';
      defaults.fontFamily = 'icons';
      // @ts-expect-error this is fine
      props.size = undefined;
      break;
    }

    case 'Box': {
      defaults.display = 'flex';
      break;
    }

    case 'HStack': {
      const { gap } = props as ComponentPropsMap['HStack'];
      defaults.display = 'flex';
      defaults.direction = 'horizontal';
      if (gap) {
        defaults.gapX = gap;
      }
      // @ts-expect-error this is fine
      props.gap = undefined;
      break;
    }

    case 'Text': {
      const { variant } = props as ComponentPropsMap['Text'];
      defaults.fontFamily = variant;
      defaults.fontSize = variant;
      defaults.fontWeight = variant;
      defaults.lineHeight = variant;
      defaults.textTransform = variant;
      defaults.color = 'primary';
      // @ts-expect-error this is fine
      props.variant = undefined;
      break;
    }

    case 'TextInput': {
      const { variant = 'body1', disabled } =
        props as ComponentPropsMap['TextInput'];
      defaults.backgroundColor = disabled ? 'secondary' : 'primary';
      defaults.borderColor = disabled ? 'secondary' : 'primary';
      defaults.borderRadius = 'md';
      defaults.color = 'primary';
      defaults.fontFamily = variant;
      defaults.fontSize = variant;
      defaults.fontWeight = variant;
      defaults.lineHeight = variant;
      defaults.placeholderColor = 'tertiary';
      defaults.spacingY = '3';
      defaults.spacingX = '4';
      defaults.textTransform = variant;
      defaults.width = 'full';
      // @ts-expect-error this is fine
      props.variant = undefined;
      break;
    }

    case 'VStack': {
      const { gap } = props as ComponentPropsMap['VStack'];
      defaults.display = 'flex';
      defaults.direction = 'vertical';
      if (gap) {
        defaults.gapY = gap;
      }
      // @ts-expect-error this is fine
      props.gap = undefined;
      break;
    }

    default:
      break;
  }

  const {
    color = defaults?.color,
    colorChecked = defaults?.colorChecked,
    display = defaults?.display,
    placeholderColor = defaults?.placeholderColor,
    fontFamily = defaults?.fontFamily,
    fontSize = defaults?.fontSize,
    fontWeight = defaults?.fontWeight,
    lineHeight = defaults?.lineHeight,
    textTransform = defaults?.textTransform,
    textAlign = defaults?.textAlign,
    spacing = defaults?.spacing,
    spacingX = defaults?.spacingX,
    spacingY = defaults?.spacingY,
    spacingTop = defaults?.spacingTop,
    spacingBottom = defaults?.spacingBottom,
    spacingStart = defaults?.spacingStart,
    spacingEnd = defaults?.spacingEnd,
    offset = defaults?.offset,
    offsetY = defaults?.offsetY,
    offsetX = defaults?.offsetX,
    offsetTop = defaults?.offsetTop,
    offsetBottom = defaults?.offsetBottom,
    offsetStart = defaults?.offsetStart,
    offsetEnd = defaults?.offsetEnd,
    gapX = defaults?.gapX,
    gapY = defaults?.gapY,
    direction = defaults?.direction,
    grow = defaults?.grow,
    shrink = defaults?.shrink,
    wrap = defaults?.wrap,
    justifyContent = defaults?.justifyContent,
    alignItems = defaults?.alignItems,
    alignContent = defaults?.alignContent,
    backgroundColor = defaults?.backgroundColor,
    backgroundColorOnActive = defaults?.backgroundColorOnActive,
    backgroundColorOnFocus = defaults?.backgroundColorOnFocus,
    backgroundColorOnHover = defaults?.backgroundColorOnHover,
    backgroundColorOnChecked = defaults?.backgroundColorOnChecked,
    borderColor = defaults?.borderColor,
    borderColorOnActive = defaults?.borderColorOnActive,
    borderColorOnChecked = defaults?.borderColorOnChecked,
    borderColorOnFocus = defaults?.borderColorOnFocus,
    borderColorOnHover = defaults?.borderColorOnHover,
    borderYColor = defaults?.borderYColor,
    borderXColor = defaults?.borderXColor,
    borderTopColor = defaults?.borderTopColor,
    borderBottomColor = defaults?.borderBottomColor,
    borderStartColor = defaults?.borderStartColor,
    borderEndColor = defaults?.borderEndColor,
    borderRadius = defaults?.borderRadius,
    borderTopRadius = defaults?.borderTopRadius,
    borderBottomRadius = defaults?.borderBottomRadius,
    borderStartRadius = defaults?.borderStartRadius,
    borderEndRadius = defaults?.borderEndRadius,
    borderTopStartRadius = defaults?.borderTopStartRadius,
    borderTopEndRadius = defaults?.borderTopEndRadius,
    borderBottomStartRadius = defaults?.borderBottomStartRadius,
    borderBottomEndRadius = defaults?.borderBottomEndRadius,
    borderWidth = defaults?.borderWidth,
    borderYWidth = defaults?.borderYWidth,
    borderXWidth = defaults?.borderXWidth,
    borderStartWidth = defaults?.borderStartWidth,
    borderEndWidth = defaults?.borderEndWidth,
    borderTopWidth = defaults?.borderTopWidth,
    borderBottomWidth = defaults?.borderBottomWidth,
    height = defaults?.height,
    minHeight = defaults?.minHeight,
    maxHeight = defaults?.maxHeight,
    width = defaults?.width,
    minWidth = defaults?.minWidth,
    maxWidth = defaults?.maxWidth,
    overflow = defaults?.overflow,
    overflowX = defaults?.overflowX,
    overflowY = defaults?.overflowY,
    position = defaults?.position,
    zIndex = defaults?.zIndex,
    opacity = defaults?.opacity,
    contentFit = defaults?.contentFit,
    iconSize = defaults?.iconSize,
    avatarSize = defaults?.avatarSize,
    className,
    ...otherProps
  } = props;

  const finalClassName = getStyles({
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
    spacingX,
    spacingY,
    spacingTop,
    spacingBottom,
    spacingStart,
    spacingEnd,
    offset,
    offsetY,
    offsetX,
    offsetTop,
    offsetBottom,
    offsetStart,
    offsetEnd,
    gapX,
    gapY,
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
    borderYColor,
    borderXColor,
    borderTopColor,
    borderBottomColor,
    borderStartColor,
    borderEndColor,
    borderRadius,
    borderTopRadius,
    borderBottomRadius,
    borderStartRadius,
    borderEndRadius,
    borderTopStartRadius,
    borderTopEndRadius,
    borderBottomStartRadius,
    borderBottomEndRadius,
    borderWidth,
    borderYWidth,
    borderXWidth,
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

  return finalClassName
    ? { ...otherProps, className: finalClassName }
    : otherProps;
}
