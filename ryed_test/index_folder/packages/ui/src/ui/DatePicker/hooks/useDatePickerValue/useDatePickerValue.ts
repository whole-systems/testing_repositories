import { isDateValid } from '@ryed-ui/ui/DatePicker/hooks/useDatePickerValue/utils/is-date-valid';
import { TDatePickerInputValue } from '@ryed-ui/ui/DatePicker/types';
import { formatDate } from '@ryed-ui/utils/format-date';
import { useEffect, useState } from 'react';

export const useDatePickerValue = (
  date: TDatePickerInputValue,
  timezone?: string
) => {
  const [dateValue, setDateValue] = useState<TDatePickerInputValue | null>(
    () => {
      if (!isDateValid(date)) {
        return null;
      }
      if (timezone && date) {
        return formatDate(date as Date, { timezone });
      }

      return date;
    }
  );

  useEffect(() => {
    if (!isDateValid(date)) {
      setDateValue(null);
      return;
    }
    if (timezone && date) {
      setDateValue(formatDate(date as Date, { timezone }));
      return;
    }
    setDateValue(date);
  }, [date, timezone]);

  return {
    dateValue,
  };
};
