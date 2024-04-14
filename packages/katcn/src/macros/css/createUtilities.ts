import fixtures from '../../fixtures';
import { flattenObj, fromEntries } from '../../helpers';
import { fontWeightMap } from '../../tokens';
import type { Height, UniversalTokensConfig, Width } from '../../types';

function createColors(prop: string | string[]) {
  return flattenObj(
    fromEntries(
      fixtures.hues.map((hue) => {
        const hueObj = fromEntries(
          fixtures.hueSteps.map((step) => {
            return [
              step,
              typeof prop === 'string'
                ? `{ ${prop}: var(--color-${hue}-${step}); }`
                : `{ ${prop
                    .map((p) => `${p}: var(--color-${hue}-${step});`)
                    .join(' ')} }`,
            ] as const;
          }),
        );
        return [hue, hueObj];
      }),
    ),
  );
}

export function createUtilities(config: UniversalTokensConfig) {
  const backgroundColor = {
    ...createColors('background-color'),
    ...fromEntries(
      fixtures.palette.core.map((alias) => [
        alias,
        `{ background-color: var(--palette-core-${alias}); }`,
      ]),
    ),
    ...fromEntries(
      fixtures.palette.background.map((alias) => [
        alias,
        `{ background-color: var(--palette-background-${alias}); }`,
      ]),
    ),
  };

  const color = {
    ...createColors('color'),
    ...fromEntries(
      fixtures.palette.core.map((alias) => [
        alias,
        `{ color: var(--palette-core-${alias}); }`,
      ]),
    ),
    ...fromEntries(
      fixtures.palette.foreground.map((alias) => [
        alias,
        `{ color: var(--palette-foreground-${alias}); }`,
      ]),
    ),
  };

  const borderColor = {
    ...createColors('border-color'),
    ...fromEntries(
      fixtures.palette.core.map((alias) => [
        alias,
        `{ border-color: var(--palette-core-${alias}); }`,
      ]),
    ),
    ...fromEntries(
      fixtures.palette.line.map((alias) => [
        alias,
        `{ border-color: var(--palette-line-${alias}); }`,
      ]),
    ),
  };

  const borderTopColor = {
    ...createColors('border-top-color'),
    ...fromEntries(
      fixtures.palette.core.map((alias) => [
        alias,
        `{ border-top-color: var(--palette-core-${alias}); }`,
      ]),
    ),
    ...fromEntries(
      fixtures.palette.line.map((alias) => [
        alias,
        `{ border-top-color: var(--palette-line-${alias}); }`,
      ]),
    ),
  };

  const borderBottomColor = {
    ...createColors('border-bottom-color'),
    ...fromEntries(
      fixtures.palette.core.map((alias) => [
        alias,
        `{ border-bottom-color: var(--palette-core-${alias}); }`,
      ]),
    ),
    ...fromEntries(
      fixtures.palette.line.map((alias) => [
        alias,
        `{ border-bottom-color: var(--palette-line-${alias}); }`,
      ]),
    ),
  };

  const borderStartColor = {
    ...createColors('border-inline-start-color'),
    ...fromEntries(
      fixtures.palette.core.map((alias) => [
        alias,
        `{ border-inline-start-color: var(--palette-core-${alias}); }`,
      ]),
    ),
    ...fromEntries(
      fixtures.palette.line.map((alias) => [
        alias,
        `{ border-inline-start-color: var(--palette-line-${alias}); }`,
      ]),
    ),
  };

  const borderEndColor = {
    ...createColors('border-inline-end-color'),
    ...fromEntries(
      fixtures.palette.core.map((alias) => [
        alias,
        `{ border-inline-end-color: var(--palette-core-${alias}); }`,
      ]),
    ),
    ...fromEntries(
      fixtures.palette.line.map((alias) => [
        alias,
        `{ border-inline-end-color: var(--palette-line-${alias}); }`,
      ]),
    ),
  };

  const borderXColor = {
    ...createColors(['border-left-color', 'border-right-color']),
    ...fromEntries(
      fixtures.palette.core.map((alias) => [
        alias,
        `{ border-left-color: var(--palette-core-${alias}); border-right-color: var(--palette-core-${alias}); }`,
      ]),
    ),
    ...fromEntries(
      fixtures.palette.line.map((alias) => [
        alias,
        `{ border-left-color: var(--palette-line-${alias}); border-right-color: var(--palette-line-${alias}); }`,
      ]),
    ),
  };

  const borderYColor = {
    ...createColors(['border-top-color', 'border-bottom-color']),
    ...fromEntries(
      fixtures.palette.core.map((alias) => [
        alias,
        `{ border-top-color: var(--palette-core-${alias}); border-bottom-color: var(--palette-core-${alias}); }`,
      ]),
    ),
    ...fromEntries(
      fixtures.palette.line.map((alias) => [
        alias,
        `{ border-top-color: var(--palette-line-${alias}); border-bottom-color: var(--palette-line-${alias}); }`,
      ]),
    ),
  };

  const borderWidth = fromEntries(
    fixtures.borderWidth.map((alias) => [
      alias,
      `{ border-width: var(--border-width-${alias}); }`,
    ]),
  );

  const borderStartWidth = fromEntries(
    fixtures.borderWidth.map((alias) => [
      alias,
      `{ border-inline-start-width: var(--border-width-${alias}); }`,
    ]),
  );

  const borderEndWidth = fromEntries(
    fixtures.borderWidth.map((alias) => [
      alias,
      `{ border-inline-end-width: var(--border-width-${alias}); }`,
    ]),
  );

  const borderTopWidth = fromEntries(
    fixtures.borderWidth.map((alias) => [
      alias,
      `{ border-top-width: var(--border-width-${alias}); }`,
    ]),
  );

  const borderBottomWidth = fromEntries(
    fixtures.borderWidth.map((alias) => [
      alias,
      `{ border-bottom-width: var(--border-width-${alias}); }`,
    ]),
  );

  const borderHorizontalWidth = fromEntries(
    fixtures.borderWidth.map((alias) => [
      alias,
      `{ border-left-width: var(--border-width-${alias}); border-right-width: var(--border-width-${alias});  }`,
    ]),
  );

  const borderVerticalWidth = fromEntries(
    fixtures.borderWidth.map((alias) => [
      alias,
      `{ border-top-width: var(--border-width-${alias}); border-bottom-width: var(--border-width-${alias});  }`,
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
          allow: 'wrap',
          prevent: 'nowrap',
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
    ...fromEntries(
      fixtures.spacingAlias.map((alias) => [alias, config.spacing[alias]]),
    ),
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
    '1/2': '50%',
    '2/2': '100%',
    '1/3': '33.33%',
    '2/3': '66.67%',
    '3/3': '100%',
    '1/4': '25%',
    '2/4': '50%',
    '3/4': '75%',
    '4/4': '100%',
    '1/5': '20%',
    '2/5': '40%',
    '3/5': '60%',
    '4/5': '80%',
    '5/5': '100%',
    '1/6': '16.67%',
    '2/6': '33.33%',
    '3/6': '50%',
    '4/6': '66.67%',
    '5/6': '83.33%',
    '6/6': '100%',
    '1/7': '14.29%',
    '2/7': '28.57%',
    '3/7': '42.86%',
    '4/7': '57.14%',
    '5/7': '71.43%',
    '6/7': '85.71%',
    '7/7': '100%',
    '1/8': '12.5%',
    '2/8': '25%',
    '3/8': '37.5%',
    '4/8': '50%',
    '5/8': '62.5%',
    '6/8': '75%',
    '7/8': '87.5%',
    '8/8': '100%',
    '1/9': '11.11%',
    '2/9': '22.22%',
    '3/9': '33.33%',
    '4/9': '44.44%',
    '5/9': '55.56%',
    '6/9': '66.67%',
    '7/9': '77.78%',
    '8/9': '88.89%',
    '9/9': '100%',
    '1/10': '10%',
    '2/10': '20%',
    '3/10': '30%',
    '4/10': '40%',
    '5/10': '50%',
    '6/10': '60%',
    '7/10': '70%',
    '8/10': '80%',
    '9/10': '90%',
    '10/10': '100%',
    '1/11': '9.09%',
    '2/11': '18.18%',
    '3/11': '27.27%',
    '4/11': '36.36%',
    '5/11': '45.45%',
    '6/11': '54.55%',
    '7/11': '63.64%',
    '8/11': '72.73%',
    '9/11': '81.82%',
    '10/11': '90.91%',
    '11/11': '100%',
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
    ...fromEntries(
      fixtures.spacingAlias.map((alias) => [alias, config.spacing[alias]]),
    ),
  };

  const width = fromEntries(
    fixtures.width.map((alias) => [alias, `{ width: ${widthLookup[alias]} }`]),
  );

  const maxWidth = fromEntries(
    fixtures.width.map((alias) => [
      alias,
      `{ max-inline-size: ${widthLookup[alias]} }`,
    ]),
  );

  const minWidth = fromEntries(
    fixtures.width.map((alias) => [
      alias,
      `{ min-inline-size: ${widthLookup[alias]} }`,
    ]),
  );

  const spacing = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ padding: ${config.spacing[alias]} }`,
    ]),
  );

  const spacingTop = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ padding-top: ${config.spacing[alias]} }`,
    ]),
  );

  const spacingStart = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ padding-inline-start: ${config.spacing[alias]} }`,
    ]),
  );

  const spacingEnd = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ padding-inline-end: ${config.spacing[alias]} }`,
    ]),
  );

  const spacingBottom = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ padding-bottom: ${config.spacing[alias]} }`,
    ]),
  );

  const spacingX = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ padding-left: ${config.spacing[alias]}; padding-right: ${config.spacing[alias]}; }`,
    ]),
  );

  const spacingY = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ padding-top: ${config.spacing[alias]}; padding-bottom: ${config.spacing[alias]}; }`,
    ]),
  );

  const offset = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ margin: -${config.spacing[alias]} }`,
    ]),
  );

  const offsetTop = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ margin-top: -${config.spacing[alias]} }`,
    ]),
  );

  const offsetStart = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ margin-inline-start: -${config.spacing[alias]} }`,
    ]),
  );

  const offsetEnd = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ margin-inline-end: -${config.spacing[alias]} }`,
    ]),
  );

  const offsetBottom = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ margin-bottom: -${config.spacing[alias]} }`,
    ]),
  );

  const offsetX = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ margin-left: -${config.spacing[alias]}; margin-right: -${config.spacing[alias]} }`,
    ]),
  );

  const offsetY = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ margin-top: -${config.spacing[alias]}; margin-bottom: -${config.spacing[alias]} }`,
    ]),
  );

  const gapX = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ column-gap: ${config.spacing[alias]} }`,
    ]),
  );

  const gapY = fromEntries(
    fixtures.spacingAlias.map((alias) => [
      alias,
      `{ row-gap: ${config.spacing[alias]} }`,
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
      `{ border-radius: var(--radius-${alias}) }`,
    ]),
  );

  const borderTopRadius = fromEntries(
    fixtures.borderRadius.map((alias) => [
      `${alias}`,
      `{ border-top-left-radius: var(--radius-${alias}); border-top-right-radius: var(--radius-${alias}) }`,
    ]),
  );

  const borderBottomRadius = fromEntries(
    fixtures.borderRadius.map((alias) => [
      `${alias}`,
      `{ border-bottom-left-radius: var(--radius-${alias}); border-bottom-right-radius: var(--radius-${alias}) }`,
    ]),
  );

  const borderStartRadius = fromEntries(
    fixtures.borderRadius.map((alias) => [
      `${alias}`,
      `{ border-start-start-radius: var(--radius-${alias}); border-end-start-radius: var(--radius-${alias}) }`,
    ]),
  );

  const borderEndRadius = fromEntries(
    fixtures.borderRadius.map((alias) => [
      `${alias}`,
      `{ border-start-end-radius: var(--radius-${alias}); border-end-end-radius: var(--radius-${alias}) }`,
    ]),
  );

  const borderTopStartRadius = fromEntries(
    fixtures.borderRadius.map((alias) => [
      `${alias}`,
      `{ border-start-start-radius: var(--radius-${alias}) }`,
    ]),
  );

  const borderTopEndRadius = fromEntries(
    fixtures.borderRadius.map((alias) => [
      `${alias}`,
      `{ border-end-end-radius: var(--radius-${alias}) }`,
    ]),
  );

  const borderBottomStartRadius = fromEntries(
    fixtures.borderRadius.map((alias) => [
      `${alias}`,
      `{ border-end-start-radius: var(--radius-${alias}) }`,
    ]),
  );

  const borderBottomEndRadius = fromEntries(
    fixtures.borderRadius.map((alias) => [
      `${alias}`,
      `{ border-end-end-radius: var(--radius-${alias}) }`,
    ]),
  );

  const fontFamily = {
    ...fromEntries(
      fixtures.FontFamilyGlobalAlias.map((alias) => [
        alias,
        `{ font-family: var(--font-${alias}); }`,
      ]),
    ),
    ...fromEntries(
      fixtures.textVariant.map((alias) => [
        alias,
        `{ font-family: var(--font-family-${alias}); }`,
      ]),
    ),
  };

  const fontSize = fromEntries(
    fixtures.fontSize.map((alias) => [
      `${alias}`,
      `{ font-size: var(--font-size-${alias}); }`,
    ]),
  );

  const fontWeight = {
    ...fromEntries(
      fixtures.textVariant.map((alias) => [
        `${alias}`,
        `{ font-weight: var(--font-weight-${alias}, '${fontWeightMap.regular}'); }`,
      ]),
    ),
    ...fromEntries(
      fixtures.fontWeightDescriptive.map((alias) => [
        `${alias}`,
        `{ font-weight: ${fontWeightMap[alias]} }`,
      ]),
    ),
  };

  const lineHeight = fromEntries(
    fixtures.lineHeight.map((alias) => [
      `${alias}`,
      `{ line-height: var(--line-height-${alias}) }`,
    ]),
  );

  const textTransform = {
    ...fromEntries(
      fixtures.textVariant.map((alias) => [
        `${alias}`,
        `{ text-transform: var(--text-transform-${alias}, 'none'); }`,
      ]),
    ),
    ...fromEntries(
      fixtures.textTransformDescriptive.map((alias) => [
        `${alias}`,
        `{ text-transform: ${alias} }`,
      ]),
    ),
  };

  const textAlign = fromEntries(
    fixtures.textAlign.map((alias) => [
      `${alias}`,
      `{ text-align: ${alias}; }`,
    ]),
  );

  const iconSize = fromEntries(
    fixtures.iconSize.map((alias) => [
      `${alias}`,
      `{ display: block; width: var(--icon-size-${alias}); height: var(--icon-size-${alias}); font-size: var(--icon-size-${alias}); line-height: var(--icon-size-${alias}); }`,
    ]),
  );

  const avatarSize = fromEntries(
    fixtures.avatarSize.map((alias) => [
      `${alias}`,
      `{ width: var(--avatar-size-${alias}); height: var(--avatar-size-${alias}); }`,
    ]),
  );

  const zIndex = fromEntries(
    fixtures.zIndex.map((alias) => [
      `${alias}`,
      `{ z-index: var(--z-index-${alias}); }`,
    ]),
  );

  const aspectRatio = fromEntries(
    fixtures.aspectRatio.map((alias) => [
      `${alias}`,
      `{ aspect-ratio: var(--aspect-ratio-${alias}); }`,
    ]),
  );

  return {
    aspectRatio,
    backgroundColor,
    color,
    borderColor,
    borderTopColor,
    borderBottomColor,
    borderStartColor,
    borderEndColor,
    borderXColor,
    borderYColor,
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
    spacingX,
    spacingY,
    offset,
    offsetStart,
    offsetEnd,
    offsetTop,
    offsetBottom,
    offsetX,
    offsetY,
    gapX,
    gapY,
    display,
    position,
    overflow,
    overflowX,
    overflowY,
    opacity,
    borderRadius,
    borderTopRadius,
    borderBottomRadius,
    borderStartRadius,
    borderEndRadius,
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
    zIndex,
  };
}
