/* -------------------------------------------------------------------------- */
/*                                    COLOR                                   */
/* -------------------------------------------------------------------------- */
// https://uicolors.app/browse/tailwind-colors
export type PaletteType = keyof PaletteConfig;

export type PaletteValue = { hue: Hue; step: HueStep; opacity?: string };

export type Palette = { [key in PaletteType]: keyof PaletteConfig[key] };

export type Hue =
  | 'red'
  | 'pink'
  | 'purple'
  | 'violet'
  | 'indigo'
  | 'blue'
  | 'cyan'
  | 'teal'
  | 'green'
  | 'lime'
  | 'yellow'
  | 'orange';

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
  | CorePaletteAlias
  | ForegroundPaletteAlias
  | AlwaysPaletteAlias;

export type LineColor =
  | CorePaletteAlias
  | LinePaletteAlias
  | AlwaysPaletteAlias;

export type BackgroundColor =
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
export type SpacingConfig = Record<SpacingAlias, number>;

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

export type PaletteConfig = {
  core: CorePalette;
  background: BackgroundPalette;
  foreground: ForegroundPalette;
  line: LinePalette;
};

export type ScaleConfig = {
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
  zIndex: ZIndexConfig;
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
