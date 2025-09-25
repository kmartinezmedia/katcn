import type {
  StyleProps,
  SvgStyleProps,
  UniversalAvatarProps,
  UniversalBoxProps,
  UniversalIconProps,
  UniversalImageProps,
  UniversalPressableProps,
  UniversalStackProps,
  UniversalTextInputProps,
  UniversalTextProps,
} from '@katcn/types';
import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ComponentType,
  ElementType,
  JSX,
} from 'react';
import { extractStyleProps } from './getStyles';
import { createSlot } from './helpers/createSlot';

type NativeProps<
  T extends keyof JSX.IntrinsicElements,
  Exclusions extends string,
> = Omit<ComponentPropsWithRef<T>, Exclusions>;

type HtmlPropsToExclude = 'color' | 'size' | 'width' | 'height' | 'border';
type HtmlAnchorProps = NativeProps<'a', HtmlPropsToExclude>;
type HtmlArticleProps = NativeProps<'article', HtmlPropsToExclude>;
type HtmlAsideProps = NativeProps<'aside', HtmlPropsToExclude>;
type HtmlBlockquoteProps = NativeProps<'blockquote', HtmlPropsToExclude>;
type HtmlButtonProps = NativeProps<'button', HtmlPropsToExclude | 'name'>;
type HtmlDivProps = NativeProps<'div', HtmlPropsToExclude>;
type HtmlHeaderProps = NativeProps<'header', HtmlPropsToExclude>;
type HtmlFooterProps = NativeProps<'footer', HtmlPropsToExclude>;
type HtmlImgProps = NativeProps<'img', HtmlPropsToExclude | 'alt' | 'src'>;
type HtmlMainProps = NativeProps<'main', HtmlPropsToExclude>;
type HtmlNavProps = NativeProps<'nav', HtmlPropsToExclude>;
type HtmlSectionProps = NativeProps<'section', HtmlPropsToExclude>;
type HtmlSelectProps = NativeProps<'select', HtmlPropsToExclude>;
type HtmlOptionProps = NativeProps<'option', HtmlPropsToExclude>;
type HtmlSvgProps = NativeProps<'svg', keyof SvgStyleProps | 'name'>;
type HtmlPathProps = NativeProps<'path', keyof SvgStyleProps>;

type NativeTextElementTag =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'em'
  | 'i'
  | 'p'
  | 'span'
  | 'label'
  | 'pre'
  | 's'
  | 'strong'
  | 'sub'
  | 'sup'
  | 'u';

type NativeListElementTag = 'ul' | 'ol';

type HtmlTextProps<As extends NativeTextElementTag> = Omit<
  /** Pick only native attributes which  */
  Pick<
    Partial<ComponentPropsWithoutRef<NativeTextElementTag>>,
    keyof ComponentPropsWithoutRef<NativeTextElementTag>
  >,
  'color'
> &
  Pick<ComponentPropsWithRef<As>, 'ref'>;

type HtmlListProps = NativeProps<NativeListElementTag, HtmlPropsToExclude>;
type HtmlTableProps = NativeProps<'table', HtmlPropsToExclude>;
type HtmlTableHeadProps = NativeProps<'thead', HtmlPropsToExclude>;
type HtmlTableHeadCellProps = NativeProps<'th', HtmlPropsToExclude>;
type HtmlTableBodyProps = NativeProps<'tbody', HtmlPropsToExclude>;
type HtmlTableCellProps = NativeProps<'td', HtmlPropsToExclude>;
type HtmlTableRowProps = NativeProps<'tr', HtmlPropsToExclude>;
type HtmlListItemProps = NativeProps<'li', HtmlPropsToExclude>;

type HtmlSpanProps = NativeProps<'span', HtmlPropsToExclude>;
type HtmlTextAreaProps = NativeProps<'textarea', HtmlPropsToExclude>;
type HtmlInputProps = NativeProps<'input', HtmlPropsToExclude>;

export interface AnchorProps extends HtmlAnchorProps, UniversalTextProps {}
export interface ArticProps extends HtmlArticleProps, UniversalBoxProps {}
export interface AsideProps extends HtmlAsideProps, UniversalTextProps {}
export interface AvatarProps extends HtmlImgProps, UniversalAvatarProps {}
export interface BlockquoteProps
  extends HtmlBlockquoteProps,
    UniversalBoxProps {}
export interface BoxProps extends HtmlDivProps, UniversalBoxProps {}
export interface FooterProps extends HtmlFooterProps, UniversalBoxProps {}
export interface HeaderProps extends HtmlHeaderProps, UniversalBoxProps {}
export interface HStackProps extends HtmlDivProps, UniversalStackProps {}
export interface VStackProps extends HtmlDivProps, UniversalStackProps {}
export interface IconProps extends HtmlSpanProps, UniversalIconProps {}

export interface ImageProps extends HtmlImgProps, UniversalImageProps {}
export interface MainProps extends HtmlMainProps, UniversalBoxProps {}
export interface NavProps extends HtmlNavProps, UniversalBoxProps {}
export interface PressableProps
  extends HtmlButtonProps,
    UniversalPressableProps {}
export interface SectionProps extends HtmlSectionProps, UniversalBoxProps {}
export interface SelectProps extends HtmlSelectProps, UniversalBoxProps {}
export interface SvgProps extends HtmlSvgProps, StyleProps<SvgStyleProps> {}
export interface PathProps extends HtmlPathProps, StyleProps<SvgStyleProps> {}
export interface OptionProps extends HtmlOptionProps, UniversalBoxProps {}
export interface TextProps<As extends NativeTextElementTag = 'p'>
  extends HtmlTextProps<As>,
    UniversalTextProps {
  as?: As;
}
export interface ListProps extends HtmlListProps, UniversalBoxProps {
  as?: NativeListElementTag;
}
export interface ListItemProps extends HtmlListItemProps, UniversalBoxProps {}
export interface TableProps extends HtmlTableProps, UniversalBoxProps {}
export interface TableHeadProps extends HtmlTableHeadProps, UniversalBoxProps {}
export interface TableHeadCellProps
  extends HtmlTableHeadCellProps,
    UniversalBoxProps {}
export interface TableBodyProps extends HtmlTableBodyProps, UniversalBoxProps {}
export interface TableCellProps extends HtmlTableCellProps, UniversalBoxProps {}
export interface TableRowProps extends HtmlTableRowProps, UniversalBoxProps {}
export interface TextAreaProps extends HtmlTextAreaProps, UniversalBoxProps {}
export interface InputProps extends HtmlInputProps, UniversalBoxProps {}
export interface TextInputProps
  extends HtmlInputProps,
    UniversalTextInputProps {}

export const withDefaultProps = {
  HStack: ({
    gap,
    display = 'flex',
    flexDirection = display === 'flex' ? 'row' : undefined,
    alignItems = display === 'flex' ? 'center' : undefined,
    ...props
  }: Partial<HStackProps>): StyleProps => ({
    flexDirection,
    display,
    alignItems,
    gapX: gap,
    ...props,
  }),
  VStack: ({
    gap,
    display = 'flex',
    flexDirection = display === 'flex' ? 'col' : undefined,
    ...props
  }: Partial<VStackProps>): StyleProps => ({
    flexDirection,
    display,
    gapY: gap,
    ...props,
  }),
  Pressable: (props: Partial<PressableProps>): StyleProps => props,
  Text: ({
    variant,
    color = 'on-primary',
    ...props
  }: Partial<TextProps>): StyleProps => ({
    textVariant: variant,
    color,
    ...props,
  }),
  TextInput: ({
    disabled,
    bg = disabled ? 'secondary' : 'primary',
    borderColor = disabled ? 'on-secondary' : 'on-primary',
    rounded = 'md',
    color = 'on-primary',
    textVariant = 'body',
    spacingY = '3',
    spacingX = '4',
    width = 'full',
    ...props
  }: Partial<TextInputProps>): StyleProps => ({
    bg,
    borderColor,
    rounded,
    color,
    textVariant,
    spacingY,
    spacingX,
    width,
    ...props,
  }),
  Avatar: ({ shape: rounded, ...props }: Partial<AvatarProps>): StyleProps => ({
    rounded,
    ...props,
  }),
  Icon: ({
    color = 'on-primary',
    ...props
  }: Partial<IconProps>): StyleProps => ({
    color,
    fontFamily: 'icons',
    ...props,
  }),
  Svg: ({
    viewBox,
    width,
    height,
    fill,
    strokeColor,
    strokeWidth,
  }: Partial<SvgProps>): StyleProps => ({
    /** Makes it so that the SVG element will fit its container */
    minWidth: viewBox && width && height ? 'fit' : undefined,
    fill,
    strokeColor,
    strokeWidth,
  }),
};

const DivSlot = createSlot<ComponentType<HtmlDivProps>>();
const SpanSlot = createSlot<ComponentType<HtmlSpanProps>>();
const ButtonSlot = createSlot<ComponentType<HtmlButtonProps>>();
const LiSlot = createSlot<ComponentType<HtmlListItemProps>>();

/**
 * The fundamental primitive component that includes styling utility properties, and corresponding design variables as values
 * @html div
 */
export function Box({ asChild, ref, ...props }: BoxProps) {
  const Comp = asChild ? DivSlot : 'div';
  const finalProps = extractStyleProps(props);
  return <Comp ref={ref} {...finalProps} />;
}

/**
 * A primitive that arranges its children horizontally
 */
export function HStack({ asChild, ref, ...props }: HStackProps) {
  const Comp = asChild ? DivSlot : 'div';
  const finalProps = extractStyleProps(withDefaultProps.HStack(props));
  return <Comp ref={ref} {...finalProps} />;
}

/**
 * A primitive that arranges its children vertically
 */
export function VStack({ asChild, ref, ...props }: VStackProps) {
  const Comp = asChild ? DivSlot : 'div';
  const finalProps = extractStyleProps(withDefaultProps.VStack(props));
  return <Comp ref={ref} {...finalProps} />;
}

/**
 * A primitive that renders an Icon using an icon font
 */
export function Icon({ asChild, name, ref, ...props }: IconProps) {
  const Comp = asChild ? SpanSlot : 'span';
  const finalProps = extractStyleProps(withDefaultProps.Icon(props));
  return (
    <Comp ref={ref} className="icon" {...finalProps}>
      {name}
    </Comp>
  );
}

/**
 * A primitive that renders an image
 * @html img
 */
export function Image({ ref, alt, ...props }: ImageProps) {
  const finalProps = extractStyleProps(props);
  // biome-ignore lint/a11y/useAltText: the alt attribute is already required in typescript
  return <img ref={ref} {...finalProps} />;
}

/**
 * A primitive that renders a button
 * @html button
 */
export function Pressable({ asChild, onPress, ref, ...props }: PressableProps) {
  const Comp = asChild ? ButtonSlot : 'button';
  const finalProps = extractStyleProps(withDefaultProps.Pressable(props));
  return <Comp ref={ref} onClick={onPress} {...finalProps} />;
}

/**
 * A primitive that renders a text element
 * @html h1, h2, h3, h4, h5, h6, em, i, p, span, label, pre, s, strong, sub, sup, u
 */
export function Text<As extends NativeTextElementTag>({
  asChild,
  as = 'p',
  ref,
  ...props
}: TextProps<NativeTextElementTag>) {
  const Comp = (asChild
    ? createSlot<ComponentType<HtmlTextProps<As>>>()
    : as) as unknown as ElementType;
  const finalProps = extractStyleProps(withDefaultProps.Text(props));
  return <Comp ref={ref} {...finalProps} />;
}

/**
 * A primitive that renders a list of items
 * @html ul, ol
 */
export function List({ asChild, as = 'ul', ref, ...props }: ListProps) {
  const Comp = (asChild
    ? createSlot<ComponentType<HtmlListProps>>()
    : as) as unknown as ElementType;
  const finalProps = extractStyleProps(props);
  return <Comp ref={ref} {...finalProps} />;
}

/**
 * A primitive that renders a list item
 * @html li
 */
export function ListItem({ ref, asChild, ...props }: ListItemProps) {
  const Comp = asChild ? LiSlot : 'li';
  const finalProps = extractStyleProps(props);
  return <Comp ref={ref} {...finalProps} />;
}

/**
 * A primitive that renders a input
 */
export function Input({ ref, ...props }: InputProps) {
  const finalProps = extractStyleProps(props);
  return <input ref={ref} {...finalProps} />;
}

/**
 * A primitive that renders a text input
 * @html input
 */
export function TextInput({ ref, ...props }: TextInputProps) {
  const finalProps = extractStyleProps(withDefaultProps.TextInput(props));
  return <input ref={ref} type="text" data-1p-ignore {...finalProps} />;
}

/**
 * A primitive that renders an image
 */
export function Avatar({ ref, ...props }: AvatarProps) {
  const finalProps = extractStyleProps(withDefaultProps.Avatar(props));
  // biome-ignore lint/a11y/useAltText: the alt attribute is already required in typescript
  return <img ref={ref} {...finalProps} />;
}

/**
 * A primitive that renders content that is only indirectly related to the document's main content
 * @html aside
 */
export function Aside({ ref, ...props }: AsideProps) {
  const finalProps = extractStyleProps(props);
  return <aside ref={ref} {...finalProps} />;
}

/**
 * A primitive that defines a hyperlink, which is used to link from one page to another
 * @html a
 */
export function Anchor({ ref, ...props }: AnchorProps) {
  const finalProps = extractStyleProps(props);
  return <a ref={ref} {...finalProps} />;
}

/**
 * A primitive that defines independent, self-contained content
 * @html article
 */
export function Article({ ref, ...props }: ArticProps) {
  const finalProps = extractStyleProps(props);
  return <article ref={ref} {...finalProps} />;
}

/**
 * A primitive for introductory content or a set of navigational links.
 * @html header
 */
export function Header({ ref, ...props }: HeaderProps) {
  const finalProps = extractStyleProps(props);
  return <header ref={ref} {...finalProps} />;
}

/**
 * A primitive for information about the author of the section, copyright data or links to related documents
 * @html footer
 */
export function Footer({ ref, ...props }: FooterProps) {
  const finalProps = extractStyleProps(props);
  return <footer ref={ref} {...finalProps} />;
}

/**
 * A primitive for a main content area
 * @html main
 */
export function Main({ ref, ...props }: MainProps) {
  const finalProps = extractStyleProps(props);
  return <main ref={ref} {...finalProps} />;
}

/**
 * A primitive which provides navigation links, either within the current document or to other documents
 * @html nav
 */
export function Nav({ ref, ...props }: NavProps) {
  const finalProps = extractStyleProps(props);
  return <nav ref={ref} {...finalProps} />;
}

/**
 * A generic standalone section of a document, which doesn't have a more specific semantic element to represent it
 * @html section
 */
export function Section({ ref, ...props }: SectionProps) {
  const finalProps = extractStyleProps(props);
  return <section ref={ref} {...finalProps} />;
}

/**
 * A primtive that provides a menu of options
 * @html select
 */
export function Select({ ref, ...props }: SelectProps) {
  const finalProps = extractStyleProps(props);
  return <select ref={ref} {...finalProps} />;
}

/**
 * A primitive that provides a set of options for a user to choose from
 * @html option
 */
export function Option({ ref, ...props }: OptionProps) {
  const finalProps = extractStyleProps(props);
  return <option ref={ref} {...finalProps} />;
}

/**
 * A primitive for multi-line plain-text editing control, useful when you want to allow users to enter a sizeable amount of free-form text
 * @html textarea
 */
export function TextArea({ ref, ...props }: TextAreaProps) {
  const finalProps = extractStyleProps(props);
  return <textarea ref={ref} {...finalProps} />;
}

/**
 * A primitive for tables
 * @html table
 */
export function Table({ ref, ...props }: TableProps) {
  const finalProps = extractStyleProps(props);
  return <table ref={ref} {...finalProps} />;
}

/**
 * A primitive for table headers
 * @html thead
 */
export function TableHead({ ref, ...props }: TableHeadProps) {
  const finalProps = extractStyleProps(props);
  return <thead ref={ref} {...finalProps} />;
}

/**
 * A primitive for table headers cells
 * @html th
 */
export function TableHeadCell({ ref, ...props }: TableHeadCellProps) {
  const finalProps = extractStyleProps(props);
  return <th ref={ref} {...finalProps} />;
}

/**
 * A primitive for table bodies
 * @html tbody
 */
export function TableBody({ ref, ...props }: TableBodyProps) {
  const finalProps = extractStyleProps(props);
  return <tbody ref={ref} {...finalProps} />;
}

/**
 * A primitive for table cells
 * @html td
 */
export function TableCell({ ref, ...props }: TableCellProps) {
  const finalProps = extractStyleProps(props);
  return <td ref={ref} {...finalProps} />;
}

/**
 * A primitive for table rows
 * @html tr
 */
export function TableRow({ ref, ...props }: TableRowProps) {
  const finalProps = extractStyleProps(props);
  return <tr ref={ref} {...finalProps} />;
}

/**
 * A container that defines a new coordinate system and viewport
 */
export function Svg({
  ref,
  fill,
  strokeColor,
  strokeWidth,
  viewBox,
  width,
  height,
  ...props
}: SvgProps) {
  const finalProps = extractStyleProps(
    withDefaultProps.Svg({
      viewBox,
      width,
      height,
      fill,
      strokeColor,
      strokeWidth,
    }),
  );

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      viewBox={viewBox}
      width={width}
      height={height}
      {...finalProps}
      {...props}
    />
  );
}

/**
 * A primitive that defines a path to be rendered
 */
export function Path({
  ref,
  fill,
  strokeColor,
  strokeWidth,
  ...props
}: PathProps) {
  const finalProps = extractStyleProps({ fill, strokeColor, strokeWidth });
  return <path ref={ref} {...finalProps} {...props} />;
}
