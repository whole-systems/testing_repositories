import debounce from 'lodash/debounce';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { ILocation } from '@ryed-ui/hooks/useLocationSelect';
import { useRefValue } from '@ryed-ui/hooks/useRefValue';
import { toast } from 'sonner';
import { IAirports, ICountryRegistry } from '../types';
import { getGooglePredictionsFromInput as _getGooglePredictionsFromInput } from './utils/get-google-predictions-from-input';
import { googlePlaceToLocation } from './utils/google-place-to-location';

const getGooglePredictionsFromInput = debounce(
  _getGooglePredictionsFromInput,
  500
);

interface IUseGooglePlaceAutocompleteParams {
  value: string;

  // limits google search to specific country
  specificCountryCode?: string;

  config?: IAirports;
  countryRegistry: ICountryRegistry[];
  defaultCountry: ICountryRegistry;
  onChooseLocation: (location: ILocation | null) => void;
  crossCountry?: boolean;
  types?: string[];
}

export const useGooglePlaceAutocomplete = ({
  value,
  specificCountryCode,
  config,
  countryRegistry,
  defaultCountry,
  onChooseLocation,
  crossCountry = false,
  types = [],
}: IUseGooglePlaceAutocompleteParams) => {
  const autocompleteService = useMemo(
    () => new google.maps.places.AutocompleteService(),
    []
  );
  const googlePlacesService = useMemo(
    () => new google.maps.places.PlacesService(document.createElement('div')),
    []
  );

  const onChooseRef = useRefValue(onChooseLocation);

  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [lastSuccessfulSuggestions, setLastSuccessfulSuggestions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [textValue, setTextValue] = useState(value);
  const [supportedCountries, setSupportedCountries] = useState<string[]>(
    defaultCountry?.code ? [defaultCountry.code] : []
  );

  useEffect(() => {
    if (!value) {
      setTextValue('');
      setSuggestions(lastSuccessfulSuggestions);
    }
  }, [value, lastSuccessfulSuggestions]);

  // This is needed to resolve address for input value, e.g "ben gurion" -> "Ben Gurion Airport, Israel"
  useEffect(() => {
    _getGooglePredictionsFromInput(
      value,
      autocompleteService,
      countryRegistry
    ).then((predictions) => {
      if (value !== predictions[0]?.description) {
        setTextValue(predictions[0]?.description || '');

        getGooglePredictionsFromInput(
          value,
          autocompleteService,
          countryRegistry,
          types,
          {
            countries:
              !crossCountry && specificCountryCode
                ? [specificCountryCode]
                : supportedCountries,
            onLoadStart: () => setIsLoadingSuggestions(true),
            onLoadEnd: (predictions) => {
              setIsLoadingSuggestions(false);
              setSuggestions(predictions);
              if (predictions.length > 0) {
                setLastSuccessfulSuggestions(predictions);
              }
            },
          }
        );
      }
    });
  }, [
    value,
    autocompleteService,
    specificCountryCode,
    supportedCountries,
    countryRegistry,
    getGooglePredictionsFromInput,
    crossCountry,
  ]);

  useEffect(() => {
    if (config) {
      const filteredCodes = countryRegistry
        .filter((countryItem) =>
          config.availableCountries.includes(countryItem.name)
        )
        .map((countryItem) => countryItem.code);

      setSupportedCountries(filteredCodes);
    }
  }, [config, countryRegistry]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setTextValue(value);

      if (!value) {
        onChooseRef.current(null);
        setSuggestions(lastSuccessfulSuggestions);
        return;
      }

      if (value && autocompleteService && getGooglePredictionsFromInput) {
        getGooglePredictionsFromInput(
          value,
          autocompleteService,
          countryRegistry,
          types,
          {
            countries:
              !crossCountry && specificCountryCode
                ? [specificCountryCode]
                : supportedCountries,
            onLoadStart: () => setIsLoadingSuggestions(true),
            onLoadEnd: (predictions) => {
              setIsLoadingSuggestions(false);
              setSuggestions(predictions);
            },
          }
        );
      }
    },
    [
      autocompleteService,
      supportedCountries,
      specificCountryCode,
      countryRegistry,
      getGooglePredictionsFromInput,
      lastSuccessfulSuggestions,
      crossCountry,
    ]
  );

  const handleAutocompleteChange = useCallback(
    async (
      _: React.SyntheticEvent<Element, Event>,
      suggestion: google.maps.places.AutocompletePrediction | null | undefined
    ) => {
      if (suggestion) {
        try {
          const loc = await googlePlaceToLocation(
            suggestion,
            googlePlacesService,
            countryRegistry,
            defaultCountry
          );

          const isKingHussein =
            loc.locationName === 'King Hussein Bridge Border Crossing';
          const location: ILocation = {
            ...loc,
            country: isKingHussein ? 'Israel' : loc.country,
            locationNameLocalized:
              loc.locationNameLocalized || loc.locationName,
          };

          setTextValue(suggestion.description);
          onChooseRef.current(location);
        } catch (error) {
          console.log('Failed to get location from google place', error);
          toast.error('Failed to get location from google.');
        }
      } else {
        setTextValue('');
        onChooseRef.current(null);
      }
    },
    [onChooseRef, googlePlacesService, countryRegistry, defaultCountry]
  );

  return {
    suggestions,
    isLoadingSuggestions,
    textValue,
    handleInputChange,
    handleAutocompleteChange,
  };
};
