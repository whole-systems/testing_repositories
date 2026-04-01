import { VehicleType } from '../vehicle/vehicle';

export interface SupportedCountry {
  id: string;
  centerLocation: [number, number];
  countryCode: string;
  name: string;
  regions: null;
  tripPricePerKm: number;
  tripPricePerMinute: number;
  tripMinPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AllSupportedRegionsDTO {
  countryCode: string;
  supportedCountryId?: string;
  vehicleType?: string;
  name?: string;
}

export interface RegionDTO {
  name: string;
  polygonLines: Array<number[]>;
  polygonLinesColors: PolygonLinesColors;
}

export interface PolygonLinesColors {
  stroke: string;
  fill: string;
  'fill-opacity': number;
  'stroke-width': number;
}

export interface Country {
  id: string;
  countryCode: string;
  name: string;
  regions: null;
  tripPricePerKm: number;
  tripPricePerMinute: number;
  tripMinPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegionPricing {
  id: string;
  dispatcherId: null;
  fromSupportedRegionId: string;
  toSupportedRegionId: string;
  priceLocal: number;
  currency: string;
  vehicleType: null;
  createdAt: Date;
  updatedAt: Date;
  isRyedDefault: boolean;
  fromSupportedRegion: Region;
  ToSupportedRegion: Region;
}

export interface Region {
  id: string;
  name: string;
  countryCode: string;
  supportedCountryId: string;
  polygonLines: Array<number[]>;
  polygonLinesColors: PolygonLinesColors;
  createdAt: Date;
  updatedAt: Date;
  supportedCountry?: SupportedCountry;
  fromSupportedRegionsPricing?: RegionPricing[];
}

export interface RegionPriceData {
  fromRegion: Region;
  toRegion: Region;
  existingPricings: ExistingPricing[];
}

export interface ExistingPricing {
  id: string;
  priceLocal: number;
  vehicleType: VehicleType;
}

export interface regionPricingDTO {
  fromSupportedRegionId: string;
  toSupportedRegionId: string;
  priceLocal: number;
  currency: string;
  vehicleType: VehicleType;
  dispatcherId?: string;
  isRyedDefault?: boolean;
}

export interface SupportedCountryPricing {
  id: string;
  supportedCountryId: string;
  vehicleType: VehicleType;
  dispatcherId?: string;
  tripPricePerKm: number;
  tripPricePerMinute: number;
  tripBasePrice: number;
  tripMinPrice?: number;
  tripHalfDayPrice: number;
  tripFullDayPrice: number;
  currency?: string;
  createdAt: string;
  updatedAt: string;
  isRyedDefault?: boolean;
}
export interface SupportedCountryPricingDTO {
  supportedCountryId: string;
  tripPricePerKm: number;
  tripPricePerMinute: number;
  tripBasePrice: number;
  tripHalfDayPrice: number;
  tripFullDayPrice: number;
  vehicleType: VehicleType;
  dispatcherId?: string;
  isRyedDefault?: boolean;
}
