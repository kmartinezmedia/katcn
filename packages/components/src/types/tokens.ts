/* -------------------------------------------------------------------------- */
/*                                    COLOR                                   */
/* -------------------------------------------------------------------------- */
// https://uicolors.app/browse/tailwind-colors
type PaletteType = keyof PaletteConfig;
type PaletteValue =
  | { hue: Hue; step: HueStep; opacity?: string }
  | `${number} ${number} ${number}`;
type Palette = { [key in PaletteType]: keyof PaletteConfig[key] };

type Hue =
  | 'rose'
  | 'pink'
  | 'fuchsia'
  | 'purple'
  | 'violet'
  | 'indigo'
  | 'blue'
  | 'sky'
  | 'cyan'
  | 'teal'
  | 'emerald'
  | 'green'
  | 'lime'
  | 'yellow'
  | 'amber'
  | 'orange'
  | 'red'
  | 'stone'
  | 'neutral'
  | 'zinc'
  | 'gray'
  | 'slate';

type HueStep =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | '950';

type SpectrumColor = `${Hue}-${HueStep}`;

type CorePaletteAlias = 'accent' | 'alert' | 'brand' | 'positive' | 'warning';
type CorePalette = Record<CorePaletteAlias, PaletteValue>;

type BackgroundPaletteAlias = 'primary' | 'secondary';
type BackgroundPalette = Record<BackgroundPaletteAlias, PaletteValue>;

type BackgroundWashPaletteAlias = `${CorePaletteAlias}-wash`;
type BackgroundWashPalette = Record<BackgroundWashPaletteAlias, PaletteValue>;

type ElevationPaletteAlias =
  | 'elevation-1'
  | 'elevation-2'
  | 'elevation-3'
  | 'scrim';
type ElevationPalette = Record<ElevationPaletteAlias, PaletteValue>;

type ForegroundPaletteAlias = 'primary' | 'secondary' | 'tertiary' | 'on-color';
type ForegroundPalette = Record<ForegroundPaletteAlias, PaletteValue>;

type LinePaletteAlias = 'primary' | 'secondary';
type LinePalette = Record<LinePaletteAlias, PaletteValue>;

type AlwaysPaletteAlias = 'white' | 'black' | 'transparent';

/* ----------------------------- SEMANTIC COLORS ---------------------------- */

type ForegroundColor =
  | CorePaletteAlias
  | ForegroundPaletteAlias
  | AlwaysPaletteAlias;

type LineColor = CorePaletteAlias | LinePaletteAlias | AlwaysPaletteAlias;

type BackgroundColor =
  | CorePaletteAlias
  | BackgroundPaletteAlias
  | BackgroundWashPaletteAlias
  | ElevationPaletteAlias
  | AlwaysPaletteAlias;

/* -------------------------------------------------------------------------- */
/*                                 TYPOGRAPHY                                 */
/* -------------------------------------------------------------------------- */
type TextVariant =
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

type FontFamilyGlobalAlias =
  | 'icons'
  | 'sans'
  | 'sans-condensed'
  | 'serif-text'
  | 'serif-display';

type FontFamilyGlobalConfig = Record<
  FontFamilyGlobalAlias,
  { fallbacks: string[]; name: string }
>;

type FontWeightNumeric =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

type FontWeightDescriptive =
  | 'thin'
  | 'extralight'
  | 'light'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';
type LetterSpacing =
  | 'tighter'
  | 'tight'
  | 'normal'
  | 'wide'
  | 'wider'
  | 'widest';
type LineClampAlias = '1' | '2' | '3' | '4' | '5' | '6';
type LineHeight = number;
type FontSize = number;

type TextTransformConfig = Record<TextVariant, TextTransform>;
type FontSizeConfig = Record<TextVariant, FontSize>;
type FontFamilyConfig = Record<TextVariant, FontFamilyGlobalAlias>;
type FontWeightConfig = Record<TextVariant, FontWeightDescriptive>;
type LineHeightConfig = Record<TextVariant, LineHeight>;
type ConfigurableTextProperty =
  | 'fontFamily'
  | 'fontSize'
  | 'fontWeight'
  | 'lineHeight'
  | 'textTransform';

/* -------------------------------------------------------------------------- */
/*                                   SIZING                                   */
/* -------------------------------------------------------------------------- */

type AvatarSize = 'sm' | 'md' | 'lg';
type AvatarSizeConfig = Record<AvatarSize, number>;

type IconSize = 'sm' | 'md' | 'lg';
type IconSizeConfig = Record<IconSize, number>;

/* -------------------------------------------------------------------------- */
/*                                    SHAPE                                   */
/* -------------------------------------------------------------------------- */

type Shape = 'circle' | 'square' | 'rounded' | 'capsule';
type AvatarShape = 'circle' | 'square' | 'rounded';

/* -------------------------------------------------------------------------- */
/*                                   LAYOUT                                   */
/* -------------------------------------------------------------------------- */
type AspectRatio = `${number}:${number}`;
type AspectRatioConfig = Record<AspectRatio, string>;

type SpacingAlias =
  | '0'
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
  | '13'
  | '14';
type SpacingConfig = Record<SpacingAlias, number>;

type ZIndex = 'auto' | '0' | '10' | '20' | '30' | '40' | '50';
type ZIndexConfig = Record<ZIndex, string>;

/* -------------------------------------------------------------------------- */
/*                                OTHER TOKENS                                */
/* -------------------------------------------------------------------------- */

type BorderRadius = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
type BorderRadiusConfig = Record<BorderRadius, number>;

type Elevation = '1' | '2' | '3';
type ElevationConfig = Record<Elevation, BoxShadowConfig>;

type BorderWidth = 'none' | 'thin' | 'medium' | 'thick';
type BorderWidthConfig = Record<BorderWidth, number>;

type BoxShadowConfig = {
  color: string;
  offsetX: number;
  offsetY: number;
  blurRadius: number;
  spreadRadius: number;
}[];

type Opacity =
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
type ColorModeConfig = {
  light: ColorsConfig;
  dark: ColorsConfig;
};

type ColorsConfig = {
  palette: PaletteConfig;
  spectrum: SpectrumConfig;
  elevation: ElevationConfig;
};

type SpectrumValue = Record<HueStep, string>;
type SpectrumConfig = Record<Hue, SpectrumValue>;

type PaletteConfig = {
  core: CorePalette;
  background: BackgroundPalette;
  backgroundWash: BackgroundWashPalette;
  elevation: ElevationPalette;
  foreground: ForegroundPalette;
  line: LinePalette;
};

type ScaleConfig = {
  avatarSizes: AvatarSizeConfig;
  iconSizes: IconSizeConfig;
  spacing: SpacingConfig;
  borderRadius: BorderRadiusConfig;
  borderWidth: BorderWidthConfig;
  fontFamily: FontFamilyConfig;
  fontSize: FontSizeConfig;
  fontWeight: FontWeightConfig;
  lineHeight: LineHeightConfig;
  textTransform: TextTransformConfig;
};

type ScaleModeConfig = {
  xSmall: ScaleConfig;
  small: ScaleConfig;
  medium: ScaleConfig;
  large: ScaleConfig;
  xLarge: ScaleConfig;
  xxLarge: ScaleConfig;
  xxxLarge: ScaleConfig;
};

type UniversalTokensConfig = {
  colorMode: ColorModeConfig;
  scaleMode: ScaleModeConfig;
  aspectRatio: Record<string, string>;
  fontFamily: FontFamilyGlobalConfig;
  zIndex: ZIndexConfig;
};

/* -------------------------------------------------------------------------- */
/*                                    MODES                                   */
/* -------------------------------------------------------------------------- */
type PlatformMode = 'web' | 'ios' | 'android';

type ColorMode = keyof ColorModeConfig;
type ColorModeForApp = ColorMode | 'system';

type ScaleMode = keyof ScaleModeConfig;
type ScaleModeForApp = ScaleMode | 'system';

type HighContrastMode = boolean;
type RegionMode = '🇺🇸 US' | '🇩🇪 DE' | '🇫🇷 FR' | '🇨🇳 CN';

interface Modes {
  colorMode: ColorMode;
  scaleMode: ScaleMode;
}

/* -------------------------------------------------------------------------- */
/*                                   MOTION                                   */
/* -------------------------------------------------------------------------- */
type Animation =
  | 'none'
  | 'spin'
  | 'ping'
  | 'pulse'
  | 'bounce'
  | 'accordion-down'
  | 'accordion-up';
type TransitionDelay =
  | '0'
  | '75'
  | '100'
  | '150'
  | '200'
  | '300'
  | '500'
  | '700'
  | '1000';
type TransitionDuration =
  | '0'
  | '75'
  | '100'
  | '150'
  | '200'
  | '300'
  | '500'
  | '700'
  | '1000';
type TransitionTiming = 'linear' | 'in' | 'out' | 'in-out';

/* -------------------------------------------------------------------------- */
/*                                    FLEX                                    */
/* -------------------------------------------------------------------------- */
type Flex = '1' | 'auto' | 'initial' | 'none';
type FlexGrow = '0' | '1' | '2' | '3';
type FlexShrink = '0' | '1';
type FlexAlignContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'space-between'
  | 'space-around';
type FlexAlignItems =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'baseline';
type FlexAlignSelf =
  | 'auto'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'baseline';
type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse';
type FlexJustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
type FlexBasis = 'min-content';

/* -------------------------------------------------------------------------- */
/*                                   LAYOUT                                   */
/* -------------------------------------------------------------------------- */
type Height =
  | 'auto'
  | '1/2'
  | '1/3'
  | '2/3'
  | '1/4'
  | '2/4'
  | '3/4'
  | '1/5'
  | '2/5'
  | '3/5'
  | '4/5'
  | '1/6'
  | '2/6'
  | '3/6'
  | '4/6'
  | '5/6'
  | 'full'
  | 'screen'
  | 'min'
  | 'max'
  | 'fit';
type MaxHeight = 'none' | 'full' | 'screen' | 'min' | 'max' | 'fit';
type MaxWidth = 'none' | 'full' | 'min' | 'max' | 'fit';
type MinHeight = 'full' | 'min' | 'max' | 'fit' | 'screen';
type MinWidth = 'full' | 'min' | 'max' | 'fit' | 'screen';
type Width =
  | 'auto'
  | 'full'
  | 'screen'
  | 'min'
  | 'max'
  | 'fit'
  | '1/2'
  | '1/3'
  | '2/3'
  | '1/4'
  | '2/4'
  | '3/4'
  | '1/5'
  | '2/5'
  | '3/5'
  | '4/5'
  | '1/6'
  | '2/6'
  | '3/6'
  | '4/6'
  | '5/6'
  | '1/12'
  | '2/12'
  | '3/12'
  | '4/12'
  | '5/12'
  | '6/12'
  | '7/12'
  | '8/12'
  | '9/12'
  | '10/12'
  | '11/12';

type Display =
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
  | 'contents';
type Overflow = 'auto' | 'hidden' | 'clip' | 'visible' | 'scroll';
type Position = 'static' | 'fixed' | 'absolute' | 'relative' | 'sticky';

export type {
  AlwaysPaletteAlias,
  Animation,
  AspectRatio,
  AspectRatioConfig,
  AvatarShape,
  AvatarSize,
  AvatarSizeConfig,
  BackgroundColor,
  BackgroundPalette,
  BackgroundPaletteAlias,
  BackgroundWashPalette,
  BackgroundWashPaletteAlias,
  BorderRadius,
  BorderRadiusConfig,
  BorderWidth,
  BorderWidthConfig,
  BoxShadowConfig,
  ColorMode,
  ColorModeForApp,
  ColorsConfig,
  ConfigurableTextProperty,
  CorePalette,
  CorePaletteAlias,
  Display,
  Elevation,
  ElevationConfig,
  ElevationPaletteAlias,
  Flex,
  FlexAlignContent,
  FlexAlignItems,
  FlexAlignSelf,
  FlexBasis,
  FlexDirection,
  FlexGrow,
  FlexJustifyContent,
  FlexShrink,
  FlexWrap,
  FontFamilyConfig,
  FontFamilyGlobalAlias,
  FontFamilyGlobalConfig,
  FontSize,
  FontSizeConfig,
  FontWeightConfig,
  FontWeightDescriptive,
  FontWeightNumeric,
  ForegroundColor,
  ForegroundPalette,
  ForegroundPaletteAlias,
  Height,
  HighContrastMode,
  Hue,
  HueStep,
  IconSize,
  IconSizeConfig,
  LetterSpacing,
  LineClampAlias,
  LineColor,
  LineHeight,
  LineHeightConfig,
  LinePalette,
  LinePaletteAlias,
  MaxHeight,
  MaxWidth,
  MinHeight,
  MinWidth,
  Modes,
  Opacity,
  Overflow,
  Palette,
  PaletteConfig,
  PaletteType,
  PaletteValue,
  PlatformMode,
  Position,
  RegionMode,
  ScaleConfig,
  ScaleMode,
  ScaleModeConfig,
  ScaleModeForApp,
  SpacingAlias,
  SpacingConfig,
  SpectrumColor,
  SpectrumConfig,
  TextTransform,
  TextTransformConfig,
  TextVariant,
  TransitionDelay,
  TransitionDuration,
  TransitionTiming,
  UniversalTokensConfig,
  Width,
  ZIndex,
  ZIndexConfig,
};
