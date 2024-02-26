// https://icons.craftwork.design/

import { forwardRef } from 'react';
import { type UniversalIconProps } from '../types/props';

// import { getStyles } from '../styles/getStyles';
import { createSlot } from '../utils/createSlot';

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
  { asChild, name, size, ...props },
  ref,
) {
  const Comp = asChild ? Slot : 'span';

  return (
    // @ts-expect-error iconSize is parsed in jsx-runtime
    <Comp ref={ref} iconSize={size} {...props}>
      {name}
    </Comp>
  );
});

export { Icon, type IconProps };
