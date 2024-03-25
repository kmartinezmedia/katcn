import { forwardRef } from 'react';
import { createSlot } from './helpers';
import type {
  UniversalAvatarProps,
  UniversalBoxProps,
  UniversalIconProps,
  UniversalImageProps,
  UniversalPressableProps,
  UniversalStackProps,
  UniversalTextInputProps,
  UniversalTextProps,
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
  return <Box ref={ref} {...props} />;
});

const VStack = forwardRef<HTMLDivElement, VStackProps>(function VStack(
  { gap, ...props },
  ref,
) {
  return <Box ref={ref} {...props} />;
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
