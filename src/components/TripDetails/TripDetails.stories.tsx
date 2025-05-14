import type { Meta, StoryObj } from '@storybook/react';
import { TripDetails } from './TripDetails.component';

const meta = {
  title: 'Components/TripDetails',
  component: TripDetails,
  tags: ['autodocs'],
} satisfies Meta<typeof TripDetails>;

export default meta;

type Story = StoryObj<typeof TripDetails>;

const DefaultStory = () => {
  return (
    <div style={{ display: 'grid', placeContent: 'center' }}>
      <TripDetails title='Trip Details' />
    </div>
  );
};

export const Default: Story = {
  render: () => <DefaultStory />,
};
