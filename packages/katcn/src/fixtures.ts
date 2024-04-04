import { typesToConstants } from './macros/tsmorph/typesToConstants' with {
  type: 'macro',
};
import { iconNames } from './icons/data';

import type {
  AlignContent,
  AlignItems,
  AlignSelf,
  AvatarSize,
  BackgroundPaletteAlias,
  BorderRadius,
  BorderWidth,
  CorePaletteAlias,
  Display,
  FlexDirection,
  FlexGrow,
  FlexShrink,
  FlexWrap,
  FontFamilyGlobalAlias,
  FontSize,
  FontWeightDescriptive,
  ForegroundPaletteAlias,
  Height,
  Hue,
  HueStep,
  IconSize,
  JustifyContent,
  LineHeight,
  LinePaletteAlias,
  MaxHeight,
  MaxWidth,
  MinHeight,
  MinWidth,
  Opacity,
  Overflow,
  PlaceContent,
  PlaceItems,
  PlaceSelf,
  Position,
  SpacingAlias,
  StyleProp,
  TextAlign,
  TextTransform,
  TextTransformDescriptive,
  TextVariant,
  Width,
} from './types';
import { IconName } from './icons/types';

export default {
  hues: typesToConstants<Hue>('Hue'),
  hueSteps: typesToConstants<HueStep>('HueStep'),
  get colors() {
    return this.hues.flatMap((hue) => {
      return this.hueSteps.map((step) => {
        return `${hue}-${step}` as const;
      });
    });
  },
  palette: {
    background: typesToConstants<BackgroundPaletteAlias>(
      'BackgroundPaletteAlias',
    ),
    core: typesToConstants<CorePaletteAlias>('CorePaletteAlias'),
    line: typesToConstants<LinePaletteAlias>('LinePaletteAlias'),
    foreground: typesToConstants<ForegroundPaletteAlias>(
      'ForegroundPaletteAlias',
    ),
  },
  borderWidth: typesToConstants<BorderWidth>('BorderWidth'),
  flexDirection: typesToConstants<FlexDirection>('FlexDirection'),
  alignContent: typesToConstants<AlignContent>('AlignContent'),
  alignItems: typesToConstants<AlignItems>('AlignItems'),
  alignSelf: typesToConstants<AlignSelf>('AlignSelf'),
  justifyContent: typesToConstants<JustifyContent>('JustifyContent'),
  placeContent: typesToConstants<PlaceContent>('PlaceContent'),
  placeItems: typesToConstants<PlaceItems>('PlaceItems'),
  placeSelf: typesToConstants<PlaceSelf>('PlaceSelf'),
  grow: typesToConstants<FlexGrow>('FlexGrow'),
  shrink: typesToConstants<FlexShrink>('FlexShrink'),
  wrap: typesToConstants<FlexWrap>('FlexWrap'),
  height: typesToConstants<Height>('Height'),
  maxHeight: typesToConstants<MaxHeight>('MaxHeight'),
  minHeight: typesToConstants<MinHeight>('MinHeight'),
  width: typesToConstants<Width>('Width'),
  maxWidth: typesToConstants<MaxWidth>('MaxWidth'),
  minWidth: typesToConstants<MinWidth>('MinWidth'),
  display: typesToConstants<Display>('Display'),
  overflow: typesToConstants<Overflow>('Overflow'),
  position: typesToConstants<Position>('Position'),
  opacity: typesToConstants<Opacity>('Opacity'),
  borderRadius: typesToConstants<BorderRadius>('BorderRadius'),
  spacingAlias: typesToConstants<SpacingAlias>('SpacingAlias'),
  FontFamilyGlobalAlias: typesToConstants<FontFamilyGlobalAlias>(
    'FontFamilyGlobalAlias',
  ),
  textVariant: typesToConstants<TextVariant>('TextVariant'),
  fontSize: typesToConstants<FontSize>('FontSize'),
  fontWeightDescriptive: typesToConstants<FontWeightDescriptive>(
    'FontWeightDescriptive',
  ),
  lineHeight: typesToConstants<LineHeight>('LineHeight'),
  textTransform: typesToConstants<TextTransform>('TextTransform'),
  textTransformDescriptive: typesToConstants<TextTransformDescriptive>(
    'TextTransformDescriptive',
  ),
  textAlign: typesToConstants<TextAlign>('TextAlign'),
  iconNames: iconNames as IconName[],
  iconSize: typesToConstants<IconSize>('IconSize'),
  avatarSize: typesToConstants<AvatarSize>('AvatarSize'),
  styleProp: typesToConstants<StyleProp>('StyleProp'),
};
