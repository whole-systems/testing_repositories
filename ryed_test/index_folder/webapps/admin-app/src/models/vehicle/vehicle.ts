export interface Vehicle {
  id: string;
  type: string;
  exclusivityLevel: string;
  numberOfSits: number;
  registeredNumber: string;
  mark: string;
  make: string;
  model: string;
  year: number;
  color: string;
  carPriceUSD: number;
  tripPricePerKm: number;
  tripPricePerMinute: number;
  tripMinPrice: number;
  dailyStaticPrice: number;
  dispatcherId: string;
  createdAt: string;
  updatedAt: string;

  galleryImages: null | Record<string, string>;
}

export enum VehicleType {
  SEDAN = 'SEDAN',
  DELUXE_SEDAN = 'DELUXE_SEDAN',
  FIRST_CLASS_SEDAN = 'FIRST_CLASS_SEDAN',
  FIRST_CLASS_SEDAN_PREMIUM = 'FIRST_CLASS_SEDAN_PREMIUM',
  SUV = 'SUV',
  DELUX_SUV = 'DELUX_SUV',
  DELUX_SUV_PREMIUM = 'DELUX_SUV_PREMIUM',
  VAN = 'VAN',
  VAN_PREMIUM = 'VAN_PREMIUM',
  MINIBUS = 'MINIBUS',
  MINIBUS_VIP = 'MINIBUS_VIP',
  BUS = 'BUS',
  ACCESSSABLE_VEHICLE = 'ACCESSSABLE_VEHICLE',
  TAXI = 'TAXI',
  SHUTTLE = 'SHUTTLE',
}

export const VEHICLE_TYPE_DISPLAY_NAMES: Record<VehicleType, string> = {
  [VehicleType.SEDAN]: 'SEDAN',
  [VehicleType.DELUXE_SEDAN]: 'DELUXE SEDAN',
  [VehicleType.FIRST_CLASS_SEDAN]: 'FIRST CLASS SEDAN',
  [VehicleType.FIRST_CLASS_SEDAN_PREMIUM]: 'FIRST CLASS SEDAN PREMIUM',
  [VehicleType.SUV]: 'SUV',
  [VehicleType.DELUX_SUV]: 'DELUXE SUV',
  [VehicleType.DELUX_SUV_PREMIUM]: 'DELUXE SUV PREMIUM',
  [VehicleType.VAN]: 'VAN',
  [VehicleType.VAN_PREMIUM]: 'VAN PREMIUM',
  [VehicleType.MINIBUS]: 'MINIBUS',
  [VehicleType.MINIBUS_VIP]: 'MINIBUS VIP',
  [VehicleType.BUS]: 'BUS',
  [VehicleType.ACCESSSABLE_VEHICLE]: 'ACCESSIBLE VEHICLE',
  [VehicleType.TAXI]: 'TAXI',
  [VehicleType.SHUTTLE]: 'SHUTTLE',
};

export function getVehicleTypeDisplayName(vehicleType: VehicleType | string): string {
  return VEHICLE_TYPE_DISPLAY_NAMES[vehicleType as VehicleType] ?? vehicleType;
}

export enum VehicleExclusivityLevel {
  LUXURY = 'LUXURY',
  SUPER_LUXURY = 'SUPER_LUXURY',
  ULTRA_LUXURY = 'ULTRA_LUXURY',
  STANDARD = 'STANDARD',
}

export interface CreateVehicleDTO {
  type: string;
  exclusivityLevel: string;
  numberOfSits: number;
  make: string;
  model: string;
  registeredNumber: string;
  year: number;
  color: string;
  carPriceUSD: number;
  tripPricePerKm: number;
  tripPricePerMinute: number;
  tripMinPrice: number;
}

export interface EditVehicleDTO {
  carPriceUSD: number;
  tripPricePerKm: number;
  tripPricePerMinute: number;
  tripMinPrice: number;
  numberOfSits: number;
  id: string;
}

export interface AddImageDTO {
  id: string;
  type: string;
  formData: FormData;
}
