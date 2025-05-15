'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'sonner';

import { updateTripInfo, useTripInfo } from '@/lib/api';
import { TripInfoForm, tripInfoSchema } from '@/lib/validation';
import { Input } from '../Input';
import { Select, SelectItem } from '../Select';
import { Button } from '../Button';

import styles from './TripDetails.module.css';

interface TripDetailsProps {
  title: React.ReactNode;
  tripId: string;
}

const TripDetails = ({ title, tripId }: TripDetailsProps) => {
  const { data, isLoading, mutate } = useTripInfo(tripId);

  const [isEditing, setIsEditing] = useState(!data && !isLoading);
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const titleElement = typeof title === 'string' ? <h3>{title}</h3> : title;

  const toggleSensitiveInfo = () => setShowSensitiveInfo((state) => !state);

  const onSubmit = async (formData: TripInfoForm) => {
    setIsSubmitting(true);

    try {
      toast.promise(
        mutate(
          async () => {
            return updateTripInfo(`/api/trips/${tripId}`, formData);
          },
          {
            optimisticData: formData,
            rollbackOnError: true,
            revalidate: false,
          },
        ),
        {
          loading: 'Submitting…',
          success: 'Trip Details have been updated',
          error: 'Failed to updated trip details',
        },
      );
      setIsEditing(false);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Could not update trip data';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div className={styles.wrapper}>
      {titleElement}
      {isEditing || (!isLoading && !data) ? (
        <UpdateForm
          tripData={data}
          onSubmit={onSubmit}
          onCancel={() => setIsEditing(false)}
          isSubmitDisabled={isSubmitting}
        />
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

function Skeleton() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.skeletonTitle} />
      <div className={styles.descriptionWrapper}>
        <div className={styles.descriptionList}>
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className={styles.skeletonItem} />
          ))}
        </div>
        <div className={styles.skeletonButtons}>
          <div className={styles.skeletonButton} />
          <div className={styles.skeletonButton} />
        </div>
      </div>
    </div>
  );
}

interface UpdateFormProps {
  tripData: TripInfoForm | undefined;
  onCancel: () => void;
  onSubmit: (formData: TripInfoForm) => Promise<void>;
  isSubmitDisabled: boolean;
}

function UpdateForm({
  tripData,
  onCancel,
  onSubmit,
  isSubmitDisabled,
}: UpdateFormProps) {
  const methods = useForm<TripInfoForm>({
    resolver: zodResolver(tripInfoSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: tripData,
  });

  const { handleSubmit } = methods;
  return (
    <FormProvider {...methods}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input<TripInfoForm>
          name='arrivalDate'
          type='date'
          label='Arrival Date'
        />
        <Select<TripInfoForm> name='purpose' label='Purpose'>
          <SelectItem id='Travel'>Travel</SelectItem>
          <SelectItem id='Business'>Business</SelectItem>
          <SelectItem id='Medical'>Medical</SelectItem>
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
            onClick={onCancel}
            disabled={!tripData}
          >
            Cancel
          </Button>
          <Button
            className={styles.fillSpace}
            intent='primary'
            type='submit'
            disabled={isSubmitDisabled}
          >
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

interface DescriptionListProps {
  toggleSensitiveInfo: () => void;
  showSensitiveInfo: boolean;
  data: TripInfoForm | undefined;
  onEdit: () => void;
}

const currentTimeFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

function DescriptionList({
  toggleSensitiveInfo,
  showSensitiveInfo,
  data,
  onEdit,
}: DescriptionListProps) {
  if (!data) {
    return <p>No Trip Information</p>;
  }

  return (
    <div className={styles.descriptionWrapper}>
      <dl className={styles.descriptionList}>
        <DescriptionListItem
          title='Arrival Date'
          description={currentTimeFormat.format(new Date(data.arrivalDate))}
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
          description={currentTimeFormat.format(
            new Date(data.passportExpirationDate),
          )}
          isDescriptionHidden={!showSensitiveInfo}
        />
        <DescriptionListItem
          title='Date of Birth'
          description={currentTimeFormat.format(new Date(data.birthDate))}
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
