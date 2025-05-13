import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';

import styles from './Button.module.css';

const buttonVariants = cva(styles.base, {
  variants: {
    intent: {
      primary: styles.primary,
      outline: styles.outline,
      secondary: styles.secondary,
      ghost: styles.ghost,
      link: styles.link,
    },
    size: {
      medium: styles.medium,
    },
    disabled: {
      true: styles.disabled,
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'medium',
  },
});

export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

function Button({
  className,
  intent,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={clsx(buttonVariants({ intent, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
