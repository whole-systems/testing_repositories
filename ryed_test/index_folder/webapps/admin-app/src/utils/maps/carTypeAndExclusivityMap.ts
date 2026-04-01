import { VehicleExclusivityLevel, VehicleType } from '@/models/vehicle/vehicle';

export const exclusivityLevelOptions = [
  {
    value: VehicleExclusivityLevel.LUXURY,
    label: 'Luxury',
  },
  {
    value: VehicleExclusivityLevel.SUPER_LUXURY,
    label: 'Super luxury',
  },
  {
    value: VehicleExclusivityLevel.ULTRA_LUXURY,
    label: 'Ultra luxury',
  },
  {
    value: VehicleExclusivityLevel.STANDARD,
    label: 'Standard',
  },
];

export const typeOfVehicleOptions = [
  { value: VehicleType.SEDAN, label: 'Sedan' },
  { value: VehicleType.DELUXE_SEDAN, label: 'Deluxe Sedan' },
  { value: VehicleType.FIRST_CLASS_SEDAN, label: 'First Class Sedan' },
  {
    value: VehicleType.FIRST_CLASS_SEDAN_PREMIUM,
    label: 'First Class Sedan Premium',
  },
  { value: VehicleType.SUV, label: 'Suv' },
  { value: VehicleType.DELUX_SUV, label: 'Delux Suv' },
  { value: VehicleType.DELUX_SUV_PREMIUM, label: 'Delux Suv Premium' },
  { value: VehicleType.VAN, label: 'Van' },
  { value: VehicleType.VAN_PREMIUM, label: 'Van Premium' },
  { value: VehicleType.MINIBUS, label: 'Minibus' },
  { value: VehicleType.MINIBUS_VIP, label: 'Minibus Vip' },
  { value: VehicleType.BUS, label: 'Bus' },
  { value: VehicleType.ACCESSSABLE_VEHICLE, label: 'Accesssable Vehicle' },
  { value: VehicleType.TAXI, label: 'Taxi' },
  { value: VehicleType.SHUTTLE, label: 'Shuttle' },
];

export const getCarOrExcluasivityTypes = (
  data: string[],
  isCarType: boolean
) => {
  const dataForMap = isCarType ? typeOfVehicleOptions : exclusivityLevelOptions;
  return dataForMap
    .map((type) => {
      if (data.includes(type.value)) {
        return type.label;
      }
    })
    .filter((item) => item !== undefined)
    .join(', ');
};

export const getCarType = (type: string) =>
  typeOfVehicleOptions.find((item) => item.value === type);

export const getCarExclusivity = (level: string) =>
  exclusivityLevelOptions.find((item) => item.value === level);
