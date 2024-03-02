import { forwardRef } from 'react';
import type { UniversalBoxProps } from '../types/props';

import { createSlot } from '../utils/createSlot';

const Slot = createSlot<React.ComponentType<HtmlDivProps>>();

type HtmlDivProps = React.HTMLAttributes<HTMLDivElement>;

interface BoxProps extends UniversalBoxProps, HtmlDivProps {}

/**
 * A layout primitive that can be used to compose other components.
 * @example
 ```tsx
  import { Box } from "katcn"

  export function Demo() {
    return (
      <Box
        bordered
        backgroundColor="primary"
        borderRadius="md"
        spacing='6'
        >
        Any kind of content can go here!
      </Box>
    )
  }
  ```
 */
const Box = forwardRef<HTMLDivElement, BoxProps>(function Box(
  { asChild, ...props },
  ref,
) {
  const Comp = asChild ? Slot : 'div';

  return <Comp ref={ref} {...props} />;
});

Box.displayName = 'Box';

export { Box, type BoxProps, type HtmlDivProps };
