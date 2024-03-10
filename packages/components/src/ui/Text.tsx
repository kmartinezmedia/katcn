import { type Ref, forwardRef } from 'react';
import type { StyleProps, UniversalTextProps } from '../types';

import { createSlot } from '../helpers';

const Slot = createSlot<React.ComponentType<HtmlParagraphProps & StyleProps>>();

type HtmlParagraphProps = Omit<
  React.HTMLAttributes<HTMLParagraphElement>,
  'color'
>;
type TextElementTagName =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'p'
  | 'strong'
  | 'span'
  | 'label'
  | 'li'
  | 'th'
  | 'td';

interface TextProps extends UniversalTextProps, HtmlParagraphProps {
  ref?: Ref<HTMLElement>;
  as?: TextElementTagName;
}

/**
 * A text element that can be used to display text.
 * @example
    #### Display1

    Display1 styles are to be used very sparingly. Display styles supersede Title styles, so they are there for when you need to layer on more hierarchy.
    The default html text element rendered for this variant is `h1`.

    ```tsx
    import { Text, VStack } from "katcn"

    export function Demo() {
      return (
        <VStack>
          <Text variant="display1">Display 1</Text>
        </VStack>
      )
    }
    ```

    #### Title

    Title styles are used to establish the primary hierarchy in a layout. They should be used to label sections.
    The default html text element rendered for this variant is `h1` for `title1`, `h2` for `title2`, `h3` for `title3` and `h4` for `headline1`.

    ```tsx
    import { Text, VStack } from "katcn"

    export function Demo() {
      return (
        <VStack gap="6">
          <Text variant="title1">Title 1</Text>
          <Text variant="title2">Title 2</Text>
          <Text variant="title3">Title 3</Text>
        </VStack>
      )
    }
    ```

    #### Headline & Body

    Headline and body styles are your essential content styles. They’re versatile styles that can be used for paragraphs, data, labels for buttons.
    The default html text element rendered for this variant is `p`.

    ```tsx
    import { Text, VStack } from "katcn"

    export function Demo() {
      return (
        <VStack gap="6">
          <Text variant="headline1">Headline 1</Text>
          <Text variant="body1">Body 1</Text>
        </VStack>
      )
    }
    ```

    #### Label & Caption

    Label and caption styles are when you need to add hierarchy in your content. They ideally are used in conjunction with Headline and Body styles, but in extraordinarily dense interfaces they can replace Headline & Body should you need to present large data sets to users. They’re also great candidates for presenting numbers to the user as they have tabular numbers by default.
    The default html text element rendered for this variant is `p`.

    ```tsx
    import { Text, VStack } from "katcn"

    export function Demo() {
      return (
        <VStack gap="6">
          <Text variant="label1">Label 1</Text>
          <Text variant="label2">Label 2</Text>
          <Text variant="caption1">Caption 1</Text>
          <Text variant="caption2">Caption 2</Text>
        </VStack>
      )
    }
    ```

    #### Legal

    Legal styles are used for legal disclaimers and fine print.
    The default html text element rendered for this variant is `p`.

    ```tsx
    import { Text, VStack } from "katcn"

    export function Demo() {
      return (
        <VStack>
          <Text variant="legal1">Legal 1</Text>
        </VStack>
      )
    }
    ```
 */
const Text = forwardRef(function Text(
  { asChild, as = 'p', ...props }: TextProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const Comp = asChild ? Slot : as;

  return <Comp ref={ref} {...props} />;
});

Text.displayName = 'Text';

export { Text, type TextProps };
