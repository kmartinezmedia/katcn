import { forwardRef } from 'react';
import { type UniversalPressableProps } from '../types/props';

import { createSlot } from '../utils/createSlot';

const Slot = createSlot<React.ComponentType<HtmlButtonProps>>();

type HtmlButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'color' | 'name'
>;

interface PressableProps extends UniversalPressableProps, HtmlButtonProps {}

/**
 * Provides press interactions with accessibility support.
 * @example
 ```tsx
   import { Pressable, Text } from "@yahoo/uds"

  export function Demo() {
    return (
      <Pressable
        onClick={console.log}
        backgroundColor="secondary"
        bordered
        borderColor="primary"
        borderRadius="lg"
      >
        <Text variant="body1" spacingHorizontal="7" spacingVertical="5">Click me...</Text>
      </Pressable>
    )
  }
  ```
 */
const Pressable = forwardRef<HTMLButtonElement, PressableProps>(
  function Pressable({ asChild, ...props }, ref) {
    const Comp = asChild ? Slot : 'button';
    return <Comp ref={ref} {...props} />;
  },
);

export { Pressable, type PressableProps };
