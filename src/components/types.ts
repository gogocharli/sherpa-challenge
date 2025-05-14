import { TextFieldProps } from 'react-aria-components';
import { Path, RegisterOptions } from 'react-hook-form';

export interface BaseFieldProps<T extends object> {
  name: Path<T>;
  label: string;
  className?: string;
  children?: React.ReactNode;
  description?: string;
  optional?: boolean;
  isDisabled?: boolean;
}

export type InputFieldProps<T extends object> = TextFieldProps &
  BaseFieldProps<T>;

export type TextAreaFieldProps<T extends object> = TextFieldProps &
  BaseFieldProps<T>;

export type DefaultFieldProps<T extends object> = InputFieldProps<T> & {
  placeholder?: string;
  rules?: RegisterOptions;
};

export type FieldAutoComplete =
  | 'off'
  | 'on'
  | 'name'
  | 'given-name'
  | 'family-name'
  | 'email'
  | 'country-name'
  | 'url'
  | 'username';
