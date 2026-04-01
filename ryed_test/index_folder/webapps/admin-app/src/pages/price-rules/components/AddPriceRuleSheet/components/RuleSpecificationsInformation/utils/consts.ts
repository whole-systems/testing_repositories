import { v4 as uuidv4 } from 'uuid';
import { InitialRuleSpecificationsInformationValues } from './models';
import { ERuleType } from '@/models/price-rules';
import { VehicleType } from '@/models/vehicle/vehicle';

export const typeOfRule = [
  { label: 'Static', value: ERuleType.STATIC },
  { label: 'Hours of Days', value: ERuleType.HOURS_OF_DAYS },
  { label: 'Day of Week', value: ERuleType.DAY_OF_WEEK },
  // { label: 'Periodic', value: ERuleType.PERIODIC },
  {
    label: 'Between Region to Region',
    value: ERuleType.BETWEEN_REGION,
  },
  { label: 'From Source Country', value: ERuleType.FROM_SOURCE_COUNTRY },
  { label: 'Vehicle Type', value: ERuleType.VEHICLE_TYPE },
  { label: 'Number of Passengers', value: ERuleType.NUMBER_OF_PASSENGERS },
];

export const daysOfWeek = [
  { label: 'Monday', value: 'monday' },
  { label: 'Tuesday', value: 'tuesday' },
  { label: 'Wednesday', value: 'wednesday' },
  { label: 'Thursday', value: 'thursday' },
  { label: 'Friday', value: 'friday' },
  { label: 'Saturday', value: 'saturday' },
  { label: 'Sunday', value: 'sunday' },
];

export const initialValues: InitialRuleSpecificationsInformationValues[] = [
  {
    ruleType: ERuleType.STATIC,
    daysOfWeek: undefined,
    hoursOfDays: undefined,
    country: undefined,
    regions: undefined,
    vehicleType: undefined,
    id: uuidv4(),
  },
];

export const vehiclesData = [
  {
    value: VehicleType.SEDAN,
    label: 'Sedan',
  },
  {
    value: VehicleType.DELUXE_SEDAN,
    label: 'Deluxe Sedan',
  },
  {
    value: VehicleType.FIRST_CLASS_SEDAN,
    label: 'First Class Sedan',
  },
  {
    value: VehicleType.SUV,
    label: 'SUV',
  },
  {
    value: VehicleType.DELUX_SUV_PREMIUM,
    label: 'Deluxe SUV Premium',
  },
  {
    value: VehicleType.VAN,
    label: 'Van',
  },
  {
    value: VehicleType.VAN_PREMIUM,
    label: 'Van Premium',
  },
  {
    value: VehicleType.MINIBUS,
    label: 'Minibus',
  },
  {
    value: VehicleType.MINIBUS_VIP,
    label: 'Minibus VIP',
  },
  {
    value: VehicleType.ACCESSSABLE_VEHICLE,
    label: 'Accessibility Vehicle',
  },
  {
    value: VehicleType.SHUTTLE,
    label: 'Shuttle',
  },
];
