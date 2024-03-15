import { forwardRef } from 'react';
import type { UniversalStackProps } from '../types';

import { Box, type HtmlDivProps } from './Box';

interface HStackProps extends HtmlDivProps, UniversalStackProps {}

/**
 * A layout primitive that can be used to compose other components.
 * The HStack is essentially the same component as [Box](/components/box) where it uses [flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) to lay content out in a row. Where it differs is HStack also allows for gaps between children via the `gap` prop.
 *
 * You should use HStack when:
 *
 * - you want to lay content out in columns that are sized to their content
 * - you want to add gaps between columns
 * - you want to lay content out in columns that fill the available space within the parent container
 * - you need columns of proportionate size to each other (also known as a ratio-based layout)
 *
 *
 * @example
 * #### Columns Sized to Content
 *
 * ```tsx
 * import { Box, HStack } from "katcn"
 *
 * export function Demo() {
 * return (
 *     <HStack>
 *       <Box spacing="6" backgroundColor="secondary">
 *         First
 *       </Box>
 *       <Box spacing="6" backgroundColor="secondary">
 *         Second
 *       </Box>
 *       <Box spacing="6" backgroundColor="secondary">
 *         Third
 *       </Box>
 *     </HStack>
 *   )
 * }
 * ```
 *
 * #### Columns with Gaps
 *
 * ```tsx
 * import { Box, HStack } from "katcn"
 *
 * export function Demo() {
 *   return (
 *     <HStack gap="1">
 *       <Box spacing="6" backgroundColor="secondary">
 *         First
 *       </Box>
 *       <Box spacing="6" backgroundColor="secondary">
 *         Second
 *       </Box>
 *       <Box spacing="6" backgroundColor="secondary">
 *         Third
 *       </Box>
 *     </HStack>
 *   )
 * }
 * ```
 *
 * #### Columns that Fill the Available Space
 *
 * ```tsx
 * import { Box, HStack } from "katcn"
 *
 * export function Demo() {
 *   return (
 *     <HStack gap="1">
 *       <Box spacing="6" flexGrow="1" backgroundColor="secondary">
 *         First
 *       </Box>
 *       <Box spacing="6" flexGrow="1" backgroundColor="secondary">
 *         Second
 *       </Box>
 *       <Box spacing="6" flexGrow="1" backgroundColor="secondary">
 *         Third
 *       </Box>
 *     </HStack>
 *   )
 * ```
 *
 * #### Columns that Have Proportionate Sizes
 *
 * ```tsx
 * import { Box, HStack } from "katcn"
 *
 * export function Demo() {
 *   return (
 *     <HStack gap="1">
 *       <Box spacing="6" flexGrow="1" backgroundColor="secondary">
 *         First
 *       </Box>
 *       <Box spacing="6" flexGrow="2" backgroundColor="secondary">
 *         Second
 *       </Box>
 *       <Box spacing="6" flexGrow="3" backgroundColor="secondary">
 *         Third
 *       </Box>
 *     </HStack>
 *   )
 * }
 * ```
 **/
const HStack = forwardRef<HTMLDivElement, HStackProps>(function HStack(
  { gap, ...props },
  ref,
) {
  return <Box ref={ref} display="flex" direction="horizontal" {...props} />;
});

HStack.displayName = 'HStack';

export { HStack, type HStackProps };
