import { useGetTravelAgencyQuery } from '@/api/travelAgenciesEndpoints';
import { useGetDispatcherByIdQuery } from '@/api/dispatchersEndpoints';
import { ERuleType, PriceRule } from '@/models/price-rules';
import {
  useGetAllRegionsQuery,
  useGetSupportedCountriesQuery,
  useGetRegionQuery,
} from '@/api/regionsEndpoints';
import { useMemo } from 'react';

export const useGetAdditionalInfo = (data: PriceRule | undefined) => {
  const { data: travelAgency } = useGetTravelAgencyQuery(
    data?.travelAgencyId as string,
    {
      skip: !data || !data?.travelAgencyId,
    }
  );
  const { data: dispatcher } = useGetDispatcherByIdQuery(
    data?.dispatcherId as string,
    {
      skip: !data || !data?.dispatcherId,
    }
  );
  const { data: supportedCountries } = useGetSupportedCountriesQuery(
    undefined,
    {
      skip:
        !data ||
        !data?.ruleLogic.find(
          (rule) =>
            rule.type === ERuleType.FROM_SOURCE_COUNTRY ||
            rule.type === ERuleType.BETWEEN_REGION
        ),
    }
  );
  const { data: fromSupportedRegion } = useGetRegionQuery(
    {
      id:
        (data?.ruleLogic.find((rule) => rule.type === ERuleType.BETWEEN_REGION)
          ?.fromSupportedRegionId as string) || '',
    },
    {
      skip:
        !data ||
        !data?.ruleLogic.find((rule) => rule.type === ERuleType.BETWEEN_REGION),
    }
  );
  const { data: supportedRegions } = useGetAllRegionsQuery(
    { countryCode: fromSupportedRegion?.[0]?.countryCode || '' },
    {
      skip:
        !data || !fromSupportedRegion || !fromSupportedRegion[0].countryCode,
    }
  );

  return useMemo(
    () => ({
      travelAgency,
      dispatcher,
      supportedCountries,
      supportedRegions,
    }),
    [travelAgency, dispatcher, supportedCountries, supportedRegions]
  );
};
