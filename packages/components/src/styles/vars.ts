import type {
  BackgroundPaletteAlias,
  BackgroundWashPaletteAlias,
  CorePaletteAlias,
  ElevationPaletteAlias,
  FontFamilyGlobalAlias,
  ForegroundPaletteAlias,
  LinePaletteAlias,
} from '../types/tokens';

export const CSS_VAR_PREFIX = 'katcn';

/* -------------------------------------------------------------------------- */
/*                              CSS VAR PREFIXES                              */
/* -------------------------------------------------------------------------- */
export const COLOR_PREFIX = `${CSS_VAR_PREFIX}-color`;
export const PALETTE_CORE_PREFIX = `${COLOR_PREFIX}-core`;
export const PALETTE_FOREGROUND_PREFIX = `${COLOR_PREFIX}-foreground`;
export const PALETTE_BACKGROUND_PREFIX = `${COLOR_PREFIX}-background`;
export const PALETTE_BACKGROUND_WASH_PREFIX = `${COLOR_PREFIX}-backgroundWash`;
export const PALETTE_LINE_PREFIX = `${COLOR_PREFIX}-line`;
export const PALETTE_ELEVATION_PREFIX = `${COLOR_PREFIX}-elevation`;

export const ELEVATION_PREFIX = `${CSS_VAR_PREFIX}-elevation`;
export const FONT_FAMILY_PREFIX = `${CSS_VAR_PREFIX}-font`;
export const ICON_SIZE_PREFIX = `${CSS_VAR_PREFIX}-icon-size`;
export const AVATAR_SIZE_PREFIX = `${CSS_VAR_PREFIX}-avatar-size`;
export const BORDER_RADIUS_PREFIX = `${CSS_VAR_PREFIX}-border-radius`;
export const BORDER_WIDTH_PREFIX = `${CSS_VAR_PREFIX}-border-width`;
export const SPACING_PREFIX = `${CSS_VAR_PREFIX}-spacing`;
export const FONT_SIZE_PREFIX = `${CSS_VAR_PREFIX}-font-size`;
export const LINE_HEIGHT_PREFIX = `${CSS_VAR_PREFIX}-line-height`;
export const FONT_WEIGHT_PREFIX = `${CSS_VAR_PREFIX}-font-weight`;
export const TEXT_TRANSFORM_PREFIX = `${CSS_VAR_PREFIX}-text-transform`;

/* -------------------------------------------------------------------------- */
/*                               FONT VARIABLES                               */
/* -------------------------------------------------------------------------- */
export const FONT_ICONS_CSS_VAR = `--${FONT_FAMILY_PREFIX}-icons`;
export const FONT_SANS_CSS_VAR = `--${FONT_FAMILY_PREFIX}-sans`;
export const FONT_SANS_CONDENSED_CSS_VAR = `--${FONT_FAMILY_PREFIX}-sans-condensed`;
export const FONT_SERIF_DISPLAY_CSS_VAR = `--${FONT_FAMILY_PREFIX}-serif-display`;
export const FONT_SERIF_TEXT_CSS_VAR = `--${FONT_FAMILY_PREFIX}-serif-text`;
export const FONT_MONO_CSS_VAR = `--${FONT_FAMILY_PREFIX}-mono`;

type FontVar = `--${typeof FONT_FAMILY_PREFIX}-${FontFamilyGlobalAlias}`;
type CorePaletteVar = `--${typeof PALETTE_CORE_PREFIX}-${CorePaletteAlias}`;
type ForegroundPaletteVar =
  `--${typeof PALETTE_FOREGROUND_PREFIX}-${ForegroundPaletteAlias}`;
type BackgroundPaletteVar =
  `--${typeof PALETTE_BACKGROUND_PREFIX}-${BackgroundPaletteAlias}`;
type BackgroundWashPaletteVar =
  `--${typeof PALETTE_BACKGROUND_WASH_PREFIX}-${BackgroundWashPaletteAlias}`;
type LinePaletteVar = `--${typeof PALETTE_LINE_PREFIX}-${LinePaletteAlias}`;
type ElevationPaletteVar =
  `--${typeof PALETTE_ELEVATION_PREFIX}-${ElevationPaletteAlias}`;

const fontVars = {
  icons: FONT_ICONS_CSS_VAR,
  sans: FONT_SANS_CSS_VAR,
  'sans-condensed': FONT_SANS_CONDENSED_CSS_VAR,
  'serif-display': FONT_SERIF_DISPLAY_CSS_VAR,
  'serif-text': FONT_SERIF_TEXT_CSS_VAR,
  mono: FONT_MONO_CSS_VAR,
} satisfies Record<FontFamilyGlobalAlias, FontVar>;

const corePaletteVars = {
  accent: `--${PALETTE_CORE_PREFIX}-accent`,
  alert: `--${PALETTE_CORE_PREFIX}-alert`,
  brand: `--${PALETTE_CORE_PREFIX}-brand`,
  positive: `--${PALETTE_CORE_PREFIX}-positive`,
  warning: `--${PALETTE_CORE_PREFIX}-warning`,
} satisfies Record<CorePaletteAlias, CorePaletteVar>;

const foregroundPaletteVars = {
  primary: `--${PALETTE_FOREGROUND_PREFIX}-primary`,
  secondary: `--${PALETTE_FOREGROUND_PREFIX}-secondary`,
  tertiary: `--${PALETTE_FOREGROUND_PREFIX}-tertiary`,
  'on-color': `--${PALETTE_FOREGROUND_PREFIX}-on-color`,
} satisfies Record<ForegroundPaletteAlias, ForegroundPaletteVar>;

const backgroundPaletteVars = {
  primary: `--${PALETTE_BACKGROUND_PREFIX}-primary`,
  secondary: `--${PALETTE_BACKGROUND_PREFIX}-secondary`,
} satisfies Record<BackgroundPaletteAlias, BackgroundPaletteVar>;

const backgroundWashPaletteVars = {
  accent: `--${PALETTE_BACKGROUND_WASH_PREFIX}-accent`,
  alert: `--${PALETTE_BACKGROUND_WASH_PREFIX}-alert`,
  brand: `--${PALETTE_BACKGROUND_WASH_PREFIX}-brand`,
  positive: `--${PALETTE_BACKGROUND_WASH_PREFIX}-positive`,
  warning: `--${PALETTE_BACKGROUND_WASH_PREFIX}-warning`,
} satisfies Record<BackgroundWashPaletteAlias, BackgroundWashPaletteVar>;

const linePaletteVars = {
  primary: `--${PALETTE_LINE_PREFIX}-primary`,
  secondary: `--${PALETTE_LINE_PREFIX}-secondary`,
} satisfies Record<LinePaletteAlias, LinePaletteVar>;

const elevationPaletteVars = {
  '1': `--${PALETTE_ELEVATION_PREFIX}-1`,
  '2': `--${PALETTE_ELEVATION_PREFIX}-2`,
  '3': `--${PALETTE_ELEVATION_PREFIX}-3`,
} satisfies Record<ElevationPaletteAlias, ElevationPaletteVar>;

export const vars = {
  fonts: fontVars,
  palette: {
    core: corePaletteVars,
    foreground: foregroundPaletteVars,
    background: backgroundPaletteVars,
    backgroundWash: backgroundWashPaletteVars,
    line: linePaletteVars,
    elevation: elevationPaletteVars,
  },
} as const;

export type CssVar =
  | FontVar
  | CorePaletteVar
  | ForegroundPaletteVar
  | BackgroundPaletteVar
  | BackgroundWashPaletteVar
  | LinePaletteVar
  | ElevationPaletteVar;
