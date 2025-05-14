import { ErrorMessage } from '@hookform/error-message';
import clsx from 'clsx';
import {
  Button,
  ListBox,
  ListBoxItem,
  type ListBoxItemProps,
  Popover,
  Select as SelectPrimitive,
  type SelectProps as SelectPrimitveProps,
  SelectValue,
} from 'react-aria-components';
import { useController, useFormContext } from 'react-hook-form';

import { BaseFieldProps } from '../types';
import { Error } from '../Error';
import { Label } from '../Label';
import styles from './Select.module.css';

type SelectProps<T extends object, U extends object = T> = Omit<
  SelectPrimitveProps<U>,
  'children'
> &
  Omit<BaseFieldProps<T>, 'children'> & {
    label: string;
    description?: string;
    items?: Iterable<U>;
    children: React.ReactNode | ((item: U) => React.ReactNode);
  };

const Select = <FormInputs extends object, Items extends object = FormInputs>(
  props: SelectProps<FormInputs, Items>,
) => {
  const { children, label, items, name, ...otherProps } = props;

  const { control } = useFormContext<FormInputs>();

  const {
    field: { ...fieldProps },
    fieldState: { invalid },
    formState: { errors },
  } = useController<FormInputs>({ name: name, control });

  return (
    <SelectPrimitive
      data-component-name='Select'
      className={styles.select}
      {...otherProps}
      {...fieldProps}
      isInvalid={invalid}
      onSelectionChange={(keys) => {
        fieldProps.onChange(keys);
      }}
      selectedKey={fieldProps.value}
    >
      <Label>{label}</Label>
      <div className={styles.input}>
        <Button className={styles.trigger}>
          <SelectValue
            defaultValue={fieldProps.value}
            className={styles.value}
          />
          <svg
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 12'
            width={24}
            height={24}
          >
            <path
              d='m1 1 11 10L23 1'
              stroke={'var(--icon-color, var(--color-grey))'}
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </Button>
        <Popover offset={0} containerPadding={0} className={styles.popover}>
          <ListBox
            items={items}
            className={styles.items}
            onBlur={fieldProps.onBlur}
          >
            {children}
          </ListBox>
        </Popover>
      </div>
      {/* @ts-expect-error ts doesn't allow explicitely setting the name */}
      <ErrorMessage name={name} errors={errors} as={Error} />
    </SelectPrimitive>
  );
};

type SelectItemProps = ListBoxItemProps;

const SelectItem = (props: SelectItemProps) => {
  return (
    <ListBoxItem
      {...props}
      className={({ isFocusVisible, isHovered, isSelected }) =>
        clsx(
          styles.item,
          isFocusVisible && 'focused',
          isHovered && 'hovered',
          isSelected && 'selected',
        )
      }
    />
  );
};

export { Select, SelectItem, type SelectProps, type SelectItemProps };
