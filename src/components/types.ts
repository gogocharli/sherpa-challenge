import { TextFieldProps } from 'react-aria-components';
import { Path, RegisterOptions } from 'react-hook-form';

/**
 * A utility type to extract the individual string keys of an object
 * @see https://stackoverflow.com/a/65420892/16404160
 */
export type StringKeyOf<T extends object> = Extract<keyof T, string>;

export interface BaseFieldProps<T extends object> {
  name: Path<T>;
  label: string | boolean;
  className?: string;
  children?: React.ReactNode;
  description?: string;
  optional?: boolean;
  isDisabled?: boolean;
}

export interface InputFieldProps<T extends object> extends TextFieldProps {
  name: Path<T>;
  label: string | boolean;
  className?: string;
  children?: React.ReactNode;
  description?: string;
  optional?: boolean;
  isDisabled?: boolean;
  isLabelHidden?: boolean;
}

export interface TextareaFieldProps<T extends object> extends TextFieldProps {
  name: Path<T>;
  label: string | boolean;
  className?: string;
  children?: React.ReactNode;
  description?: string;
  optional?: boolean;
  isDisabled?: boolean;
  isLabelHidden?: boolean;
}

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
