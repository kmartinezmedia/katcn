import { GetStylesParams, getStyles } from './getStyles';
import type { StyleProps } from './types';
import type { AvatarProps } from './ui/Avatar';
import type { HStackProps } from './ui/HStack';
import type { IconProps } from './ui/Icon';
import type { TextProps } from './ui/Text';
import type { TextInputProps } from './ui/TextInput';
import type { VStackProps } from './ui/VStack';

type StyleProp = keyof StyleProps | 'children' | 'asChild';
type ComponentPropsMap = {
  Avatar: Omit<AvatarProps, StyleProp>;
  Icon: Omit<IconProps, StyleProp>;
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

    case 'HStack': {
      const { gap } = props as ComponentPropsMap['HStack'];
      defaults.horizontalGap = gap;
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
      defaults.spacingVertical = '5';
      defaults.spacingHorizontal = '6';
      defaults.textTransform = variant;
      defaults.width = 'full';
      // @ts-expect-error this is fine
      props.variant = undefined;
      break;
    }

    case 'VStack': {
      const { gap } = props as ComponentPropsMap['VStack'];
      defaults.verticalGap = gap;
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
    spacingHorizontal = defaults?.spacingHorizontal,
    spacingVertical = defaults?.spacingVertical,
    spacingTop = defaults?.spacingTop,
    spacingBottom = defaults?.spacingBottom,
    spacingStart = defaults?.spacingStart,
    spacingEnd = defaults?.spacingEnd,
    offset = defaults?.offset,
    offsetVertical = defaults?.offsetVertical,
    offsetHorizontal = defaults?.offsetHorizontal,
    offsetTop = defaults?.offsetTop,
    offsetBottom = defaults?.offsetBottom,
    offsetStart = defaults?.offsetStart,
    offsetEnd = defaults?.offsetEnd,
    horizontalGap = defaults?.horizontalGap,
    verticalGap = defaults?.verticalGap,
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
    borderVerticalColor = defaults?.borderVerticalColor,
    borderHorizontalColor = defaults?.borderHorizontalColor,
    borderTopColor = defaults?.borderTopColor,
    borderBottomColor = defaults?.borderBottomColor,
    borderStartColor = defaults?.borderStartColor,
    borderEndColor = defaults?.borderEndColor,
    borderRadius = defaults?.borderRadius,
    borderTopStartRadius = defaults?.borderTopStartRadius,
    borderTopEndRadius = defaults?.borderTopEndRadius,
    borderBottomStartRadius = defaults?.borderBottomStartRadius,
    borderBottomEndRadius = defaults?.borderBottomEndRadius,
    borderWidth = defaults?.borderWidth,
    borderVerticalWidth = defaults?.borderVerticalWidth,
    borderHorizontalWidth = defaults?.borderHorizontalWidth,
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
  });

  return finalClassName
    ? { ...otherProps, className: finalClassName }
    : otherProps;
}
