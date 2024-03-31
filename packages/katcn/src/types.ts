import type { PropsWithChildren } from 'react';
import type { IconName } from './icons/types';

/* -------------------------------------------------------------------------- */
/*                                 STYLE PROPS                                */
/* -------------------------------------------------------------------------- */
export type ImageStyleProps = {
  /**
   * Determines how the image should be resized to fit its container.
   */
  contentFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
};

export interface BorderStyleProps {
  /** Add a border radius to all corners of the box. */
  borderRadius?: BorderRadius;
  /** Add a border radius to both top corners of the box. */
  borderTopRadius?: BorderRadius;
  /** Add a border radius to both bottom corners of the box. */
  borderBottomRadius?: BorderRadius;
  /** Add a border radius to both start corners of the box. */
  borderStartRadius?: BorderRadius;
  /** Add a border radius to both end corners of the box. */
  borderEndRadius?: BorderRadius;
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
  borderYColor?: LineColor;
  /** Adds a custom border color horizontally from the palette */
  borderXColor?: LineColor;
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
  borderYWidth?: BorderWidth;
  /** Sets the width of the start (left) and end (right) border of an element. */
  borderXWidth?: BorderWidth;
  /** Sets the width of the start (left) border of an element. */
  borderStartWidth?: BorderWidth;
  /** Sets the width of the end (right) border of an element. */
  borderEndWidth?: BorderWidth;
  /** Sets the width of the top border of an element. */
  borderTopWidth?: BorderWidth;
  /** Sets the width of the bottom border of an element. */
  borderBottomWidth?: BorderWidth;
}

export interface LayoutStyleProps {
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

export interface SpacingStyleProps {
  /** Apply inner spacing on all sides. */
  spacing?: SpacingAlias;
  /** Apply inner spacing on the leading and trailing sides. */
  spacingX?: SpacingAlias;
  /** Apply inner spacing on the top and bottom sides. */
  spacingY?: SpacingAlias;
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
  offsetY?: SpacingAlias;
  /** Apply negative outer spacing on the leading and trailing sides. */
  offsetX?: SpacingAlias;
  /** Apply negative outer spacing on the bottom side. */
  offsetBottom?: SpacingAlias;
  /** Apply negative outer spacing on the trailing side. */
  offsetEnd?: SpacingAlias;
  /** Apply negative outer spacing on the leading side. */
  offsetStart?: SpacingAlias;
  /** Apply negative outer spacing on the top side. */
  offsetTop?: SpacingAlias;
  /** Control the horizontal gutters between grid and flexbox items. If set to auto, will add an equal space between items. */
  gapX?: SpacingAlias;
  /** Control the vertical gutters between grid and flexbox items. If set to auto, will add an equal space between items. */
  gapY?: SpacingAlias;
}

export interface FlexStyleProps {
  /** Sets how flex items are placed in the flex container defining the main axis and the direction (normal or reversed). */
  direction?: FlexDirection;
  /** Sets the flex grow factor, which specifies how much of the flex container's remaining space should be assigned to the flex item's main size. */
  grow?: FlexGrow;
  /** Sets the flex shrink factor of a flex item. If the size of all flex items is larger than the flex container, items shrink to fit according to flex-shrink. */
  shrink?: FlexShrink;
  /** Sets whether flex items are forced onto one line or can wrap onto multiple lines. If wrapping is allowed, it sets the direction that lines are stacked. */
  wrap?: FlexWrap;
  /** Defines how the browser distributes space between and around content items along the main-axis of a flex container, and the inline axis of a grid container. */
  justifyContent?: JustifyContent;
  /** Sets the align-self value on all direct children as a group. In Flexbox, it controls the alignment of items on the Cross Axis. In Grid Layout, it controls the alignment of items on the Block Axis within their grid area. */
  alignItems?: AlignItems;
  /** Sets the distribution of space between and around content items along a flexbox's cross-axis or a grid's block axis. */
  alignContent?: AlignContent;
}

export interface GridStyleProps {
  placeContent?: PlaceContent;
  placeItems?: PlaceItems;
  placeSelf?: PlaceSelf;
}

export interface OpacityStyleProps {
  opacity?: Opacity;
}

export interface SizingStyleProps {
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

export interface StateStyleProps {
  interactable?: boolean;
  focusable?: boolean;
}

export interface TextStyleProps {
  /** Utility for controlling the color of a Text or Icon element */
  color?: ForegroundColor;
  /** Utility for controlling the color of a Text or Icon element when checked */
  colorChecked?: ForegroundColor;
  /** Utility for controlling the color of a placeholder element */
  placeholderColor?: ForegroundColor;
  /** Utility for controlling the font family of a Text element */
  fontFamily?: FontFamily;
  /** Utility for controlling the font size of a Text element */
  fontSize?: FontSize;
  /** Utility for controlling the font weight of a Text element */
  fontWeight?: FontWeight;
  /** Utility for controlling the line height of a Text element */
  lineHeight?: LineHeight;
  /** Utility for controlling the text alignment of a Text element */
  textAlign?: TextAlign;
  /** Utility for controlling the text transformation of a Text element */
  textTransform?: TextTransform;
}

export interface BackgroundStyleProps {
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
  elevation?: Elevation;
}

export type CustomSizingStyleProps = {
  iconSize?: IconSize;
  avatarSize?: AvatarSize;
};

export interface StyleProps
  extends Partial<
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
  > {
  className?: string;
}

export type StyleProp = keyof StyleProps;

/* -------------------------------------------------------------------------- */
/*                          UNIVERSAL COMPONENT PROPS                         */
/* -------------------------------------------------------------------------- */
export interface UniversalBoxProps
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

export interface UniversalStackProps
  extends Omit<UniversalBoxProps, 'direction'> {
  gap?: SpacingAlias;
}

export interface UniversalTextProps
  extends PropsWithChildren,
    TextStyleProps,
    UniversalBoxProps {
  variant?: TextVariant;
}

export interface UniversalIconProps
  extends Omit<
    UniversalTextProps,
    'children' | 'fontFamily' | 'fontSize' | 'fontWeight' | 'lineHeight'
  > {
  size: IconSize;
  name: IconName;
}

export interface UniversalPressableProps extends UniversalBoxProps {
  onPress?: () => void;
}

export type ButtonStyle = 'solid' | 'outline' | 'ghost' | 'gradient';

export type ButtonVariant =
  | `${BackgroundPaletteAlias}-${ButtonStyle}`
  | `${CorePaletteAlias}-${ButtonStyle}`;

export type ButtonSize = 's' | 'm' | 'l';

export interface UniversalIconButtonProps {
  /** The variant of the button */
  variant: ButtonVariant;
  /** The size of the button  */
  size: ButtonSize;
  /** The name of the icon to be displayed at the start of the button. */
  name: IconName;
}

export interface UniversalButtonProps {
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

export interface UniversalImageProps
  extends UniversalBoxProps,
    ImageStyleProps {
  /** The source URL of the image. */
  src: string;
  /**  Provides fallback (alternate) text to display when the image specified by the Image element is not loaded. */
  alt: string;
}

export interface UniversalAvatarProps extends UniversalImageProps {
  /** The size of the Avatar. */
  size: AvatarSize;
  /** The shape of the Avatar. */
  shape: BorderRadius;
}

export interface UniversalTextInputProps
  extends Omit<UniversalTextProps, 'children' | 'colorChecked'> {
  disabled?: boolean;
  required?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                    COLOR                                   */
/* -------------------------------------------------------------------------- */
// https://uicolors.app/browse/tailwind-colors
export type PaletteType = 'core' | 'background' | 'foreground' | 'line';

export type PaletteValue = { hue: Hue; step: HueStep; opacity?: string };

export type Palette = { [key in PaletteType]: keyof PaletteConfig[key] };

export type Hue =
  | 'magenta'
  | 'pink'
  | 'rose'
  | 'red'
  | 'sunset'
  | 'orange'
  | 'nude'
  | 'brown'
  | 'yellow'
  | 'citron'
  | 'lime'
  | 'green'
  | 'mint'
  | 'teal'
  | 'cyan'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'gray'
  | 'carbon';

export type HueStep =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15;

export type Color = `${Hue}-${HueStep}`;

export type CorePaletteAlias =
  | 'accent'
  | 'alert'
  | 'brand'
  | 'positive'
  | 'warning';
export type CorePalette = Record<CorePaletteAlias, PaletteValue>;

export type BackgroundPaletteAlias = 'primary' | 'secondary';
export type BackgroundPalette = Record<BackgroundPaletteAlias, PaletteValue>;

export type ElevationPaletteAlias = '1' | '2' | '3';
export type ElevationPalette = Record<ElevationPaletteAlias, PaletteValue>;
export type ForegroundPaletteAlias =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'on-color';
export type ForegroundPalette = Record<ForegroundPaletteAlias, PaletteValue>;

export type LinePaletteAlias = 'primary' | 'secondary';
export type LinePalette = Record<LinePaletteAlias, PaletteValue>;

export type AlwaysPaletteAlias = 'white' | 'black' | 'transparent';

/* ----------------------------- SEMANTIC COLORS ---------------------------- */

export type ForegroundColor =
  | Color
  | CorePaletteAlias
  | ForegroundPaletteAlias
  | AlwaysPaletteAlias;

export type LineColor =
  | Color
  | CorePaletteAlias
  | LinePaletteAlias
  | AlwaysPaletteAlias;

export type BackgroundColor =
  | Color
  | CorePaletteAlias
  | BackgroundPaletteAlias
  | AlwaysPaletteAlias;

/* -------------------------------------------------------------------------- */
/*                                 TYPOGRAPHY                                 */
/* -------------------------------------------------------------------------- */
export type TextVariant =
  | 'display1'
  | 'display2'
  | 'display3'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'title4'
  | 'headline1'
  | 'body1'
  | 'label1'
  | 'label2'
  | 'caption1'
  | 'caption2'
  | 'legal1';

export type FontFamilyGlobalAlias =
  | 'icons'
  | 'sans'
  | 'sans-condensed'
  | 'serif-text'
  | 'serif-display'
  | 'mono';

export type FontFamilyGlobalConfig = Record<
  FontFamilyGlobalAlias,
  { fallbacks: string[]; name: string }
>;

export type FontWeightNumeric =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export type FontWeightDescriptive =
  | 'thin'
  | 'extralight'
  | 'light'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

export type TextTransformDescriptive =
  | 'none'
  | 'uppercase'
  | 'lowercase'
  | 'capitalize';
export type LetterSpacing =
  | 'tighter'
  | 'tight'
  | 'normal'
  | 'wide'
  | 'wider'
  | 'widest';
export type LineClampAlias = '1' | '2' | '3' | '4' | '5' | '6';

export type TextTransformConfig = Record<TextVariant, TextTransformDescriptive>;
export type FontSizeConfig = Record<TextVariant, number>;
export type FontFamilyConfig = Record<TextVariant, FontFamilyGlobalAlias>;
export type FontWeightConfig = Record<TextVariant, FontWeightDescriptive>;
export type LineHeightConfig = Record<TextVariant, number>;
export type ConfigurableTextProperty =
  | 'fontFamily'
  | 'fontSize'
  | 'fontWeight'
  | 'lineHeight'
  | 'textTransform';

export type FontSize = TextVariant;
export type FontWeight = TextVariant | FontWeightDescriptive;
export type FontFamily = TextVariant | FontFamilyGlobalAlias;
export type LineHeight = TextVariant;
export type TextTransform = TextVariant | TextTransformDescriptive;
export type TextAlign = 'center' | 'justify' | 'start' | 'end';
/* -------------------------------------------------------------------------- */
/*                                   SIZING                                   */
/* -------------------------------------------------------------------------- */

export type AvatarSize = 'sm' | 'md' | 'lg';
export type AvatarSizeConfig = Record<AvatarSize, number>;

export type IconSize = 'sm' | 'md' | 'lg';
export type IconSizeConfig = Record<IconSize, number>;

/* -------------------------------------------------------------------------- */
/*                                    SHAPE                                   */
/* -------------------------------------------------------------------------- */

export type Shape = 'circle' | 'square' | 'rounded' | 'capsule';
export type AvatarShape = 'circle' | 'square' | 'rounded';

/* -------------------------------------------------------------------------- */
/*                                   LAYOUT                                   */
/* -------------------------------------------------------------------------- */

export type SpacingAlias =
  | 'px'
  | '0'
  | '0.5'
  | '1'
  | '1.5'
  | '2'
  | '2.5'
  | '3'
  | '3.5'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '14'
  | '16'
  | '20'
  | '24'
  | '28'
  | '32'
  | '36'
  | '40'
  | '44'
  | '48'
  | '52'
  | '56'
  | '60'
  | '64'
  | '72'
  | '80'
  | '96';
export type SpacingConfig = Record<SpacingAlias, string>;

export type ZIndex = 'auto' | '0' | '10' | '20' | '30' | '40' | '50';
export type ZIndexConfig = Record<ZIndex, string>;

/* -------------------------------------------------------------------------- */
/*                                OTHER TOKENS                                */
/* -------------------------------------------------------------------------- */

export type BorderRadius = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type BorderRadiusConfig = Record<BorderRadius, number>;

export type Elevation = ElevationPaletteAlias;
export type ElevationConfig = Record<Elevation, BoxShadowConfig>;

export type BorderWidth = 'none' | 'thin' | 'medium' | 'thick';
export type BorderWidthConfig = Record<BorderWidth, number>;

export type BoxShadowConfig = {
  color: string;
  offsetX: number;
  offsetY: number;
  blurRadius: number;
  spreadRadius: number;
}[];

export type Opacity =
  | '0'
  | '5'
  | '10'
  | '20'
  | '25'
  | '30'
  | '40'
  | '50'
  | '60'
  | '70'
  | '75'
  | '80'
  | '90'
  | '95'
  | '100';

/* -------------------------------------------------------------------------- */
/*                                   CONFIG                                   */
/* -------------------------------------------------------------------------- */
export type ColorModeConfig = {
  light: ColorsConfig;
  dark: ColorsConfig;
};

export type ColorsConfig = {
  palette: PaletteConfig;
  spectrum: SpectrumConfig;
};

export type SpectrumConfig = Record<Hue, number>;
export type PaletteTypeConfig = Record<string, PaletteValue>;
export type PaletteConfig = Record<PaletteType, PaletteTypeConfig>;

export type ScaleConfig = {
  avatarSizes: AvatarSizeConfig;
  iconSizes: IconSizeConfig;
  borderRadius: BorderRadiusConfig;
  borderWidth: BorderWidthConfig;
  fontFamily: FontFamilyConfig;
  fontSize: FontSizeConfig;
  fontWeight: FontWeightConfig;
  lineHeight: LineHeightConfig;
  textTransform: TextTransformConfig;
};

export type ScaleModeConfig = {
  xSmall: ScaleConfig;
  small: ScaleConfig;
  medium: ScaleConfig;
  large: ScaleConfig;
  xLarge: ScaleConfig;
  xxLarge: ScaleConfig;
  xxxLarge: ScaleConfig;
};

export type UniversalTokensConfig = {
  colorMode: ColorModeConfig;
  scaleMode: ScaleModeConfig;
  fontFamily: FontFamilyGlobalConfig;
};

/* -------------------------------------------------------------------------- */
/*                                    MODES                                   */
/* -------------------------------------------------------------------------- */
export type PlatformMode = 'web' | 'ios' | 'android';

export type ColorMode = keyof ColorModeConfig;
export type ColorModeForApp = ColorMode | 'system';

export type ScaleMode = keyof ScaleModeConfig;
export type ScaleModeForApp = ScaleMode | 'system';

export type HighContrastMode = boolean;
export type RegionMode = '🇺🇸 US' | '🇩🇪 DE' | '🇫🇷 FR' | '🇨🇳 CN';

export interface Modes {
  colorMode: ColorMode;
  scaleMode: ScaleMode;
}

/* -------------------------------------------------------------------------- */
/*                                   MOTION                                   */
/* -------------------------------------------------------------------------- */
export type Animation =
  | 'none'
  | 'spin'
  | 'ping'
  | 'pulse'
  | 'bounce'
  | 'accordion-down'
  | 'accordion-up';
export type TransitionDelay =
  | '0'
  | '75'
  | '100'
  | '150'
  | '200'
  | '300'
  | '500'
  | '700'
  | '1000';
export type TransitionDuration =
  | '0'
  | '75'
  | '100'
  | '150'
  | '200'
  | '300'
  | '500'
  | '700'
  | '1000';
export type TransitionTiming = 'linear' | 'in' | 'out' | 'in-out';

/* -------------------------------------------------------------------------- */
/*                                    FLEX                                    */
/* -------------------------------------------------------------------------- */
export type AlignContent =
  | 'center'
  | 'start'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly'
  | 'baseline'
  | 'stretch';
export type AlignItems = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
export type AlignSelf =
  | 'auto'
  | 'start'
  | 'end'
  | 'center'
  | 'stretch'
  | 'baseline';
export type FlexDirection =
  | 'horizontal'
  | 'vertical'
  | 'horizontal-reverse'
  | 'vertical-reverse';
export type JustifyContent =
  | 'start'
  | 'end'
  | 'center'
  | 'between'
  | 'around'
  | 'evenly'
  | 'stretch';
export type PlaceContent =
  | 'center'
  | 'start'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly'
  | 'baseline'
  | 'stretch';
export type PlaceItems = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
export type PlaceSelf = 'auto' | 'start' | 'end' | 'center' | 'stretch';
export type FlexShrink = 'allow' | 'prevent';
export type FlexGrow = 'allow' | 'prevent';
export type FlexWrap = 'allow' | 'prevent' | 'reverse';

/* -------------------------------------------------------------------------- */
/*                                   LAYOUT                                   */
/* -------------------------------------------------------------------------- */
export type Height =
  | 'half'
  | 'full'
  | '100vh'
  | `${'min' | 'max' | 'fit'}-content`
  | 'unset'
  | number;
export type MaxHeight = Height;
export type MinHeight = Height;
export type Width =
  | `${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12}/12`
  | `${'min' | 'max' | 'fit'}-content`
  | 'unset'
  | '100vw'
  | 'half'
  | 'full'
  | number;
export type MinWidth = Width;
export type MaxWidth = Width;

export type Display =
  | 'block'
  | 'inline-block'
  | 'inline'
  | 'flex'
  | 'inline-flex'
  | 'table'
  | 'inline-table'
  | 'table-caption'
  | 'table-cell'
  | 'table-column'
  | 'table-column-group'
  | 'table-footer-group'
  | 'table-header-group'
  | 'table-row-group'
  | 'table-row'
  | 'flow-root'
  | 'grid'
  | 'inline-grid'
  | 'contents'
  | 'list-item'
  | 'none';
export type Overflow = 'auto' | 'hidden' | 'clip' | 'visible' | 'scroll';
export type Position = 'static' | 'fixed' | 'absolute' | 'relative' | 'sticky';
