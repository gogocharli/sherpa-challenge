import { zodResolver } from '@hookform/resolvers/zod';
import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../Button';
import { Input, InputProps } from './Input.component';

const meta: Meta<typeof Input> = {
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: ['text', 'email', 'tel', 'password', 'url', 'hidden'],
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

const UsernameForm = z.object({
  username: z.string().min(5),
});

type UsernameForm = z.infer<typeof UsernameForm>;

const ValidatedForm = <T extends UsernameForm>(args: InputProps<T>) => {
  const { name, label, ...rest } = args;

  const methods = useForm<UsernameForm>({
    resolver: zodResolver(UsernameForm),
    reValidateMode: 'onBlur',
  });

  const { handleSubmit, setError } = methods;

  const onSubmit = async (data: UsernameForm) => {
    console.log('submit', data);
    setError('username', {
      type: 'custom',
      message: 'Username already exists',
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <Input<UsernameForm> name={name} label={label} {...rest} />
          <Button type='submit'>Submit</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export const Validated: Story = {
  args: {
    /* @ts-expect-error ts isn't happy to have us set the name explicitely */
    name: 'username',
    label: 'Username',
    type: 'text',
    autoComplete: 'username',
    placeholder: 'alexG',
    description: 'Must be at least 5 characters',
    isDisabled: false,
    isLabelHidden: false,
  },
  render: (args) => <ValidatedForm {...args} />,
};
