import { NextResponse } from 'next/server';
import { tripInfoSchema } from '@/lib/validation';

const dbMock = new Map([
  [
    'd67eda7a-e201-4446-95db-f81d270cb28a',
    {
      arrivalDate: '2025-05-18',
      purpose: 'Business',
      accomodation: 'Fairmount Royal York',
      passportNumber: 'S23FDA1D',
      passportExpirationDate: '2028-05-15',
      givenNames: 'Pascal',
      surname: 'Siakam',
      birthDate: '1994-04-02',
    },
  ],
]);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ tripId: string }> },
) {
  const { tripId } = await params;

  const tripInfo = dbMock.get(tripId);

  if (tripInfo) {
    return NextResponse.json(tripInfo);
  } else {
    return NextResponse.json(
      { error: `No trip with id: ${tripId}` },
      { status: 404 },
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ tripId: string }> },
) {
  const { tripId } = await params;
  const existingTripInfo = dbMock.get(tripId);

  if (!existingTripInfo) {
    return NextResponse.json(
      { error: `No trip with id: ${tripId}` },
      { status: 404 },
    );
  }

  const updatedData = await request.json();
  const parsed = tripInfoSchema.safeParse(updatedData);

  if (!parsed.success) {
    console.error(parsed.error);
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
  } else {
    dbMock.set(tripId, updatedData);
    return NextResponse.json(parsed.data);
  }
}
