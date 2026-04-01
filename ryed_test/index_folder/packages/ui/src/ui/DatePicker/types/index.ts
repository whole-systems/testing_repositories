import { Locale } from 'date-fns';

export type TDatePickerInputValue = Date | string | null | undefined;
// ISO string
export type TDatePickerOutputValue = string | null;

export type TDatePickerChangeHandler = (value: TDatePickerOutputValue) => void;
export type TDatePickerBlurHandler = (
  event: React.FocusEvent<HTMLInputElement | HTMLButtonElement>
) => void;

export interface IDatePickerProps {
  // name of the input, will be used in event of onBlur
  name?: string;

  // value of the input
  value?: TDatePickerInputValue;

  // placeholder of the input
  placeholder?: string;

  // dayjs valid format
  // https://day.js.org/docs/en/display/format
  // default format is YYYY-MM-DD
  format?: string;

  // timezone
  // https://day.js.org/docs/en/timezone/timezone
  // default is local timezone
  timezone?: string;

  // close the popover after selecting a date
  // default is true
  closeOnSelect?: boolean;

  // clearable
  // default is true
  clearable?: boolean;

  // locale
  // default is enUS
  locale?: Locale;

  // disablePastDays
  // default is false
  disablePastDays?: boolean;

  // disableFutureDays
  // default is false
  disableFutureDays?: boolean;

  // showTimePicker
  // default is false
  showTimePicker?: boolean;

  onChange?: TDatePickerChangeHandler;
  onBlur?: TDatePickerBlurHandler;
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
}
