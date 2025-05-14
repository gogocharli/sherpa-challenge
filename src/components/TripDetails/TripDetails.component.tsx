'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';

import styles from './TripDetails.module.css';
import { Input } from '../Input';
import { Select, SelectItem } from '../Select';
import { Button } from '../Button';
import { format } from 'date-fns';

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

const INITIAL_DATA: TripInfoForm = {
  arrivalDate: '2025-05-14',
  purpose: 'Travel',
  accomodation: 'Fairmount Royal York',
  passportNumber: 'P123456AA',
  passportExpirationDate: '2025-12-22',
  givenNames: 'Sarah Laura DeLindell',
  surname: 'Martin',
  birthDate: '2001-06-15',
};

interface TripDetailsProps {
  title: React.ReactNode;
  // submitUrl: string
}

const TripDetails = ({ title }: TripDetailsProps) => {
  // Fetch initial data with SWR
  const data: TripInfoForm = INITIAL_DATA;

  const [isEditing, setIsEditing] = useState(!data);
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(true);

  const methods = useForm<TripInfoForm>({
    resolver: zodResolver(tripInfoSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: data ?? undefined,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (formData: TripInfoForm) => {
    console.log(formData);
  };

  const titleElement = typeof title === 'string' ? <h3>{title}</h3> : title;

  const toggleSensitiveInfo = () => setShowSensitiveInfo((state) => !state);
  return (
    <div className={styles.wrapper}>
      {titleElement}
      {isEditing || !data ? (
        <FormProvider {...methods}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Input<TripInfoForm>
              name='arrivalDate'
              type='date'
              label='Arrival Date'
            />
            <Select<TripInfoForm> name='purpose' label='Purpose'>
              <SelectItem id='travel'>Travel</SelectItem>
              <SelectItem id='business'>Business</SelectItem>
              <SelectItem id='medical'>Medical</SelectItem>
            </Select>
            <Input<TripInfoForm>
              name='accomodation'
              type='text'
              label='Accomodation'
              description='Describe your principal place of stay in the country'
              autoComplete='off'
            />
            <Input<TripInfoForm>
              name='givenNames'
              type='text'
              label='Given Names'
              autoComplete='given-name'
              autoCorrect='false'
            />
            <Input<TripInfoForm>
              name='surname'
              type='text'
              label='Surname'
              description='Your surname or family name'
              autoComplete='family-name'
              autoCorrect='false'
            />
            <Input<TripInfoForm>
              name='passportNumber'
              type='text'
              label='Passport Number'
              autoComplete='false'
              autoCorrect='false'
            />
            <Input<TripInfoForm>
              name='passportExpirationDate'
              type='date'
              label='Passport Expiriation Date'
            />
            <Input<TripInfoForm>
              name='birthDate'
              type='date'
              label='Date of Birth'
            />
            <div className={styles['form__buttons']}>
              <Button
                className={styles.fillSpace}
                intent='secondary'
                onClick={() => setIsEditing(false)}
                disabled={!data}
              >
                Cancel
              </Button>
              <Button
                className={styles.fillSpace}
                intent='primary'
                type='submit'
              >
                Save
              </Button>
            </div>
          </form>
        </FormProvider>
      ) : (
        <DescriptionList
          data={data}
          onEdit={() => setIsEditing(true)}
          showSensitiveInfo={showSensitiveInfo}
          toggleSensitiveInfo={toggleSensitiveInfo}
        />
      )}
    </div>
  );
};

interface DescriptionListProps {
  toggleSensitiveInfo: () => void;
  showSensitiveInfo: boolean;
  data: TripInfoForm;
  onEdit: () => void;
}

function DescriptionList({
  toggleSensitiveInfo,
  showSensitiveInfo,
  data,
  onEdit,
}: DescriptionListProps) {
  return (
    <div className={styles.descriptionWrapper}>
      <dl className={styles.descriptionList}>
        <DescriptionListItem
          title='Arrival Date'
          description={format(data.arrivalDate, DATE_FORMAT)}
        />
        <DescriptionListItem title='Purpose' description={data.purpose} />
        <DescriptionListItem
          title='Accomodation'
          description={data.accomodation}
          isDescriptionHidden={!showSensitiveInfo}
        />
        <DescriptionListItem
          title='Name'
          description={`${data.givenNames} ${data.surname}`}
        />
        <DescriptionListItem
          title='Passport Number'
          description={data.passportNumber}
          isDescriptionHidden={!showSensitiveInfo}
        />
        <DescriptionListItem
          title='Passport Expiration Date'
          description={format(data.passportExpirationDate, DATE_FORMAT)}
          isDescriptionHidden={!showSensitiveInfo}
        />
        <DescriptionListItem
          title='Date of Birth'
          description={format(data.birthDate, DATE_FORMAT)}
          isDescriptionHidden={!showSensitiveInfo}
        />
      </dl>
      <div className={styles['descriptionList__buttons']}>
        <Button intent='outline' onClick={onEdit}>
          Edit Details
        </Button>
        <Button intent='link' onClick={toggleSensitiveInfo}>
          {showSensitiveInfo ? 'Hide' : 'Show'}
        </Button>
      </div>
    </div>
  );
}

const DATE_FORMAT = 'MMMM d, yyy';

function DescriptionListItem({
  title,
  description,
  isDescriptionHidden = false,
}: {
  title: string;
  description: string;
  isDescriptionHidden?: boolean;
}) {
  return (
    <div className={styles.descriptionListItem}>
      <dt>{title}</dt>
      <dd>{isDescriptionHidden ? '**********' : description}</dd>
    </div>
  );
}

export { TripDetails, type TripInfoForm as TripInfo };
