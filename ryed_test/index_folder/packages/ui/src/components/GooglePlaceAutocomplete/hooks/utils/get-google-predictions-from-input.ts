import { ICountryRegistry } from '../../types';

interface GetGooglePredictionsFromInputConfig {
  countries: string[];
  onLoadStart?: () => void;
  onLoadEnd?: (
    predictions: google.maps.places.AutocompletePrediction[]
  ) => void;
}

export const getGooglePredictionsFromInput = (
  input: string,
  service: google.maps.places.AutocompleteService,
  countryRegistry: ICountryRegistry[],
  types?: string[],
  config?: GetGooglePredictionsFromInputConfig,
): Promise<google.maps.places.AutocompletePrediction[]> => {
  config = config ?? {
    countries: countryRegistry.map((country) => country.code),
  };

  return new Promise((resolve) => {
    config?.onLoadStart?.();

    service.getPlacePredictions(
      {
        input,
        types: types?.length ? types : undefined,
      ...(config?.countries ? {componentRestrictions: {
          country: config.countries,
        }} : {}),
      },
      (predictions, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          predictions
        ) {
          resolve(predictions);

          config?.onLoadEnd?.(predictions);
        } else {
          console.log('No predictions found.');
          resolve([]);

          config?.onLoadEnd?.([]);
        }
      }
    );
  });
};
