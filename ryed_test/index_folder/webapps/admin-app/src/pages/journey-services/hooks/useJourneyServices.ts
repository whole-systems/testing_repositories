import { useLazyGetServicesQuery } from '@/api/journeyServicesEndpoints';
import { useGetSupportedCountriesQuery } from '@/api/regionsEndpoints';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useJourneyServices = () => {
  const navigate = useNavigate();

  const [activeCountryId, setActiveCountryIdState] = useState<
    string | undefined
  >(undefined);
  const [activeLanguage, setActiveLanguage] = useState<string | undefined>(
    undefined
  );

  const { data: supportedCountries } = useGetSupportedCountriesQuery();

  const [
    getServices,
    { data: journeyServicesData, isLoading: journeyServicesIsLoading },
  ] = useLazyGetServicesQuery();

  useEffect(() => {
    if (supportedCountries) {
      const params = new URLSearchParams(location.search);
      const urlCountryId = params.get('countryId');

      if (
        urlCountryId &&
        supportedCountries.some((c) => c.id === urlCountryId)
      ) {
        setActiveCountryIdState(urlCountryId);
      } else {
        const defaultId = supportedCountries.find(
          (c) => c.name === 'Israel'
        )?.id;
        if (defaultId) {
          setActiveCountryIdState(defaultId);
          const params = new URLSearchParams(location.search);
          params.set('countryId', defaultId);
          navigate(
            {
              pathname: location.pathname,
              search: params.toString(),
            },
            { replace: true }
          );
        }
      }
    }
  }, [location.search, supportedCountries]);

  useEffect(() => {
    const supportedCountry = supportedCountries?.find(
      (country) => country.id === activeCountryId
    );
    getServices({
      language: activeLanguage,
      supportedCountry: supportedCountry?.name,
    });
  }, [activeLanguage, activeCountryId, supportedCountries, getServices]);

  const setActiveCountryId = (countryId: string) => {
    setActiveCountryIdState(countryId);

    const params = new URLSearchParams(location.search);
    params.set('countryId', countryId);

    navigate(
      {
        pathname: location.pathname,
        search: params.toString(),
      },
      { replace: true }
    );
  };

  return {
    data: {
      journeyServicesData,
      journeyServicesIsLoading,
      activeCountryId,
      supportedCountries,
      activeLanguage,
    },
    handlers: { getServices, setActiveCountryId, setActiveLanguage },
  };
};
