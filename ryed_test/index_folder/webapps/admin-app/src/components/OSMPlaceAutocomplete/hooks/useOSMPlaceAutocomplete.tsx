import { OSMLocation } from '@/models/google';
import { useRef, useState } from 'react';
import axios from 'axios';

interface NominatimResult {
  place_id: number;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  address: {
    road?: string;
    house_number?: string;
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    country?: string;
    country_code?: string;
  };
  importance: number;
  geojson?: {
    type: string;
    coordinates: number[][][];
  };
}

export type OSMFeatureType = 'city' | 'district' | 'airport';

// Types that match cities
const CITY_TYPES = ['city', 'town', 'village', 'municipality'];
// Types that match districts/administrative areas
const DISTRICT_TYPES = [
  'suburb',
  'neighbourhood',
  'district',
  'borough',
  'quarter',
  'administrative',
  'county',
  'state_district',
];
// Types that match airports
const AIRPORT_TYPES = ['aerodrome', 'airport'];

const filterByFeatureTypes = (
  results: NominatimResult[],
  featureTypes?: OSMFeatureType[]
): NominatimResult[] => {
  if (!featureTypes || featureTypes.length === 0) {
    return results;
  }

  return results.filter((result) => {
    const resultType = result.type.toLowerCase();
    const resultClass = result.class.toLowerCase();

    for (const featureType of featureTypes) {
      if (featureType === 'city' && CITY_TYPES.includes(resultType)) {
        return true;
      }
      if (featureType === 'district' && DISTRICT_TYPES.includes(resultType)) {
        return true;
      }
      if (
        featureType === 'airport' &&
        (AIRPORT_TYPES.includes(resultType) || resultClass === 'aeroway')
      ) {
        return true;
      }
    }
    return false;
  });
};

export const useOSMPlaceAutocomplete = (
  onChooseLocation: (location: OSMLocation) => void,
  countryCode?: string,
  featureTypes?: OSMFeatureType[]
) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (!value) {
      setSuggestions([]);
      return;
    }

    debounceTimeout.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        // Fetch more results when filtering to ensure we get enough matches
        const limit = featureTypes && featureTypes.length > 0 ? 30 : 10;
        const response = await axios.get<NominatimResult[]>(
          'https://nominatim.openstreetmap.org/search',
          {
            params: {
              q: value,
              format: 'json',
              addressdetails: 1,
              polygon_geojson: 1,
              limit,
              ...(countryCode ? { countrycodes: countryCode.toLowerCase() } : {}),
            },
            headers: {
              'User-Agent': 'RyedSystemAdminApp/1.0',
            },
          }
        );
        // Filter by feature types
        let filtered = filterByFeatureTypes(response.data, featureTypes);
        // Filter to only include places with polygon boundaries
        filtered = filtered.filter(
          (result) =>
            result.geojson &&
            (result.geojson.type === 'Polygon' ||
              result.geojson.type === 'MultiPolygon')
        );

        // If no results found, try searching with "Municipality of " prefix
        if (filtered.length === 0) {
          const municipalityResponse = await axios.get<NominatimResult[]>(
            'https://nominatim.openstreetmap.org/search',
            {
              params: {
                q: `Municipality of ${value}`,
                format: 'json',
                addressdetails: 1,
                polygon_geojson: 1,
                limit,
                ...(countryCode ? { countrycodes: countryCode.toLowerCase() } : {}),
              },
              headers: {
                'User-Agent': 'RyedSystemAdminApp/1.0',
              },
            }
          );
          filtered = filterByFeatureTypes(municipalityResponse.data, featureTypes);
          filtered = filtered.filter(
            (result) =>
              result.geojson &&
              (result.geojson.type === 'Polygon' ||
                result.geojson.type === 'MultiPolygon')
          );
        }

        // Limit to 5 results after filtering
        setSuggestions(filtered.slice(0, 5));
      } catch (error) {
        console.error('Error fetching OSM suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  const handleSuggestionClick = (suggestion: NominatimResult) => {
    setInputValue(suggestion.display_name);
    setSuggestions([]);

    const city =
      suggestion.address.city ||
      suggestion.address.town ||
      suggestion.address.village;
    const street = suggestion.address.road;
    const streetNumber = suggestion.address.house_number;
    const country = suggestion.address.country;
    const region = suggestion.address.state;

    const osmLocation: OSMLocation = {
      longitude: parseFloat(suggestion.lon),
      latitude: parseFloat(suggestion.lat),
      locationName: suggestion.display_name.split(',')[0] || '',
      locationNameLocalized: suggestion.display_name,
      country: country || '',
      bufferedPolygon: suggestion.geojson?.coordinates[0],
      osmId: suggestion.osm_id.toString(),
      osmType: suggestion.osm_type,
      ...(street ? { address: `${street} ${streetNumber || ''}`.trim() } : {}),
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

    onChooseLocation(osmLocation);
  };

  return {
    data: { inputValue, suggestions, isLoading },
    handlers: {
      handleInputChange,
      handleSuggestionClick,
      setSuggestions,
      setInputValue,
    },
  };
};

