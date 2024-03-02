/* -------------------------------------------------------------------------- */
/*                                    COLOR                                   */
/* -------------------------------------------------------------------------- */
// https://uicolors.app/browse/tailwind-colors
export type PaletteType = keyof PaletteConfig;
export type PaletteValue =
  | { hue: Hue; step: HueStep; opacity?: string }
  | `${number} ${number} ${number}`;
export type Palette = { [key in PaletteType]: keyof PaletteConfig[key] };

export type Hue =
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
  | '900'
  | '950';

export type SpectrumColor = `${Hue}-${HueStep}`;

export type CorePaletteAlias =
  | 'accent'
  | 'alert'
  | 'brand'
  | 'positive'
  | 'warning';
export type CorePalette = Record<CorePaletteAlias, PaletteValue>;

export type BackgroundPaletteAlias = 'primary' | 'secondary';
export type BackgroundPalette = Record<BackgroundPaletteAlias, PaletteValue>;

export type BackgroundWashPaletteAlias = `${CorePaletteAlias}-wash`;
export type BackgroundWashPalette = Record<
  BackgroundWashPaletteAlias,
  PaletteValue
>;

export type ElevationPaletteAlias =
  | 'elevation-1'
  | 'elevation-2'
  | 'elevation-3'
  | 'scrim';
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
  | BackgroundWashPaletteAlias
  | ElevationPaletteAlias
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
  | 'serif-display';

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

export type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';
export type LetterSpacing =
  | 'tighter'
  | 'tight'
  | 'normal'
  | 'wide'
  | 'wider'
  | 'widest';
export type LineClampAlias = '1' | '2' | '3' | '4' | '5' | '6';
export type LineHeight = number;
export type FontSize = number;

export type TextTransformConfig = Record<TextVariant, TextTransform>;
export type FontSizeConfig = Record<TextVariant, FontSize>;
export type FontFamilyConfig = Record<TextVariant, FontFamilyGlobalAlias>;
export type FontWeightConfig = Record<TextVariant, FontWeightDescriptive>;
export type LineHeightConfig = Record<TextVariant, LineHeight>;
export type ConfigurableTextProperty =
  | 'fontFamily'
  | 'fontSize'
  | 'fontWeight'
  | 'lineHeight'
  | 'textTransform';

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
export type AspectRatio = `${number}:${number}`;
export type AspectRatioConfig = Record<AspectRatio, string>;

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

export type Elevation = '1' | '2' | '3';
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
  elevation: ElevationConfig;
};

export type SpectrumValue = Record<HueStep, string>;
export type SpectrumConfig = Record<Hue, SpectrumValue>;

export type PaletteConfig = {
  core: CorePalette;
  background: BackgroundPalette;
  backgroundWash: BackgroundWashPalette;
  elevation: ElevationPalette;
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
  aspectRatio: Record<string, string>;
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
  | 'start'
  | 'end'
  | 'center'
  | 'stretch'
  | 'between'
  | 'around';
export type AlignItems = 'start' | 'end' | 'center' | 'stretch' | 'baseline';
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
  | 'evenly';

/* -------------------------------------------------------------------------- */
/*                                   LAYOUT                                   */
/* -------------------------------------------------------------------------- */
export type Height =
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
  | 'fit'
  | number;
export type MaxHeight =
  | 'none'
  | 'full'
  | 'screen'
  | 'min'
  | 'max'
  | 'fit'
  | number;
export type MaxWidth = 'none' | 'full' | 'min' | 'max' | 'fit' | number;
export type MinHeight = 'full' | 'min' | 'max' | 'fit' | 'screen' | number;
export type MinWidth = 'full' | 'min' | 'max' | 'fit' | 'screen' | number;
export type Width =
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
  | '11/12'
  | number;

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
  | 'contents';
export type Overflow = 'auto' | 'hidden' | 'clip' | 'visible' | 'scroll';
export type Position = 'static' | 'fixed' | 'absolute' | 'relative' | 'sticky';
