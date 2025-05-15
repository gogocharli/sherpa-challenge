import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse, delay } from 'msw';
import { Toaster } from 'sonner';

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
      <TripDetails title='Trip Details' tripId='alpha1' />
      <Toaster />
    </div>
  );
};

const dbMock = new Map([
  [
    'alpha1',
    {
      arrivalDate: '2025-05-14',
      purpose: 'Travel',
      accomodation: 'Fairmount Royal York',
      passportNumber: 'P123456AA',
      passportExpirationDate: '2025-12-22',
      givenNames: 'Sarah Laura DeLindell',
      surname: 'Martin',
      birthDate: '2001-06-15',
    },
  ],
]);

export const Default: Story = {
  render: () => <DefaultStory />,
  parameters: {
    msw: {
      handlers: [
        http.get('/api/trips/:id', async ({ params }) => {
          const { id } = params;
          const notFound = new HttpResponse('Not found', {
            status: 404,
            headers: {
              'Content-Type': 'text/plain',
            },
          });

          if (typeof id === 'string') {
            await delay(1000);
            const data = dbMock.get(id);

            return data ? HttpResponse.json(data) : notFound;
          } else {
            return notFound;
          }
        }),
        http.post('/api/trips/:id', async ({ request, params }) => {
          const { id } = params;

          if (typeof id === 'string') {
            if (id === 'error') {
              await delay(500);
              return new HttpResponse('Server Erro', {
                status: 503,
              });
            }

            const updatedData = await request.json();
            // @ts-expect-error we should validate and all that here
            dbMock.set(id, updatedData);

            await delay(500);
            return HttpResponse.json(updatedData, { status: 200 });
          } else {
            return new HttpResponse('Not found', {
              status: 404,
              headers: {
                'Content-Type': 'text/plain',
              },
            });
          }
        }),
      ],
    },
  },
};
