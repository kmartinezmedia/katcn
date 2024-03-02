import { forwardRef } from 'react';
import { type UniversalStackProps } from '../types/props';

import { Box, type HtmlDivProps } from './Box';

interface VStackProps extends HtmlDivProps, UniversalStackProps {}

/**
 * The VStack is essentially the same component as [Box](/components/box) where it uses [flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) but it lays out content in a column. VStack also allows for gaps between children via the `gap` prop.
 *
 * You should use VStack when:
 *
 * - you want to lay content out in rows that are sized to their content (height only, by default each child will fill the width of the VStack)
 * - you want to add gaps between columns
 * - you want to lay content out in columns that fill the available space within the parent container
 * - you need columns of proportionate size to each other (also known as a ratio-based layout)
 *
 * @example
 * #### Rows with Gaps
 *
 * ```tsx
 *   import { Box, VStack } from "katcn"
 *
 *   export function Demo() {
 *     return (
 *       <VStack gap="6">
 *         <Box spacing="6" backgroundColor="secondary">
 *           First
 *         </Box>
 *         <Box spacing="6" backgroundColor="secondary">
 *           Second
 *         </Box>
 *         <Box spacing="6" backgroundColor="secondary">
 *           Third
 *         </Box>
 *       </VStack>
 *     )
 *   }
 * ```
 *
 * #### Rows that Have Proportionate Sizes
 *
 * ```tsx
 *     import { Box, VStack } from "katcn"
 *
 *   export function Demo() {
 *     return (
 *       <VStack gap="6">
 *         <Box spacing="6" flexGrow="1" backgroundColor="secondary">
 *           First
 *         </Box>
 *         <Box spacing="6" flexGrow="2" backgroundColor="secondary">
 *           Second
 *         </Box>
 *         <Box spacing="6" flexGrow="3" backgroundColor="secondary">
 *           Third
 *         </Box>
 *       </VStack>
 *     )
 *   }
 * ```
 *
 **/
const VStack = forwardRef<HTMLDivElement, VStackProps>(function VStack(
  { gap, ...props },
  ref,
) {
  return (
    <Box
      ref={ref}
      display="flex"
      direction="vertical"
      verticalGap={gap}
      {...props}
    />
  );
});

VStack.displayName = 'VStack';

export { VStack, type VStackProps };
