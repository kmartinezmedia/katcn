import type { PropsWithChildren } from 'react';
import type { IconName } from '../icons/types';
import type {
  AlignContent,
  AlignItems,
  AvatarSize,
  BackgroundColor,
  BackgroundPaletteAlias,
  BorderRadius,
  BorderWidth,
  CorePaletteAlias,
  Display,
  FlexDirection,
  FontFamilyGlobalAlias,
  FontWeightDescriptive,
  ForegroundColor,
  Height,
  IconSize,
  JustifyContent,
  LineColor,
  MaxHeight,
  MaxWidth,
  MinHeight,
  MinWidth,
  Opacity,
  Overflow,
  Position,
  SpacingAlias,
  TextTransform,
  TextVariant,
  Width,
  ZIndex,
} from './tokenTypes';

/* -------------------------------------------------------------------------- */
/*                                 STYLE PROPS                                */
/* -------------------------------------------------------------------------- */
type ImageStyleProps = {
  /**
   * Determines how the image should be resized to fit its container.
   */
  contentFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
};

interface BorderStyleProps {
  /** Add a border radius to all corners of the box. */
  borderRadius?: BorderRadius;
  /** Add a border radius to top left corner of the box. */
  borderTopStartRadius?: BorderRadius;
  /** Add a border radius to top right corner of the box. */
  borderTopEndRadius?: BorderRadius;
  /** Add a border radius to bottom left corner of the box. */
  borderBottomStartRadius?: BorderRadius;
  /** Add a border radius to bottom right corner of the box. */
  borderBottomEndRadius?: BorderRadius;
  /** Adds a custom border color from the palette */
  borderColor?: LineColor;
  /** Adds a custom border color vertically from the palette */
  borderVerticalColor?: LineColor;
  /** Adds a custom border color horizontally from the palette */
  borderHorizontalColor?: LineColor;
  /** Adds a custom start border color from the palette */
  borderStartColor?: LineColor;
  /** Adds a custom end border color from the palette */
  borderEndColor?: LineColor;
  /** Adds a custom top border color from the palette */
  borderTopColor?: LineColor;
  /** Adds a custom bottom border color from the palette */
  borderBottomColor?: LineColor;
  /** Utility for controlling an element's border color on active. */
  borderColorOnActive?: LineColor;
  /** Utility for controlling an element's border color on focus. */
  borderColorOnFocus?: LineColor;
  /** Utility for controlling an element's border color on checked. */
  borderColorOnChecked?: LineColor;
  /** Utility for controlling an element's border color on hover. */
  borderColorOnHover?: LineColor;
  /** Shorthand property to the width of an element's border. */
  borderWidth?: BorderWidth;
  /** Sets the width of the top and bottom border of an element. */
  borderVerticalWidth?: BorderWidth;
  /** Sets the width of the start (left) and end (right) border of an element. */
  borderHorizontalWidth?: BorderWidth;
  /** Sets the width of the start (left) border of an element. */
  borderStartWidth?: BorderWidth;
  /** Sets the width of the end (right) border of an element. */
  borderEndWidth?: BorderWidth;
  /** Sets the width of the top border of an element. */
  borderTopWidth?: BorderWidth;
  /** Sets the width of the bottom border of an element. */
  borderBottomWidth?: BorderWidth;
}

interface LayoutStyleProps {
  /** Sets whether an element is treated as a block or inline box and the layout used for its children, such as flow layout, grid or flex. */
  display?: Display;
  /** Sets the z-order of a positioned element and its descendants or flex and grid items. Overlapping elements with a larger z-index cover those with a smaller one. */
  zIndex?: ZIndex;
  /** Shorthand property which sets the desired behavior when content does not fit in the parent element box (overflows) in the horizontal and/or vertical direction. */
  overflow?: Overflow;
  /** Sets what shows when content overflows a block-level element's left and right edges. This may be nothing, a scroll bar, or the overflow content. This property may also be set by using the overflow shorthand property. */
  overflowX?: Overflow;
  /** sets what shows when content overflows a block-level element's top and bottom edges. This may be nothing, a scroll bar, or the overflow content. This property may also be set by using the overflow shorthand property. */
  overflowY?: Overflow;
  /** Sets how an element is positioned in a document. The top, right, bottom, and left properties determine the final location of positioned elements. */
  position?: Position;
}

interface SpacingStyleProps {
  /** Apply inner spacing on all sides. */
  spacing?: SpacingAlias;
  /** Apply inner spacing on the leading and trailing sides. */
  spacingHorizontal?: SpacingAlias;
  /** Apply inner spacing on the top and bottom sides. */
  spacingVertical?: SpacingAlias;
  /** Apply inner spacing on the bottom side. */
  spacingBottom?: SpacingAlias;
  /** Apply inner spacing on the trailing side. */
  spacingEnd?: SpacingAlias;
  /** Apply inner spacing on the leading side. */
  spacingStart?: SpacingAlias;
  /** Apply inner spacing on the top side. */
  spacingTop?: SpacingAlias;
  /** Apply negative outer spacing on all sides. */
  offset?: SpacingAlias;
  /** Apply negative outer spacing on the top and bottom sides. */
  offsetVertical?: SpacingAlias;
  /** Apply negative outer spacing on the leading and trailing sides. */
  offsetHorizontal?: SpacingAlias;
  /** Apply negative outer spacing on the bottom side. */
  offsetBottom?: SpacingAlias;
  /** Apply negative outer spacing on the trailing side. */
  offsetEnd?: SpacingAlias;
  /** Apply negative outer spacing on the leading side. */
  offsetStart?: SpacingAlias;
  /** Apply negative outer spacing on the top side. */
  offsetTop?: SpacingAlias;
  /** Control the horizontal gutters between grid and flexbox items. If set to auto, will add an equal space between items. */
  horizontalGap?: SpacingAlias;
  /** Control the vertical gutters between grid and flexbox items. If set to auto, will add an equal space between items. */
  verticalGap?: SpacingAlias;
}

interface FlexStyleProps {
  /** Sets how flex items are placed in the flex container defining the main axis and the direction (normal or reversed). */
  direction?: FlexDirection;
  /** Sets the flex grow factor, which specifies how much of the flex container's remaining space should be assigned to the flex item's main size. */
  grow?: boolean;
  /** Sets the flex shrink factor of a flex item. If the size of all flex items is larger than the flex container, items shrink to fit according to flex-shrink. */
  shrink?: boolean;
  /** Sets whether flex items are forced onto one line or can wrap onto multiple lines. If wrapping is allowed, it sets the direction that lines are stacked. */
  wrap?: boolean;
  /** Defines how the browser distributes space between and around content items along the main-axis of a flex container, and the inline axis of a grid container. */
  justifyContent?: JustifyContent;
  /** Sets the align-self value on all direct children as a group. In Flexbox, it controls the alignment of items on the Cross Axis. In Grid Layout, it controls the alignment of items on the Block Axis within their grid area. */
  alignItems?: AlignItems;
  /** Sets the distribution of space between and around content items along a flexbox's cross-axis or a grid's block axis. */
  alignContent?: AlignContent;
}

interface OpacityStyleProps {
  opacity?: Opacity;
}

interface SizingStyleProps {
  /** Sets the height of an element */
  height?: Height;
  /** Sets the height of an element */
  minHeight?: MinHeight;
  /** Sets the maximum height of an element */
  maxHeight?: MaxHeight;
  /** Sets the width of an element */
  width?: Width;
  /** Sets the minimum width of an element */
  minWidth?: MinWidth;
  /** Sets the maximum width of an element */
  maxWidth?: MaxWidth;
}

interface StateStyleProps {
  interactable?: boolean;
  focusable?: boolean;
}

interface TextStyleProps {
  /** Utility for controlling the color of a Text or Icon element */
  color?: ForegroundColor;
  /** Utility for controlling the color of a Text or Icon element when checked */
  colorChecked?: ForegroundColor;
  /** Utility for controlling the color of a placeholder element */
  placeholderColor?: ForegroundColor;
  /** Utility for controlling the font family of a Text element */
  fontFamily?: TextVariant | FontFamilyGlobalAlias;
  /** Utility for controlling the font size of a Text element */
  fontSize?: TextVariant;
  /** Utility for controlling the font weight of a Text element */
  fontWeight?: TextVariant | FontWeightDescriptive;
  /** Utility for controlling the line height of a Text element */
  lineHeight?: TextVariant;
  /** Utility for controlling the text alignment of a Text element */
  textAlign?: 'center' | 'justify' | 'start' | 'end';
  /** Utility for controlling the text transformation of a Text element */
  textTransform?: TextVariant | TextTransform;
}

interface BackgroundStyleProps {
  /** Utility for controlling an element's background color. */
  backgroundColor?: BackgroundColor;
  /** Utility for controlling an element's background color on active. */
  backgroundColorOnActive?: BackgroundColor;
  /** Utility for controlling an element's background color on focus. */
  backgroundColorOnFocus?: BackgroundColor;
  /** Utility for controlling an element's background color on checked. */
  backgroundColorOnChecked?: BackgroundColor;
  /** Utility for controlling an element's background color on hover. */
  backgroundColorOnHover?: BackgroundColor;
  /** Determines box shadow styles. Parent should have overflow set to visible to ensure styles are not clipped. */
  // elevation?: Elevation;
}

type CustomSizingStyleProps = {
  iconSize?: IconSize;
  avatarSize?: AvatarSize;
};

type StyleProps = Partial<
  BackgroundStyleProps &
    BorderStyleProps &
    LayoutStyleProps &
    FlexStyleProps &
    SpacingStyleProps &
    TextStyleProps &
    OpacityStyleProps &
    SizingStyleProps &
    ImageStyleProps &
    CustomSizingStyleProps
>;

/* -------------------------------------------------------------------------- */
/*                          UNIVERSAL COMPONENT PROPS                         */
/* -------------------------------------------------------------------------- */
interface UniversalBoxProps
  extends PropsWithChildren,
    BackgroundStyleProps,
    BorderStyleProps,
    FlexStyleProps,
    LayoutStyleProps,
    OpacityStyleProps,
    SizingStyleProps,
    SpacingStyleProps {
  /**
   *  When asChild is set to true, the component's child will be cloned and passed
   * the props and behavior required to make it functional.
   */
  asChild?: boolean;
}

interface UniversalStackProps extends Omit<UniversalBoxProps, 'direction'> {
  gap?: SpacingAlias;
}

interface UniversalTextProps
  extends PropsWithChildren,
    TextStyleProps,
    UniversalBoxProps {
  variant?: TextVariant;
}

interface UniversalIconProps
  extends Omit<
    UniversalTextProps,
    'children' | 'fontFamily' | 'fontSize' | 'fontWeight' | 'lineHeight'
  > {
  size: IconSize;
  name: IconName;
}

interface UniversalPressableProps extends UniversalBoxProps {
  onPress?: () => void;
}

type ButtonStyle = 'solid' | 'outline' | 'ghost' | 'gradient';

type ButtonVariant =
  | `${BackgroundPaletteAlias}-${ButtonStyle}`
  | `${CorePaletteAlias}-${ButtonStyle}`;

type ButtonSize = 's' | 'm' | 'l';

interface UniversalIconButtonProps {
  /** The variant of the button */
  variant: ButtonVariant;
  /** The size of the button  */
  size: ButtonSize;
  /** The name of the icon to be displayed at the start of the button. */
  name: IconName;
}

interface UniversalButtonProps {
  /** The variant of the button */
  variant: ButtonVariant;
  /** The size of the button  */
  size: ButtonSize;
  /** The name of the icon to be displayed at the start of the button. */
  startIcon?: IconName;
  /** The name of the icon to be displayed at the end of the button. */
  endIcon?: IconName;
  /** Indicates whether the button should span the full width of its container. */
  fullWidth?: boolean;
}

interface UniversalImageProps extends UniversalBoxProps, ImageStyleProps {
  /** The source URL of the image. */
  src: string;
  /**  Provides fallback (alternate) text to display when the image specified by the Image element is not loaded. */
  alt: string;
}

interface UniversalAvatarProps extends UniversalImageProps {
  /** The size of the Avatar. */
  size: AvatarSize;
  /** The shape of the Avatar. */
  shape: BorderRadius;
}

interface UniversalTextInputProps
  extends Omit<UniversalTextProps, 'children' | 'colorChecked'> {
  disabled?: boolean;
  required?: boolean;
}

export type {
  BackgroundStyleProps,
  BorderStyleProps,
  ButtonSize,
  ButtonVariant,
  CustomSizingStyleProps,
  FlexStyleProps,
  IconName,
  ImageStyleProps,
  LayoutStyleProps,
  OpacityStyleProps,
  SizingStyleProps,
  SpacingStyleProps,
  StateStyleProps,
  StyleProps,
  TextStyleProps,
  UniversalAvatarProps,
  UniversalBoxProps,
  UniversalButtonProps,
  UniversalIconButtonProps,
  UniversalIconProps,
  UniversalImageProps,
  UniversalPressableProps,
  UniversalStackProps,
  UniversalTextInputProps,
  UniversalTextProps,
};
