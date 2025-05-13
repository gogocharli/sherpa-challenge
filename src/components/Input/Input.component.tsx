import clsx from 'clsx';
import * as React from 'react';
import { Input as InputPrimitive } from 'react-aria-components';
import { useController, useFormContext } from 'react-hook-form';

import { Formfield } from '../FormField';
import { InputFieldProps } from '../types';

import styles from './Input.module.css';

type InputProps<T extends object> = InputFieldProps<T> & {
  placeholder?: string;
};

const Input = <FormInputs extends object>({
  className,
  ...props
}: InputProps<FormInputs>) => {
  const { control } = useFormContext<FormInputs>();

  const {
    field: { ref, ...fieldProps },
    fieldState: { invalid },
  } = useController<FormInputs>({ name: props.name, control });

  return (
    <Formfield {...props} {...fieldProps} isInvalid={invalid}>
      <InputPrimitive ref={ref} className={clsx(styles.input, className)} />
    </Formfield>
  );
};

Input.displayName = 'Input';

export { Input, type InputProps };
