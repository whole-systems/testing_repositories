import { useMemo } from 'react';
import { ILocation } from '../../hooks/useLocationSelect';
import { getTimezoneForCountryName } from '../../utils/parseTime';

export interface IUseTimezoneParams {
  from?: ILocation | null;
  to?: ILocation | null;
}

export const useJourneyTimezone = ({ from, to }: IUseTimezoneParams) => {
  const departureCountry = useMemo(() => {
    if (to) {
      return to?.country;
    }
  }, [to]);

  const arrivalCountry = useMemo(() => {
    if (from) {
      return from?.country;
    }
  }, [from]);

  const arrivalTimezone = useMemo(() => {
    // Note: Timezone can be different for within he same country, should we handle this?
    return arrivalCountry
      ? getTimezoneForCountryName(arrivalCountry)
      : undefined;
  }, [arrivalCountry]);

  const departureTimezone = useMemo(() => {
    // Note: Timezone can be different for within he same country, should we handle this?

    return departureCountry
      ? getTimezoneForCountryName(departureCountry)
      : undefined;
  }, [departureCountry]);

  return { arrivalTimezone, departureTimezone };
};
