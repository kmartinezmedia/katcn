import { reactModifierPropsToTailwindModifierClassNamesMap } from '@katcn/fixtures/modifiers';
import type {
  AllStyleProps,
  ModifierProps,
  StyleModifier,
  StyleProps,
} from '@katcn/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const remaps = {
  grow: {
    true: 'grow',
    '0': 'grow-0',
  },
  shrink: {
    true: 'shrink',
    '0': 'shrink-0',
  },
  textOverflow: {
    truncate: 'truncate',
    ellipsis: 'text-ellipsis',
    clip: 'text-clip',
  },
};

export function createVariants<K extends Record<string, StyleProps>>(
  variants: K,
): K {
  return variants;
}

const parse = (prefix: string, value: unknown) => {
  if (value === '') {
    return prefix;
  }
  return prefix === value ? value : `${prefix}-${value}`;
};

const classnames: {
  [key in keyof AllStyleProps]-?: (val: Required<AllStyleProps>[key]) => string;
} = {
  /** Background props */
  bg: (val) => parse('bg', val),
  /** Effects props */
  shadow: (val) => parse('shadow', val === true ? '' : val),
  shadowColor: (val) => parse('shadow', val),
  opacity: (val) => parse('opacity', val),
  mixBlendMode: (val) => parse('mix-blend', val),
  bgBlendMode: (val) => parse('bg-blend', val),
  /** Border props */
  borderColor: (val) => parse('border', val),
  borderTopColor: (val) => parse('border-t', val),
  borderLeftColor: (val) => parse('border-l', val),
  borderStartColor: (val) => parse('border-s', val),
  borderRightColor: (val) => parse('border-r', val),
  borderEndColor: (val) => parse('border-e', val),
  borderBottomColor: (val) => parse('border-b', val),
  borderXColor: (val) => parse('border-x', val),
  borderYColor: (val) => parse('border-y', val),
  border: (val) => (val === true ? 'border' : ''),
  borderTop: (val) => (val === true ? 'border-t' : ''),
  borderLeft: (val) => (val === true ? 'border-l' : ''),
  borderStart: (val) => (val === true ? 'border-s' : ''),
  borderRight: (val) => (val === true ? 'border-r' : ''),
  borderEnd: (val) => (val === true ? 'border-e' : ''),
  borderBottom: (val) => (val === true ? 'border-b' : ''),
  borderX: (val) => (val === true ? 'border-x' : ''),
  borderY: (val) => (val === true ? 'border-y' : ''),
  borderWidth: (val) => parse('border', val === true ? '' : val),
  borderLeftWidth: (val) => parse('border-l', val === true ? '' : val),
  borderStartWidth: (val) => parse('border-s', val === true ? '' : val),
  borderRightWidth: (val) => parse('border-r', val === true ? '' : val),
  borderEndWidth: (val) => parse('border-e', val === true ? '' : val),
  borderTopWidth: (val) => parse('border-t', val === true ? '' : val),
  borderBottomWidth: (val) => parse('border-b', val === true ? '' : val),
  borderXWidth: (val) => parse('border-x', val === true ? '' : val),
  borderYWidth: (val) => parse('border-y', val === true ? '' : val),
  /** Divide props */
  divideWidth: (val) => parse('divide', val),
  divideColor: (val) => parse('divide', val),
  divideStyle: (val) => parse('divide', val),
  /** Outline props */
  outlineWidth: (val) => parse('outline', val),
  outlineColor: (val) => parse('outline', val),
  outlineStyle: (val) => parse('outline', val === 'solid' ? '' : val),
  outlineOffset: (val) => parse('outline-offset', val),
  /** Ring props */
  ringWidth: (val) => parse('ring', val),
  ringColor: (val) => parse('ring', val),
  ringOffsetWidth: (val) => parse('ring-offset', val),
  ringOffsetColor: (val) => parse('ring-offset', val),
  ringInset: (val) => (val === true ? 'ring-inset' : ''),
  /** Flex props */
  flex: (val) => parse('flex', val),
  flexDirection: (val) => parse('flex', val),
  alignContent: (val) => parse('content', val),
  alignItems: (val) => parse('items', val),
  alignSelf: (val) => parse('self', val),
  justifyContent: (val) => parse('justify', val),
  placeContent: (val) => parse('place-content', val),
  placeItems: (val) => parse('place-items', val),
  placeSelf: (val) => parse('place-self', val),
  flexGrow: (val) => remaps.grow[`${val}`],
  flexShrink: (val) => remaps.shrink[`${val}`],
  flexWrap: (val) => parse('flex', val),
  /** Height props */
  height: (val) => parse('h', val),
  maxHeight: (val) => parse('max-h', val),
  minHeight: (val) => parse('min-h', val),
  /** Width props */
  width: (val) => parse('w', val),
  maxWidth: (val) => parse('max-w', val),
  minWidth: (val) => parse('min-w', val),
  size: (val) => parse('size', val),
  /** Spacing props */
  spacing: (val) => parse('p', val),
  spacingTop: (val) => parse('pt', val),
  spacingBottom: (val) => parse('pb', val),
  spacingStart: (val) => parse('ps', val),
  spacingEnd: (val) => parse('pe', val),
  spacingLeft: (val) => parse('pl', val),
  spacingRight: (val) => parse('pr', val),
  spacingX: (val) => parse('px', val),
  spacingY: (val) => parse('py', val),
  /** Offset props */
  offset: (val) => parse('-m', val),
  offsetTop: (val) => parse('-mt', val),
  offsetBottom: (val) => parse('-mb', val),
  offsetStart: (val) => parse('-ms', val),
  offsetEnd: (val) => parse('-me', val),
  offsetLeft: (val) => parse('-ml', val),
  offsetRight: (val) => parse('-mr', val),
  offsetX: (val) => parse('-mx', val),
  offsetY: (val) => parse('-my', val),
  /** Margin props */
  margin: (val) => parse('m', val),
  marginTop: (val) => parse('mt', val),
  marginBottom: (val) => parse('mb', val),
  marginStart: (val) => parse('ms', val),
  marginEnd: (val) => parse('me', val),
  marginLeft: (val) => parse('ml', val),
  marginRight: (val) => parse('mr', val),
  marginX: (val) => parse('mx', val),
  marginY: (val) => parse('my', val),
  /** Gap props */
  gap: (val) => parse('gap', val),
  gapX: (val) => parse('gap-x', val),
  gapY: (val) => parse('gap-y', val),
  spaceX: (val) => parse('space-x', val),
  spaceY: (val) => parse('space-y', val),
  /** Layout props */
  aspectRatio: (val) => parse('aspect', val),
  boxSizing: (val) => parse('box', val),
  columns: (val) => parse('columns', val),
  container: (val) => (val === true ? 'container' : ''),
  display: (val) => val,
  isolate: (val) => (val === true ? 'isolate' : ''),
  overflow: (val) => parse('overflow', val),
  overflowX: (val) => parse('overflow-x', val),
  overflowY: (val) => parse('overflow-y', val),
  overscrollBehavior: (val) => parse('overscroll', val),
  position: (val) => val,
  inset: (val) => parse('inset', val),
  insetX: (val) => parse('inset-x', val),
  insetY: (val) => parse('inset-y', val),
  top: (val) => parse('top', val),
  bottom: (val) => parse('bottom', val),
  left: (val) => parse('start', val),
  right: (val) => parse('end', val),
  visibility: (val) => val,
  zIndex: (val) => parse('z', val),
  /** Transform props */
  scale: (val) => parse('scale', val),
  scaleX: (val) => parse('scale-x', val),
  scaleY: (val) => parse('scale-y', val),
  rotate: (val) => parse('rotate', val),
  skewX: (val) => parse('skew-x', val),
  skewY: (val) => parse('skew-y', val),
  translateX: (val) => parse('translate-x', val),
  translateY: (val) => parse('translate-y', val),
  transformOrigin: (val) => parse('origin', val),
  /** Border radius props */
  rounded: (val) => parse('rounded', val),
  roundedTop: (val) => parse('rounded-t', val),
  roundedBottom: (val) => parse('rounded-b', val),
  roundedStart: (val) => parse('rounded-s', val),
  roundedEnd: (val) => parse('rounded-e', val),
  roundedTopStart: (val) => parse('rounded-t-s', val),
  roundedTopEnd: (val) => parse('rounded-t-e', val),
  roundedBottomStart: (val) => parse('rounded-b-s', val),
  roundedBottomEnd: (val) => parse('rounded-b-e', val),
  /** Text props */
  textVariant: (val) => parse('text-variant', val),
  color: (val) => parse('text', val),
  fontFamily: (val) => parse('font', val),
  fontSize: (val) => parse('text', val),
  fontSmoothing: (val) => val,
  fontWeight: (val) => parse('font-weight', val),
  lineHeight: (val) => parse('leading', val),
  textTransform: (val) => val,
  textAlign: (val) => parse('text', val),
  lineClamp: (val) => parse('line-clamp', val),
  textDecoration: (val) => val,
  textDecorationColor: (val) => parse('decoration', val),
  textDecorationStyle: (val) => parse('decoration', val),
  textDecorationThickness: (val) => parse('decoration', val),
  textUnderlineOffset: (val) => parse('underline-offset', val),
  textOverflow: (val) => remaps.textOverflow[val],
  textWrap: (val) => parse('overflow', val),
  truncate: (val) => (val === true ? 'truncate' : ''),
  indent: (val) => parse('indent', val),
  verticalAlign: (val) => parse('vertical-align', val),
  whitespace: (val) => parse('whitespace', val),
  break: (val) => parse('break', val),
  hyphens: (val) => parse('hyphens', val),
  /** Image props */
  objectFit: (val) => parse('object', val),
  objectPosition: (val) => parse('object', val),
  /** Animation props */
  transition: (val) => parse('transition', val === true ? '' : val),
  transitionDuration: (val) => parse('duration', val),
  transitionTiming: (val) => parse('ease', val),
  transitionDelay: (val) => parse('delay', val),
  animation: (val) => parse('animation', val),
  /** Interactivity props */
  appearance: (val) => parse('appearance', val),
  cursor: (val) => parse('cursor', val),
  caretColor: (val) => parse('caret', val),
  pointerEvents: (val) => parse('pointer-events', val),
  resize: (val) => parse('resize', val === true ? '' : val),
  scrollBehavior: (val) => parse('scroll', val),
  scrollSnap: (val) => parse('snap', val),
  scrollSnapGap: (val) => parse('scroll-m', val),
  scrollSnapGapTop: (val) => parse('scroll-mt', val),
  scrollSnapGapBottom: (val) => parse('scroll-mb', val),
  scrollSnapGapStart: (val) => parse('scroll-ms', val),
  scrollSnapGapEnd: (val) => parse('scroll-me', val),
  scrollSnapGapX: (val) => parse('scroll-mx', val),
  scrollSnapGapY: (val) => parse('scroll-my', val),
  scrollSnapSpacing: (val) => parse('scroll-p', val),
  scrollSnapSpacingTop: (val) => parse('scroll-pt', val),
  scrollSnapSpacingBottom: (val) => parse('scroll-pb', val),
  scrollSnapSpacingStart: (val) => parse('scroll-ps', val),
  scrollSnapSpacingEnd: (val) => parse('scroll-pe', val),
  scrollSnapSpacingX: (val) => parse('scroll-px', val),
  scrollSnapSpacingY: (val) => parse('scroll-py', val),
  scrollSnapAlign: (val) => parse('scroll-snap-align', val),
  scrollSnapStop: (val) => parse('scroll-snap-stop', val),
  touchAction: (val) => parse('touch-action', val),
  userSelect: (val) => parse('user-select', val),
  willChange: (val) => parse('will-change', val),
  /** Table props */
  tableBorderCollapse: (val) => parse('border', val),
  tableBorderSpacing: (val) => parse('border-spacing', val),
  tableBorderSpacingX: (val) => parse('border-spacing-x', val),
  tableBorderSpacingY: (val) => parse('border-spacing-y', val),
  tableLayout: (val) => parse('table', val),
  tableCaptionSide: (val) => parse('caption', val),
  /** SVG props */
  fill: (val) => parse('fill', val),
  strokeColor: (val) => parse('stroke', val),
  strokeWidth: (val) => parse('stroke', val),
  /** Group props */
  group: (val) => parse('group', val === true ? '' : val),
  className: (val) => val,
};

export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ProcessStylesParams {
  extractNativeProps?: boolean;
  modifier?: StyleModifier;
  twMerge?: boolean;
}

export function processStyleProps(
  props: AllStyleProps = {},
  opts: ProcessStylesParams = {},
) {
  let classname = '';
  const nativeProps: Record<string, unknown> = {};

  for (const [propKey, propValue] of Object.entries(props) as [
    string,
    StyleProps,
  ][]) {
    if (propValue === undefined) continue;
    if (propKey in reactModifierPropsToTailwindModifierClassNamesMap) {
      const modifierName =
        reactModifierPropsToTailwindModifierClassNamesMap[
          propKey as StyleModifier
        ];
      const combinedModifier = opts.modifier
        ? `${opts.modifier}${modifierName}`
        : modifierName;
      const [newClassName] = processStyleProps(propValue as AllStyleProps, {
        ...opts,
        modifier: combinedModifier as StyleModifier,
      });
      classname = classname ? `${classname} ${newClassName}` : newClassName;
    } else if (propKey in classnames) {
      const propClassname = classnames[propKey as keyof typeof classnames](
        propValue as never,
      );
      const finalClassname = opts.modifier
        ? `${opts.modifier}${propClassname}`
        : propClassname;
      classname = classname ? `${classname} ${finalClassname}` : finalClassname;
    } else {
      if (opts.extractNativeProps) {
        nativeProps[propKey] = propValue;
      }
    }
  }

  const cxFn = opts.twMerge ? cx : clsx;
  return [cxFn(classname), nativeProps] as const;
}

interface GetStylesParams extends StyleProps, ModifierProps<AllStyleProps> {
  className?: string;
}

/** Consumer facing function that takes style props and returns a className */
export function getStyles(
  props: GetStylesParams,
  opts?: Pick<ProcessStylesParams, 'twMerge'>,
) {
  return processStyleProps(props, {
    extractNativeProps: false,
    twMerge: opts?.twMerge ?? true,
  })[0];
}

/**
 * Internal function that takes component props and differentiates between
 * style props which shouldn't be passed to the native html element vs props
 * that should be passed to the native html element. Any props that shouldn't
 * be passed to the native html element are removed and combined into a single className prop.
 */
export function extractStyleProps(
  props: GetStylesParams,
): Record<string, unknown> & { className?: string } {
  const [finalClassName, otherProps] = processStyleProps(props, {
    extractNativeProps: true,
  });

  return finalClassName
    ? { ...otherProps, className: finalClassName }
    : otherProps;
}
