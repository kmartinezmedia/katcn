// https://icons.craftwork.design/

import { forwardRef } from 'react';
import type { UniversalIconProps } from '../types';

import { createSlot } from '../helpers';

const Slot = createSlot<React.ComponentType<HtmlSpanProps>>();

type HtmlSpanProps = Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>;

interface IconProps extends UniversalIconProps, HtmlSpanProps {}

/**
 * For an icon to render, it requires a unique name that maps to an upstream asset in Figma (this will autocomplete when using TypeScript), and a target size (s, m, l).

@example
  ```tsx
  import { Icon } from "katcn"

  export function Demo() {
   return <Icon name="academicCap" size="m" />
  }
  ```
 */
const Icon = forwardRef<HTMLSpanElement, IconProps>(function Icon(
  { asChild, name, ...props },
  ref,
) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp ref={ref} {...props}>
      {name}
    </Comp>
  );
});

Icon.displayName = 'Icon';

export { Icon, type IconProps };
