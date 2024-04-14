import type {
  AvatarProps,
  BoxProps,
  HStackProps,
  IconProps,
  TextInputProps,
  TextProps,
  VStackProps,
} from './components';
import fixtures from './fixtures';
import type { StyleProps } from './types';

export interface GetStylesParams extends StyleProps {
  className?: string;
}

const isCustomSpacing = (value: unknown) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  !fixtures.spacingAlias.includes(value as any);
const isCustomColor = (value: unknown) =>
  !fixtures.allColorNames.includes(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    value as any,
  );
const isCustomHeight = (value: unknown) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  !fixtures.height.includes(value as any);
const isCustomWidth = (value: unknown) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  !fixtures.width.includes(value as any);
const isCustomTextSize = (value: unknown) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  !fixtures.fontSize.includes(value as any);
const isCustomBorderRadius = (value: unknown) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  !fixtures.borderRadius.includes(value as any);
const isCustomBorderWidth = (value: unknown) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  !fixtures.borderWidth.includes(value as any);
const isCustomIconSize = (value: unknown) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  !fixtures.iconSize.includes(value as any);
const isCustomAvatarSize = (value: unknown) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  !fixtures.avatarSize.includes(value as any);

function addClassname(
  prefix: string,
  value: unknown,
  classNames: Set<string>,
  isCustomCheck: (val: unknown) => boolean,
) {
  let classname = value;

  const isCustomClassname = isCustomCheck(value);

  if (isCustomClassname) {
    if (typeof value === 'number') {
      classname = `[${value}px]`;
    } else {
      classname = `[${value}]`;
    }
  }
  classNames.add(`${prefix}-${classname}`);
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
    addClassname('color', color, classNames, isCustomColor);
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
    addClassname('fontSize', fontSize, classNames, isCustomTextSize);
  }

  if (fontWeight) {
    classNames.add(`fontWeight-${fontWeight}`);
  }
  if (lineHeight) {
    addClassname('lineHeight', lineHeight, classNames, isCustomTextSize);
  }
  if (textAlign) {
    classNames.add(`textAlign-${textAlign}`);
  }
  if (textTransform) {
    classNames.add(`textTransform-${textTransform}`);
  }

  if (spacing) {
    addClassname('spacing', spacing, classNames, isCustomSpacing);
  }

  if (spacingX) {
    addClassname('spacingX', spacingX, classNames, isCustomSpacing);
  }

  if (spacingY) {
    addClassname('spacingY', spacingY, classNames, isCustomSpacing);
  }

  if (spacingTop) {
    addClassname('spacingTop', spacingTop, classNames, isCustomSpacing);
  }

  if (spacingBottom) {
    addClassname('spacingBottom', spacingBottom, classNames, isCustomSpacing);
  }

  if (spacingStart) {
    addClassname('spacingStart', spacingStart, classNames, isCustomSpacing);
  }

  if (spacingEnd) {
    addClassname('spacingEnd', spacingEnd, classNames, isCustomSpacing);
  }

  if (offset) {
    addClassname('offset', offset, classNames, isCustomSpacing);
  }

  if (offsetY) {
    addClassname('offsetY', offsetY, classNames, isCustomSpacing);
  }
  if (offsetX) {
    addClassname('offsetX', offsetX, classNames, isCustomSpacing);
  }

  if (offsetTop) {
    addClassname('offsetTop', offsetTop, classNames, isCustomSpacing);
  }

  if (offsetBottom) {
    addClassname('offsetBottom', offsetBottom, classNames, isCustomSpacing);
  }

  if (offsetStart) {
    addClassname('offsetStart', offsetStart, classNames, isCustomSpacing);
  }

  if (offsetEnd) {
    addClassname('offsetEnd', offsetEnd, classNames, isCustomSpacing);
  }

  if (gapX) {
    addClassname('gapX', gapX, classNames, isCustomSpacing);
  }

  if (gapY) {
    addClassname('gapY', gapY, classNames, isCustomSpacing);
  }

  if (backgroundColor) {
    addClassname('backgroundColor', backgroundColor, classNames, isCustomColor);
  }

  if (backgroundColorOnActive) {
    addClassname(
      'backgroundColorOnActive',
      backgroundColorOnActive,
      classNames,
      isCustomColor,
    );
  }

  if (backgroundColorOnFocus) {
    addClassname(
      'backgroundColorOnFocus',
      backgroundColorOnFocus,
      classNames,
      isCustomColor,
    );
  }

  if (backgroundColorOnHover) {
    addClassname(
      'backgroundColorOnHover',
      backgroundColorOnHover,
      classNames,
      isCustomColor,
    );
  }

  if (backgroundColorOnChecked) {
    addClassname(
      'backgroundColorOnChecked',
      backgroundColorOnChecked,
      classNames,
      isCustomColor,
    );
  }

  if (borderColorOnActive) {
    const isCustomColor = !fixtures.allColorNames.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      borderColorOnActive as any,
    );
    let classname = '';

    if (borderColor) {
      classname = 'borderColorOnActive';
    }
    if (borderTopColor) {
      classname = 'borderColorOnActive-t';
    }
    if (borderBottomColor) {
      classname = 'borderColorOnActive-b';
    }
    if (borderStartColor) {
      classname = 'borderColorOnActive-s';
    }
    if (borderEndColor) {
      classname = 'borderColorOnActive-e';
    }

    if (isCustomColor) {
      classname = `${classname}-[${borderColorOnActive}]`;
    } else {
      classname = `${classname}-${borderColorOnActive}`;
    }
    classNames.add(classname);
  }

  if (borderColorOnChecked) {
    const isCustomColor = !fixtures.allColorNames.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      borderColorOnChecked as any,
    );
    let classname = '';

    if (borderColor) {
      classname = 'borderColorOnChecked';
    }
    if (borderTopColor) {
      classname = 'borderColorOnChecked-t';
    }
    if (borderBottomColor) {
      classname = 'borderColorOnChecked-b';
    }
    if (borderStartColor) {
      classname = 'borderColorOnChecked-s';
    }
    if (borderEndColor) {
      classname = 'borderColorOnChecked-e';
    }

    if (isCustomColor) {
      classname = `${classname}-[${borderColorOnChecked}]`;
    } else {
      classname = `${classname}-${borderColorOnChecked}`;
    }
    classNames.add(classname);
  }

  if (borderColorOnFocus) {
    const isCustomColor = !fixtures.allColorNames.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      borderColorOnFocus as any,
    );
    let classname = '';

    if (borderColor) {
      classname = 'borderColorOnFocus';
    }
    if (borderTopColor) {
      classname = 'borderColorOnFocus-t';
    }
    if (borderBottomColor) {
      classname = 'borderColorOnFocus-b';
    }
    if (borderStartColor) {
      classname = 'borderColorOnFocus-s';
    }
    if (borderEndColor) {
      classname = 'borderColorOnFocus-e';
    }

    if (isCustomColor) {
      classname = `${classname}-[${borderColorOnFocus}]`;
    } else {
      classname = `${classname}-${borderColorOnFocus}`;
    }
    classNames.add(classname);
  }

  if (borderColorOnHover) {
    const isCustomColor = !fixtures.allColorNames.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      borderColorOnHover as any,
    );
    let classname = '';

    if (borderColor) {
      classname = 'borderColorOnHover';
    }
    if (borderTopColor) {
      classname = 'borderColorOnHover-t';
    }
    if (borderBottomColor) {
      classname = 'borderColorOnHover-b';
    }
    if (borderStartColor) {
      classname = 'borderColorOnHover-s';
    }
    if (borderEndColor) {
      classname = 'borderColorOnHover-e';
    }

    if (isCustomColor) {
      classname = `${classname}-[${borderColorOnHover}]`;
    } else {
      classname = `${classname}-${borderColorOnHover}`;
    }
    classNames.add(classname);
  }

  if (borderColorOnActive) {
    const isCustomColor = !fixtures.allColorNames.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      borderColorOnActive as any,
    );
    let classname = '';

    if (borderColor) {
      classname = 'borderColorOnActive';
    }
    if (borderTopColor) {
      classname = 'borderColorOnActive-t';
    }
    if (borderBottomColor) {
      classname = 'borderColorOnActive-b';
    }
    if (borderStartColor) {
      classname = 'borderColorOnActive-s';
    }
    if (borderEndColor) {
      classname = 'borderColorOnActive-e';
    }

    if (isCustomColor) {
      classname = `${classname}-[${borderColorOnActive}]`;
    } else {
      classname = `${classname}-${borderColorOnActive}`;
    }
    classNames.add(classname);
  }

  if (borderColorOnFocus) {
    const isCustomColor = !fixtures.allColorNames.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      borderColorOnFocus as any,
    );
    let classname = '';

    if (borderColor) {
      classname = 'borderColorOnFocus';
    }
    if (borderTopColor) {
      classname = 'borderColorOnFocus-t';
    }
    if (borderBottomColor) {
      classname = 'borderColorOnFocus-b';
    }
    if (borderStartColor) {
      classname = 'borderColorOnFocus-s';
    }
    if (borderEndColor) {
      classname = 'borderColorOnFocus-e';
    }

    if (isCustomColor) {
      classname = `${classname}-[${borderColorOnFocus}]`;
    } else {
      classname = `${classname}-${borderColorOnFocus}`;
    }
    classNames.add(classname);
  }

  if (borderColor) {
    addClassname('borderColor', borderColor, classNames, isCustomColor);
  }

  if (borderYColor) {
    addClassname('borderYColor', borderYColor, classNames, isCustomColor);
  }

  if (borderXColor) {
    addClassname('borderXColor', borderXColor, classNames, isCustomColor);
  }

  if (borderTopColor) {
    addClassname('borderTopColor', borderTopColor, classNames, isCustomColor);
  }

  if (borderBottomColor) {
    addClassname(
      'borderBottomColor',
      borderBottomColor,
      classNames,
      isCustomColor,
    );
  }

  if (borderStartColor) {
    addClassname(
      'borderStartColor',
      borderStartColor,
      classNames,
      isCustomColor,
    );
  }

  if (borderEndColor) {
    addClassname('borderEndColor', borderEndColor, classNames, isCustomColor);
  }

  if (borderRadius) {
    addClassname(
      'borderRadius',
      borderRadius,
      classNames,
      isCustomBorderRadius,
    );
  }
  if (borderTopRadius) {
    addClassname(
      'borderTopRadius',
      borderTopRadius,
      classNames,
      isCustomBorderRadius,
    );
  }

  if (borderBottomRadius) {
    addClassname(
      'borderBottomRadius',
      borderBottomRadius,
      classNames,
      isCustomBorderRadius,
    );
  }

  if (borderStartRadius) {
    addClassname(
      'borderStartRadius',
      borderStartRadius,
      classNames,
      isCustomBorderRadius,
    );
  }

  if (borderEndRadius) {
    addClassname(
      'borderEndRadius',
      borderEndRadius,
      classNames,
      isCustomBorderRadius,
    );
  }

  if (borderTopStartRadius) {
    addClassname(
      'borderTopStartRadius',
      borderTopStartRadius,
      classNames,
      isCustomBorderRadius,
    );
  }

  if (borderTopEndRadius) {
    addClassname(
      'borderTopEndRadius',
      borderTopEndRadius,
      classNames,
      isCustomBorderRadius,
    );
  }

  if (borderBottomStartRadius) {
    addClassname(
      'borderBottomStartRadius',
      borderBottomStartRadius,
      classNames,
      isCustomBorderRadius,
    );
  }

  if (borderBottomEndRadius) {
    addClassname(
      'borderBottomEndRadius',
      borderBottomEndRadius,
      classNames,
      isCustomBorderRadius,
    );
  }

  if (borderWidth) {
    addClassname('borderWidth', borderWidth, classNames, isCustomBorderWidth);
  }

  if (borderYWidth) {
    addClassname('borderYWidth', borderYWidth, classNames, isCustomBorderWidth);
  }

  if (borderXWidth) {
    addClassname('borderXWidth', borderXWidth, classNames, isCustomBorderWidth);
  }

  if (borderStartWidth) {
    addClassname(
      'borderStartWidth',
      borderStartWidth,
      classNames,
      isCustomBorderWidth,
    );
  }

  if (borderEndWidth) {
    addClassname(
      'borderEndWidth',
      borderEndWidth,
      classNames,
      isCustomBorderWidth,
    );
  }

  if (borderTopWidth) {
    addClassname(
      'borderTopWidth',
      borderTopWidth,
      classNames,
      isCustomBorderWidth,
    );
  }

  if (borderBottomWidth) {
    addClassname(
      'borderBottomWidth',
      borderBottomWidth,
      classNames,
      isCustomBorderWidth,
    );
  }

  if (height) {
    addClassname('height', height, classNames, isCustomHeight);
  }

  if (minHeight) {
    addClassname('minHeight', minHeight, classNames, isCustomHeight);
  }

  if (maxHeight) {
    addClassname('maxHeight', maxHeight, classNames, isCustomHeight);
  }

  if (width) {
    addClassname('width', width, classNames, isCustomWidth);
  }

  if (minWidth) {
    addClassname('minWidth', minWidth, classNames, isCustomWidth);
  }

  if (maxWidth) {
    addClassname('maxWidth', maxWidth, classNames, isCustomWidth);
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
    addClassname('iconSize', iconSize, classNames, isCustomIconSize);
  }
  if (avatarSize) {
    addClassname('avatarSize', avatarSize, classNames, isCustomAvatarSize);
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
