export interface ILocation {
  longitude: number;
  latitude: number;
  locationName: string;
  locationNameLocalized: string;
  country: string;
  city?: string;
  address?: string;
  region?: string;
  formattedAddress?: string;
  googlePlaceId?: string
  placeName?: string
}
