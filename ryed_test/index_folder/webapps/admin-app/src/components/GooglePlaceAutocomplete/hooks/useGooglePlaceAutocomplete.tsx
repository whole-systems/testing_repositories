import { GoogleLocation } from '@/models/google';
import { useRef, useState, useEffect } from 'react';

// const COUNTRY_REGISTRY = [
//   {
//     code: 'IL',
//     name: 'Israel',
//   },
// ] as const;

// const DEFAULT_COUNTRY = COUNTRY_REGISTRY[0];

export const useGooglePlaceAutocomplete = (
  onChooseLocation: (location: GoogleLocation) => void
) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);

  useEffect(() => {
    if (window.google && window.google.maps) {
      autocompleteService.current =
        new google.maps.places.AutocompleteService();
      placesService.current = new google.maps.places.PlacesService(
        document.createElement('div')
      );
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (value && autocompleteService.current) {
      autocompleteService.current.getPlacePredictions(
        {
          input: value,
          // componentRestrictions: { country: DEFAULT_COUNTRY.code },
        },
        (predictions, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setSuggestions(predictions);
          } else {
            setSuggestions([]);
          }
        }
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (
    suggestion: google.maps.places.AutocompletePrediction
  ) => {
    setInputValue(suggestion.description);
    setSuggestions([]);

    if (placesService.current) {
      placesService.current.getDetails(
        {
          placeId: suggestion.place_id,
          fields: [
            'geometry',
            'name',
            'formatted_address',
            'address_components',
          ],
        },
        (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place) {
            const location = place.geometry?.location
              ? {
                  latitude: place.geometry.location.lat(),
                  longitude: place.geometry.location.lng(),
                }
              : { latitude: 0, longitude: 0 };

            const getAddressComponent = (type: string) =>
              place.address_components?.find((component) =>
                component.types.includes(type)
              )?.long_name;

            const streetNumber = getAddressComponent('street_number');
            const street = getAddressComponent('route');
            const country = getAddressComponent('country');
            const city = getAddressComponent('locality');
            const region = getAddressComponent('administrative_area_level_1');

            const dataLocation: GoogleLocation = {
              longitude: location.longitude,
              latitude: location.latitude,
              locationName: place.name || '',
              locationNameLocalized: place.formatted_address || '',
              country: country || '',
              // COUNTRY_REGISTRY.find(
              //   (country) => country.code === DEFAULT_COUNTRY.code
              // )!.name
              ...(street ? { address: `${street} ${streetNumber}` } : {}),
              ...(city ? { city } : {}),
              ...(region ? { region } : {}),
              ...(street && city
                ? {
                    formattedAddress: [street, streetNumber, city, region]
                      .filter(Boolean)
                      .join(', '),
                  }
                : {}),
            };

            onChooseLocation(dataLocation);
          }
        }
      );
    }
  };

  return {
    data: { inputValue, suggestions },
    handlers: {
      handleInputChange,
      handleSuggestionClick,
      setSuggestions,
      setInputValue,
    },
  };
};
