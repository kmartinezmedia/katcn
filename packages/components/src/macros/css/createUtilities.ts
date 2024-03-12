import fixtures from '#fixtures';
import { Height, Width } from '../../types/tokenTypes';
import { fromEntries } from '../../helpers';
import { cssEscape } from '../../helpers/cssEscape';

export function createUtilities() {
  const backgroundColor = {
    ...fromEntries(
      fixtures.palette.core.map((alias) => [
        alias,
        `{ background-color: var(--katcn-palette-core-${alias}); }`,
      ]),
    ),
    ...fromEntries(
      fixtures.palette.background.map((alias) => [
        alias,
        `{ background-color: var(--katcn-palette-background-${alias}); }`,
      ]),
    ),
  };

  const color = {
    ...fromEntries(
      fixtures.palette.core.map((alias) => [
        alias,
        `{ color: var(--katcn-palette-core-${alias}); }`,
      ]),
    ),
    ...fromEntries(
      fixtures.palette.foreground.map((alias) => [
        alias,
        `{ color: var(--katcn-palette-foreground-${alias}); }`,
      ]),
    ),
  };

  const borderColor = {
    ...fromEntries(
      fixtures.palette.core.map((alias) => [
        alias,
        `{ border-color: var(--katcn-palette-core-${alias}); }`,
      ]),
    ),
    ...fromEntries(
      fixtures.palette.line.map((alias) => [
        alias,
        `{ border-color: var(--katcn-palette-line-${alias}); }`,
      ]),
    ),
  };

  const borderTopColor = {
    ...fromEntries(
      fixtures.palette.core.map((alias) => [
        alias,
        `{ border-top-color: var(--katcn-palette-core-${alias}); }`,
      ]),
    ),
    ...fromEntries(
      fixtures.palette.line.map((alias) => [
        alias,
        `{ border-top-color: var(--katcn-palette-line-${alias}); }`,
      ]),
    ),
  };

  const borderBottomColor = {
    ...fromEntries(
      fixtures.palette.core.map((alias) => [
        alias,
        `{ border-bottom-color: var(--katcn-palette-core-${alias}); }`,
      ]),
    ),
    ...fromEntries(
      fixtures.palette.line.map((alias) => [
        alias,
        `{ border-bottom-color: var(--katcn-palette-line-${alias}); }`,
      ]),
    ),
  };

  const borderStartColor = {
    ...fromEntries(
      fixtures.palette.core.map((alias) => [
        alias,
        `{ border-inline-start-color: var(--katcn-palette-core-${alias}); }`,
      ]),
    ),
    ...fromEntries(
      fixtures.palette.line.map((alias) => [
        alias,
        `{ border-inline-start-color: var(--katcn-palette-line-${alias}); }`,
      ]),
    ),
  };

  const borderEndColor = {
    ...fromEntries(
      fixtures.palette.core.map((alias) => [
        alias,
        `{ border-inline-end-color: var(--katcn-palette-core-${alias}); }`,
      ]),
    ),
    ...fromEntries(
      fixtures.palette.line.map((alias) => [
        alias,
        `{ border-inline-end-color: var(--katcn-palette-line-${alias}); }`,
      ]),
    ),
  };

  const borderHorizontalColor = {
    ...fromEntries(
      fixtures.palette.core.map((alias) => [
        alias,
        `{ border-left-color: var(--katcn-palette-core-${alias}); border-right-color: var(--katcn-palette-core-${alias}); }`,
      ]),
    ),
    ...fromEntries(
      fixtures.palette.line.map((alias) => [
        alias,
        `{ border-left-color: var(--katcn-palette-line-${alias}); border-right-color: var(--katcn-palette-line-${alias}); }`,
      ]),
    ),
  };

  const borderVerticalColor = {
    ...fromEntries(
      fixtures.palette.core.map((alias) => [
        alias,
        `{ border-top-color: var(--katcn-palette-core-${alias}); border-bottom-color: var(--katcn-palette-core-${alias}); }`,
      ]),
    ),
    ...fromEntries(
      fixtures.palette.line.map((alias) => [
        alias,
        `{ border-top-color: var(--katcn-palette-line-${alias}); border-bottom-color: var(--katcn-palette-line-${alias}); }`,
      ]),
    ),
  };

  const borderWidth = fromEntries(
    fixtures.borderWidth.map((alias) => [
      alias,
      `{ border-width: var(--katcn-border-width-${alias}); }`,
    ]),
  );

  const borderStartWidth = fromEntries(
    fixtures.borderWidth.map((alias) => [
      alias,
      `{ border-inline-start-width: var(--katcn-border-width-${alias}); }`,
    ]),
  );

  const borderEndWidth = fromEntries(
    fixtures.borderWidth.map((alias) => [
      alias,
      `{ border-inline-end-width: var(--katcn-border-width-${alias}); }`,
    ]),
  );

  const borderTopWidth = fromEntries(
    fixtures.borderWidth.map((alias) => [
      alias,
      `{ border-top-width: var(--katcn-border-width-${alias}); }`,
    ]),
  );

  const borderBottomWidth = fromEntries(
    fixtures.borderWidth.map((alias) => [
      alias,
      `{ border-bottom-width: var(--katcn-border-width-${alias}); }`,
    ]),
  );

  const borderHorizontalWidth = fromEntries(
    fixtures.borderWidth.map((alias) => [
      alias,
      `{ border-left-width: var(--katcn-border-width-${alias}); border-right-width: var(--katcn-border-width-${alias});  }`,
    ]),
  );

  const borderVerticalWidth = fromEntries(
    fixtures.borderWidth.map((alias) => [
      alias,
      `{ border-top-width: var(--katcn-border-width-${alias}); border-bottom-width: var(--katcn-border-width-${alias});  }`,
    ]),
  );

  const flexDirection = fromEntries(
    fixtures.flexDirection.map((alias) => [
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
    fixtures.alignContent.map((alias) => [
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
    fixtures.alignItems.map((alias) => [
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
    fixtures.alignSelf.map((alias) => [
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
    fixtures.justifyContent.map((alias) => [
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
    fixtures.placeContent.map((alias) => [
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
    fixtures.placeItems.map((alias) => [alias, `{ place-items: ${alias} }`]),
  );

  const placeSelf = fromEntries(
    fixtures.placeSelf.map((alias) => [alias, `{ place-self: ${alias} }`]),
  );

  const grow = fromEntries(
    fixtures.grow.map((alias) => [
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
    fixtures.shrink.map((alias) => [
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
    fixtures.wrap.map((alias) => [
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
    fixtures.height.map((alias) => [
      alias,
      `{ height: ${heightLookup[alias]} }`,
    ]),
  );

  const maxHeight = fromEntries(
    fixtures.maxHeight.map((alias) => [
      alias,
      `{ max-block-size: ${heightLookup[alias]} }`,
    ]),
  );

  const minHeight = fromEntries(
    fixtures.minHeight.map((alias) => [
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
    fixtures.width.map((alias) => [
      cssEscape(`${alias}`),
      `{ width: ${widthLookup[alias]} }`,
    ]),
  );

  const maxWidth = fromEntries(
    fixtures.width.map((alias) => [
      cssEscape(`${alias}`),
      `{ max-inline-size: ${widthLookup[alias]} }`,
    ]),
  );

  const minWidth = fromEntries(
    fixtures.width.map((alias) => [
      cssEscape(`${alias}`),
      `{ min-inline-size: ${widthLookup[alias]} }`,
    ]),
  );

  const spacing = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ padding: var(--katcn-spacing-${alias}); }`,
    ]),
  );

  const spacingTop = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ padding-top: var(--katcn-spacing-${alias}); }`,
    ]),
  );

  const spacingStart = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ padding-inline-start: var(--katcn-spacing-${alias}); }`,
    ]),
  );

  const spacingEnd = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ padding-inline-end: var(--katcn-spacing-${alias}); }`,
    ]),
  );

  const spacingBottom = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ padding-bottom: var(--katcn-spacing-${alias}); }`,
    ]),
  );

  const spacingHorizontal = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ padding-left: var(--katcn-spacing-${alias}); padding-right: var(--katcn-spacing-${alias}); }`,
    ]),
  );

  const spacingVertical = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ padding-top: var(--katcn-spacing-${alias}); padding-bottom: var(--katcn-spacing-${alias}); }`,
    ]),
  );

  const offset = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ margin: -var(--katcn-offset-${alias}); }`,
    ]),
  );

  const offsetTop = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ margin-top: -var(--katcn-spacing-${alias}); }`,
    ]),
  );

  const offsetStart = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ margin-inline-start: -var(--katcn-spacing-${alias}); }`,
    ]),
  );

  const offsetEnd = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ margin-inline-end: -var(--katcn-spacing-${alias}); }`,
    ]),
  );

  const offsetBottom = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ margin-bottom: -var(--katcn-spacing-${alias}); }`,
    ]),
  );

  const offsetHorizontal = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ margin-left: -var(--katcn-spacing-${alias}); margin-right: -var(--katcn-spacing-${alias}); }`,
    ]),
  );

  const offsetVertical = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ margin-top: -var(--katcn-spacing-${alias}); margin-bottom: -var(--katcn-spacing-${alias}); }`,
    ]),
  );

  const horizontalGap = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ column-gap: -var(--katcn-spacing-${alias}); }`,
    ]),
  );

  const verticalGap = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ row-gap: -var(--katcn-spacing-${alias}); }`,
    ]),
  );

  const display = fromEntries(
    fixtures.display.map((alias) => [alias, `{ display: ${alias}; }`]),
  );

  const overflow = fromEntries(
    fixtures.overflow.map((alias) => [alias, `{ overflow: ${alias}; }`]),
  );

  const overflowX = fromEntries(
    fixtures.overflow.map((alias) => [alias, `{ overflow-x: ${alias}; }`]),
  );

  const overflowY = fromEntries(
    fixtures.overflow.map((alias) => [alias, `{ overflow-y: ${alias}; }`]),
  );

  const position = fromEntries(
    fixtures.position.map((alias) => [alias, `{ position: ${alias}; }`]),
  );

  const opacity = fromEntries(
    fixtures.opacity.map((alias) => [alias, `{ opacity: ${alias}; }`]),
  );

  const borderRadius = fromEntries(
    fixtures.borderRadius.map((alias) => [
      `${alias}`,
      `{ border-radius: var(--katcn-radii-${alias}); }`,
    ]),
  );

  const borderTopStartRadius = fromEntries(
    fixtures.borderRadius.map((alias) => [
      `${alias}`,
      `{ border-start-start-radius: var(--katcn-radii-${alias}); }`,
    ]),
  );

  const borderTopEndRadius = fromEntries(
    fixtures.opacity.map((alias) => [
      `${alias}`,
      `{ border-start-end-radius: var(--katcn-radii-${alias}); }`,
    ]),
  );

  const borderBottomStartRadius = fromEntries(
    fixtures.borderRadius.map((alias) => [
      `${alias}`,
      `{ border-end-start-radius: var(--katcn-radii-${alias}); }`,
    ]),
  );

  const borderBottomEndRadius = fromEntries(
    fixtures.borderRadius.map((alias) => [
      `${alias}`,
      `{ border-end-end-radius: var(--katcn-radii-${alias}); }`,
    ]),
  );

  const fontFamily = {
    ...fromEntries(
      fixtures.FontFamilyGlobalAlias.map((alias) => [
        alias,
        `{ font-family: var(--katcn-font-${alias}); }`,
      ]),
    ),
    ...fromEntries(
      fixtures.textVariant.map((alias) => [
        alias,
        `{ font-family: var(--katcn-font-family-${alias}); }`,
      ]),
    ),
  };

  const fontSize = fromEntries(
    fixtures.fontSize.map((alias) => [
      `${alias}`,
      `{ font-size: var(--katcn-font-size-${alias}); }`,
    ]),
  );

  const fontWeight = {
    ...fromEntries(
      fixtures.textVariant.map((alias) => [
        `${alias}`,
        `{ font-weight: var(--katcn-font-weight-${alias}); }`,
      ]),
    ),
    ...fromEntries(
      fixtures.fontWeightDescriptive.map((alias) => [
        `${alias}`,
        `{ font-weight: ${alias}; }`,
      ]),
    ),
  };

  const lineHeight = fromEntries(
    fixtures.lineHeight.map((alias) => [
      `${alias}`,
      `{ line-height: var(--katcn-line-height-${alias}); }`,
    ]),
  );

  const textTransform = fromEntries(
    fixtures.textTransform.map((alias) => [
      `${alias}`,
      `{ text-transform: var(--katcn-text-transform-${alias}); }`,
    ]),
  );

  const textAlign = fromEntries(
    fixtures.textAlign.map((alias) => [
      `${alias}`,
      `{ text-align: ${alias}; }`,
    ]),
  );

  const iconSize = fromEntries(
    fixtures.iconSize.map((alias) => [
      `${alias}`,
      `{ display: block; width: var(--katcn-icon-size-${alias}); height: var(--katcn-icon-size-${alias}); font-size: var(--katcn-icon-size-${alias}); line-height: var(--katcn-icon-size-${alias}); }`,
    ]),
  );

  const avatarSize = fromEntries(
    fixtures.avatarSize.map((alias) => [
      `${alias}`,
      `{ text-transform: var(--katcn-text-transform-${alias}); }`,
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
