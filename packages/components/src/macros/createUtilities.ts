import { fromEntries } from '../helpers';
import type {
  AlignContent,
  AlignItems,
  AlignSelf,
  BorderRadius,
  Display,
  FlexDirection,
  Height,
  JustifyContent,
  PlaceContent,
  MaxHeight,
  MaxWidth,
  MinHeight,
  MinWidth,
  Opacity,
  Overflow,
  Position,
  SpacingAlias,
  PlaceSelf,
  Width,
  BackgroundPaletteAlias,
  BorderWidth,
  CorePaletteAlias,
  ForegroundPaletteAlias,
  LinePaletteAlias,
  PlaceItems,
  FlexGrow,
  FlexShrink,
  FlexWrap,
  FontSize,
  LineHeight,
  TextTransform,
  IconSize,
  FontFamily,
  FontWeight,
  TextAlign,
  AvatarSize,
} from '../types';
import { typesToConstants } from '#macros' with { type: 'macro' };
import { cssEscape } from '../helpers/cssEscape';

export function createUtilities() {
  const names = {
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
    fontFamily: typesToConstants<FontFamily>('FontFamily'),
    fontSize: typesToConstants<FontSize>('FontSize'),
    fontWeight: typesToConstants<FontWeight>('FontWeight'),
    lineHeight: typesToConstants<LineHeight>('LineHeight'),
    textTransform: typesToConstants<TextTransform>('TextTransform'),
    textAlign: typesToConstants<TextAlign>('TextAlign'),
    iconSize: typesToConstants<IconSize>('IconSize'),
    avatarSize: typesToConstants<AvatarSize>('AvatarSize'),
  };

  const backgroundColor = {
    ...fromEntries(
      names.palette.core.map((alias) => [
        alias,
        `{ background-color: var(--palette-core-${alias}); }`,
      ]),
    ),
    ...fromEntries(
      names.palette.background.map((alias) => [
        alias,
        `{ background-color: var(--palette-background-${alias}); }`,
      ]),
    ),
  };

  const color = {
    ...fromEntries(
      names.palette.core.map((alias) => [
        alias,
        `{ color: var(--palette-core-${alias}); }`,
      ]),
    ),
    ...fromEntries(
      names.palette.foreground.map((alias) => [
        alias,
        `{ color: var(--palette-foreground-${alias}); }`,
      ]),
    ),
  };

  const borderColor = {
    ...fromEntries(
      names.palette.core.map((alias) => [
        alias,
        `{ border-color: var(--palette-core-${alias}); }`,
      ]),
    ),
    ...fromEntries(
      names.palette.line.map((alias) => [
        alias,
        `{ border-color: var(--palette-line-${alias}); }`,
      ]),
    ),
  };

  const borderTopColor = {
    ...fromEntries(
      names.palette.core.map((alias) => [
        alias,
        `{ border-top-color: var(--palette-core-${alias}); }`,
      ]),
    ),
    ...fromEntries(
      names.palette.line.map((alias) => [
        alias,
        `{ border-top-color: var(--palette-line-${alias}); }`,
      ]),
    ),
  };

  const borderBottomColor = {
    ...fromEntries(
      names.palette.core.map((alias) => [
        alias,
        `{ border-bottom-color: var(--palette-core-${alias}); }`,
      ]),
    ),
    ...fromEntries(
      names.palette.line.map((alias) => [
        alias,
        `{ border-bottom-color: var(--palette-line-${alias}); }`,
      ]),
    ),
  };

  const borderStartColor = {
    ...fromEntries(
      names.palette.core.map((alias) => [
        alias,
        `{ border-inline-start-color: var(--palette-core-${alias}); }`,
      ]),
    ),
    ...fromEntries(
      names.palette.line.map((alias) => [
        alias,
        `{ border-inline-start-color: var(--palette-line-${alias}); }`,
      ]),
    ),
  };

  const borderEndColor = {
    ...fromEntries(
      names.palette.core.map((alias) => [
        alias,
        `{ border-inline-end-color: var(--palette-core-${alias}); }`,
      ]),
    ),
    ...fromEntries(
      names.palette.line.map((alias) => [
        alias,
        `{ border-inline-end-color: var(--palette-line-${alias}); }`,
      ]),
    ),
  };

  const borderHorizontalColor = {
    ...fromEntries(
      names.palette.core.map((alias) => [
        alias,
        `{ border-left-color: var(--palette-core-${alias}); border-right-color: var(--palette-core-${alias}); }`,
      ]),
    ),
    ...fromEntries(
      names.palette.line.map((alias) => [
        alias,
        `{ border-left-color: var(--palette-line-${alias}); border-right-color: var(--palette-line-${alias}); }`,
      ]),
    ),
  };

  const borderVerticalColor = {
    ...fromEntries(
      names.palette.core.map((alias) => [
        alias,
        `{ border-top-color: var(--palette-core-${alias}); border-bottom-color: var(--palette-core-${alias}); }`,
      ]),
    ),
    ...fromEntries(
      names.palette.line.map((alias) => [
        alias,
        `{ border-top-color: var(--palette-line-${alias}); border-bottom-color: var(--palette-line-${alias}); }`,
      ]),
    ),
  };

  const borderWidth = fromEntries(
    names.borderWidth.map((alias) => [
      alias,
      `{ border-width: var(--border-width-${alias}); }`,
    ]),
  );

  const borderStartWidth = fromEntries(
    names.borderWidth.map((alias) => [
      alias,
      `{ border-inline-start-width: var(--border-width-${alias}); }`,
    ]),
  );

  const borderEndWidth = fromEntries(
    names.borderWidth.map((alias) => [
      alias,
      `{ border-inline-end-width: var(--border-width-${alias}); }`,
    ]),
  );

  const borderTopWidth = fromEntries(
    names.borderWidth.map((alias) => [
      alias,
      `{ border-top-width: var(--border-width-${alias}); }`,
    ]),
  );

  const borderBottomWidth = fromEntries(
    names.borderWidth.map((alias) => [
      alias,
      `{ border-bottom-width: var(--border-width-${alias}); }`,
    ]),
  );

  const borderHorizontalWidth = fromEntries(
    names.borderWidth.map((alias) => [
      alias,
      `{ border-left-width: var(--border-width-${alias}); border-right-width: var(--border-width-${alias});  }`,
    ]),
  );

  const borderVerticalWidth = fromEntries(
    names.borderWidth.map((alias) => [
      alias,
      `{ border-top-width: var(--border-width-${alias}); border-bottom-width: var(--border-width-${alias});  }`,
    ]),
  );

  const flexDirection = fromEntries(
    names.flexDirection.map((alias) => [
      alias,
      `{ flex-direction: ${
        {
          horizontal: 'row',
          vertical: 'column',
          'horizontal-reverse': 'row-rever',
          'vertical-reverse': 'column-reverse',
        }[alias]
      } }`,
    ]),
  );

  const alignContent = fromEntries(
    names.alignContent.map((alias) => [
      alias,
      `{ align-content: ${
        {
          center: 'center',
          start: 'flex-start',
          end: 'flex-end',
          between: 'space-between',
          around: 'space-around',
          evenly: 'space-evenly',
          baseline: 'baseline',
          stretch: 'stretch',
        }[alias]
      } }`,
    ]),
  );

  const alignItems = fromEntries(
    names.alignItems.map((alias) => [
      alias,
      `{ align-items: ${
        {
          start: 'flex-start',
          end: 'flex-end',
          center: 'center',
          stretch: 'stretch',
          baseline: 'baseline',
        }[alias]
      } }`,
    ]),
  );

  const alignSelf = fromEntries(
    names.alignSelf.map((alias) => [
      alias,
      `{ align-self: ${
        {
          start: 'flex-start',
          end: 'flex-end',
          auto: 'auto',
          center: 'center',
          stretch: 'stretch',
          baseline: 'baseline',
        }[alias]
      } }`,
    ]),
  );

  const justifyContent = fromEntries(
    names.justifyContent.map((alias) => [
      alias,
      `{ justify-content: ${
        {
          start: 'flex-start',
          end: 'flex-end',
          center: 'center',
          between: 'space-between',
          around: 'space-around',
          evenly: 'space-evenly',
          stretch: 'stretch',
        }[alias]
      } }`,
    ]),
  );

  const placeContent = fromEntries(
    names.placeContent.map((alias) => [
      alias,
      `{ place-content: ${
        {
          center: 'center',
          start: 'start',
          end: 'end',
          between: 'space-between',
          around: 'space-around',
          evenly: 'space-evenly',
          baseline: 'baseline',
          stretch: 'stretch',
        }[alias]
      } }`,
    ]),
  );

  const placeItems = fromEntries(
    names.placeItems.map((alias) => [alias, `{ place-items: ${alias} }`]),
  );

  const placeSelf = fromEntries(
    names.placeSelf.map((alias) => [alias, `{ place-self: ${alias} }`]),
  );

  const grow = fromEntries(
    names.grow.map((alias) => [
      alias,
      `{ flex-grow: ${
        {
          allow: '1',
          prevent: '0',
        }[alias]
      } }`,
    ]),
  );

  const shrink = fromEntries(
    names.shrink.map((alias) => [
      alias,
      `{ flex-shrink: ${
        {
          allow: '1',
          prevent: '0',
        }[alias]
      } }`,
    ]),
  );

  const wrap = fromEntries(
    names.wrap.map((alias) => [
      alias,
      `{ flex-wrap: ${
        {
          allow: '1',
          prevent: '0',
          reverse: 'wrap-reverse',
        }[alias]
      } }`,
    ]),
  );

  const heightLookup: { [key in Height]: string } = {
    half: '50%',
    full: '100%',
    '100vh': '100vh',
    'min-content': 'min-content',
    'max-content': 'max-content',
    'fit-content': 'fit-content',
    unset: 'unset',
  };

  const height = fromEntries(
    names.height.map((alias) => [alias, `{ height: ${heightLookup[alias]} }`]),
  );

  const maxHeight = fromEntries(
    names.maxHeight.map((alias) => [
      alias,
      `{ max-block-size: ${heightLookup[alias]} }`,
    ]),
  );

  const minHeight = fromEntries(
    names.minHeight.map((alias) => [
      alias,
      `{ min-block-size: ${heightLookup[alias]} }`,
    ]),
  );

  const widthLookup: { [key in Width]: string } = {
    '1/12': '8.3%',
    '2/12': '16.7%',
    '3/12': '25%',
    '4/12': '33%',
    '5/12': '41.67%',
    '6/12': '50%',
    '7/12': '58.33%',
    '8/12': '66.67%',
    '9/12': '75%',
    '10/12': '83.33%',
    '11/12': '91.67%',
    '12/12': '100%',
    'min-content': 'min-content',
    'max-content': 'max-content',
    'fit-content': 'fit-content',
    '100vw': '100vw',
    half: '50%',
    full: '100%',
    unset: 'unset',
  };

  const width = fromEntries(
    names.width.map((alias) => [
      cssEscape(`${alias}`),
      `{ width: ${widthLookup[alias]} }`,
    ]),
  );

  const maxWidth = fromEntries(
    names.width.map((alias) => [
      cssEscape(`${alias}`),
      `{ max-inline-size: ${widthLookup[alias]} }`,
    ]),
  );

  const minWidth = fromEntries(
    names.width.map((alias) => [
      cssEscape(`${alias}`),
      `{ min-inline-size: ${widthLookup[alias]} }`,
    ]),
  );

  const spacing = fromEntries(
    names.spacingAlias.map((alias) => [
      alias,
      `{ padding: var(--spacing-${alias}); }`,
    ]),
  );

  const spacingTop = fromEntries(
    names.spacingAlias.map((alias) => [
      alias,
      `{ padding-top: var(--spacing-${alias}); }`,
    ]),
  );

  const spacingStart = fromEntries(
    names.spacingAlias.map((alias) => [
      alias,
      `{ padding-inline-start: var(--spacing-${alias}); }`,
    ]),
  );

  const spacingEnd = fromEntries(
    names.spacingAlias.map((alias) => [
      alias,
      `{ padding-inline-end: var(--spacing-${alias}); }`,
    ]),
  );

  const spacingBottom = fromEntries(
    names.spacingAlias.map((alias) => [
      alias,
      `{ padding-bottom: var(--spacing-${alias}); }`,
    ]),
  );

  const spacingHorizontal = fromEntries(
    names.spacingAlias.map((alias) => [
      alias,
      `{ padding-left: var(--spacing-${alias}); padding-right: var(--spacing-${alias}); }`,
    ]),
  );

  const spacingVertical = fromEntries(
    names.spacingAlias.map((alias) => [
      alias,
      `{ padding-top: var(--spacing-${alias}); padding-bottom: var(--spacing-${alias}); }`,
    ]),
  );

  const offset = fromEntries(
    names.spacingAlias.map((alias) => [
      alias,
      `{ margin: -var(--offset-${alias}); }`,
    ]),
  );

  const offsetTop = fromEntries(
    names.spacingAlias.map((alias) => [
      alias,
      `{ margin-top: -var(--spacing-${alias}); }`,
    ]),
  );

  const offsetStart = fromEntries(
    names.spacingAlias.map((alias) => [
      alias,
      `{ margin-inline-start: -var(--spacing-${alias}); }`,
    ]),
  );

  const offsetEnd = fromEntries(
    names.spacingAlias.map((alias) => [
      alias,
      `{ margin-inline-end: -var(--spacing-${alias}); }`,
    ]),
  );

  const offsetBottom = fromEntries(
    names.spacingAlias.map((alias) => [
      alias,
      `{ margin-bottom: -var(--spacing-${alias}); }`,
    ]),
  );

  const offsetHorizontal = fromEntries(
    names.spacingAlias.map((alias) => [
      alias,
      `{ margin-left: -var(--spacing-${alias}); margin-right: -var(--spacing-${alias}); }`,
    ]),
  );

  const offsetVertical = fromEntries(
    names.spacingAlias.map((alias) => [
      alias,
      `{ margin-top: -var(--spacing-${alias}); margin-bottom: -var(--spacing-${alias}); }`,
    ]),
  );

  const horizontalGap = fromEntries(
    names.spacingAlias.map((alias) => [
      alias,
      `{ column-gap: -var(--spacing-${alias}); }`,
    ]),
  );

  const verticalGap = fromEntries(
    names.spacingAlias.map((alias) => [
      alias,
      `{ row-gap: -var(--spacing-${alias}); }`,
    ]),
  );

  const display = fromEntries(
    names.display.map((alias) => [alias, `{ display: ${alias}; }`]),
  );

  const overflow = fromEntries(
    names.overflow.map((alias) => [alias, `{ overflow: ${alias}; }`]),
  );

  const overflowX = fromEntries(
    names.overflow.map((alias) => [alias, `{ overflow-x: ${alias}; }`]),
  );

  const overflowY = fromEntries(
    names.overflow.map((alias) => [alias, `{ overflow-y: ${alias}; }`]),
  );

  const position = fromEntries(
    names.position.map((alias) => [alias, `{ position: ${alias}; }`]),
  );

  const opacity = fromEntries(
    names.opacity.map((alias) => [alias, `{ opacity: ${alias}; }`]),
  );

  const borderRadius = fromEntries(
    names.borderRadius.map((alias) => [
      `${alias}`,
      `{ border-radius: var(--radii-${alias}); }`,
    ]),
  );

  const borderTopStartRadius = fromEntries(
    names.borderRadius.map((alias) => [
      `${alias}`,
      `{ border-start-start-radius: var(--radii-${alias}); }`,
    ]),
  );

  const borderTopEndRadius = fromEntries(
    names.opacity.map((alias) => [
      `${alias}`,
      `{ border-start-end-radius: var(--radii-${alias}); }`,
    ]),
  );

  const borderBottomStartRadius = fromEntries(
    names.borderRadius.map((alias) => [
      `${alias}`,
      `{ border-end-start-radius: var(--radii-${alias}); }`,
    ]),
  );

  const borderBottomEndRadius = fromEntries(
    names.borderRadius.map((alias) => [
      `${alias}`,
      `{ border-end-end-radius: var(--radii-${alias}); }`,
    ]),
  );

  const fontFamily = fromEntries(
    names.fontFamily.map((alias) => [
      `${alias}`,
      `{ font-family: var(--font-family-${alias}); }`,
    ]),
  );

  const fontSize = fromEntries(
    names.fontSize.map((alias) => [
      `${alias}`,
      `{ font-size: var(--font-size-${alias}); }`,
    ]),
  );

  const fontWeight = fromEntries(
    names.fontWeight.map((alias) => [
      `${alias}`,
      `{ font-weight: var(--font-weight-${alias}); }`,
    ]),
  );

  const lineHeight = fromEntries(
    names.lineHeight.map((alias) => [
      `${alias}`,
      `{ line-height: var(--line-height-${alias}); }`,
    ]),
  );

  const textTransform = fromEntries(
    names.textTransform.map((alias) => [
      `${alias}`,
      `{ text-transform: var(--text-transform-${alias}); }`,
    ]),
  );

  const textAlign = fromEntries(
    names.textAlign.map((alias) => [`${alias}`, `{ text-align: ${alias}; }`]),
  );

  const iconSize = fromEntries(
    names.iconSize.map((alias) => [
      `${alias}`,
      `{ width: var(--icon-size-${alias}); height: var(--icon-size-${alias}); font-size: var(--icon-size-${alias}); line-height: var(--icon-size-${alias}); }`,
    ]),
  );

  const avatarSize = fromEntries(
    names.avatarSize.map((alias) => [
      `${alias}`,
      `{ text-transform: var(--text-transform-${alias}); }`,
    ]),
  );

  return {
    backgroundColor,
    color,
    borderColor,
    borderTopColor,
    borderBottomColor,
    borderStartColor,
    borderEndColor,
    borderHorizontalColor,
    borderVerticalColor,
    borderWidth,
    borderStartWidth,
    borderEndWidth,
    borderTopWidth,
    borderBottomWidth,
    borderHorizontalWidth,
    borderVerticalWidth,
    flexDirection,
    alignContent,
    alignItems,
    alignSelf,
    justifyContent,
    placeContent,
    placeItems,
    placeSelf,
    grow,
    shrink,
    wrap,
    height,
    maxHeight,
    minHeight,
    width,
    maxWidth,
    minWidth,
    spacing,
    spacingStart,
    spacingEnd,
    spacingTop,
    spacingBottom,
    spacingHorizontal,
    spacingVertical,
    offset,
    offsetStart,
    offsetEnd,
    offsetTop,
    offsetBottom,
    offsetHorizontal,
    offsetVertical,
    horizontalGap,
    verticalGap,
    display,
    position,
    overflow,
    overflowX,
    overflowY,
    opacity,
    borderRadius,
    borderTopStartRadius,
    borderTopEndRadius,
    borderBottomStartRadius,
    borderBottomEndRadius,
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    textTransform,
    textAlign,
    iconSize,
    avatarSize,
  };
}
