import { Icon, Pressable, type PressableProps } from 'katcn';
import { createVariants } from 'katcn/getStyles';
import type { IconName } from 'katcn/types';

export const buttonVariants = createVariants({
  'primary-solid': {
    bg: 'inverse',
    color: 'on-inverse',
    _hover: {
      bg: 'gray-700',
    },
  },
  'primary-outline': {
    bg: undefined,
    color: 'inverse',
    borderColor: 'inverse',
    borderWidth: '2',
    _hover: {
      bg: 'secondary',
    },
  },
  'primary-ghost': {
    bg: undefined,
    color: 'on-primary',
    _hover: {
      bg: 'secondary',
      color: 'on-primary',
    },
  },
});

interface ButtonProps extends PressableProps {
  variant: keyof typeof buttonVariants;
  startIcon?: IconName;
  endIcon?: IconName;
}

export function Button({
  variant,
  startIcon,
  endIcon,
  children,
  ...props
}: ButtonProps) {
  const variantProps = buttonVariants[variant];
  return (
    <Pressable
      spacingX="5"
      spacingY="2"
      rounded="full"
      display="flex"
      alignItems="center"
      gapX="4"
      transition="colors"
      transitionDuration="200"
      textVariant="headline"
      textAlign="center"
      width="fit"
      {...variantProps}
      {...props}
    >
      {startIcon && (
        <Icon name={startIcon} size="8" fill={variantProps.color} />
      )}
      {children}
      {endIcon && <Icon name={endIcon} size="8" fill={variantProps.color} />}
    </Pressable>
  );
}
