'use client';

import clsx from 'clsx';
import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

import styles from './Label.module.css';

type LabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & {
  isDisabled?: boolean;
};

const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, isDisabled, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    {...(isDisabled && { 'data-disabled': 'true' })}
    className={clsx(styles.base, className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
