import { ILocation } from '@ryed-ui/hooks/useLocationSelect';
import { ICountryRegistry } from '../../types';

function isKnownLocation(place: google.maps.places.AutocompletePrediction) {
  return (
    place?.types?.includes('point_of_interest') &&
    place?.types?.includes('establishment')
  );
}

export const googlePlaceToLocation = (
  place: google.maps.places.AutocompletePrediction,
  service: google.maps.places.PlacesService,
  countryRegistry: ICountryRegistry[],
  defaultCountry: ICountryRegistry
): Promise<ILocation> => {
  return new Promise((resolve, reject) => {
    service.getDetails(
      {
        placeId: place.place_id,
        fields: ['geometry', 'name', 'formatted_address', 'address_components'],
      },
      (placeDetails, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          placeDetails
        ) {
          const location = placeDetails.geometry?.location
            ? {
                latitude: placeDetails.geometry.location.lat(),
                longitude: placeDetails.geometry.location.lng(),
              }
            : { latitude: 0, longitude: 0 };

          const getAddressComponent = (type: string) =>
            placeDetails.address_components?.find((component) =>
              component.types.includes(type)
            )?.long_name;

          const streetNumber = getAddressComponent('street_number');
          const street = getAddressComponent('route');
          const country = getAddressComponent('country');
          const city = getAddressComponent('locality');
          const region = getAddressComponent('administrative_area_level_1');
          const placeName =
            isKnownLocation(place) && place?.structured_formatting?.main_text;

          const formattedAddress = [street, streetNumber, city, region]
            .filter(Boolean)
            .join(', ');

          const formattedAddressWithPlaceName =
            placeName && !formattedAddress.includes(placeName)
              ? `${formattedAddress} (${placeName})`
              : undefined;

          const dataLocation: ILocation = {
            longitude: location.longitude,
            latitude: location.latitude,
            locationName: placeDetails.name || '',
            locationNameLocalized: placeDetails.formatted_address || '',
            country:
              country ||
              countryRegistry.find(
                (countryItem) => countryItem.code === defaultCountry.code
              )!.name,
            ...(street ? { address: `${street} ${streetNumber}` } : {}),
            ...(city ? { city } : {}),
            ...(region ? { region } : {}),
            ...(street && city
              ? {
                  formattedAddress:
                    formattedAddressWithPlaceName || formattedAddress,
                }
              : {}),
            googlePlaceId: placeDetails.place_id,
            ...(placeName ? { placeName } : {}),
          };

          return resolve(dataLocation);
        }

        return reject(new Error('Failed to get place details'));
      }
    );
  });
};
