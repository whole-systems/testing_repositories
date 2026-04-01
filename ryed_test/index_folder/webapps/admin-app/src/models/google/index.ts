export interface GoogleLocation {
  longitude: number;
  latitude: number;
  locationName: string;
  locationNameLocalized: string;
  country: string;
  city?: string;
  address?: string;
  region?: string;
  formattedAddress?: string;
}

export interface OSMLocation {
  longitude: number;
  latitude: number;
  locationName: string;
  locationNameLocalized: string;
  country: string;
  city?: string;
  address?: string;
  region?: string;
  formattedAddress?: string;
  osmId?: string;
  osmType?: string;
  bufferedPolygon?: number[][];
}
