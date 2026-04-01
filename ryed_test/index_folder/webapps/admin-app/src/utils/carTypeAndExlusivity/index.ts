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
  {
    value: VehicleType.SEDAN,
    label: 'Sedan',
    icon: '../assets/car-types/sedan.png',
  },
  {
    value: VehicleType.DELUXE_SEDAN,
    label: 'Deluxe Sedan',
    icon: '../assets/car-types/premium-sedan.png',
  },
  {
    value: VehicleType.FIRST_CLASS_SEDAN,
    label: 'First Class Sedan',
    icon: '../assets/car-types/first-class-sedan.png',
  },
  {
    value: VehicleType.FIRST_CLASS_SEDAN_PREMIUM,
    label: 'First Class Sedan Premium',
    icon: '../assets/car-types/deluxe-premium-sedan.png',
  },
  {
    value: VehicleType.SUV,
    label: 'Suv',
    icon: '../assets/car-types/suv.png',
  },
  {
    value: VehicleType.DELUX_SUV,
    label: 'Delux Suv',
    icon: '../assets/car-types/suv-premium.png',
  },
  {
    value: VehicleType.DELUX_SUV_PREMIUM,
    label: 'Delux Suv Premium',
    icon: '../assets/car-types/deluxe-suv-premium.png',
  },
  {
    value: VehicleType.VAN,
    label: 'Van',
    icon: '../assets/car-types/van.png',
  },
  {
    value: VehicleType.VAN_PREMIUM,
    label: 'Van Premium',
    icon: '../assets/car-types/premium-van.png',
  },
  {
    value: VehicleType.MINIBUS,
    label: 'Minibus',
    icon: '../assets/car-types/mini-bus.png',
  },
  {
    value: VehicleType.MINIBUS_VIP,
    label: 'Minibus Vip',
    icon: '../assets/car-types/mini-bus-vip.png',
  },
  {
    value: VehicleType.BUS,
    label: 'Bus',
    icon: '../assets/car-types/bus.png',
  },
  {
    value: VehicleType.ACCESSSABLE_VEHICLE,
    label: 'Accesssable Vehicle',
    icon: '../assets/car-types/accessibility-car.png',
  },
  {
    value: VehicleType.TAXI,
    label: 'Taxi',
    icon: '../assets/car-types/taxi.png',
  },
  {
    value: VehicleType.SHUTTLE,
    label: 'Shuttle',
    icon: '../assets/car-types/mini-bus-vip.png',
  },
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
export const getExclusivity = (type: string) =>
  exclusivityLevelOptions.find((item) => item.value === type);
