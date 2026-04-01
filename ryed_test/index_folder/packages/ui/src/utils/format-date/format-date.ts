import dayjs, { Dayjs } from 'dayjs';
import timezonePlugin from 'dayjs/plugin/timezone';
import utcPlugin from 'dayjs/plugin/utc';

dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);

export interface IFormatDateParams {
  timezone?: string;
  format?: string;
  useExistingTimezone?: boolean;
}

// Formats date to a string based on the params
// If timezone is provided and useExistingTimezone is false, it will be used to format the date
// If useExistingTimezone is true, it will use the existing timezone of the date
// Otherwise, it will use the local timezone

const DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm';

export const formatDate = (
  date: Date | Dayjs | string | number,
  params: IFormatDateParams = {}
) => {
  const {
    timezone,
    useExistingTimezone = false,
    format = DEFAULT_FORMAT,
  } = params;

  if (useExistingTimezone) {
    return dayjs.utc(date).format(format);
  }

  if (timezone) {
    return dayjs.utc(date).tz(timezone).format(format);
  }

  return dayjs(date).format(format);
};
