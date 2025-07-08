import type { IconName } from './icons/types';

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */
/** https://www.totaltypescript.com/tips/create-autocomplete-helper-which-allows-for-arbitrary-values */
export type ColorWithOpacity<T extends string> = T | `${T}/${Opacity}`;
export type ArbitraryColor = ColorWithOpacity<`[#${string}]`>;
export type ArbitraryValue = `[${string}]`;
export type PrimitiveType = string | boolean | number;
export type ValidHtmlTag = Extract<keyof React.JSX.IntrinsicElements, string>;

/* -------------------------------------------------------------------------- */
/*                                    COLOR                                   */
/* -------------------------------------------------------------------------- */
// https://uicolors.app/browse/tailwind-colors
export type Hue =
  | 'slate'
  | 'gray'
  | 'zinc'
  | 'neutral'
  | 'stone'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose';

export type HueStep =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export type Color =
  | ColorWithOpacity<
      | `${Hue}-${HueStep}`
      | 'brand'
      | 'on-brand'
      | 'accent'
      | 'on-accent'
      | 'alert'
      | 'on-alert'
      | 'positive'
      | 'on-positive'
      | 'warning'
      | 'on-warning'
      | 'primary'
      | 'on-primary'
      | 'secondary'
      | 'on-secondary'
      | 'tertiary'
      | 'on-tertiary'
      | 'inverse'
      | 'on-inverse'
      | 'black'
      | 'white'
    >
  | 'inherit'
  | 'current'
  | 'transparent'
  | ArbitraryColor;

/* -------------------------------------------------------------------------- */
/*                                    MODES                                   */
/* -------------------------------------------------------------------------- */
export type ColorMode = 'light' | 'dark';
export type ColorModeForApp = ColorMode | 'system';
export type PlatformMode = 'web' | 'ios' | 'android';
export type HighContrastMode = boolean;
export type RegionMode = '🇺🇸 US' | '🇩🇪 DE' | '🇫🇷 FR' | '🇨🇳 CN';

/* -------------------------------------------------------------------------- */
/*                                BORDER TOKENS                               */
/* -------------------------------------------------------------------------- */
export type BorderRadius = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type BorderWidth = true | '0' | '2' | '4' | '8';
export type Shape = 'circle' | 'square' | 'rounded' | 'capsule';

export type DivideWidth = '0' | '2' | '4' | '8' | 'reverse';
export type DivideStyle = 'solid' | 'dashed' | 'dotted' | 'double' | 'none';

export type OutlineWidth = '0' | '1' | '2' | '4' | '8';
export type OutlineStyle = 'none' | 'solid' | 'dashed' | 'dotted' | 'double';
export type OutlineOffset = '0' | '1' | '2' | '4' | '8';

export type RingWidth = true | '0' | '1' | '2' | '4' | '8' | 'inset';
export type RingOffsetWidth = '0' | '1' | '2' | '4' | '8';

/* -------------------------------------------------------------------------- */
/*                                 SVG TOKENS                                 */
/* -------------------------------------------------------------------------- */
export type StrokeWidth = '0' | '1' | '2';

/* -------------------------------------------------------------------------- */
/*                               EFFECTS TOKENS                               */
/* -------------------------------------------------------------------------- */
export type BoxShadow =
  | true
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | 'inner'
  | 'none';

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

export type MixBlendMode =
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'hard-light'
  | 'soft-light'
  | 'difference'
  | 'exclusion'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity'
  | 'plus-darker'
  | 'plus-lighter';

export type BgBlendMode = Exclude<MixBlendMode, 'plus-darker' | 'plus-lighter'>;

/* -------------------------------------------------------------------------- */
/*                                   FILTERS                                  */
/* -------------------------------------------------------------------------- */
export type Blur = true | 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type Brightness =
  | '0'
  | '50'
  | '75'
  | '90'
  | '95'
  | '100'
  | '105'
  | '110'
  | '125'
  | '150'
  | '200';
export type Contrast = '0' | '50' | '75' | '100' | '125' | '150' | '200';
export type DropShadow = true | 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

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
export type Flex = '1' | 'auto' | 'initial' | 'none';
export type FlexDirection = 'row' | 'col' | 'row-reverse' | 'col-reverse';
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
export type FlexShrink = true | '0';
export type FlexGrow = true | '0';
export type FlexWrap = 'wrap' | 'wrap-reverse' | 'nowrap';

/* -------------------------------------------------------------------------- */
/*                                    GRID                                    */
/* -------------------------------------------------------------------------- */
export type GridColumn =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12';
export type GridTemplate = GridColumn | 'none' | 'subgrid';
export type GridSpan = 'auto' | GridColumn | 'full';
export type GridStartEnd = GridColumn | '13' | 'auto';

export type GridTemplateColumns = GridTemplate;
export type GridColumnSpan = GridSpan;
export type GridColumnStart = GridStartEnd;
export type GridColumnEnd = GridStartEnd;
export type GridTemplateRows = GridTemplate;
export type GridRowSpan = GridSpan;
export type GridRowStart = GridStartEnd;
export type GridRowEnd = GridStartEnd;

/* -------------------------------------------------------------------------- */
/*                                   LAYOUT                                   */
/* -------------------------------------------------------------------------- */
export type AspectRatio =
  | 'square'
  | 'landscape'
  | 'portrait'
  | 'widescreen'
  | 'ultrawide'
  | 'golden';

export type BoxSizing = 'border' | 'content';

export type Columns =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | 'auto'
  | '3xs'
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl';

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

type PositionPlacement =
  | SpacingAlias
  | `${1 | 2}/2`
  | `${1 | 2 | 3}/3`
  | `${1 | 2 | 3 | 4}/4`
  | 'full'
  | 'auto';

export type ObjectFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
export type ObjectPosition =
  | 'bottom'
  | 'center'
  | 'left'
  | 'left-bottom'
  | 'left-top'
  | 'right'
  | 'right-bottom'
  | 'right-top'
  | 'top';
export type Overflow = 'auto' | 'hidden' | 'clip' | 'visible' | 'scroll';
export type Overscroll = 'auto' | 'contain' | 'none';
export type OverscrollBehavior =
  | Overscroll
  | `x-${Overscroll}`
  | `y-${Overscroll}`;

export type Position = 'static' | 'fixed' | 'absolute' | 'relative' | 'sticky';

export type Visibility = 'visible' | 'invisible' | 'collapse';
export type ZIndex = 'auto' | '0' | '10' | '20' | '30' | '40' | '50';

/* -------------------------------------------------------------------------- */
/*                                   SIZING                                   */
/* -------------------------------------------------------------------------- */

export type Height =
  | 'auto'
  | 'full'
  | 'screen'
  | 'svh'
  | 'lvh'
  | 'dvh'
  | 'min'
  | 'max'
  | 'fit'
  /** Fractional width */
  | '1/2'
  | `${1 | 2}/3`
  | `${1 | 2 | 3}/4`
  | `${1 | 2 | 3 | 4}/5`
  | `${1 | 2 | 3 | 4 | 5}/6`
  | SpacingAlias
  | ArbitraryValue;
export type MaxHeight =
  | 'full'
  | 'screen'
  | 'svh'
  | 'lvh'
  | 'dvh'
  | 'min'
  | 'max'
  | 'fit'
  | SpacingAlias
  | ArbitraryValue;
export type MinHeight =
  | 'full'
  | 'screen'
  | 'svh'
  | 'lvh'
  | 'dvh'
  | 'min'
  | 'max'
  | 'fit'
  | SpacingAlias
  | ArbitraryValue;
export type Width =
  | 'auto'
  | 'full'
  | 'screen'
  | 'svw'
  | 'lvw'
  | 'dvw'
  | 'min'
  | 'max'
  | 'fit'
  /** Fractional width */
  | '1/2'
  | `${1 | 2}/3`
  | `${1 | 2 | 3}/4`
  | `${1 | 2 | 3 | 4}/5`
  | `${1 | 2 | 3 | 4 | 5}/6`
  | `${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11}/12`
  /** Spacing alias */
  | SpacingAlias
  | ArbitraryValue;
export type MinWidth =
  | 'full'
  | 'min'
  | 'max'
  | 'fit'
  | SpacingAlias
  | ArbitraryValue;
export type MaxWidth =
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | 'full'
  | 'min'
  | 'max'
  | 'fit'
  | 'prose'
  | `screen-${BreakpointAlias}`
  | SpacingAlias
  | ArbitraryValue;

export type Size =
  | SpacingAlias
  | '1/2'
  | `${1 | 2}/3`
  | `${1 | 2 | 3}/4`
  | `${1 | 2 | 3 | 4}/5`
  | `${1 | 2 | 3 | 4 | 5}/6`
  | `${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11}/12`
  | 'full'
  | 'min'
  | 'max'
  | 'fit'
  | ArbitraryValue;

/* -------------------------------------------------------------------------- */
/*                                 TYPOGRAPHY                                 */
/* -------------------------------------------------------------------------- */

export type TextVariant =
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl'
  | 'display1'
  | 'display2'
  | 'display3'
  | 'display4'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'title4'
  | 'headline'
  | 'body'
  | 'label1'
  | 'label2'
  | 'label3'
  | 'label4'
  | 'legal';

export type FontFamilyGlobalAlias = 'icons' | 'sans' | 'serif' | 'mono';

export type LetterSpacing =
  | 'tighter'
  | 'tight'
  | 'normal'
  | 'wide'
  | 'wider'
  | 'widest';
export type LineClampAlias = '1' | '2' | '3' | '4' | '5' | '6';
export type FontSize = TextVariant;
export type FontSmoothing = 'antialiased' | 'subpixel-antialiased';
export type FontFamily = 'icons' | 'sans' | 'serif' | 'mono';
export type LineHeight =
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'none'
  | 'tight'
  | 'snug'
  | 'normal'
  | 'relaxed'
  | 'loose';
export type TextTransform =
  | 'normal-case'
  | 'uppercase'
  | 'lowercase'
  | 'capitalize';
export type TextAlign = 'center' | 'justify' | 'start' | 'end';
export type TextDecoration =
  | 'underline'
  | 'overline'
  | 'line-through'
  | 'no-underline';
export type TextDecorationStyle =
  | 'solid'
  | 'double'
  | 'dotted'
  | 'dashed'
  | 'wavy';
export type TextDecorationThickness =
  | 'auto'
  | 'from-font'
  | '0'
  | '1'
  | '2'
  | '4'
  | '8';
export type TextUnderlineOffset = 'auto' | '0' | '1' | '2' | '4' | '8';
export type TextOverflow = 'ellipsis' | 'clip';
export type TextWrap = 'wrap' | 'nowrap' | 'balance' | 'pretty';
export type TextIndent = SpacingAlias;
export type VerticalAlign =
  | 'baseline'
  | 'top'
  | 'middle'
  | 'bottom'
  | 'text-top'
  | 'text-bottom'
  | 'sub'
  | 'super';
export type TextWhitespace =
  | 'normal'
  | 'nowrap'
  | 'pre'
  | 'pre-line'
  | 'pre-wrap'
  | 'break-spaces';
export type TextWordBreak = 'normal' | 'words' | 'all' | 'keep';
export type TextHyphens = 'none' | 'manual' | 'auto';

/* -------------------------------------------------------------------------- */
/*                                   SIZING                                   */
/* -------------------------------------------------------------------------- */
export type AvatarShape = 'circle' | 'square' | 'rounded';

/* -------------------------------------------------------------------------- */
/*                                  TRANSFORM                                 */
/* -------------------------------------------------------------------------- */
export type Scale =
  | '0'
  | '50'
  | '75'
  | '90'
  | '95'
  | '100'
  | '105'
  | '110'
  | '125'
  | '150'
  | '200';
export type Rotate = '0' | '1' | '2' | '3' | '6' | '12' | '45' | '90' | '180';
export type Translate =
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
  | '96'
  | '1/2'
  | `${1 | 2}/3`
  | `${1 | 2}/3`
  | `${1 | 2 | 3}/4`
  | 'full';
export type Skew = '0' | '1' | '2' | '3' | '6' | '12';
export type TransformOrigin =
  | 'center'
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left';
/* -------------------------------------------------------------------------- */
/*                                 RESPONSIVE                                 */
/* -------------------------------------------------------------------------- */
export type BreakpointAlias = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ResponsiveConfig = Record<string, string>;

/* -------------------------------------------------------------------------- */
/*                                   SPACING                                  */
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

/* -------------------------------------------------------------------------- */
/*                                 TRANSITION                                 */
/* -------------------------------------------------------------------------- */
export type TransitionProperty =
  | true
  | 'none'
  | 'all'
  | 'colors'
  | 'opacity'
  | 'shadow'
  | 'transform';
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

/* -------------------------------------------------------------------------- */
/*                                  ANIMATION                                 */
/* -------------------------------------------------------------------------- */
export type AnimationName = 'none' | 'spin' | 'ping';

/* -------------------------------------------------------------------------- */
/*                                INTERACTIVITY                               */
/* -------------------------------------------------------------------------- */
export type Appearance = 'none' | 'auto';
export type Cursor =
  | 'auto'
  | 'default'
  | 'pointer'
  | 'wait'
  | 'text'
  | 'move'
  | 'help'
  | 'not-allowed'
  | 'none'
  | 'context-menu'
  | 'progress'
  | 'cell'
  | 'crosshair'
  | 'vertical-text'
  | 'alias'
  | 'copy'
  | 'no-drop'
  | 'grab'
  | 'all-scroll'
  | 'col-resize'
  | 'row-resize'
  | `${
      | 'n'
      | 'e'
      | 's'
      | 'w'
      | 'ne'
      | 'nw'
      | 'se'
      | 'sw'
      | 'ew'
      | 'ns'
      | 'nesw'
      | 'nwse'}-resize`
  | 'zoom-in'
  | 'zoom-out';

export type PointerEvents = 'none' | 'auto';
export type ResizeType = 'none' | 'y' | 'x' | true;
export type ScrollBehavior = 'auto' | 'smooth';
export type ScrollSnapGap = SpacingAlias;
export type ScrollSnapSpacing = SpacingAlias;
export type ScrollSnapAlign = 'start' | 'end' | 'center' | 'align-none';
export type ScrollSnapStop = 'normal' | 'always';
export type ScrollSnapType =
  | 'none'
  | 'x'
  | 'y'
  | 'both'
  | 'mandatory'
  | 'proximity';
export type TouchAction =
  | 'auto'
  | 'none'
  | `pan-${'x' | 'y' | 'left' | 'right' | 'up' | 'down'}`
  | 'pinch-zoom'
  | 'manipulation';
export type UserSelect = 'none' | 'text' | 'all' | 'auto';
export type WillChange =
  | 'auto'
  | 'scroll'
  | 'change-contents'
  | 'change-transform';

/* -------------------------------------------------------------------------- */
/*                                    TABLE                                   */
/* -------------------------------------------------------------------------- */
export type TableBorderCollapse = 'collapse' | 'separate';
export type TableBorderSpacing = SpacingAlias;
export type TableLayout = 'auto' | 'fixed';
export type TableCaptionSide = 'top' | 'bottom';

/* -------------------------------------------------------------------------- */
/*                                   CONFIGS                                  */
/* -------------------------------------------------------------------------- */

export type FontFamilyGlobalConfig = Record<
  string,
  { fallbacks: string[]; name: string }
>;

export type SpacingConfig = Record<string, string>;
export type ZIndexConfig = Record<string, string>;
export type BorderRadiusConfig = Record<string, `${number}px`>;
export type BorderWidthConfig = Record<string, `${number}px`>;
export type ShadowConfig = {
  color: string;
  offsetX: number;
  offsetY: number;
  blurRadius: number;
  spreadRadius: number;
}[];

export type TypographyConfig = Record<
  string,
  {
    fontSize: string;
    /** @default 400 */
    fontWeight: number;
    /** @default sans */
    fontFamily: FontFamilyGlobalAlias;
    lineHeight: number;
  }
>;

export type SemanticColorConfig = Record<string, string>;

export type KatcnConfig = {
  colorMode: Record<ColorMode, SemanticColorConfig>;
  fontFamily: FontFamilyGlobalConfig;
  borderRadius: BorderRadiusConfig;
  borderWidth: BorderWidthConfig;
  typography: TypographyConfig;
  spacing: SpacingConfig;
  zIndex: ZIndexConfig;
  responsive: ResponsiveConfig;
  disablePreflight: boolean;
  autoInvertColors: boolean;
};

/* -------------------------------------------------------------------------- */
/*                                 STYLE PROPS                                */
/* -------------------------------------------------------------------------- */
export interface BorderStyleProps {
  /** Add a border radius to all corners of the box.
   * @tailwind rounded
   */
  rounded?: BorderRadius | ArbitraryValue;
  /** Add a border radius to both top corners of the box.
   * @tailwind rounded-t
   */
  roundedTop?: BorderRadius | ArbitraryValue;
  /** Add a border radius to both bottom corners of the box.
   * @tailwind rounded-b
   */
  roundedBottom?: BorderRadius | ArbitraryValue;
  /** Add a border radius to both start corners of the box.
   * @tailwind rounded-s
   */
  roundedStart?: BorderRadius | ArbitraryValue;
  /** Add a border radius to both end corners of the box.
   * @tailwind rounded-e
   */
  roundedEnd?: BorderRadius | ArbitraryValue;
  /** Add a border radius to top left corner of the box.
   * @tailwind rounded-ss
   */
  roundedTopStart?: BorderRadius | ArbitraryValue;
  /** Add a border radius to top right corner of the box.
   * @tailwind rounded-se
   */
  roundedTopEnd?: BorderRadius | ArbitraryValue;
  /** Add a border radius to bottom left corner of the box.
   * @tailwind rounded-es
   */
  roundedBottomStart?: BorderRadius | ArbitraryValue;
  /** Add a border radius to bottom right corner of the box.
   * @tailwind rounded-ee
   */
  roundedBottomEnd?: BorderRadius | ArbitraryValue;
  /** Adds a custom border color
   * @tailwind border
   */
  borderColor?: Color;
  /** Adds a custom border color vertically
   * @tailwind border-y
   */
  borderYColor?: Color;
  /** Adds a custom border color horizontally
   * @tailwind border-x
   */
  borderXColor?: Color;
  /** Adds a custom start border color
   * @tailwind border-s
   */
  borderStartColor?: Color;
  /** Adds a custom left border color
   * @tailwind border-l
   */
  borderLeftColor?: Color;
  /** Adds a custom end border color
   * @tailwind border-e
   */
  borderEndColor?: Color;
  /** Adds a custom right border color
   * @tailwind border-r
   */
  borderRightColor?: Color;
  /** Adds a custom top border color
   * @tailwind border-t
   */
  borderTopColor?: Color;
  /** Adds a custom bottom border color
   * @tailwind border-b
   */
  borderBottomColor?: Color;
  /**
   * Utility for adding border to an element
   * @tailwind border
   */
  border?: boolean;
  /**
   * Utility for adding border bottom to an element
   * @tailwind border-b
   */
  borderBottom?: boolean;
  /**
   * Utility for adding border top to an element
   * @tailwind border-t
   */
  borderTop?: boolean;
  /**
   * Utility for adding border left to an element
   * @tailwind border-l
   */
  borderLeft?: boolean;
  /**
   * Utility for adding border right to an element
   * @tailwind border-r
   */
  borderRight?: boolean;
  /**
   * Utility for adding border start to an element
   * @tailwind border-s
   */
  borderStart?: boolean;
  /**
   * Utility for adding border end to an element
   * @tailwind border-e
   */
  borderEnd?: boolean;
  /**
   * Utility for adding border to an element
   * @tailwind border-x
   */
  borderX?: boolean;
  /**
   * Utility for adding border to an element
   * @tailwind border-y
   */
  borderY?: boolean;
  /** Shorthand property to the width of an element's border.
   * @tailwind border
   */
  borderWidth?: BorderWidth;
  /** Sets the width of the top and bottom border of an element.
   * @tailwind border-y
   */
  borderYWidth?: BorderWidth;
  /** Sets the width of the start (left) and end (right) border of an element.
   * @tailwind border-x
   */
  borderXWidth?: BorderWidth;
  /** Sets the width of the start (left) border of an element.
   * @tailwind border-s
   */
  borderStartWidth?: BorderWidth;
  /** Sets the width of the left border of an element.
   * @tailwind border-l
   */
  borderLeftWidth?: BorderWidth;
  /** Sets the width of the end (right) border of an element.
   * @tailwind border-e
   */
  borderEndWidth?: BorderWidth;
  /** Sets the width of the right border of an element.
   * @tailwind border-r
   */
  borderRightWidth?: BorderWidth;
  /** Sets the width of the top border of an element.
   * @tailwind border-t
   */
  borderTopWidth?: BorderWidth;
  /** Sets the width of the bottom border of an element.
   * @tailwind border-b
   */
  borderBottomWidth?: BorderWidth;
  /** Utilities for controlling the border width between elements.
   * @tailwind divide
   */
  divideWidth?: DivideWidth;
  /** Utilities for controlling the border color between elements.
   * @tailwind divide
   */
  divideColor?: Color;
  /** Utilities for controlling the border style between elements.
   * @tailwind divide
   */
  divideStyle?: DivideStyle;
  /** Utilities for controlling the width of an element's outline.
   * @tailwind outline
   */
  outlineWidth?: OutlineWidth;
  /** Utilities for controlling the color of an element's outline.
   * @tailwind outline
   */
  outlineColor?: Color;
  /** Utilities for controlling the style of an element's outline.
   * @tailwind outline
   */
  outlineStyle?: OutlineStyle;
  /** Utilities for controlling the offset of an element's outline.
   * @tailwind outline-offset
   */
  outlineOffset?: OutlineOffset;
  /** Utilities for creating outline rings with box-shadows.
   * @tailwind ring
   */
  ringWidth?: RingWidth;
  /** Utilities for setting the color of outline rings.
   * @tailwind ring
   */
  ringColor?: Color;
  /** Utilities for simulating an offset when adding outline rings.
   * @tailwind ring-offset
   */
  ringOffsetWidth?: RingOffsetWidth;
  /** Utilities for setting the color of outline ring offsets.
   * @tailwind ring-offset
   */
  ringOffsetColor?: Color;
  /** Inset the outline ring box shadow
   * @tailwind ring-inset
   */
  ringInset?: boolean;
}

export interface LayoutStyleProps {
  /**
   * @description Utilities for controlling the aspect ratio of an element.
   * @tailwind aspect
   */
  aspectRatio?: AspectRatio;
  /** Utilities for controlling how the browser should calculate an element's total size.
   * @tailwind box
   */
  boxSizing?: BoxSizing;
  /** A component for fixing an element's width to the current breakpoint.
   * @tailwind container
   */
  container?: boolean;
  /** Utilities for controlling the number of columns within an element.
   * @tailwind columns
   */
  columns?: Columns;
  /** Sets whether an element is treated as a block or inline box and the layout used for its children, such as flow layout, grid or flex.
   * @tailwind display
   */
  display?: Display;
  /** Utilities for controlling whether an element should explicitly create a new stacking context.
   * @tailwind isolate
   */
  isolate?: boolean;
  /** Utilities for controlling how a replaced element's content should be resized.
   * @tailwind object
   */
  objectFit?: ObjectFit;
  /** Utilities for controlling how a replaced element's content should be positioned within its container.
   * @tailwind object
   */
  objectPosition?: ObjectPosition;
  /** Shorthand property which sets the desired behavior when content does not fit in the parent element box (overflows) in the horizontal and/or vertical direction.
   * @tailwind overflow
   */
  overflow?: Overflow;
  /** Sets what shows when content overflows a block-level element's left and right edges. This may be nothing, a scroll bar, or the overflow content. This property may also be set by using the overflow shorthand property.
   * @tailwind overflow-x
   */
  overflowX?: Overflow;
  /** sets what shows when content overflows a block-level element's top and bottom edges. This may be nothing, a scroll bar, or the overflow content. This property may also be set by using the overflow shorthand property.
   * @tailwind overflow-y
   */
  overflowY?: Overflow;
  /** Utilities for controlling how the browser behaves when reaching the boundary of a scrolling area.
   * @tailwind overscroll
   */
  overscrollBehavior?: OverscrollBehavior;
  /** Sets how an element is positioned in a document. The top, right, bottom, and left properties determine the final location of positioned elements.
   * @tailwind Position
   */
  position?: Position;
  /** Utilities for controlling the top placement of positioned elements
   * @tailwind top
   */
  top?: PositionPlacement | ArbitraryValue;
  /** Utilities for controlling the bottom placement of positioned elements
   * @tailwind bottom
   */
  bottom?: PositionPlacement | ArbitraryValue;
  /** Utilities for controlling the left placement of positioned elements
   * @tailwind left
   */
  left?: PositionPlacement | ArbitraryValue;
  /** Utilities for controlling the right placement of positioned elements
   * @tailwind right
   */
  right?: PositionPlacement | ArbitraryValue;
  /** Utilities for controlling the inset of positioned elements
   * @tailwind inset
   */
  inset?: PositionPlacement | ArbitraryValue;
  /** Utilities for controlling the inset of positioned elements
   * @tailwind inset-x
   */
  insetX?: PositionPlacement | ArbitraryValue;
  /** Utilities for controlling the inset of positioned elements
   * @tailwind inset-y
   */
  insetY?: PositionPlacement | ArbitraryValue;
  /** Utilities for controlling the visibility of an element.
   * @tailwind Visibility
   */
  visibility?: Visibility;
  /** Sets the z-order of a positioned element and its descendants or flex and grid items. Overlapping elements with a larger z-index cover those with a smaller one.
   * @tailwind z
   */
  zIndex?: ZIndex;
}

export interface TransformStyleProps {
  /** Utilities for controlling the scale of an element.
   * @tailwind scale
   */
  scale?: Scale | ArbitraryValue;
  /** Utilities for controlling the scale of an element.
   * @tailwind scale-x
   */
  scaleX?: Scale | ArbitraryValue;
  /** Utilities for controlling the scale of an element.
   * @tailwind scale-y
   */
  scaleY?: Scale | ArbitraryValue;
  /** Utilities for controlling the rotate of an element.
   * @tailwind rotate
   */
  rotate?: Rotate | ArbitraryValue;
  /** Utilities for controlling the skew of an element.
   * @tailwind skew-x
   */
  skewX?: Skew | ArbitraryValue;
  /** Utilities for controlling the skew of an element.
   * @tailwind skew-y
   */
  skewY?: Skew;
  /** Utilities for controlling the translate of an element.
   * @tailwind translate-x
   */
  translateX?: Translate | ArbitraryValue;
  /** Utilities for controlling the translate of an element.
   * @tailwind translate-y
   */
  translateY?: Translate | ArbitraryValue;
  /** Utilities for controlling the origin of an element.
   * @tailwind origin
   */
  transformOrigin?: TransformOrigin;
}

export interface SpacingStyleProps {
  /** Apply inner spacing on all sides.
   * @tailwind p
   */
  spacing?: SpacingAlias | ArbitraryValue;
  /** Apply inner spacing on the leading and trailing sides.
   * @tailwind px
   */
  spacingX?: SpacingAlias | ArbitraryValue;
  /** Apply inner spacing on the top and bottom sides.
   * @tailwind py
   */
  spacingY?: SpacingAlias | ArbitraryValue;
  /** Apply inner spacing on the trailing side.
   * @tailwind pr
   */
  spacingRight?: SpacingAlias | ArbitraryValue;
  /** Apply inner spacing on the leading side.
   * @tailwind pe
   */
  spacingEnd?: SpacingAlias | ArbitraryValue;
  /** Apply inner spacing on the leading side.
   * @tailwind pl
   */
  spacingLeft?: SpacingAlias | ArbitraryValue;
  /** Apply inner spacing on the leading side.
   * @tailwind ps
   */
  spacingStart?: SpacingAlias | ArbitraryValue;
  /** Apply inner spacing on the top side.
   * @tailwind pt
   */
  spacingTop?: SpacingAlias | ArbitraryValue;
  /** Apply negative outer spacing on all sides.
   * @tailwind -m
   */
  /** Apply inner spacing on the bottom side.
   * @tailwind pb
   */
  spacingBottom?: SpacingAlias | ArbitraryValue;
  /** Apply negative outer spacing to all sides.
   * @tailwind -m
   */
  offset?: SpacingAlias | ArbitraryValue | 'auto';
  /** Apply negative outer spacing on the top and bottom sides.
   * @tailwind -my
   */
  offsetY?: SpacingAlias | ArbitraryValue | 'auto';
  /** Apply negative outer spacing on the leading and trailing sides.
   * @tailwind -mx
   */
  offsetX?: SpacingAlias | ArbitraryValue | 'auto';
  /** Apply negative outer spacing on the bottom side.
   * @tailwind -mb
   */
  offsetBottom?: SpacingAlias | ArbitraryValue | 'auto';
  /** Apply negative outer spacing on the trailing side.
   * @tailwind -me
   */
  offsetEnd?: SpacingAlias | ArbitraryValue | 'auto';
  /** Apply negative outer spacing on the trailing side.
   * @tailwind -mr
   */
  offsetRight?: SpacingAlias | ArbitraryValue | 'auto';
  /** Apply negative outer spacing on the leading side.
   * @tailwind -ms
   */
  offsetStart?: SpacingAlias | ArbitraryValue | 'auto';
  /** Apply negative outer spacing on the leading side.
   * @tailwind -ml
   */
  offsetLeft?: SpacingAlias | ArbitraryValue | 'auto';
  /** Apply negative outer spacing on the top side.
   * @tailwind -mt
   */
  offsetTop?: SpacingAlias | ArbitraryValue | 'auto';
  /** Apply negative outer spacing to all sides.
   * @tailwind m
   */
  margin?: SpacingAlias | ArbitraryValue | 'auto';
  /** Apply negative outer spacing on the top and bottom sides.
   * @tailwind my
   */
  marginY?: SpacingAlias | ArbitraryValue | 'auto';
  /** Apply negative outer spacing on the leading and trailing sides.
   * @tailwind mx
   */
  marginX?: SpacingAlias | ArbitraryValue | 'auto';
  /** Apply negative outer spacing on the bottom side.
   * @tailwind mb
   */
  marginBottom?: SpacingAlias | ArbitraryValue | 'auto';
  /** Apply negative outer spacing on the trailing side.
   * @tailwind me
   */
  marginEnd?: SpacingAlias | ArbitraryValue | 'auto';
  /** Apply negative outer spacing on the trailing side.
   * @tailwind mr
   */
  marginRight?: SpacingAlias | ArbitraryValue | 'auto';
  /** Apply negative outer spacing on the leading side.
   * @tailwind ms
   */
  marginStart?: SpacingAlias | ArbitraryValue | 'auto';
  /** Apply negative outer spacing on the leading side.
   * @tailwind ml
   */
  marginLeft?: SpacingAlias | ArbitraryValue | 'auto';
  /** Apply negative outer spacing on the top side.
   * @tailwind mt
   */
  marginTop?: SpacingAlias | ArbitraryValue | 'auto';
  /**
   * Utilities for controlling gutters between grid and flexbox items.
   * @tailwind gap
   */
  gap?: SpacingAlias | ArbitraryValue;
  /** Control the horizontal gutters between grid and flexbox items. If set to auto, will add an equal space between items.
   * @tailwind gap-x
   */
  gapX?: SpacingAlias | ArbitraryValue;
  /** Control the vertical gutters between grid and flexbox items. If set to auto, will add an equal space between items.
   * @tailwind gap-y
   */
  gapY?: SpacingAlias | ArbitraryValue;
  /** Utilities for controlling the spacing between elements.
   * @tailwind space-x
   */
  spaceX?: SpacingAlias | ArbitraryValue | 'reverse';
  /** Utilities for controlling the spacing between elements.
   * @tailwind space-y
   */
  spaceY?: SpacingAlias | ArbitraryValue | 'reverse';
}

export interface FlexStyleProps {
  /** Utilities for controlling how flex items both grow and shrink.
   * @tailwind flex
   */
  flex?: Flex;
  /** Sets how flex items are placed in the flex container defining the main axis and the direction (normal or reversed).
   * @tailwind flex
   */
  flexDirection?: FlexDirection;
  /** Sets the flex grow factor, which specifies how much of the flex container's remaining space should be assigned to the flex item's main size.
   * @tailwind grow
   */
  flexGrow?: FlexGrow;
  /** Sets the flex shrink factor of a flex item. If the size of all flex items is larger than the flex container, items shrink to fit according to flex-shrink.
   * @tailwind shrink
   */
  flexShrink?: FlexShrink;
  /** Sets whether flex items are forced onto one line or can wrap onto multiple lines. If wrapping is allowed, it sets the direction that lines are stacked.
   * @tailwind flex
   */
  flexWrap?: FlexWrap;
  /** Defines how the browser distributes space between and around content items along the main-axis of a flex container, and the inline axis of a grid container.
   * @tailwind justify
   */
  justifyContent?: JustifyContent;
  /** Sets the align-self value on all direct children as a group. In Flexbox, it controls the alignment of items on the Cross Axis. In Grid Layout, it controls the alignment of items on the Block Axis within their grid area.
   * @tailwind items
   */
  alignItems?: AlignItems;
  /** Utilities for controlling how an individual flex or grid item is positioned along its container's cross axis.
   * @tailwind self
   */
  alignSelf?: AlignSelf;
  /** Sets the distribution of space between and around content items along a flexbox's cross-axis or a grid's block axis.
   * @tailwind content
   */
  alignContent?: AlignContent;
  /** Utilities for controlling how content is justified and aligned at the same time.
   * @tailwind place-content
   */
  placeContent?: PlaceContent;
  /** Utilities for controlling how items are justified and aligned at the same time.
   * @tailwind place-items
   */
  placeItems?: PlaceItems;
  /** Utilities for controlling how an individual item is justified and aligned at the same time.
   * @tailwind place-self
   */
  placeSelf?: PlaceSelf;
}

export interface GridStyleProps {
  /** Utilities for specifying the columns in a grid layout.
   * @tailwind grid-cols
   */
  gridTemplateColumns?: GridTemplateColumns;
  /** Utilities for controlling how elements are sized and placed across grid columns.
   * @tailwind col-span
   */
  gridColumnSpan?: GridColumnSpan;
  /** Utilities for controlling the start and end of a grid column.
   * @tailwind col-start
   */
  gridColumnStart?: GridColumnStart;
  /** Utilities for controlling the start of a grid column.
   * @tailwind col-end
   */
  gridColumnEnd?: GridColumnEnd;
  /** Utilities for controlling the start and end of a grid column.
   * @tailwind grid-rows
   */
  gridTemplateRows?: GridTemplateRows;
  /** Utilities for controlling how elements are sized and placed across grid rows.
   * @tailwind row-span
   */
  gridRowSpan?: GridRowSpan;
  /** Utilities for controlling the start of a grid row.
   * @tailwind row-start
   */
  gridRowStart?: GridRowStart;
  /** Utilities for controlling the end of a grid row.
   * @tailwind row-end
   */
  gridRowEnd?: GridRowEnd;
}

export interface SizingStyleProps {
  /** Sets the height of an element
   * @tailwind h
   */
  height?: Height;
  /** Sets the height of an element
   * @tailwind min-h
   */
  minHeight?: MinHeight;
  /** Sets the maximum height of an element
   * @tailwind max-h
   */
  maxHeight?: MaxHeight;
  /** Sets the width of an element
   * @tailwind w
   */
  width?: Width;
  /** Sets the minimum width of an element
   * @tailwind min-w
   */
  minWidth?: MinWidth;
  /** Sets the maximum width of an element
   * @tailwind max-w
   */
  maxWidth?: MaxWidth;
  /** Utilities for setting the width and height of an element at the same time.
   * @tailwind size
   */
  size?: Size;
}

export interface TypographyStyleProps {
  /** Utility for setting bundle of typography styles such as font size, line height & font weight
   * @tailwind text-variant
   */
  textVariant?: TextVariant;
  /** Utility for controlling the color of a Text or Icon element
   * @tailwind text
   */
  color?: Color;
  /** Utility for controlling the font family of a Text element
   * @tailwind font
   */
  fontFamily?: FontFamily;
  /** Utility for controlling the font size of a Text element
   * @tailwind text
   */
  fontSize?: FontSize | ArbitraryValue;
  /** Utilities for controlling the font smoothing of an element.
   * @tailwind FontSmoothing
   */
  fontSmoothing?: FontSmoothing;
  /** Utility for controlling the font weight of a Text element
   * @tailwind font-weight
   */
  fontWeight?: number;
  /** Utility for controlling the line height of a Text element
   * @tailwind leading
   */
  lineHeight?: LineHeight | ArbitraryValue;
  /** Utility for controlling the text alignment of a Text element
   * @tailwind text
   */
  textAlign?: TextAlign;
  /** Utility for controlling the text transformation of a Text element
   * @tailwind TextTransform
   */
  textTransform?: TextTransform;
  /** Utilities for clamping text to a specific number of lines.
   * @tailwind line-clamp
   */
  lineClamp?: LineClampAlias;
  /** Utilities for controlling the decoration of text.
   * @tailwind TextDecoration
   */
  textDecoration?: TextDecoration;
  /** Utilities for controlling the color of text decorations.
   * @tailwind decoration
   */
  textDecorationColor?: Color;
  /** Utilities for controlling the style of text decorations.
   * @tailwind decoration
   */
  textDecorationStyle?: TextDecorationStyle;
  /** Utilities for controlling the thickness of text decorations.
   * @tailwind decoration
   */
  textDecorationThickness?: TextDecorationThickness;
  /** Utilities for controlling the offset of a text underline.
   * @tailwind underline-offset
   */
  textUnderlineOffset?: TextUnderlineOffset;
  /** Utilities for controlling how text overflows.
   * @tailwind text
   */
  textOverflow?: TextOverflow;
  /** Prevent text from wrapping and truncate overflowing text with an ellipsis (…) if needed.
   * @tailwind truncate
   */
  truncate?: boolean;
  /** Utilities for controlling how text is wrapped.
   * @tailwind text
   */
  textWrap?: TextWrap;
  /** Utilities for controlling the amount of empty space shown before text in a block.
   * @tailwind indent
   */
  indent?: TextIndent;
  /** Utilities for controlling the vertical alignment of an inline or table-cell box.
   * @tailwind align
   */
  verticalAlign?: VerticalAlign;
  /** Utilities for controlling how text is white spaced.
   * @tailwind whitespace
   */
  whitespace?: TextWhitespace;
  /** Utilities for controlling how text is broken into lines.
   * @tailwind break
   */
  break?: TextWordBreak;
  /** Utilities for controlling hyphenation of text.
   * @tailwind hyphens
   */
  hyphens?: TextHyphens;
}

export interface BackgroundStyleProps {
  /** Utility for controlling an element's background color.
   * @tailwind bg
   */
  bg?: Color;
}

export interface SvgStyleProps {
  /** Utilities for controlling the color of an SVG element.
   * @tailwind fill
   */
  fill?: Color;
  /** Utilities for controlling the color of an SVG element.
   * @tailwind stroke
   */
  strokeColor?: Color;
  /** Utilities for controlling the width of an SVG element.
   * @tailwind stroke
   */
  strokeWidth?: StrokeWidth;
}

export interface EffectStyleProps {
  /** Utilities for controlling the box shadow of an element.
   * @tailwind shadow
   */
  shadow?: BoxShadow;
  /** Utilities for controlling the color of a box shadow.
   * @tailwind shadow
   */
  shadowColor?: Color;
  /** Utilities for controlling the opacity of an element.
   * @tailwind opacity
   */
  opacity?: Opacity;
  /** Utilities for controlling how an element should blend with the background.
   * @tailwind mix-blend
   */
  mixBlendMode?: MixBlendMode;
  /** Utilities for controlling how an element's background image should blend with its background color.
   * @tailwind bg-blend
   */
  bgBlendMode?: BgBlendMode;
}

export interface AnimationStyleProps {
  /** Utilities for controlling which CSS properties transition.
   * @tailwind transition
   */
  transition?: TransitionProperty;
  /** Utilities for controlling the duration of CSS transitions.
   * @tailwind duration
   */
  transitionDuration?: TransitionDuration;
  /** Utilities for controlling the easing of CSS transitions.
   * @tailwind ease
   */
  transitionTiming?: TransitionTiming;
  /** Utilities for controlling the delay of CSS transitions.
   * @tailwind delay
   */
  transitionDelay?: TransitionDelay;
  /** Utilities for animating elements with CSS animations.
   * @tailwind animation
   */
  animation?: AnimationName;
}

export interface InteractivityStyleProps {
  /** Utilities for suppressing native form control styling.
   * @tailwind appearance
   */
  appearance?: Appearance;
  /** Utilities for controlling the cursor style when hovering over an element.
   * @tailwind cursor
   */
  cursor?: Cursor;
  /** Utilities for controlling the color of the text input cursor.
   * @tailwind caret
   */
  caretColor?: Color;
  /** Utilities for controlling whether an element responds to pointer events.
   * @tailwind pointer-events
   */
  pointerEvents?: PointerEvents;
  /** Utilities for controlling how an element can be resized.
   * @tailwind resize
   */
  resize?: ResizeType;
  /** Utilities for controlling scroll behavior.
   * @tailwind scroll
   */
  scrollBehavior?: ScrollBehavior;
  /** Utilities for controlling how strictly snap points are enforced in a snap container.
   * @tailwind snap
   */
  scrollSnap?: ScrollSnapType;
  /** Utilities for controlling the scroll offset around all sides of outside of snap container.
   * @tailwind scroll-m
   */
  scrollSnapGap?: ScrollSnapGap;
  /** Utilities for controlling the scroll offset around top side of outside of snap container.
   * @tailwind scroll-mt
   */
  scrollSnapGapTop?: ScrollSnapGap;
  /** Utilities for controlling the scroll offset around bottom side of outside of snap container.
   * @tailwind scroll-mb
   */
  scrollSnapGapBottom?: ScrollSnapGap;
  /** Utilities for controlling the scroll offset around start side of outside of snap container.
   * @tailwind scroll-ms
   */
  scrollSnapGapStart?: ScrollSnapGap;
  /** Utilities for controlling the scroll offset around end side of outside of snap container.
   * @tailwind scroll-me
   */
  scrollSnapGapEnd?: ScrollSnapGap;
  /** Utilities for controlling the scroll offset around horizontal sides of outside of snap container.
   * @tailwind scroll-mx
   */
  scrollSnapGapX?: ScrollSnapGap;
  /** Utilities for controlling the scroll offset around vertical sides of outside of snap container.
   * @tailwind scroll-my
   */
  scrollSnapGapY?: ScrollSnapGap;
  /** Utilities for controlling an element's scroll offset within a snap container.
   * @tailwind scroll-p
   */
  scrollSnapSpacing?: ScrollSnapSpacing;
  /** Utilities for controlling the scroll offset around top side within snap container.
   * @tailwind scroll-pt
   */
  scrollSnapSpacingTop?: ScrollSnapSpacing;
  /** Utilities for controlling the scroll offset around bottom side within snap container.
   * @tailwind scroll-pb
   */
  scrollSnapSpacingBottom?: ScrollSnapSpacing;
  /** Utilities for controlling the scroll offset around start side within snap container.
   * @tailwind scroll-ps
   */
  scrollSnapSpacingStart?: ScrollSnapSpacing;
  /** Utilities for controlling the scroll offset around end side within snap container.
   * @tailwind scroll-pe
   */
  scrollSnapSpacingEnd?: ScrollSnapSpacing;
  /** Utilities for controlling the scroll offset around horizontal sides within snap container.
   * @tailwind scroll-px
   */
  scrollSnapSpacingX?: ScrollSnapSpacing;
  /** Utilities for controlling the scroll offset around vertical sides within snap container.
   * @tailwind scroll-py
   */
  scrollSnapSpacingY?: ScrollSnapSpacing;
  /** Utilities for controlling the scroll snap alignment of an element.
   * @tailwind snap
   */
  scrollSnapAlign?: ScrollSnapAlign;
  /** Utilities for controlling whether you can skip past possible snap positions.
   * @tailwind snap
   */
  scrollSnapStop?: ScrollSnapStop;
  /** Utilities for controlling how an element can be scrolled and zoomed on touchscreens.
   * @tailwind touch
   */
  touchAction?: TouchAction;
  /** Utilities for controlling whether the user can select text in an element.
   * @tailwind select
   */
  userSelect?: UserSelect;
  /** Utilities for optimizing upcoming animations of elements that are expected to change.
   * @tailwind will-change
   */
  willChange?: WillChange;
}

export interface TableStyleProps {
  /** Utilities for controlling whether table borders should collapse or be separated.
   * @tailwind border
   */
  tableBorderCollapse?: TableBorderCollapse;
  /** Utilities for controlling the spacing between cells in a table.
   * @tailwind border-spacing
   */
  tableBorderSpacing?: TableBorderSpacing;
  /** Utilities for controlling the spacing horizontally of cells in a table.
   * @tailwind border-spacing-x
   */
  tableBorderSpacingX?: TableBorderSpacing;
  /** Utilities for controlling the spacing vertically of cells in a table.
   * @tailwind border-spacing-y
   */
  tableBorderSpacingY?: TableBorderSpacing;
  /** Utilities for controlling the layout of a table.
   * @tailwind table
   */
  tableLayout?: TableLayout;
  /** Utilities for controlling the side of a table caption.
   * @tailwind caption
   */
  tableCaptionSide?: TableCaptionSide;
}

export interface GroupStyleProps {
  /** When you need to style an element based on the state of some parent element, mark the parent with the group class, and use group-* modifiers like group-hover to style the target element
   * @tailwind group
   */
  group?: boolean | string;
}

export interface AllStyleProps
  extends Partial<
    LayoutStyleProps &
      TransformStyleProps &
      BackgroundStyleProps &
      FlexStyleProps &
      EffectStyleProps &
      BorderStyleProps &
      SpacingStyleProps &
      TypographyStyleProps &
      SizingStyleProps &
      AnimationStyleProps &
      InteractivityStyleProps &
      TableStyleProps &
      SvgStyleProps &
      GroupStyleProps
  > {
  className?: string;
}

/** https://tailwindcss.com/docs/hover-focus-and-other-states#pseudo-class-reference */
export interface ModifierProps<T = AllStyleProps> {
  /** Conditionally add styles to after pseudo element
   * @tailwind after:
   */
  _after?: Omit<StyleProps<T>, '_after'>;
  /** Conditionally add styles when the user is only in dark mode
   * @tailwind dark:
   */
  _dark?: Omit<StyleProps<T>, '_dark'>;
  /** Conditionally apply utility classes hover state
   * @tailwind hover:
   */
  _hover?: Omit<StyleProps<T>, '_hover'>;
  /** Conditionally apply utility classes focus state
   * @tailwind focus:
   */
  _focus?: Omit<StyleProps<T>, '_focus'>;
  /** Conditionally apply utility classes focus within state
   * @tailwind focus-within:
   */
  _focusWithin?: Omit<StyleProps<T>, '_focusWithin'>;
  /** Conditionally apply utility classes focus visible state
   * @tailwind focus-visible:
   */
  _focusVisible?: Omit<StyleProps<T>, '_focusVisible'>;
  /** Conditionally apply utility classes active state
   * @tailwind active:
   */
  _active?: Omit<StyleProps<T>, '_active'>;
  /** Conditionally style a link when it has already been visited
   * @tailwind visited:
   */
  _visited?: Omit<StyleProps<T>, '_visited'>;
  /** Style an element if its ID matches the current URL fragment
   * @tailwind target:
   */
  _target?: Omit<StyleProps<T>, '_target'>;
  /** Conditionally apply utility classes to first child
   * @tailwind first:
   */
  _first?: Omit<StyleProps<T>, '_first'>;
  /** Conditionally apply utility classes to last child
   * @tailwind last:
   */
  _last?: Omit<StyleProps<T>, '_last'>;
  /** Style an element if it’s the only child
   * @tailwind only:
   */
  _only?: Omit<StyleProps<T>, '_only'>;
  /** Conditionally apply utility classes to odd child
   * @tailwind odd:
   */
  _odd?: Omit<StyleProps<T>, '_odd'>;
  /** Conditionally apply utility classes to even child
   * @tailwind even:
   */
  _even?: Omit<StyleProps<T>, '_even'>;
  /** Style an element if it’s the first child of its type
   * @tailwind first-of-type:
   */
  _firstOfType?: Omit<StyleProps<T>, '_firstOfType'>;
  /** Style an element if it’s the last child of its type
   * @tailwind last-of-type:
   */
  _lastOfType?: Omit<StyleProps<T>, '_lastOfType'>;
  /** Style an element if it’s the only child of its type
   * @tailwind only-of-type:
   */
  _onlyOfType?: Omit<StyleProps<T>, '_onlyOfType'>;
  /** Style an element if it has no content
   * @tailwind empty:
   */
  _empty?: Omit<StyleProps<T>, '_empty'>;
  /** Conditionally apply utility classes disabled state
   * @tailwind disabled:
   */
  _disabled?: Omit<StyleProps<T>, '_disabled'>;
  /** Style an input when it’s enabled using the enabled modifier
   * @tailwind enabled:
   */
  _enabled?: Omit<StyleProps<T>, '_enabled'>;
  /** Conditionally apply utility classes checked state
   * @tailwind checked:
   */
  _checked?: Omit<StyleProps<T>, '_checked'>;
  /** Style a checkbox or radio button in an indeterminate state
   * @tailwind indeterminate:
   */
  _indeterminate?: Omit<StyleProps<T>, '_indeterminate'>;
  /** Style an option, checkbox or radio button that was the default value when the page initially loaded
   * @tailwind default:
   */
  _default?: Omit<StyleProps<T>, '_default'>;
  /** Style an input when it’s required
   * @tailwind required:
   */
  _required?: Omit<StyleProps<T>, '_required'>;
  /** Style an input when it’s valid
   * @tailwind valid:
   */
  _valid?: Omit<StyleProps<T>, '_valid'>;
  /** Style an input when it’s invalid
   * @tailwind invalid:
   */
  _invalid?: Omit<StyleProps<T>, '_invalid'>;
  /** Style an input when its value is within a specified range limit
   * @tailwind in-range:
   */
  _inRange?: Omit<StyleProps<T>, '_inRange'>;
  /** Style an input when its value is outside of a specified range limit
   * @tailwind out-of-range:
   */
  _outOfRange?: Omit<StyleProps<T>, '_outOfRange'>;
  /** Style an input when the placeholder is shown
   * @tailwind placeholder-shown:
   */
  _placeholderShown?: Omit<StyleProps<T>, '_placeholderShown'>;
  /** Style an input when it has been autofilled by the browser
   * @tailwind autofill:
   */
  _autofill?: Omit<StyleProps<T>, '_autofill'>;
  /** Style an input when it is read-only
   * @tailwind read-only:
   */
  _readonly?: Omit<StyleProps<T>, '_readonly'>;
  /** Style the button in file inputs
   * @tailwind file:
   */
  _file?: Omit<StyleProps<T>, '_file'>;
  /** Style the active text selection
   * @tailwind selection:
   */
  _selection?: Omit<StyleProps<T>, '_selection'>;
  /** Style the backdrop of a native <dialog> element
   * @tailwind backdrop:
   */
  _backdrop?: Omit<StyleProps<T>, '_backdrop'>;
  /**
   * Conditionally apply utility classes to the sm breakpoint and above.
   * @tailwind sm:
   */
  _sm?: Omit<StyleProps<T>, '_sm'>;
  /**
   * Conditionally apply utility classes to the md breakpoint and above.
   * @tailwind md:
   */
  _md?: Omit<StyleProps<T>, '_md'>;
  /**
   * Conditionally apply utility classes to the lg breakpoint and above.
   * @tailwind lg:
   */
  _lg?: Omit<StyleProps<T>, '_lg'>;
  /**
   * Conditionally apply utility classes to the xl breakpoint and above.
   * @tailwind xl:
   */
  _xl?: Omit<StyleProps<T>, '_xl'>;
  /**
   * Conditionally apply utility classes to the 2xl breakpoint and above.
   * @tailwind 2xl:
   */
  _2xl?: Omit<StyleProps<T>, '_2xl'>;
  /** Conditionally add styles when the user has requested reduced motion
   * @tailwind motion-reduce:
   */
  _motionReduce?: Omit<StyleProps<T>, '_motionReduce'>;
  /** Modifier that only adds styles when the user has not requested reduced motion
   * @tailwind motion-safe:
   */
  _motionSafe?: Omit<StyleProps<T>, '_motionSafe'>;
  /** Modifier to conditionally add styles when the user has requested more contrast
   * @tailwind contrast-more:
   */
  _contrastMore?: Omit<StyleProps<T>, '_contrastMore'>;
  /** Modifier you can use to conditionally add styles when the user has requested less contrast
   * @tailwind contrast-less:
   */
  _contrastLess?: Omit<StyleProps<T>, '_contrastLess'>;
  /** Modifier to conditionally add styles when the user has enabled a forced color mode
   * @tailwind forced-colors:
   */
  _forcedColors?: Omit<StyleProps<T>, '_forcedColors'>;
  /** Modifier to conditionally add styles when the user has enabled a forced color mode
   * @tailwind placeholder:
   */
  _placeholder?: Omit<StyleProps<T>, '_placeholder'>;
  /** Modifier to conditionally add styles that indicate the "busy" state
   * @tailwind aria-busy:
   */
  _ariaBusy?: Omit<StyleProps<T>, '_ariaBusy'>;
  /** Modifier to conditionally add styles that indicate the "checked" state
   * @tailwind aria-checked:
   */
  _ariaChecked?: Omit<StyleProps<T>, '_ariaChecked'>;
  /** Modifier to conditionally add styles that indicate the "hidden" state
   * @tailwind aria-hidden:
   */
  _ariaHidden?: Omit<StyleProps<T>, '_ariaHidden'>;
  /** Modifier to conditionally add styles that indicate the "pressed" state
   * @tailwind aria-pressed:
   */
  _ariaPressed?: Omit<StyleProps<T>, '_ariaPressed'>;
  /** Modifier to conditionally add styles that indicate the "readonly" state
   * @tailwind aria-readonly:
   */
  _ariaReadonly?: Omit<StyleProps<T>, '_ariaReadonly'>;
  /** Modifier to conditionally add styles that indicate the "required" state
   * @tailwind aria-required:
   */
  _ariaRequired?: Omit<StyleProps<T>, '_ariaRequired'>;
  /** Modifier to conditionally add styles that indicate the current "selected" state of various widgets
   * @tailwind aria-selected:
   */
  _ariaSelected?: Omit<StyleProps<T>, '_ariaSelected'>;
  /** Modifier to conditionally apply styles when element is disabled
   * @tailwind aria-disabled:
   */
  _ariaDisabled?: Omit<StyleProps<T>, '_ariaDisabled'>;
  /** Modifier to conditionally apply styles when element is expanded
   * @tailwind aria-expanded:
   */
  _ariaExpanded?: Omit<StyleProps<T>, '_ariaExpanded'>;
  /** Modifier to conditionally apply styles when element is disabled
   * @tailwind data-[disabled=true]:
   */
  _dataDisabled?: Omit<StyleProps<T>, '_dataDisabled'>;
  /** Conditionally add styles to cmdk group
   * @tailwind cmdkGroup:
   */
  _cmdkGroup?: Omit<StyleProps<T>, '_cmdkGroup'>;
  /**
   * Conditionally add styles to cmdk group heading
   * @tailwind cmdkGroupHeading:
   */
  _cmdkGroupHeading?: Omit<StyleProps<T>, '_cmdkGroupHeading'>;
  /**
   * Conditionally add styles to cmdk group
   * @tailwind cmdkGroupItems:
   */
  _cmdkGroupItems?: Omit<StyleProps<T>, '_cmdkGroupItems'>;
  /** Conditionally add styles to cmdk group item
   * @tailwind cmdkItem:
   */
  _cmdkItem?: Omit<StyleProps<T>, '_cmdkItem'>;
  /** Conditionally add styles to cmdk input
   * @tailwind cmdkItemSvg:
   */
  _cmdkItemSvg?: Omit<StyleProps<T>, '_cmdkItemSvg'>;
  /** Conditionally add styles to cmdk input wrapper
   * @tailwind cmdkInput:
   */
  _cmdkInput?: Omit<StyleProps<T>, '_cmdkInput'>;
  /** Conditionally add styles to cmdk input wrapper
   * @tailwind cmdkInputSvg:
   */
  _cmdkInputSvg?: Omit<StyleProps<T>, '_cmdkInputSvg'>;
}

export type StyleProps<T = AllStyleProps> = T & ModifierProps<T>;
export type StyleProp = keyof StyleProps;
export type StyleModifier = keyof ModifierProps;

export interface AsChildProps {
  /**
   *  When asChild is set to true, the component's child will be cloned and passed
   * the props and behavior required to make it functional.
   */
  asChild?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                          UNIVERSAL COMPONENT PROPS                         */
/* -------------------------------------------------------------------------- */

export interface UniversalBoxProps extends StyleProps, AsChildProps {}

export interface UniversalStackProps extends StyleProps, AsChildProps {}

export interface UniversalTextProps extends StyleProps, AsChildProps {
  variant?: TextVariant;
}

export interface UniversalPressableProps extends StyleProps, AsChildProps {
  onPress?: () => void;
}

export interface UniversalImageProps extends StyleProps, AsChildProps {
  /** The source URL of the image. */
  src?: string;
  /**  Provides fallback (alternate) text to display when the image specified by the Image element is not loaded. */
  alt?: string;
}

export interface UniversalAvatarProps extends StyleProps, AsChildProps {
  /** The shape of the Avatar. */
  shape: BorderRadius;
}

export interface UniversalTextInputProps extends StyleProps {
  disabled?: boolean;
  required?: boolean;
}

export interface IconStyleProps
  extends Omit<
    AllStyleProps,
    'fontFamily' | 'fontSize' | 'fontWeight' | 'lineHeight'
  > {
  /** TODO: dynamically get icon names from icon font */
  name: IconName;
}

export interface UniversalIconProps
  extends IconStyleProps,
    ModifierProps<IconStyleProps>,
    AsChildProps {}

export type { IconName };
