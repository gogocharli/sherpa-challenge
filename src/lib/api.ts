import { TripInfo } from '@/components/TripDetails';
import useSWR, { SWRConfiguration } from 'swr';
import useSWRMutation from 'swr';

function useTripInfo(id: string) {
  return useSWR(`/api/trips/${id}`, getTripInfo, {
    onErrorRetry: (error, key) => {
      if (error.status === 404) return;

      if (key === '/api/trips/error') return;
    },
  });
}

function useUpdateTripInfo(id: string, options?: SWRConfiguration) {
  return useSWRMutation(`/api/trips/${id}`, updateTripInfo, options);
}

async function getTripInfo(url: string) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json as TripInfo;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Unknown error', error);
    }

    throw error;
  }
}

async function updateTripInfo(url: string, updatedData: TripInfo) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(updatedData),
    });

    console.log('response post', response);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json as TripInfo;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Unknown error', error);
    }

    throw error;
  }
}

export { useTripInfo, useUpdateTripInfo, updateTripInfo };
