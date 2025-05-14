import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './Calendar.component';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {
    showOutsideDays: true,
  },
};

export const WithoutOutsideDays: Story = {
  args: {
    showOutsideDays: false,
  },
};

export const WithSelectedDate: Story = {
  args: {
    selected: new Date('2024-03-15'),
  },
};

export const WithDateRange: Story = {
  args: {
    mode: 'range',
    selected: {
      from: new Date('2024-03-15'),
      to: new Date('2024-03-20'),
    },
  },
};

export const WithDisabledDays: Story = {
  args: {
    disabled: [
      new Date('2024-03-15'),
      new Date('2024-03-16'),
      new Date('2024-03-17'),
    ],
  },
};
