import { Children, cloneElement, forwardRef, isValidElement } from 'react';
import type {
  UniversalAvatarProps,
  UniversalImageProps,
  UniversalPressableProps,
  UniversalBoxProps,
  UniversalTextProps,
  UniversalTextInputProps,
  UniversalIconProps,
  UniversalStackProps,
} from './types';

type HtmlButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'color' | 'name'
>;
type HtmlDivProps = React.HTMLAttributes<HTMLDivElement>;
type HtmlImgProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'size' | 'color' | 'height' | 'width' | 'alt' | 'src'
>;
type HtmlParagraphProps = Omit<
  Pick<
    Partial<React.ComponentPropsWithoutRef<NativeTextElementTag>>,
    keyof React.ComponentPropsWithoutRef<NativeTextElementTag>
  >,
  'color'
>;
type HtmlSpanProps = Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>;
type HtmlTextInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'height' | 'size' | 'width' | 'color'
>;

type NativeTextElementTag =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'p'
  | 'span'
  | 'th'
  | 'td';

interface BoxProps extends HtmlDivProps, UniversalBoxProps {}
interface HStackProps extends HtmlDivProps, UniversalStackProps {}
interface VStackProps extends HtmlDivProps, UniversalStackProps {}
interface IconProps extends HtmlSpanProps, UniversalIconProps {}
interface ImageProps extends HtmlImgProps, UniversalImageProps {}
interface PressableProps extends HtmlButtonProps, UniversalPressableProps {}
interface TextProps extends HtmlParagraphProps, UniversalTextProps {
  as?: NativeTextElementTag;
}
interface TextInputProps extends HtmlTextInputProps, UniversalTextInputProps {}
interface AvatarProps extends HtmlImgProps, UniversalAvatarProps {}

const BoxSlot = createSlot<React.ComponentType<HtmlDivProps>>();
const IconSlot = createSlot<React.ComponentType<HtmlSpanProps>>();
const TextSlot = createSlot<React.ComponentType<HtmlParagraphProps>>();
const PressableSlot = createSlot<React.ComponentType<HtmlButtonProps>>();

const Box = forwardRef<HTMLDivElement, BoxProps>(function Box(
  { asChild, ...props },
  ref,
) {
  const Comp = asChild ? BoxSlot : 'div';
  return <Comp ref={ref} {...props} />;
});

const HStack = forwardRef<HTMLDivElement, HStackProps>(function HStack(
  { gap, ...props },
  ref,
) {
  return <Box ref={ref} display="flex" direction="horizontal" {...props} />;
});

const VStack = forwardRef<HTMLDivElement, VStackProps>(function VStack(
  { gap, ...props },
  ref,
) {
  return <Box ref={ref} display="flex" direction="vertical" {...props} />;
});

const Icon = forwardRef<HTMLSpanElement, IconProps>(function Icon(
  { asChild, name, ...props },
  ref,
) {
  const Comp = asChild ? IconSlot : 'span';
  return (
    <Comp ref={ref} {...props}>
      {name}
    </Comp>
  );
});

const Image = forwardRef<HTMLImageElement, ImageProps>(
  function Image(props, ref) {
    // biome-ignore lint/a11y/useAltText: the alt attribute is already required in typescript
    return <img ref={ref} {...props} />;
  },
);

const Pressable = forwardRef<HTMLButtonElement, PressableProps>(
  function Pressable({ asChild, onPress, ...props }, ref) {
    const Comp = asChild ? PressableSlot : 'button';
    return <Comp ref={ref} onClick={onPress} {...props} />;
  },
);

const Text = forwardRef<typeof TextSlot, TextProps>(function Text(
  { asChild, as = 'p', ...props },
  ref,
) {
  const Comp = asChild ? TextSlot : as;
  return <Comp ref={ref as unknown as string} {...props} />;
});

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(props, ref) {
    return <input ref={ref} type="text" data-1p-ignore {...props} />;
  },
);

const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  function Avatar(props, ref) {
    return <Image ref={ref} {...props} />;
  },
);

Box.displayName = 'Box';
HStack.displayName = 'HStack';
VStack.displayName = 'VStack';
Icon.displayName = 'Icon';
Image.displayName = 'Image';
Pressable.displayName = 'Pressable';
Text.displayName = 'Text';
TextInput.displayName = 'TextInput';
Avatar.displayName = 'Avatar';

export { Box, HStack, VStack, Icon, Image, Pressable, Text, TextInput, Avatar };
export type {
  BoxProps,
  HStackProps,
  VStackProps,
  IconProps,
  ImageProps,
  PressableProps,
  TextProps,
  TextInputProps,
  AvatarProps,
};

type PossibleRef<T> = React.Ref<T> | undefined;

/**
 * Set a given ref to a given value
 * This utility takes care of different types of refs: callback refs and RefObject(s)
 */
function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    (ref as React.MutableRefObject<T>).current = value;
  }
}

/**
 * A utility to compose multiple refs together
 * Accepts callback refs and RefObject(s)
 */
function composeRefs<T>(...refs: PossibleRef<T>[]) {
  return (node: T) => {
    for (const ref of refs) {
      setRef(ref, node);
    }
  };
}

export function createSlot<
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  T extends React.ComponentType<{ children?: any }>,
>(): T {
  type SlotProps = React.ComponentPropsWithRef<T>;
  const Slot = forwardRef<T, SlotProps>((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    const childrenArray = Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);

    if (slottable) {
      // the new element to render is the one passed as a child of `Slottable`
      const newElement = slottable.props.children as React.ReactNode;

      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          // because the new element will be the one rendered, we are only interested
          // in grabbing its children (`newElement.props.children`)
          if (Children.count(newElement) > 1) {
            return Children.only(null);
          }
          return isValidElement(newElement)
            ? (newElement.props.children as React.ReactNode)
            : null;
        }
        return child;
      });

      return (
        <SlotClone {...slotProps} ref={forwardedRef}>
          {isValidElement(newElement)
            ? cloneElement(newElement, undefined, newChildren)
            : null}
        </SlotClone>
      );
    }

    return (
      <SlotClone {...slotProps} ref={forwardedRef}>
        {children}
      </SlotClone>
    );
  });

  Slot.displayName = 'Slot';

  /* -------------------------------------------------------------------------------------------------
   * SlotClone
   * -----------------------------------------------------------------------------------------------*/

  interface SlotCloneProps {
    children: React.ReactNode;
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const SlotClone = forwardRef<any, SlotCloneProps>((props, forwardedRef) => {
    const { children, ...slotProps } = props;

    if (isValidElement(children)) {
      return cloneElement(children, {
        ...mergeProps(slotProps, children.props),
        // @ts-expect-error this is fine
        ref: forwardedRef
          ? // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            composeRefs(forwardedRef, (children as any).ref)
          : // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            (children as any).ref,
      });
    }

    return Children.count(children) > 1 ? Children.only(null) : null;
  });

  SlotClone.displayName = 'SlotClone';

  /* -------------------------------------------------------------------------------------------------
   * Slottable
   * -----------------------------------------------------------------------------------------------*/

  const Slottable = ({ children }: { children: React.ReactNode }) => {
    return children;
  };

  /* ---------------------------------------------------------------------------------------------- */

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  type AnyProps = Record<string, any>;

  function isSlottable(child: React.ReactNode): child is React.ReactElement {
    return isValidElement(child) && child.type === Slottable;
  }

  function mergeProps(slotProps: AnyProps, childProps: AnyProps) {
    // all child props should override
    const overrideProps = { ...childProps };

    for (const propName in childProps) {
      const slotPropValue = slotProps[propName];
      const childPropValue = childProps[propName];

      const isHandler = /^on[A-Z]/.test(propName);
      if (isHandler) {
        // if the handler exists on both, we compose them
        if (slotPropValue && childPropValue) {
          overrideProps[propName] = (...args: unknown[]) => {
            childPropValue(...args);
            slotPropValue(...args);
          };
        }
        // but if it exists only on the slot, we use only this one
        else if (slotPropValue) {
          overrideProps[propName] = slotPropValue;
        }
      }
      // if it's `style`, we merge them
      else if (propName === 'style') {
        overrideProps[propName] = { ...slotPropValue, ...childPropValue };
      }
    }

    return { ...slotProps, ...overrideProps };
  }

  return Slot as unknown as T;
}

export { getStyles } from './getStyles';
