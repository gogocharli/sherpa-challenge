import { z } from 'zod';

const stringSchema = z.string().trim().min(1, 'Required');

const tripInfoSchema = z.object({
  arrivalDate: z.string().date(),
  purpose: stringSchema,
  accomodation: stringSchema,
  passportNumber: stringSchema,
  passportExpirationDate: z.string().date(),
  givenNames: stringSchema,
  surname: stringSchema,
  birthDate: z.string().date(),
});

type TripInfoForm = z.infer<typeof tripInfoSchema>;

export { tripInfoSchema, type TripInfoForm };
