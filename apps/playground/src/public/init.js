import { jsx as jsxOriginal, jsxs as jsxsOriginal } from "https://esm.sh/react/jsx-runtime";
import { clsx } from "https://esm.sh/clsx";
import { extendTailwindMerge } from "https://esm.sh/tailwind-merge";
import { Fragment, createElement } from "https://esm.sh/react";
import {Children, cloneElement, forwardRef, isValidElement} from "https://esm.sh/react";

import { Editor } from "https://esm.sh/@monaco-editor/react";
import { useEffect, useRef, useState } from "https://esm.sh/react";
import estree from "https://esm.sh/prettier/plugins/estree";
import typescript from "https://esm.sh/prettier/plugins/typescript";
import prettier from "https://esm.sh/prettier/standalone";
// src/jsx-runtime.ts
// src/getStyles.ts
var lineColors = [
  "accent",
  "alert",
  "brand",
  "positive",
  "warning",
  "primary",
  "secondary",
  "white",
  "black",
  "transparent"
];
var borderWidths = ["none", "thin", "medium", "thick"];
var borderRadii = [
  "none",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "full"
];
var foregroundColors = [
  "accent",
  "alert",
  "brand",
  "positive",
  "warning",
  "primary",
  "secondary",
  "tertiary",
  "white",
  "black",
  "transparent"
];
var backgroundColors = [
  "accent",
  "alert",
  "brand",
  "positive",
  "warning",
  "primary",
  "secondary",
  "white",
  "black",
  "transparent"
];
var textVariants = [
  "display1",
  "title1",
  "title2",
  "title3",
  "title4",
  "headline1",
  "body1",
  "label1",
  "label2",
  "caption1",
  "caption2",
  "legal1"
];
var twMerge = extendTailwindMerge({
  cacheSize: 0,
  extend: {
    theme: {
      borderColor: lineColors,
      borderWidth: borderWidths,
      borderRadius: borderRadii
    }
  },
  override: {
    classGroups: {
      "text-color": [{ text: foregroundColors }],
      "bg-color": [{ bg: backgroundColors }],
      "font-family": [{ font: ["icons", ...textVariants] }],
      leading: [{ leading: textVariants }]
    },
    conflictingClassGroups: {}
  }
});
var getStyles = ({
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
  spacingHorizontal,
  spacingVertical,
  spacingTop,
  spacingBottom,
  spacingStart,
  spacingEnd,
  offset,
  offsetVertical,
  offsetHorizontal,
  offsetTop,
  offsetBottom,
  offsetStart,
  offsetEnd,
  horizontalGap,
  verticalGap,
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
  borderVerticalColor,
  borderHorizontalColor,
  borderTopColor,
  borderBottomColor,
  borderStartColor,
  borderEndColor,
  borderRadius,
  borderTopStartRadius,
  borderTopEndRadius,
  borderBottomStartRadius,
  borderBottomEndRadius,
  borderWidth,
  borderVerticalWidth,
  borderHorizontalWidth,
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
  className
}) => {
  const classNames = [];
  if (color) {
    classNames.push(`color-${color}`);
  }
  if (colorChecked) {
    classNames.push(`data-[state=checked]:color-${colorChecked}`);
  }
  if (display) {
    classNames.push(`display-${display}`);
  }
  if (placeholderColor) {
    classNames.push(`placeholder:color-${placeholderColor}`);
  }
  if (fontFamily) {
    classNames.push(`fontFamily-${fontFamily}`);
  }
  if (fontSize) {
    classNames.push(`fontSize-${fontSize}`);
  }
  if (fontWeight) {
    classNames.push(`fontWeight-${fontWeight}`);
  }
  if (lineHeight) {
    classNames.push(`lineHeight-${lineHeight}`);
  }
  if (textAlign) {
    classNames.push(`textAlign-${textAlign}`);
  }
  if (textTransform) {
    classNames.push(`textTransform-${textTransform}`);
  }
  if (spacing) {
    classNames.push(`spacing-${spacing}`);
  }
  if (spacingHorizontal) {
    classNames.push(`spacingHorizontal-${spacingHorizontal}`);
  }
  if (spacingVertical) {
    classNames.push(`spacingVertical-${spacingVertical}`);
  }
  if (spacingTop) {
    classNames.push(`spacingTop-${spacingTop}`);
  }
  if (spacingBottom) {
    classNames.push(`spacingBottom-${spacingBottom}`);
  }
  if (spacingStart) {
    classNames.push(`spacingStart-${spacingStart}`);
  }
  if (spacingEnd) {
    classNames.push(`spacingEnd-${spacingEnd}`);
  }
  if (offset) {
    classNames.push(`offset-${offset}`);
  }
  if (offsetVertical) {
    classNames.push(`offsetVertical-${offsetVertical}`);
  }
  if (offsetHorizontal) {
    classNames.push(`offsetHorizontal-${offsetHorizontal}`);
  }
  if (offsetTop) {
    classNames.push(`offsetTop-${offsetTop}`);
  }
  if (offsetBottom) {
    classNames.push(`offsetBottom-${offsetBottom}`);
  }
  if (offsetStart) {
    classNames.push(`offsetStart-${offsetStart}`);
  }
  if (offsetEnd) {
    classNames.push(`offsetEnd-${offsetEnd}`);
  }
  if (horizontalGap) {
    classNames.push(`horizontalGap-${horizontalGap}`);
  }
  if (verticalGap) {
    classNames.push(`verticalGap-${horizontalGap}`);
  }
  if (backgroundColor) {
    classNames.push(`backgroundColor-${backgroundColor}`);
  }
  if (backgroundColorOnActive) {
    classNames.push(`backgroundColorOnActive-${backgroundColorOnActive}`);
  }
  if (backgroundColorOnFocus) {
    classNames.push(`backgroundColorOnFocus-${backgroundColorOnFocus}`);
  }
  if (backgroundColorOnHover) {
    classNames.push(`backgroundColorOnHover-${backgroundColorOnHover}`);
  }
  if (backgroundColorOnChecked) {
    classNames.push(`backgroundColorOnChecked:bg-${backgroundColorOnChecked}`);
  }
  if (borderColorOnActive) {
    if (borderColor) {
      classNames.push(`borderColorOnActive-${borderColorOnActive}`);
    }
    if (borderTopColor) {
      classNames.push(`borderColorOnActive-t-${borderColorOnActive}`);
    }
    if (borderBottomColor) {
      classNames.push(`borderColorOnActive-b-${borderColorOnActive}`);
    }
    if (borderStartColor) {
      classNames.push(`borderColorOnActive-s-${borderColorOnActive}`);
    }
    if (borderEndColor) {
      classNames.push(`borderColorOnActive-e-${borderColorOnActive}`);
    }
  }
  if (borderColorOnChecked) {
    if (borderColor) {
      classNames.push(`borderColorOnChecked-${borderColorOnChecked}`);
    }
    if (borderTopColor) {
      classNames.push(`borderColorOnChecked-t-${borderColorOnChecked}`);
    }
    if (borderBottomColor) {
      classNames.push(`borderColorOnChecked-b-${borderColorOnChecked}`);
    }
    if (borderStartColor) {
      classNames.push(`borderColorOnChecked-s-${borderColorOnChecked}`);
    }
    if (borderEndColor) {
      classNames.push(`borderColorOnChecked-e-${borderColorOnChecked}`);
    }
  }
  if (borderColorOnFocus) {
    if (borderColor) {
      classNames.push(`borderColorOnFocus-${borderColorOnFocus}`);
    }
    if (borderTopColor) {
      classNames.push(`borderColorOnFocus-t-${borderColorOnFocus}`);
    }
    if (borderBottomColor) {
      classNames.push(`borderColorOnFocus-b-${borderColorOnFocus}`);
    }
    if (borderStartColor) {
      classNames.push(`borderColorOnFocus-s-${borderColorOnFocus}`);
    }
    if (borderEndColor) {
      classNames.push(`borderColorOnFocus-e-${borderColorOnFocus}`);
    }
  }
  if (borderColorOnHover) {
    if (borderColor) {
      classNames.push(`borderColorOnHover-${borderColorOnHover}`);
    }
    if (borderTopColor) {
      classNames.push(`borderColorOnHover-t-${borderColorOnHover}`);
    }
    if (borderBottomColor) {
      classNames.push(`borderColorOnHover-b-${borderColorOnHover}`);
    }
    if (borderStartColor) {
      classNames.push(`borderColorOnHover-s-${borderColorOnHover}`);
    }
    if (borderEndColor) {
      classNames.push(`borderColorOnHover-e-${borderColorOnHover}`);
    }
  }
  if (borderColorOnActive) {
    if (borderColor) {
      classNames.push(`borderColorOnActive-${borderColorOnActive}`);
    }
    if (borderTopColor) {
      classNames.push(`borderColorOnActive-t-${borderColorOnActive}`);
    }
    if (borderBottomColor) {
      classNames.push(`borderColorOnActive-b-${borderColorOnActive}`);
    }
    if (borderStartColor) {
      classNames.push(`borderColorOnActive-s-${borderColorOnActive}`);
    }
    if (borderEndColor) {
      classNames.push(`borderColorOnActive-e-${borderColorOnActive}`);
    }
  }
  if (borderColorOnFocus) {
    if (borderTopColor) {
      classNames.push(`borderColorOnFocus-t-${borderColorOnFocus}`);
    }
    if (borderBottomColor) {
      classNames.push(`borderColorOnFocus-b-${borderColorOnFocus}`);
    }
    if (borderStartColor) {
      classNames.push(`borderColorOnFocus-s-${borderColorOnFocus}`);
    }
    if (borderEndColor) {
      classNames.push(`borderColorOnFocus-e-${borderColorOnFocus}`);
    }
  }
  if (borderColor) {
    classNames.push(`borderColor-${borderColor}`);
  }
  if (borderVerticalColor) {
    classNames.push(`borderVerticalColor-${borderVerticalColor}`);
  }
  if (borderHorizontalColor) {
    classNames.push(`borderHorizontalColor-${borderHorizontalColor}`);
  }
  if (borderTopColor) {
    classNames.push(`borderTopColor-${borderTopColor}`);
  }
  if (borderBottomColor) {
    classNames.push(`borderBottomColor-${borderBottomColor}`);
  }
  if (borderStartColor) {
    classNames.push(`borderStartColor-${borderStartColor}`);
  }
  if (borderEndColor) {
    classNames.push(`borderEndColor-${borderEndColor}`);
  }
  if (borderRadius) {
    classNames.push(`borderRadius-${borderRadius}`);
  }
  if (borderTopStartRadius) {
    classNames.push(`borderTopStartRadius-${borderTopStartRadius}`);
  }
  if (borderTopEndRadius) {
    classNames.push(`borderTopEndRadius-${borderTopEndRadius}`);
  }
  if (borderBottomStartRadius) {
    classNames.push(`borderBottomStartRadius-${borderBottomStartRadius}`);
  }
  if (borderBottomEndRadius) {
    classNames.push(`borderBottomEndRadius-${borderBottomEndRadius}`);
  }
  if (borderWidth) {
    classNames.push(`borderWidth-${borderWidth}`);
  }
  if (borderVerticalWidth) {
    classNames.push(`borderVerticalWidth-${borderVerticalWidth}`);
  }
  if (borderHorizontalWidth) {
    classNames.push(`borderHorizontalWidth-${borderHorizontalWidth}`);
  }
  if (borderStartWidth) {
    classNames.push(`borderStartWidth-${borderStartWidth}`);
  }
  if (borderEndWidth) {
    classNames.push(`borderEndWidth-${borderEndWidth}`);
  }
  if (borderTopWidth) {
    classNames.push(`borderTopWidth-${borderTopWidth}`);
  }
  if (borderBottomWidth) {
    classNames.push(`borderBottomWidth-${borderBottomWidth}`);
  }
  if (height) {
    const classNameToAdd = typeof height === "number" ? `height-[${height}px]` : `height-${height}`;
    classNames.push(classNameToAdd);
  }
  if (minHeight) {
    const classNameToAdd = typeof minHeight === "number" ? `minHeight-[${minHeight}px]` : `minHeight-${minHeight}`;
    classNames.push(classNameToAdd);
  }
  if (maxHeight) {
    const classNameToAdd = typeof maxHeight === "number" ? `maxHeight-[${maxHeight}px]` : `maxHeight-${maxHeight}`;
    classNames.push(classNameToAdd);
  }
  if (width) {
    const classNameToAdd = typeof width === "number" ? `width-[${width}px]` : `width-${width}`;
    classNames.push(classNameToAdd);
  }
  if (minWidth) {
    const classNameToAdd = typeof minWidth === "number" ? `minWidth-[${minWidth}px]` : `minWidth-${minWidth}`;
    classNames.push(classNameToAdd);
  }
  if (maxWidth) {
    const classNameToAdd = typeof maxWidth === "number" ? `maxWidth-[${maxWidth}px]` : `maxWidth-${maxWidth}`;
    classNames.push(classNameToAdd);
  }
  if (overflow) {
    classNames.push(`overflow-${overflow}`);
  }
  if (overflowX) {
    classNames.push(`overflowX-${overflowX}`);
  }
  if (overflowY) {
    classNames.push(`overflowY-${overflowY}`);
  }
  if (position) {
    classNames.push(`position-${position}`);
  }
  if (zIndex) {
    classNames.push(`zIndex-${zIndex}`);
  }
  if (opacity) {
    classNames.push(`opacity-${opacity}`);
  }
  if (contentFit) {
    classNames.push(`contentFit-${contentFit}`);
  }
  if (direction) {
    classNames.push(`direction-${direction}`);
  }
  if (grow !== void 0) {
    classNames.push(`grow-${grow}`);
  }
  if (shrink !== void 0) {
    classNames.push(`shrink-${shrink}`);
  }
  if (wrap) {
    classNames.push(`wrap=${wrap}`);
  }
  if (justifyContent) {
    classNames.push(`justifyContent-${justifyContent}`);
  }
  if (alignItems) {
    classNames.push(`alignItems-${alignItems}`);
  }
  if (alignContent) {
    classNames.push(`alignContent-${alignContent}`);
  }
  if (iconSize) {
    classNames.push(`iconSize-${iconSize}`);
  }
  if (avatarSize) {
    classNames.push(`avatarSize-${avatarSize}`);
  }
  return twMerge(clsx(classNames, className));
};
function extractStyleProps(_props, componentName) {
  const props = { ..._props };
  const defaults = {};
  switch (componentName) {
    case "Avatar": {
      const { size, shape } = props;
      defaults.avatarSize = size;
      defaults.borderRadius = shape;
      props.size = void 0;
      props.shape = void 0;
      break;
    }
    case "Icon": {
      const { size } = props;
      defaults.iconSize = size;
      defaults.color = "primary";
      defaults.fontFamily = "icons";
      props.size = void 0;
      break;
    }
    case "Box": {
      defaults.display = "flex";
      break;
    }
    case "HStack": {
      const { gap } = props;
      defaults.display = "flex";
      defaults.horizontalGap = gap;
      props.gap = void 0;
      break;
    }
    case "Text": {
      const { variant } = props;
      defaults.fontFamily = variant;
      defaults.fontSize = variant;
      defaults.fontWeight = variant;
      defaults.lineHeight = variant;
      defaults.textTransform = variant;
      defaults.color = "primary";
      props.variant = void 0;
      break;
    }
    case "TextInput": {
      const { variant = "body1", disabled } = props;
      defaults.backgroundColor = disabled ? "secondary" : "primary";
      defaults.borderColor = disabled ? "secondary" : "primary";
      defaults.borderRadius = "md";
      defaults.color = "primary";
      defaults.fontFamily = variant;
      defaults.fontSize = variant;
      defaults.fontWeight = variant;
      defaults.lineHeight = variant;
      defaults.placeholderColor = "tertiary";
      defaults.spacingVertical = "5";
      defaults.spacingHorizontal = "6";
      defaults.textTransform = variant;
      defaults.width = "full";
      props.variant = void 0;
      break;
    }
    case "VStack": {
      const { gap } = props;
      defaults.display = "flex";
      defaults.verticalGap = gap;
      props.gap = void 0;
      break;
    }
    default:
      break;
  }
  const {
    color = defaults == null ? void 0 : defaults.color,
    colorChecked = defaults == null ? void 0 : defaults.colorChecked,
    display = defaults == null ? void 0 : defaults.display,
    placeholderColor = defaults == null ? void 0 : defaults.placeholderColor,
    fontFamily = defaults == null ? void 0 : defaults.fontFamily,
    fontSize = defaults == null ? void 0 : defaults.fontSize,
    fontWeight = defaults == null ? void 0 : defaults.fontWeight,
    lineHeight = defaults == null ? void 0 : defaults.lineHeight,
    textTransform = defaults == null ? void 0 : defaults.textTransform,
    textAlign = defaults == null ? void 0 : defaults.textAlign,
    spacing = defaults == null ? void 0 : defaults.spacing,
    spacingHorizontal = defaults == null ? void 0 : defaults.spacingHorizontal,
    spacingVertical = defaults == null ? void 0 : defaults.spacingVertical,
    spacingTop = defaults == null ? void 0 : defaults.spacingTop,
    spacingBottom = defaults == null ? void 0 : defaults.spacingBottom,
    spacingStart = defaults == null ? void 0 : defaults.spacingStart,
    spacingEnd = defaults == null ? void 0 : defaults.spacingEnd,
    offset = defaults == null ? void 0 : defaults.offset,
    offsetVertical = defaults == null ? void 0 : defaults.offsetVertical,
    offsetHorizontal = defaults == null ? void 0 : defaults.offsetHorizontal,
    offsetTop = defaults == null ? void 0 : defaults.offsetTop,
    offsetBottom = defaults == null ? void 0 : defaults.offsetBottom,
    offsetStart = defaults == null ? void 0 : defaults.offsetStart,
    offsetEnd = defaults == null ? void 0 : defaults.offsetEnd,
    horizontalGap = defaults == null ? void 0 : defaults.horizontalGap,
    verticalGap = defaults == null ? void 0 : defaults.verticalGap,
    direction = defaults == null ? void 0 : defaults.direction,
    grow = defaults == null ? void 0 : defaults.grow,
    shrink = defaults == null ? void 0 : defaults.shrink,
    wrap = defaults == null ? void 0 : defaults.wrap,
    justifyContent = defaults == null ? void 0 : defaults.justifyContent,
    alignItems = defaults == null ? void 0 : defaults.alignItems,
    alignContent = defaults == null ? void 0 : defaults.alignContent,
    backgroundColor = defaults == null ? void 0 : defaults.backgroundColor,
    backgroundColorOnActive = defaults == null ? void 0 : defaults.backgroundColorOnActive,
    backgroundColorOnFocus = defaults == null ? void 0 : defaults.backgroundColorOnFocus,
    backgroundColorOnHover = defaults == null ? void 0 : defaults.backgroundColorOnHover,
    backgroundColorOnChecked = defaults == null ? void 0 : defaults.backgroundColorOnChecked,
    borderColor = defaults == null ? void 0 : defaults.borderColor,
    borderColorOnActive = defaults == null ? void 0 : defaults.borderColorOnActive,
    borderColorOnChecked = defaults == null ? void 0 : defaults.borderColorOnChecked,
    borderColorOnFocus = defaults == null ? void 0 : defaults.borderColorOnFocus,
    borderColorOnHover = defaults == null ? void 0 : defaults.borderColorOnHover,
    borderVerticalColor = defaults == null ? void 0 : defaults.borderVerticalColor,
    borderHorizontalColor = defaults == null ? void 0 : defaults.borderHorizontalColor,
    borderTopColor = defaults == null ? void 0 : defaults.borderTopColor,
    borderBottomColor = defaults == null ? void 0 : defaults.borderBottomColor,
    borderStartColor = defaults == null ? void 0 : defaults.borderStartColor,
    borderEndColor = defaults == null ? void 0 : defaults.borderEndColor,
    borderRadius = defaults == null ? void 0 : defaults.borderRadius,
    borderTopStartRadius = defaults == null ? void 0 : defaults.borderTopStartRadius,
    borderTopEndRadius = defaults == null ? void 0 : defaults.borderTopEndRadius,
    borderBottomStartRadius = defaults == null ? void 0 : defaults.borderBottomStartRadius,
    borderBottomEndRadius = defaults == null ? void 0 : defaults.borderBottomEndRadius,
    borderWidth = defaults == null ? void 0 : defaults.borderWidth,
    borderVerticalWidth = defaults == null ? void 0 : defaults.borderVerticalWidth,
    borderHorizontalWidth = defaults == null ? void 0 : defaults.borderHorizontalWidth,
    borderStartWidth = defaults == null ? void 0 : defaults.borderStartWidth,
    borderEndWidth = defaults == null ? void 0 : defaults.borderEndWidth,
    borderTopWidth = defaults == null ? void 0 : defaults.borderTopWidth,
    borderBottomWidth = defaults == null ? void 0 : defaults.borderBottomWidth,
    height = defaults == null ? void 0 : defaults.height,
    minHeight = defaults == null ? void 0 : defaults.minHeight,
    maxHeight = defaults == null ? void 0 : defaults.maxHeight,
    width = defaults == null ? void 0 : defaults.width,
    minWidth = defaults == null ? void 0 : defaults.minWidth,
    maxWidth = defaults == null ? void 0 : defaults.maxWidth,
    overflow = defaults == null ? void 0 : defaults.overflow,
    overflowX = defaults == null ? void 0 : defaults.overflowX,
    overflowY = defaults == null ? void 0 : defaults.overflowY,
    position = defaults == null ? void 0 : defaults.position,
    zIndex = defaults == null ? void 0 : defaults.zIndex,
    opacity = defaults == null ? void 0 : defaults.opacity,
    contentFit = defaults == null ? void 0 : defaults.contentFit,
    iconSize = defaults == null ? void 0 : defaults.iconSize,
    avatarSize = defaults == null ? void 0 : defaults.avatarSize,
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
    spacingHorizontal,
    spacingVertical,
    spacingTop,
    spacingBottom,
    spacingStart,
    spacingEnd,
    offset,
    offsetVertical,
    offsetHorizontal,
    offsetTop,
    offsetBottom,
    offsetStart,
    offsetEnd,
    horizontalGap,
    verticalGap,
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
    borderVerticalColor,
    borderHorizontalColor,
    borderTopColor,
    borderBottomColor,
    borderStartColor,
    borderEndColor,
    borderRadius,
    borderTopStartRadius,
    borderTopEndRadius,
    borderBottomStartRadius,
    borderBottomEndRadius,
    borderWidth,
    borderVerticalWidth,
    borderHorizontalWidth,
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
    className
  });
  return finalClassName ? { ...otherProps, className: finalClassName } : otherProps;
}

// src/jsx-runtime.ts

function jsx(type, props, key) {
  const componentName = typeof type === "string" ? type : type.displayName;
  const finalProps = extractStyleProps(props, componentName);
  return jsxOriginal(type, finalProps, key);
}
function jsxs(type, props, key) {
  const componentName = typeof type === "string" ? type : type.displayName;
  const finalProps = extractStyleProps(props, componentName);
  return jsxsOriginal(type, finalProps, key);
}

export function createSlot() {
  const Slot = forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    const childrenArray = Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (Children.count(newElement) > 1) {
            return Children.only(null);
          }
          return isValidElement(newElement) ? newElement.props.children : null;
        }
        return child;
      });
      return jsx(SlotClone, {
        ...slotProps,
        ref: forwardedRef,
        children: isValidElement(newElement) ? cloneElement(newElement, undefined, newChildren) : null
      });
    }
    return jsx(SlotClone, {
      ...slotProps,
      ref: forwardedRef,
      children
    });
  });
  Slot.displayName = "Slot";
  const SlotClone = forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    if (isValidElement(children)) {
      return cloneElement(children, {
        ...mergeProps(slotProps, children.props),
        ref: forwardedRef ? composeRefs(forwardedRef, children.ref) : children.ref
      });
    }
    return Children.count(children) > 1 ? Children.only(null) : null;
  });
  SlotClone.displayName = "SlotClone";
  const Slottable = ({ children }) => {
    return children;
  };
  function isSlottable(child) {
    return isValidElement(child) && child.type === Slottable;
  }
  function mergeProps(slotProps, childProps) {
    const overrideProps = { ...childProps };
    for (const propName in childProps) {
      const slotPropValue = slotProps[propName];
      const childPropValue = childProps[propName];
      const isHandler = /^on[A-Z]/.test(propName);
      if (isHandler) {
        if (slotPropValue && childPropValue) {
          overrideProps[propName] = (...args) => {
            childPropValue(...args);
            slotPropValue(...args);
          };
        } else if (slotPropValue) {
          overrideProps[propName] = slotPropValue;
        }
      } else if (propName === "style") {
        overrideProps[propName] = { ...slotPropValue, ...childPropValue };
      }
    }
    return { ...slotProps, ...overrideProps };
  }
  return Slot;
}

const PressableSlot = createSlot();
const Pressable = forwardRef(function Pressable({ asChild, onPress, ...props }, ref) {
  const Comp = asChild ? PressableSlot : "button";
  return jsx(Comp, {
    ref,
    onClick: onPress,
    ...props
  });
});
Pressable.displayName = "Pressable";
let TextInput = function(props) {
  return jsx("input", {
    type: "text",
    "data-1p-ignore": true,
    ...props
  });
};
TextInput.displayName = "TextInput";
const Slot = createSlot();
const Icon = forwardRef(function Icon({ asChild, name, ...props }, ref) {
  const Comp = asChild ? Slot : "span";
  return jsx(Comp, {
    ref,
    ...props,
    children: name
  });
});
Icon.displayName = "Icon";
const VStack = forwardRef(function VStack({ gap, ...props }, ref) {
  return jsx(Box, {
    ref,
    display: "flex",
    direction: "vertical",
    ...props
  });
});
VStack.displayName = "VStack";
let Avatar = function(props) {
  return jsx(Image, {
    ...props
  });
};
Avatar.displayName = "Avatar";
const HStack = forwardRef(function HStack({ gap, ...props }, ref) {
  return jsx(Box, {
    ref,
    display: "flex",
    direction: "horizontal",
    ...props
  });
});
HStack.displayName = "HStack";
const BoxSlot = createSlot();
const Box = forwardRef(function Box({ asChild, ...props }, ref) {
  const Comp = asChild ? BoxSlot : "div";
  return jsx(Comp, {
    ref,
    ...props
  });
});
Box.displayName = "Box";
let Image = function(props) {
  return jsx("img", {
    ...props
  });
};
Image.displayName = "Image";
const TextSlot = createSlot();
const Text = forwardRef(function Text({ asChild, as = "p", ...props }, ref) {
  const Comp = asChild ? TextSlot : as;
  return jsx(Comp, {
    ref,
    ...props
  });
});
Text.displayName = "Text";
var compactBorderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 24,
  full: 9999
};
var normalBorderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 32,
  full: 9999
};
var compactBorderWidths = {
  none: 0,
  thin: 1,
  medium: 2,
  thick: 2
};
var normalBorderWidths = {
  none: 0,
  thin: 1,
  medium: 2,
  thick: 4
};
var zIndex = {
  auto: "auto",
  "0": "0",
  "10": "10",
  "20": "20",
  "30": "30",
  "40": "40",
  "50": "50"
};
var lightPalette = {
  core: {
    brand: { hue: "purple", step: 9 },
    accent: { hue: "blue", step: 9 },
    alert: { hue: "red", step: 9 },
    positive: { hue: "green", step: 9 },
    warning: { hue: "orange", step: 9 }
  },
  background: {
    primary: { hue: "gray", step: 0 },
    secondary: { hue: "gray", step: 2 }
  },
  foreground: {
    primary: { hue: "gray", step: 13 },
    secondary: { hue: "gray", step: 14 },
    tertiary: { hue: "gray", step: 9 },
    "on-color": { hue: "gray", step: 0 }
  },
  line: {
    primary: { hue: "gray", step: 14 },
    secondary: { hue: "gray", step: 9 }
  }
};
var darkPalette = {
  core: {
    brand: { hue: "purple", step: 9 },
    accent: { hue: "blue", step: 9 },
    alert: { hue: "red", step: 9 },
    positive: { hue: "green", step: 9 },
    warning: { hue: "orange", step: 9 }
  },
  background: {
    primary: { hue: "gray", step: 1 },
    secondary: { hue: "gray", step: 3 }
  },
  foreground: {
    primary: { hue: "gray", step: 14 },
    secondary: { hue: "gray", step: 13 },
    tertiary: { hue: "gray", step: 9 },
    "on-color": { hue: "gray", step: 0 }
  },
  line: {
    primary: { hue: "gray", step: 14 },
    secondary: { hue: "gray", step: 9 }
  }
};
var alwaysPalette = {
  white: "#ffffff",
  black: "#000000",
  transparent: "transparent"
};
var compactAvatarSizes = {
  sm: 16,
  md: 24,
  lg: 32
};
var normalAvatarSizes = compactAvatarSizes;
var compactIconSizes = {
  sm: 16,
  md: 24,
  lg: 32
};
var normalIconSizes = compactIconSizes;
var compactSpacing = {
  "0": 0,
  "1": 1,
  "2": 2,
  "3": 4,
  "4": 8,
  "5": 12,
  "6": 16,
  "7": 20,
  "8": 24,
  "9": 28,
  "10": 32,
  "11": 36,
  "12": 40,
  "13": 44,
  "14": 48
};
var normalSpacing = {
  "0": 0,
  "1": 1,
  "2": 2,
  "3": 4,
  "4": 8,
  "5": 12,
  "6": 16,
  "7": 24,
  "8": 32,
  "9": 40,
  "10": 48,
  "11": 56,
  "12": 64,
  "13": 72,
  "14": 80
};
var spectrum = {
  red: 25,
  pink: 350,
  purple: 310,
  violet: 290,
  indigo: 270,
  blue: 240,
  cyan: 210,
  teal: 185,
  green: 145,
  lime: 125,
  yellow: 100,
  orange: 75,
  gray: 50
};
var sansFallbacks = ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"];
var serifFallbacks = ["Georgia", "Times", "Times New Roman", "serif"];
var fontFamilyGlobal = {
  icons: { fallbacks: sansFallbacks, name: "icons" },
  sans: { fallbacks: sansFallbacks, name: "sans" },
  "sans-condensed": { fallbacks: sansFallbacks, name: "sans-condensed" },
  "serif-text": { fallbacks: serifFallbacks, name: "serif-text" },
  "serif-display": { fallbacks: serifFallbacks, name: "serif-display" },
  mono: {
    fallbacks: ["Menlo", "Monaco", "Courier New", "monospace"],
    name: "mono"
  }
};
var fontFamily = {
  display1: "sans",
  display2: "sans",
  display3: "sans",
  title1: "sans",
  title2: "sans",
  title3: "sans",
  title4: "sans",
  headline1: "sans",
  body1: "sans",
  label1: "sans",
  label2: "sans",
  caption1: "sans",
  caption2: "sans",
  legal1: "sans"
};
var fontWeightMap = {
  thin: "100",
  extralight: "200",
  light: "300",
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900"
};
var fontWeight = {
  display1: "black",
  display2: "extrabold",
  display3: "extrabold",
  title1: "bold",
  title2: "bold",
  title3: "bold",
  title4: "bold",
  headline1: "semibold",
  body1: "regular",
  label1: "semibold",
  label2: "regular",
  caption1: "semibold",
  caption2: "regular",
  legal1: "semibold"
};
var textTransform = {
  display1: "uppercase",
  display2: "none",
  display3: "none",
  title1: "none",
  title2: "none",
  title3: "none",
  title4: "none",
  headline1: "none",
  body1: "none",
  label1: "none",
  label2: "none",
  caption1: "none",
  caption2: "none",
  legal1: "none"
};
var xSmall = {
  fontSize: {
    display1: 46,
    display2: 37,
    display3: 33,
    title1: 29,
    title2: 25,
    title3: 21,
    title4: 17,
    headline1: 13,
    body1: 13,
    label1: 12,
    label2: 12,
    caption1: 11,
    caption2: 11,
    legal1: 10
  },
  lineHeight: {
    display1: 44,
    display2: 44,
    display3: 44,
    title1: 36,
    title2: 32,
    title3: 28,
    title4: 24,
    headline1: 16,
    body1: 16,
    label1: 16,
    label2: 16,
    caption1: 16,
    caption2: 16,
    legal1: 12
  }
};
var small = {
  fontSize: {
    display1: 46,
    display2: 38,
    display3: 34,
    title1: 30,
    title2: 26,
    title3: 22,
    title4: 18,
    headline1: 14,
    body1: 14,
    label1: 13,
    label2: 13,
    caption1: 12,
    caption2: 12,
    legal1: 11
  },
  lineHeight: {
    ...xSmall.lineHeight,
    title1: 40,
    headline1: 20,
    body1: 20,
    legal1: 16
  }
};
var medium = {
  fontSize: {
    display1: 47,
    display2: 39,
    display3: 35,
    title1: 31,
    title2: 27,
    title3: 23,
    title4: 19,
    headline1: 15,
    body1: 15,
    label1: 13,
    label2: 13,
    caption1: 12,
    caption2: 12,
    legal1: 11
  },
  lineHeight: {
    ...small.lineHeight,
    title2: 36,
    title3: 32
  }
};
var large = {
  fontSize: {
    ...medium.fontSize,
    display1: 48,
    display2: 40,
    display3: 36,
    title1: 32,
    title2: 28,
    title3: 24,
    title4: 20,
    headline1: 16,
    body1: 16,
    label1: 14,
    label2: 14
  },
  lineHeight: {
    ...medium.lineHeight,
    title2: 36,
    title3: 32,
    headline1: 20,
    body1: 20,
    label1: 20,
    label2: 20
  }
};
var xLarge = {
  fontSize: {
    display1: 50,
    display2: 42,
    display3: 38,
    title1: 34,
    title2: 30,
    title3: 26,
    title4: 22,
    headline1: 18,
    body1: 16,
    label1: 16,
    label2: 16,
    caption1: 14,
    caption2: 14,
    legal1: 13
  },
  lineHeight: {
    ...large.lineHeight,
    title1: 44,
    headline1: 24,
    body1: 24,
    caption1: 20,
    caption2: 20
  }
};
var xxLarge = {
  fontSize: {
    display1: 52,
    display2: 44,
    display3: 40,
    title1: 36,
    title2: 32,
    title3: 28,
    title4: 26,
    headline1: 20,
    body1: 20,
    label1: 18,
    label2: 18,
    caption1: 16,
    caption2: 16,
    legal1: 15
  },
  lineHeight: {
    ...xLarge.lineHeight,
    title2: 40,
    title3: 36,
    headline1: 28,
    body1: 28,
    label1: 24,
    label2: 24,
    legal1: 20
  }
};
var xxxLarge = {
  fontSize: {
    display1: 54,
    display2: 46,
    display3: 42,
    title1: 38,
    title2: 34,
    title3: 30,
    title4: 28,
    headline1: 22,
    body1: 22,
    label1: 20,
    label2: 20,
    caption1: 18,
    caption2: 18,
    legal1: 17
  },
  lineHeight: {
    ...xxLarge.lineHeight,
    title1: 48,
    title2: 44,
    title4: 32,
    label1: 28,
    label2: 28,
    caption1: 24,
    caption2: 24
  }
};
var compactTokens = {
  fontFamily,
  fontWeight,
  textTransform,
  avatarSizes: compactAvatarSizes,
  iconSizes: compactIconSizes,
  borderRadius: compactBorderRadius,
  borderWidth: compactBorderWidths,
  spacing: compactSpacing
};
var normalTokens = {
  fontFamily,
  fontWeight,
  textTransform,
  avatarSizes: normalAvatarSizes,
  iconSizes: normalIconSizes,
  borderRadius: normalBorderRadius,
  borderWidth: normalBorderWidths,
  spacing: normalSpacing
};
var defaultTokensConfig = {
  colorMode: {
    light: {
      palette: lightPalette,
      spectrum
    },
    dark: {
      palette: darkPalette,
      spectrum
    }
  },
  scaleMode: {
    xSmall: {
      ...compactTokens,
      ...xSmall
    },
    small: {
      ...compactTokens,
      ...small
    },
    medium: {
      ...compactTokens,
      ...medium
    },
    large: {
      ...normalTokens,
      ...large
    },
    xLarge: {
      ...normalTokens,
      ...xLarge
    },
    xxLarge: {
      ...normalTokens,
      ...xxLarge
    },
    xxxLarge: {
      ...normalTokens,
      ...xxxLarge
    }
  },
  fontFamily: fontFamilyGlobal,
  zIndex
};
var lightElevation = {
  "1": [
    {
      color: "rgba(0, 0, 0, 0.08)",
      offsetX: 0,
      offsetY: 2,
      blurRadius: 4,
      spreadRadius: 0
    },
    {
      color: "rgba(0, 0, 0, 0.10)",
      offsetX: 0,
      offsetY: 0,
      blurRadius: 1,
      spreadRadius: 0
    }
  ],
  "2": [
    {
      color: "rgba(0, 0, 0, 0.1)",
      offsetX: 0,
      offsetY: 4,
      blurRadius: 8,
      spreadRadius: 0
    },
    {
      color: "rgba(0, 0, 0, 0.1)",
      offsetX: 0,
      offsetY: 0,
      blurRadius: 1,
      spreadRadius: 0
    }
  ],
  "3": [
    {
      color: "rgba(0, 0, 0, 0.1)",
      offsetX: 0,
      offsetY: 4,
      blurRadius: 16,
      spreadRadius: 0
    },
    {
      color: "rgba(0, 0, 0, 0.1)",
      offsetX: 0,
      offsetY: 0,
      blurRadius: 2,
      spreadRadius: 0
    }
  ]
};
var darkElevation = {
  "1": [
    {
      color: "rgba(0, 0, 0, 0.08)",
      offsetX: 0,
      offsetY: 2,
      blurRadius: 4,
      spreadRadius: 0
    },
    {
      color: "rgba(0, 0, 0, 0.10)",
      offsetX: 0,
      offsetY: 0,
      blurRadius: 1,
      spreadRadius: 0
    }
  ],
  "2": [
    {
      color: "rgba(0, 0, 0, 0.1)",
      offsetX: 0,
      offsetY: 4,
      blurRadius: 8,
      spreadRadius: 0
    },
    {
      color: "rgba(0, 0, 0, 0.1)",
      offsetX: 0,
      offsetY: 0,
      blurRadius: 1,
      spreadRadius: 0
    }
  ],
  "3": [
    {
      color: "rgba(0, 0, 0, 0.1)",
      offsetX: 0,
      offsetY: 4,
      blurRadius: 16,
      spreadRadius: 0
    },
    {
      color: "rgba(0, 0, 0, 0.1)",
      offsetX: 0,
      offsetY: 0,
      blurRadius: 2,
      spreadRadius: 0
    }
  ]
};
var animation = {
  none: "none",
  spin: "spin 1s linear infinite",
  ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
  pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  bounce: "bounce 1s infinite",
  "accordion-down": "accordion-down 0.2s ease-out",
  "accordion-up": "accordion-up 0.2s ease-out"
};
var transitionDelay = {
  "0": "0s",
  "75": "75ms",
  "100": "100ms",
  "150": "150ms",
  "200": "200ms",
  "300": "300ms",
  "500": "500ms",
  "700": "700ms",
  "1000": "1000ms"
};
var transitionDuration = {
  "0": "0s",
  "75": "75ms",
  "100": "100ms",
  "150": "150ms",
  "200": "200ms",
  "300": "300ms",
  "500": "500ms",
  "700": "700ms",
  "1000": "1000ms"
};
var transitionTiming = {
  linear: "linear",
  in: "cubic-bezier(0.4, 0, 1, 1)",
  out: "cubic-bezier(0, 0, 0.2, 1)",
  "in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
};
// src/ui/CodeEditor.tsx
// src/utils/prettier.ts
var prettierConfig = {
  plugins: [estree, typescript],
  parser: "typescript",
  useTabs: true,
  trailingComma: "all",
  printWidth: 100
};
var displayName = "prettier-formatter";
var PrettierFormatProvider = {
  displayName,
  async provideDocumentFormattingEdits(model) {
    try {
      const text = await prettier.format(model.getValue(), prettierConfig);
      return [
        {
          text,
          range: model.getFullModelRange()
        }
      ];
    } catch (e) {
      console.error("prettier failed:", e);
    }
  }
};

// src/ui/CodeEditor.tsx
var USER_CODE_PATH = "file:///user.tsx";
var TRANSFORM_URL = "http://localhost:3001/transform";
function CodeEditor({
  onChange,
  userCode,
  dtsLibs = [],
  Preview
}) {
  const [hashId, setHashId] = useState("15580922508895177590");
  const refs = useRef({
    monaco: null,
    editor: null,
    userModel: null,
    tsWorker: null
  });
  useEffect(() => {
    const saveHandler = (e) => {
      var _a, _b;
      if ((e.ctrlKey || e.metaKey) && e.code === "KeyS") {
        e.preventDefault();
        (_b = (_a = refs.current.editor) == null ? void 0 : _a.getAction("editor.action.formatDocument")) == null ? void 0 : _b.run();
      }
    };
    document.addEventListener("keydown", saveHandler);
    return () => {
      document.removeEventListener("keydown", saveHandler);
    };
  }, []);
  return /* @__PURE__ */ jsxs(HStack, { width: "full", children: [
    /* @__PURE__ */ jsx(VStack, { height: "100vh", width: "half", children: /* @__PURE__ */ jsx(
      Editor,
      {
        defaultLanguage: "typescript",
        language: "typescript",
        theme: "vs-dark",
        className: "overflow-hidden",
        height: "100%",
        width: "50%",
        defaultValue: userCode,
        value: userCode,
        defaultPath: USER_CODE_PATH,
        options: {
          minimap: { enabled: false },
          fontSize: 14
        },
        onMount: async (editor, monaco) => {
          const stringToUri = monaco.Uri.parse;
          const reactTypesResp = await fetch(
            "https://unpkg.com/@types/react@18.2.0/index.d.ts"
          );
          const reactTypes = await reactTypesResp.text();
          monaco.languages.typescript.typescriptDefaults.addExtraLib(
            reactTypes,
            "file:///node_modules/react/index.d.ts"
          );
          for (const lib of dtsLibs) {
            const libUri = stringToUri(lib.filePath);
            const extension = lib.filePath.split(".").pop();
            switch (extension) {
              case "ts":
              case "tsx": {
                if (!monaco.editor.getModel(libUri)) {
                  monaco.languages.typescript.typescriptDefaults.addExtraLib(
                    lib.content,
                    lib.filePath
                  );
                }
                break;
              }
              default:
                break;
            }
          }
          monaco.languages.registerDocumentFormattingEditProvider(
            "typescript",
            PrettierFormatProvider
          );
          monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            ...monaco.languages.typescript.typescriptDefaults.getCompilerOptions(),
            jsxImportSource: "katcn",
            allowNonTsExtensions: true,
            strict: true,
            target: monaco.languages.typescript.ScriptTarget.ESNext,
            strictNullChecks: true,
            moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
            allowSyntheticDefaultImports: true,
            jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
            resolvePackageJsonExports: true,
            noEmit: true
          });
          monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(
            {
              ...monaco.languages.typescript.typescriptDefaults.getDiagnosticsOptions(),
              noSemanticValidation: false,
              noSuggestionDiagnostics: false,
              noSyntaxValidation: false
            }
          );
          const { SuggestAdapter } = await import("monaco-editor/esm/vs/language/typescript/tsMode");
          class MySuggestAdapter extends SuggestAdapter {
            // @ts-expect-error this is fine
            get triggerCharacters() {
              return [".", '"', "'", "`", "/", "@", "<", '""'];
            }
            // TODO: filter out dupes in suggestions
          }
          const getTsWorker = await monaco.languages.typescript.getTypeScriptWorker();
          const suggestionAdapter = new MySuggestAdapter(getTsWorker);
          monaco.languages.registerCompletionItemProvider(
            "typescript",
            suggestionAdapter
          );
          refs.current.editor = editor;
          refs.current.monaco = monaco;
        },
        onChange: async (value, changeEvent) => {
          var _a;
          const code = value ?? "";
          const monaco = (_a = refs.current) == null ? void 0 : _a.monaco;
          const editor = monaco == null ? void 0 : monaco.editor;
          if (editor) {
            const markers = editor == null ? void 0 : editor.getModelMarkers({}).filter(
              (marker) => marker.message !== "'Example' is declared but its value is never read."
            );
            console.log(markers);
            if ((markers == null ? void 0 : markers.length) <= 1) {
              const res = await fetch(TRANSFORM_URL, {
                method: "GET",
                body: code,
                mode: "no-cors",
                headers: {
                  "Content-Type": "text/plain",
                  Accept: "application/json"
                }
              });
              const hashId2 = await res.json();
              setHashId(hashId2);
            }
          }
        }
      }
    ) }),
    Preview && /* @__PURE__ */ jsx(Preview, { code: userCode })
  ] });
}
