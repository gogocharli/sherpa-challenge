import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/trips/', () => {
    return HttpResponse.json({
      arrivalDate: '2025-05-14',
      purpose: 'Travel',
      accomodation: 'Fairmount Royal York',
      passportNumber: 'P123456AA',
      passportExpirationDate: '2025-12-22',
      givenNames: 'Sarah Laura DeLindell',
      surname: 'Martin',
      birthDate: '2001-06-15',
    });
  }),
];
