import { getAllCountries } from 'countries-and-timezones';

export const getTimezoneForCountryName = (countryName: string) => {
  const countryData = Object.values(getAllCountries()).find(
    (country) => country.name === countryName
  );
  if (!countryData) {
    return 'UTC';
  }
  const timezone = countryData.timezones[0];

  return timezone;
};

export const composeReadableTime = (date?: Date, country?: string) => {
  const timezone = getTimezoneForCountryName(country || 'Israel');

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    timeZone: timezone,
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: timezone,
  };

  const formattedDate = new Intl.DateTimeFormat('en-GB', dateOptions).format(
    date
  );
  const formattedTime = new Intl.DateTimeFormat('en-GB', timeOptions).format(
    date
  );

  return {
    normalizedDateWithTime: `${formattedDate} at ${formattedTime}`,
    formattedDate,
    formattedTime,
    tableDateTime: `${formattedDate} ${formattedTime}`,
  };
};
