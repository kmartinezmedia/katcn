import type {
  AvatarProps,
  BoxProps,
  HStackProps,
  IconProps,
  TextInputProps,
  TextProps,
  VStackProps,
} from './components';
import type { StyleProps } from './types';
import fixtures from 'katcn/fixtures';

export interface GetStylesParams extends StyleProps {
  className?: string;
}

export const getStyles = ({
  color,
  colorChecked,
  display,
  placeholderColor,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  textAlign,
  textTransform,
  spacing,
  spacingX,
  spacingY,
  spacingTop,
  spacingBottom,
  spacingStart,
  spacingEnd,
  offset,
  offsetX,
  offsetY,
  offsetTop,
  offsetBottom,
  offsetStart,
  offsetEnd,
  gapX,
  gapY,
  direction,
  grow,
  shrink,
  wrap,
  justifyContent,
  alignItems,
  alignContent,
  backgroundColor,
  backgroundColorOnActive,
  backgroundColorOnFocus,
  backgroundColorOnHover,
  backgroundColorOnChecked,
  borderColor,
  borderColorOnActive,
  borderColorOnChecked,
  borderColorOnFocus,
  borderColorOnHover,
  borderXColor,
  borderYColor,
  borderTopColor,
  borderBottomColor,
  borderStartColor,
  borderEndColor,
  borderRadius,
  borderTopRadius,
  borderBottomRadius,
  borderStartRadius,
  borderEndRadius,
  borderTopStartRadius,
  borderTopEndRadius,
  borderBottomStartRadius,
  borderBottomEndRadius,
  borderWidth,
  borderXWidth,
  borderYWidth,
  borderStartWidth,
  borderEndWidth,
  borderTopWidth,
  borderBottomWidth,
  height,
  minHeight,
  maxHeight,
  width,
  minWidth,
  maxWidth,
  overflow,
  overflowX,
  overflowY,
  position,
  zIndex,
  opacity,
  contentFit,
  iconSize,
  avatarSize,
  className,
}: GetStylesParams) => {
  const classNames = new Set<string>();

  if (color) {
    const isCustomColor = !fixtures.allColorNames.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      color as any,
    );
    let classname = 'color';
    if (isCustomColor) {
      classname = `${classname}-[${color}]`;
    } else {
      classname = `${classname}-${color}`;
    }
    classNames.add(classname);
  }

  if (colorChecked) {
    classNames.add(`data-[state=checked]:color-${colorChecked}`);
  }

  if (display) {
    classNames.add(`display-${display}`);
  }

  if (placeholderColor) {
    classNames.add(`placeholder:color-${placeholderColor}`);
  }
  if (fontFamily) {
    classNames.add(`fontFamily-${fontFamily}`);
  }
  if (fontSize) {
    classNames.add(`fontSize-${fontSize}`);
  }
  if (fontWeight) {
    classNames.add(`fontWeight-${fontWeight}`);
  }
  if (lineHeight) {
    classNames.add(`lineHeight-${lineHeight}`);
  }
  if (textAlign) {
    classNames.add(`textAlign-${textAlign}`);
  }
  if (textTransform) {
    classNames.add(`textTransform-${textTransform}`);
  }

  if (spacing) {
    let classname = 'spacing';
    typeof spacing === 'number'
      ? `spacing-[${spacing}px]`
      : `spacing-${spacing}`;

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const isCustomClassname = !fixtures.spacingAlias.includes(spacing as any);

    if (isCustomClassname) {
      classname = `spacing-[${spacing}]`;
    }

    classNames.add(classname);
  }

  if (spacingX) {
    let classname = 'spacingX';
    typeof spacingX === 'number'
      ? `spacingX-[${spacingX}px]`
      : `spacingX-${spacingX}`;

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const isCustomClassname = !fixtures.spacingAlias.includes(spacingX as any);

    if (isCustomClassname) {
      classname = `spacingX-[${spacingX}]`;
    }

    classNames.add(classname);
  }

  if (spacingY) {
    let classname = 'spacingY';
    typeof spacingY === 'number'
      ? `spacingY-[${spacingY}px]`
      : `spacingY-${spacingY}`;

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const isCustomClassname = !fixtures.spacingAlias.includes(spacingY as any);

    if (isCustomClassname) {
      classname = `spacingY-[${spacingY}]`;
    }

    classNames.add(classname);
  }

  if (spacingTop) {
    let classname = 'spacingTop';
    typeof height === 'number'
      ? `spacingTop-[${spacingTop}px]`
      : `spacingTop-${spacingTop}`;

    const isCustomClassname = !fixtures.spacingAlias.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      spacingTop as any,
    );

    if (isCustomClassname) {
      classname = `spacingTop-[${spacingTop}]`;
    }

    classNames.add(classname);
  }

  if (spacingBottom) {
    let classname = 'spacingBottom';
    typeof height === 'number'
      ? `heispacingBottom-[${spacingBottom}px]`
      : `spacingBottom-${spacingBottom}`;

    const isCustomClassname = !fixtures.spacingAlias.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      spacingBottom as any,
    );

    if (isCustomClassname) {
      classname = `spacingBottom-[${spacingBottom}]`;
    }

    classNames.add(classname);
  }

  if (spacingStart) {
    let classname = 'spacingStart';
    typeof height === 'number'
      ? `hespacingStart-[${spacingStart}px]`
      : `spacingStart-${spacingStart}`;

    const isCustomClassname = !fixtures.spacingAlias.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      spacingStart as any,
    );

    if (isCustomClassname) {
      classname = `spacingStart-[${spacingStart}]`;
    }

    classNames.add(classname);
  }

  if (spacingEnd) {
    let classname = 'spacingEnd';
    typeof height === 'number'
      ? `spacingEnd-[${spacingEnd}px]`
      : `spacingEnd-${spacingEnd}`;

    const isCustomClassname = !fixtures.spacingAlias.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      spacingEnd as any,
    );

    if (isCustomClassname) {
      classname = `spacingEnd-[${spacingEnd}]`;
    }

    classNames.add(classname);
  }

  if (offset) {
    let classname = 'offset';
    typeof height === 'number' ? `offset-[${offset}px]` : `offset-${offset}`;

    const isCustomClassname = !fixtures.spacingAlias.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      offset as any,
    );

    if (isCustomClassname) {
      classname = `offset-[${offset}]`;
    }

    classNames.add(classname);
  }

  if (offsetY) {
    let classname = 'offsetY';
    typeof height === 'number'
      ? `offsetY-[${offsetY}px]`
      : `offsetY-${offsetY}`;

    const isCustomClassname = !fixtures.spacingAlias.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      offsetY as any,
    );

    if (isCustomClassname) {
      classname = `offsetY-[${offsetY}]`;
    }

    classNames.add(classname);
  }
  if (offsetX) {
    let classname = 'offsetX';
    typeof height === 'number'
      ? `offsetX-[${offsetX}px]`
      : `offsetX-${offsetX}`;

    const isCustomClassname = !fixtures.spacingAlias.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      offsetX as any,
    );

    if (isCustomClassname) {
      classname = `offsetX-[${offsetX}]`;
    }

    classNames.add(classname);
  }

  if (offsetTop) {
    let classname = 'offsetTop';
    typeof height === 'number'
      ? `offsetTop-[${offsetTop}px]`
      : `offsetTop-${offsetTop}`;

    const isCustomClassname = !fixtures.spacingAlias.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      offsetTop as any,
    );

    if (isCustomClassname) {
      classname = `offsetTop-[${offsetTop}]`;
    }

    classNames.add(classname);
  }

  if (offsetBottom) {
    let classname = 'offsetBottom';
    typeof height === 'number'
      ? `offsetBottom-[${offsetBottom}px]`
      : `offsetBottom-${offsetBottom}`;

    const isCustomClassname = !fixtures.spacingAlias.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      offsetBottom as any,
    );

    if (isCustomClassname) {
      classname = `offsetBottom-[${offsetBottom}]`;
    }

    classNames.add(classname);
  }

  if (offsetStart) {
    let classname = 'offsetStart';
    typeof height === 'number'
      ? `offsetStart-[${offsetStart}px]`
      : `offsetStart-${offsetStart}`;

    const isCustomClassname = !fixtures.spacingAlias.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      offsetStart as any,
    );

    if (isCustomClassname) {
      classname = `offsetStart-[${offsetStart}]`;
    }

    classNames.add(classname);
  }

  if (offsetEnd) {
    let classname = 'offsetEnd';
    typeof height === 'number'
      ? `offsetEnd-[${offsetEnd}px]`
      : `offsetEnd-${offsetEnd}`;

    const isCustomClassname = !fixtures.spacingAlias.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      offsetEnd as any,
    );

    if (isCustomClassname) {
      classname = `offsetEnd-[${offsetEnd}]`;
    }

    classNames.add(classname);
  }

  if (gapX) {
    let classname = 'gapX';
    typeof height === 'number' ? `gapX-[${gapX}px]` : `gapX-${gapX}`;

    const isCustomClassname = !fixtures.spacingAlias.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      gapX as any,
    );

    if (isCustomClassname) {
      classname = `gapX-[${gapX}]`;
    }

    classNames.add(classname);
  }

  if (gapY) {
    let classname = 'gapY';
    typeof height === 'number' ? `gapY-[${gapY}px]` : `gapY-${gapY}`;

    const isCustomClassname = !fixtures.spacingAlias.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      gapY as any,
    );

    if (isCustomClassname) {
      classname = `gapY-[${gapY}]`;
    }

    classNames.add(classname);
  }

  if (backgroundColor) {
    const isCustomColor = !fixtures.allColorNames.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      backgroundColor as any,
    );
    let classname = 'backgroundColor';
    if (isCustomColor) {
      classname = `${classname}-[${backgroundColor}]`;
    } else {
      classname = `${classname}-${backgroundColor}`;
    }
    classNames.add(classname);
  }

  if (backgroundColorOnActive) {
    const isCustomColor = !fixtures.allColorNames.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      backgroundColorOnActive as any,
    );
    let classname = 'backgroundColorOnActive';
    if (isCustomColor) {
      classname = `${classname}-[${backgroundColorOnActive}]`;
    } else {
      classname = `${classname}-${backgroundColorOnActive}`;
    }
    classNames.add(`backgroundColorOnActive-${backgroundColorOnActive}`);
  }

  if (backgroundColorOnFocus) {
    const isCustomColor = !fixtures.allColorNames.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      backgroundColorOnFocus as any,
    );
    let classname = 'backgroundColorOnFocus';
    if (isCustomColor) {
      classname = `${classname}-[${backgroundColorOnFocus}]`;
    } else {
      classname = `${classname}-${backgroundColorOnFocus}`;
    }
    classNames.add(`backgroundColorOnFocus-${backgroundColorOnFocus}`);
  }

  if (backgroundColorOnHover) {
    const isCustomColor = !fixtures.allColorNames.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      backgroundColorOnHover as any,
    );
    let classname = 'backgroundColorOnHover';
    if (isCustomColor) {
      classname = `${classname}-[${backgroundColorOnHover}]`;
    } else {
      classname = `${classname}-${backgroundColorOnHover}`;
    }
    classNames.add(`backgroundColorOnHover-${backgroundColorOnHover}`);
  }

  if (backgroundColorOnChecked) {
    const isCustomColor = !fixtures.allColorNames.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      backgroundColorOnChecked as any,
    );
    let classname = 'backgroundColorOnChecked';
    if (isCustomColor) {
      classname = `${classname}-[${backgroundColorOnChecked}]`;
    } else {
      classname = `${classname}-${backgroundColorOnChecked}`;
    }
    classNames.add(`backgroundColorOnChecked-${backgroundColorOnChecked}`);
  }

  if (borderColorOnActive) {
    const isCustomColor = !fixtures.allColorNames.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      borderColorOnActive as any,
    );
    let classname = '';

    if (borderColor) {
      classname = 'borderColorOnActive';
    }
    if (borderTopColor) {
      classname = 'borderColorOnActive-t';
    }
    if (borderBottomColor) {
      classname = 'borderColorOnActive-b';
    }
    if (borderStartColor) {
      classname = 'borderColorOnActive-s';
    }
    if (borderEndColor) {
      classname = 'borderColorOnActive-e';
    }

    if (isCustomColor) {
      classname = `${classname}-[${borderColorOnActive}]`;
    } else {
      classname = `${classname}-${borderColorOnActive}`;
    }
    classNames.add(classname);
  }

  if (borderColorOnChecked) {
    const isCustomColor = !fixtures.allColorNames.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      borderColorOnChecked as any,
    );
    let classname = '';

    if (borderColor) {
      classname = 'borderColorOnChecked';
    }
    if (borderTopColor) {
      classname = 'borderColorOnChecked-t';
    }
    if (borderBottomColor) {
      classname = 'borderColorOnChecked-b';
    }
    if (borderStartColor) {
      classname = 'borderColorOnChecked-s';
    }
    if (borderEndColor) {
      classname = 'borderColorOnChecked-e';
    }

    if (isCustomColor) {
      classname = `${classname}-[${borderColorOnChecked}]`;
    } else {
      classname = `${classname}-${borderColorOnChecked}`;
    }
    classNames.add(classname);
  }

  if (borderColorOnFocus) {
    const isCustomColor = !fixtures.allColorNames.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      borderColorOnFocus as any,
    );
    let classname = '';

    if (borderColor) {
      classname = 'borderColorOnFocus';
    }
    if (borderTopColor) {
      classname = 'borderColorOnFocus-t';
    }
    if (borderBottomColor) {
      classname = 'borderColorOnFocus-b';
    }
    if (borderStartColor) {
      classname = 'borderColorOnFocus-s';
    }
    if (borderEndColor) {
      classname = 'borderColorOnFocus-e';
    }

    if (isCustomColor) {
      classname = `${classname}-[${borderColorOnFocus}]`;
    } else {
      classname = `${classname}-${borderColorOnFocus}`;
    }
    classNames.add(classname);
  }

  if (borderColorOnHover) {
    const isCustomColor = !fixtures.allColorNames.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      borderColorOnHover as any,
    );
    let classname = '';

    if (borderColor) {
      classname = 'borderColorOnHover';
    }
    if (borderTopColor) {
      classname = 'borderColorOnHover-t';
    }
    if (borderBottomColor) {
      classname = 'borderColorOnHover-b';
    }
    if (borderStartColor) {
      classname = 'borderColorOnHover-s';
    }
    if (borderEndColor) {
      classname = 'borderColorOnHover-e';
    }

    if (isCustomColor) {
      classname = `${classname}-[${borderColorOnHover}]`;
    } else {
      classname = `${classname}-${borderColorOnHover}`;
    }
    classNames.add(classname);
  }

  if (borderColorOnActive) {
    const isCustomColor = !fixtures.allColorNames.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      borderColorOnActive as any,
    );
    let classname = '';

    if (borderColor) {
      classname = 'borderColorOnActive';
    }
    if (borderTopColor) {
      classname = 'borderColorOnActive-t';
    }
    if (borderBottomColor) {
      classname = 'borderColorOnActive-b';
    }
    if (borderStartColor) {
      classname = 'borderColorOnActive-s';
    }
    if (borderEndColor) {
      classname = 'borderColorOnActive-e';
    }

    if (isCustomColor) {
      classname = `${classname}-[${borderColorOnActive}]`;
    } else {
      classname = `${classname}-${borderColorOnActive}`;
    }
    classNames.add(classname);
  }

  if (borderColorOnFocus) {
    const isCustomColor = !fixtures.allColorNames.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      borderColorOnFocus as any,
    );
    let classname = '';

    if (borderColor) {
      classname = 'borderColorOnFocus';
    }
    if (borderTopColor) {
      classname = 'borderColorOnFocus-t';
    }
    if (borderBottomColor) {
      classname = 'borderColorOnFocus-b';
    }
    if (borderStartColor) {
      classname = 'borderColorOnFocus-s';
    }
    if (borderEndColor) {
      classname = 'borderColorOnFocus-e';
    }

    if (isCustomColor) {
      classname = `${classname}-[${borderColorOnFocus}]`;
    } else {
      classname = `${classname}-${borderColorOnFocus}`;
    }
    classNames.add(classname);
  }

  if (borderColor) {
    const isCustomColor = !fixtures.allColorNames.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      borderColor as any,
    );
    let classname = 'borderColor';
    if (isCustomColor) {
      classname = `${classname}-[${borderColor}]`;
    } else {
      classname = `${classname}-${borderColor}`;
    }
    classNames.add(classname);
  }

  if (borderYColor) {
    const isCustomColor = !fixtures.allColorNames.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      borderYColor as any,
    );
    let classname = 'borderYColor';
    if (isCustomColor) {
      classname = `${classname}-[${borderYColor}]`;
    } else {
      classname = `${classname}-${borderYColor}`;
    }
    classNames.add(classname);
  }

  if (borderXColor) {
    const isCustomColor = !fixtures.allColorNames.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      borderXColor as any,
    );
    let classname = 'borderXColor';
    if (isCustomColor) {
      classname = `${classname}-[${borderXColor}]`;
    } else {
      classname = `${classname}-${borderXColor}`;
    }
    classNames.add(classname);
  }

  if (borderTopColor) {
    const isCustomColor = !fixtures.allColorNames.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      borderTopColor as any,
    );
    let classname = 'borderTopColor';
    if (isCustomColor) {
      classname = `${classname}-[${borderTopColor}]`;
    } else {
      classname = `${classname}-${borderTopColor}`;
    }
    classNames.add(classname);
  }

  if (borderBottomColor) {
    const isCustomColor = !fixtures.allColorNames.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      borderBottomColor as any,
    );
    let classname = 'borderBottomColor';
    if (isCustomColor) {
      classname = `${classname}-[${borderBottomColor}]`;
    } else {
      classname = `${classname}-${borderBottomColor}`;
    }
    classNames.add(classname);
  }

  if (borderStartColor) {
    const isCustomColor = !fixtures.allColorNames.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      borderStartColor as any,
    );
    let classname = 'borderStartColor';
    if (isCustomColor) {
      classname = `${classname}-[${borderStartColor}]`;
    } else {
      classname = `${classname}-${borderStartColor}`;
    }
    classNames.add(classname);
  }

  if (borderEndColor) {
    const isCustomColor = !fixtures.allColorNames.includes(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      borderEndColor as any,
    );
    let classname = 'borderEndColor';
    if (isCustomColor) {
      classname = `${classname}-[${borderEndColor}]`;
    } else {
      classname = `${classname}-${borderEndColor}`;
    }
    classNames.add(classname);
  }

  if (borderRadius) {
    classNames.add(`borderRadius-${borderRadius}`);
  }
  if (borderTopRadius) {
    classNames.add(`borderTopRadius-${borderTopRadius}`);
  }

  if (borderBottomRadius) {
    classNames.add(`borderBottomRadius-${borderBottomRadius}`);
  }

  if (borderStartRadius) {
    classNames.add(`borderStartRadius-${borderStartRadius}`);
  }

  if (borderEndRadius) {
    classNames.add(`borderEndRadius-${borderEndRadius}`);
  }

  if (borderTopStartRadius) {
    classNames.add(`borderTopStartRadius-${borderTopStartRadius}`);
  }

  if (borderTopEndRadius) {
    classNames.add(`borderTopEndRadius-${borderTopEndRadius}`);
  }

  if (borderBottomStartRadius) {
    classNames.add(`borderBottomStartRadius-${borderBottomStartRadius}`);
  }

  if (borderBottomEndRadius) {
    classNames.add(`borderBottomEndRadius-${borderBottomEndRadius}`);
  }

  if (borderWidth) {
    classNames.add(`borderWidth-${borderWidth}`);
  }

  if (borderYWidth) {
    classNames.add(`borderYWidth-${borderYWidth}`);
  }

  if (borderXWidth) {
    classNames.add(`borderXWidth-${borderXWidth}`);
  }

  if (borderStartWidth) {
    classNames.add(`borderStartWidth-${borderStartWidth}`);
  }

  if (borderEndWidth) {
    classNames.add(`borderEndWidth-${borderEndWidth}`);
  }

  if (borderTopWidth) {
    classNames.add(`borderTopWidth-${borderTopWidth}`);
  }

  if (borderBottomWidth) {
    classNames.add(`borderBottomWidth-${borderBottomWidth}`);
  }

  if (height) {
    let classname = 'height';
    typeof height === 'number' ? `height-[${height}px]` : `height-${height}`;

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const isCustomClassname = !fixtures.height.includes(height as any);

    if (isCustomClassname) {
      classname = `height-[${height}]`;
    }

    classNames.add(classname);
  }

  if (minHeight) {
    let classname = 'minHeight';
    typeof minHeight === 'number'
      ? `minHeight-[${minHeight}px]`
      : `minHeight-${minHeight}`;

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const isCustomClassname = !fixtures.minHeight.includes(minHeight as any);

    if (isCustomClassname) {
      classname = `minHeight-[${minHeight}]`;
    }

    classNames.add(classname);
  }

  if (maxHeight) {
    let classname = 'maxHeight';
    typeof maxHeight === 'number'
      ? `maxHeight-[${maxHeight}px]`
      : `maxHeight-${maxHeight}`;

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const isCustomClassname = !fixtures.maxHeight.includes(maxHeight as any);

    if (isCustomClassname) {
      classname = `maxHeight-[${maxHeight}]`;
    }

    classNames.add(classname);
  }

  if (width) {
    let classname = 'width';
    typeof width === 'number' ? `width-[${width}px]` : `width-${width}`;

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const isCustomClassname = !fixtures.width.includes(width as any);

    if (isCustomClassname) {
      classname = `width-[${width}]`;
    }

    classNames.add(classname);
  }

  if (minWidth) {
    let classname = 'minWidth';
    typeof minWidth === 'number'
      ? `minWidth-[${minWidth}px]`
      : `minWidth-${minWidth}`;

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const isCustomClassname = !fixtures.minWidth.includes(minWidth as any);

    if (isCustomClassname) {
      classname = `minWidth-[${minWidth}]`;
    }

    classNames.add(classname);
  }

  if (maxWidth) {
    let classname = 'maxWidth';
    typeof maxWidth === 'number'
      ? `maxWidth-[${maxWidth}px]`
      : `maxWidth-${maxWidth}`;

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const isCustomClassname = !fixtures.maxWidth.includes(maxWidth as any);

    if (isCustomClassname) {
      classname = `maxWidth-[${maxWidth}]`;
    }

    classNames.add(classname);
  }

  if (overflow) {
    classNames.add(`overflow-${overflow}`);
  }

  if (overflowX) {
    classNames.add(`overflowX-${overflowX}`);
  }
  if (overflowY) {
    classNames.add(`overflowY-${overflowY}`);
  }
  if (position) {
    classNames.add(`position-${position}`);
  }
  if (zIndex) {
    classNames.add(`zIndex-${zIndex}`);
  }
  if (opacity) {
    classNames.add(`opacity-${opacity}`);
  }
  if (contentFit) {
    classNames.add(`contentFit-${contentFit}`);
  }

  if (direction) {
    classNames.add(`flexDirection-${direction}`);
  }

  if (grow !== undefined) {
    classNames.add(`grow-${grow}`);
  }

  if (shrink !== undefined) {
    classNames.add(`shrink-${shrink}`);
  }
  if (wrap) {
    classNames.add(`wrap-${wrap}`);
  }

  if (justifyContent) {
    classNames.add(`justifyContent-${justifyContent}`);
  }

  if (alignItems) {
    classNames.add(`alignItems-${alignItems}`);
  }

  if (alignContent) {
    classNames.add(`alignContent-${alignContent}`);
  }

  if (iconSize) {
    classNames.add(`iconSize-${iconSize}`);
  }
  if (avatarSize) {
    classNames.add(`avatarSize-${avatarSize}`);
  }

  if (className) {
    classNames.add(className);
  }

  return Array.from(classNames).join(' ');
};

type StyleProp = keyof StyleProps | 'children' | 'asChild';
type ComponentPropsMap = {
  Avatar: Omit<AvatarProps, StyleProp>;
  Icon: Omit<IconProps, StyleProp>;
  Box: BoxProps;
  HStack: Omit<HStackProps, StyleProp>;
  VStack: Omit<VStackProps, StyleProp>;
  Text: Omit<TextProps, StyleProp>;
  TextInput: Omit<TextInputProps, StyleProp>;
};

export function extractStyleProps(
  _props: GetStylesParams,
  componentName?: string,
): Record<string, unknown> & { className?: string } {
  const props = { ..._props };
  const defaults = {} as StyleProps;

  switch (componentName) {
    case 'Avatar': {
      const { size, shape } = props as ComponentPropsMap['Avatar'];
      defaults.avatarSize = size;
      defaults.borderRadius = shape;
      // @ts-expect-error this is fine
      props.size = undefined;
      // @ts-expect-error this is fine
      props.shape = undefined;
      break;
    }

    case 'Icon': {
      const { size } = props as ComponentPropsMap['Icon'];
      defaults.iconSize = size;
      defaults.color = 'primary';
      defaults.fontFamily = 'icons';
      // @ts-expect-error this is fine
      props.size = undefined;
      break;
    }

    case 'Box': {
      defaults.display = 'flex';
      break;
    }

    case 'HStack': {
      const { gap } = props as ComponentPropsMap['HStack'];
      defaults.display = 'flex';
      defaults.direction = 'horizontal';
      if (gap) {
        defaults.gapX = gap;
      }
      // @ts-expect-error this is fine
      props.gap = undefined;
      break;
    }

    case 'Text': {
      const { variant } = props as ComponentPropsMap['Text'];
      defaults.fontFamily = variant;
      defaults.fontSize = variant;
      defaults.fontWeight = variant;
      defaults.lineHeight = variant;
      defaults.textTransform = variant;
      defaults.color = 'primary';
      // @ts-expect-error this is fine
      props.variant = undefined;
      break;
    }

    case 'TextInput': {
      const { variant = 'body1', disabled } =
        props as ComponentPropsMap['TextInput'];
      defaults.backgroundColor = disabled ? 'secondary' : 'primary';
      defaults.borderColor = disabled ? 'secondary' : 'primary';
      defaults.borderRadius = 'md';
      defaults.color = 'primary';
      defaults.fontFamily = variant;
      defaults.fontSize = variant;
      defaults.fontWeight = variant;
      defaults.lineHeight = variant;
      defaults.placeholderColor = 'tertiary';
      defaults.spacingY = '3';
      defaults.spacingX = '4';
      defaults.textTransform = variant;
      defaults.width = 'full';
      // @ts-expect-error this is fine
      props.variant = undefined;
      break;
    }

    case 'VStack': {
      const { gap } = props as ComponentPropsMap['VStack'];
      defaults.display = 'flex';
      defaults.direction = 'vertical';
      if (gap) {
        defaults.gapY = gap;
      }
      // @ts-expect-error this is fine
      props.gap = undefined;
      break;
    }

    default:
      break;
  }

  const {
    color = defaults?.color,
    colorChecked = defaults?.colorChecked,
    display = defaults?.display,
    placeholderColor = defaults?.placeholderColor,
    fontFamily = defaults?.fontFamily,
    fontSize = defaults?.fontSize,
    fontWeight = defaults?.fontWeight,
    lineHeight = defaults?.lineHeight,
    textTransform = defaults?.textTransform,
    textAlign = defaults?.textAlign,
    spacing = defaults?.spacing,
    spacingX = defaults?.spacingX,
    spacingY = defaults?.spacingY,
    spacingTop = defaults?.spacingTop,
    spacingBottom = defaults?.spacingBottom,
    spacingStart = defaults?.spacingStart,
    spacingEnd = defaults?.spacingEnd,
    offset = defaults?.offset,
    offsetY = defaults?.offsetY,
    offsetX = defaults?.offsetX,
    offsetTop = defaults?.offsetTop,
    offsetBottom = defaults?.offsetBottom,
    offsetStart = defaults?.offsetStart,
    offsetEnd = defaults?.offsetEnd,
    gapX = defaults?.gapX,
    gapY = defaults?.gapY,
    direction = defaults?.direction,
    grow = defaults?.grow,
    shrink = defaults?.shrink,
    wrap = defaults?.wrap,
    justifyContent = defaults?.justifyContent,
    alignItems = defaults?.alignItems,
    alignContent = defaults?.alignContent,
    backgroundColor = defaults?.backgroundColor,
    backgroundColorOnActive = defaults?.backgroundColorOnActive,
    backgroundColorOnFocus = defaults?.backgroundColorOnFocus,
    backgroundColorOnHover = defaults?.backgroundColorOnHover,
    backgroundColorOnChecked = defaults?.backgroundColorOnChecked,
    borderColor = defaults?.borderColor,
    borderColorOnActive = defaults?.borderColorOnActive,
    borderColorOnChecked = defaults?.borderColorOnChecked,
    borderColorOnFocus = defaults?.borderColorOnFocus,
    borderColorOnHover = defaults?.borderColorOnHover,
    borderYColor = defaults?.borderYColor,
    borderXColor = defaults?.borderXColor,
    borderTopColor = defaults?.borderTopColor,
    borderBottomColor = defaults?.borderBottomColor,
    borderStartColor = defaults?.borderStartColor,
    borderEndColor = defaults?.borderEndColor,
    borderRadius = defaults?.borderRadius,
    borderTopRadius = defaults?.borderTopRadius,
    borderBottomRadius = defaults?.borderBottomRadius,
    borderStartRadius = defaults?.borderStartRadius,
    borderEndRadius = defaults?.borderEndRadius,
    borderTopStartRadius = defaults?.borderTopStartRadius,
    borderTopEndRadius = defaults?.borderTopEndRadius,
    borderBottomStartRadius = defaults?.borderBottomStartRadius,
    borderBottomEndRadius = defaults?.borderBottomEndRadius,
    borderWidth = defaults?.borderWidth,
    borderYWidth = defaults?.borderYWidth,
    borderXWidth = defaults?.borderXWidth,
    borderStartWidth = defaults?.borderStartWidth,
    borderEndWidth = defaults?.borderEndWidth,
    borderTopWidth = defaults?.borderTopWidth,
    borderBottomWidth = defaults?.borderBottomWidth,
    height = defaults?.height,
    minHeight = defaults?.minHeight,
    maxHeight = defaults?.maxHeight,
    width = defaults?.width,
    minWidth = defaults?.minWidth,
    maxWidth = defaults?.maxWidth,
    overflow = defaults?.overflow,
    overflowX = defaults?.overflowX,
    overflowY = defaults?.overflowY,
    position = defaults?.position,
    zIndex = defaults?.zIndex,
    opacity = defaults?.opacity,
    contentFit = defaults?.contentFit,
    iconSize = defaults?.iconSize,
    avatarSize = defaults?.avatarSize,
    className,
    ...otherProps
  } = props;

  const finalClassName = getStyles({
    color,
    colorChecked,
    display,
    placeholderColor,
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    textAlign,
    textTransform,
    spacing,
    spacingX,
    spacingY,
    spacingTop,
    spacingBottom,
    spacingStart,
    spacingEnd,
    offset,
    offsetY,
    offsetX,
    offsetTop,
    offsetBottom,
    offsetStart,
    offsetEnd,
    gapX,
    gapY,
    direction,
    grow,
    shrink,
    wrap,
    justifyContent,
    alignItems,
    alignContent,
    backgroundColor,
    backgroundColorOnActive,
    backgroundColorOnFocus,
    backgroundColorOnHover,
    backgroundColorOnChecked,
    borderColor,
    borderColorOnActive,
    borderColorOnChecked,
    borderColorOnFocus,
    borderColorOnHover,
    borderYColor,
    borderXColor,
    borderTopColor,
    borderBottomColor,
    borderStartColor,
    borderEndColor,
    borderRadius,
    borderTopRadius,
    borderBottomRadius,
    borderStartRadius,
    borderEndRadius,
    borderTopStartRadius,
    borderTopEndRadius,
    borderBottomStartRadius,
    borderBottomEndRadius,
    borderWidth,
    borderYWidth,
    borderXWidth,
    borderStartWidth,
    borderEndWidth,
    borderTopWidth,
    borderBottomWidth,
    height,
    minHeight,
    maxHeight,
    width,
    minWidth,
    maxWidth,
    overflow,
    overflowX,
    overflowY,
    position,
    zIndex,
    opacity,
    contentFit,
    iconSize,
    avatarSize,
    className,
  });

  return finalClassName
    ? { ...otherProps, className: finalClassName }
    : otherProps;
}
