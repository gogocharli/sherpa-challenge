'use client';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import clsx from 'clsx';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={clsx('p-3', className)}
      classNames={{
        ...classNames,
      }}
      components={{
        PreviousMonthButton: () => (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='4'
            height='4'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path d='m15 18-6-6 6-6'></path>
          </svg>
        ),
        NextMonthButton: () => (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='4'
            height='4'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path d='m9 18 6-6-6-6'></path>
          </svg>
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
