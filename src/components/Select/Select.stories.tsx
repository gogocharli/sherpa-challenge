import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../Button';
import { Select, SelectItem } from '.';

const meta: Meta<typeof Select> = {
  component: Select,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Select>;

const SelectForm = z.object({
  country: z.string({
    errorMap: () => ({ message: 'Please select your country of residence' }),
  }),
});

type SelectForm = z.infer<typeof SelectForm>;

const WithStaticOptions = () => {
  const methods = useForm<SelectForm>({
    resolver: zodResolver(SelectForm),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: SelectForm) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '300px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Select<SelectForm>
            name='country'
            label='Country'
            placeholder='Select a country'
          >
            <SelectItem id='Australia'>🇦🇺 Australia</SelectItem>
            <SelectItem id='Canada'>🇨🇦 Canada</SelectItem>
            <SelectItem id='France'>🇫🇷 France</SelectItem>
            <SelectItem id='Netherlands'>🇳🇱 Netherlands</SelectItem>
            <SelectItem id='UK'>
              🇬🇧 The United Kingdom of Great Britain and Northern Ireland
            </SelectItem>
            <SelectItem id='United States'>🇺🇸 United States</SelectItem>
          </Select>
          <Button type='submit'>Submit</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export const Static: Story = {
  render: () => <WithStaticOptions />,
};

type Country = { country: string; value: string };

const countries = [
  { country: 'Australia', value: 'Australia' },
  { country: 'Canada', value: 'Canada' },
  { country: 'France', value: 'France' },
  { country: 'Netherlands', value: 'Netherlands' },
  {
    country: 'The United Kingdom of Great Britain and Northern Ireland',
    value: 'UK',
  },
] satisfies Country[];

const WithDynamicOptions = () => {
  const methods = useForm<SelectForm>({
    resolver: zodResolver(SelectForm),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: SelectForm) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Select<SelectForm, Country>
            name='country'
            label='Country'
            placeholder='Select a country'
            items={countries}
          >
            {(item) => <SelectItem id={item.value}>{item.country}</SelectItem>}
          </Select>
          <Button type='submit'>Submit</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export const Dynamic: Story = {
  render: () => <WithDynamicOptions />,
};
