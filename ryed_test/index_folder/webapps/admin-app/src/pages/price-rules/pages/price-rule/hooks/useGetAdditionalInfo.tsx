import { useGetDispatcherByIdQuery } from '@/api/dispatchersEndpoints';
import {
  useGetRegionQuery,
  useGetSupportedCountriesQuery,
} from '@/api/regionsEndpoints';
import { useGetTravelAgencyQuery } from '@/api/travelAgenciesEndpoints';
import { ERuleType, PriceRule } from '@/models/price-rules';

export const useGetAdditionalInfo = (data: PriceRule | PriceRule[] | undefined) => {
  data = Array.isArray(data) ? data[0] : data;

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

  const { data: getSupportedCountries } = useGetSupportedCountriesQuery(
    undefined,
    {
      skip:
        !data ||
        !data?.ruleLogic.find(
          (rule) => rule.type === ERuleType.FROM_SOURCE_COUNTRY
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

  const { data: toSupportedRegion } = useGetRegionQuery(
    {
      id:
        (data?.ruleLogic.find((rule) => rule.type === ERuleType.BETWEEN_REGION)
          ?.toSupportedRegionId as string) || '',
    },

    {
      skip:
        !data ||
        !data?.ruleLogic.find((rule) => rule.type === ERuleType.BETWEEN_REGION),
    }
  );

  return {
    additionalInfo: {
      ...(travelAgency && { travelAgency }),
      ...(dispatcher && { dispatcher }),
      ...(getSupportedCountries && {
        supportedCountry: getSupportedCountries.find(
          (country) =>
            country.id ===
            data?.ruleLogic.find(
              (rule) => rule.type === ERuleType.FROM_SOURCE_COUNTRY
            )?.fromSupportedCountryId
        ),
      }),
      ...(fromSupportedRegion && {
        fromSupportedRegion: fromSupportedRegion[0],
      }),
      ...(toSupportedRegion && { toSupportedRegion: toSupportedRegion[0] }),
    },
  };
};
