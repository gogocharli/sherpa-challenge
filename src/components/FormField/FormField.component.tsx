import { ErrorMessage } from '@hookform/error-message';
import { TextField } from 'react-aria-components';
import { useFormContext } from 'react-hook-form';

import { InputFieldProps } from '../types';
import { Error } from '../Error';
import { Label } from '../Label';
import styles from './FormField.module.css';

const Formfield = <FormInputs extends object>(
  props: InputFieldProps<FormInputs>,
) => {
  const { children, description, label, optional, isDisabled, ...sharedProps } =
    props;

  const {
    formState: { errors },
  } = useFormContext();

  return (
    <TextField
      className={styles.field}
      {...sharedProps}
      isDisabled={isDisabled}
    >
      <Label isDisabled={isDisabled}>
        {label} {!!optional ? ' (Optional)' : ''}:
      </Label>
      {description && (
        <p
          {...(isDisabled && { 'data-disabled': 'true' })}
          className={styles.description}
        >
          {description}
        </p>
      )}
      {children}
      <ErrorMessage errors={errors} name={sharedProps.name} as={Error} />
    </TextField>
  );
};

export { Formfield };
