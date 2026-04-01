import { isDateValid } from '@ryed-ui/ui/DatePicker/hooks/useDatePickerValue';
import { TDatePickerChangeHandler } from '@ryed-ui/ui/DatePicker/types';
import dayjs from 'dayjs';
import { useCallback } from 'react';

export interface IUseCalendarDateSelectHandlerProps {
  onSelect?: () => void;
  onChange?: TDatePickerChangeHandler;

  // dayjs valid format
  // https://day.js.org/docs/en/display/format
  // default format is YYYY-MM-DD
  format?: string;
}

export const useCalendarDateSelectHandler = ({
  onSelect,
  onChange,
  format = 'YYYY-MM-DD',
}: IUseCalendarDateSelectHandlerProps) => {
  const handleChange = useCallback(
    (calendarDate: Date | undefined) => {
      if (isDateValid(calendarDate)) {
        onSelect?.();
        return onChange?.(dayjs(calendarDate).format(format));
      }

      onChange?.(null);
    },
    [onChange, onSelect, format]
  );

  return handleChange;
};
