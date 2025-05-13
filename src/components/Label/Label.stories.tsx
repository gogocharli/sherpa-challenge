import { Meta, StoryObj } from '@storybook/react';

import { Label } from './Label.component';

const meta: Meta<typeof Label> = {
  component: Label,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', marginTop: '1rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: 'First name',
    className: 'custom',
  },
};
