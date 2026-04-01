interface ComboboxOptions {
  value: string;
  label: string;
}
export const exclusivityLevelOptions: ComboboxOptions[] = [
  {
    value: 'luxury',
    label: 'Luxury',
  },
  {
    value: 'super_luxury',
    label: 'Super luxury',
  },
  {
    value: 'ultra_luxury',
    label: 'Ultra luxury',
  },
  {
    value: 'standard',
    label: 'Standard',
  },
];

export const typeOfVehicleOptions: ComboboxOptions[] = [
  { value: 'sedan', label: 'Sedan' },
  { value: 'deluxe_sedan', label: 'Deluxe Sedan' },
  { value: 'first_class_sedan', label: 'First Class Sedan' },
  { value: 'first_class_sedan_premium', label: 'First Class Sedan Premium' },
  { value: 'suv', label: 'Suv' },
  { value: 'delux_suv', label: 'Delux Suv' },
  { value: 'delux_suv_premium', label: 'Delux Suv Premium' },
  { value: 'van', label: 'Van' },
  { value: 'van_premium', label: 'Van Premium' },
  { value: 'minibus', label: 'Minibus' },
  { value: 'minibus_vip', label: 'Minibus Vip' },
  { value: 'bus', label: 'Bus' },
  { value: 'accesssable_vehicle', label: 'Accesssable Vehicle' },
  { value: 'taxi', label: 'Taxi' },
  { value: 'shuttle', label: 'Shuttle' },
];

export const years = [
  2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012,
  2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025
].map((item) => ({ label: item.toString(), value: item.toString() }));

export const inputs = [
  { name: 'color', placeholder: 'Color', type: 'text' },
  { name: 'numberOfSits', placeholder: 'Number of sits', type: 'number' },
  { name: 'registeredNumber', placeholder: 'Registered number', type: 'text' },
  { name: 'carPriceUSD', placeholder: 'Car price USD', type: 'text' },
  { name: 'tripPricePerKm', placeholder: 'Trip price per Km', type: 'text' },
  {
    name: 'tripPricePerMinute',
    placeholder: 'Trip Price per minute',
    type: 'text',
  },
  { name: 'tripMinPrice', placeholder: 'Trip min price', type: 'text' },
];

export const comboboxes = [
  {
    name: 'exclusivityLevel',
    options: exclusivityLevelOptions,
    placeholder: 'Exclusivity level',
  },
  {
    name: 'type',
    options: typeOfVehicleOptions,
    placeholder: 'Type',
  },
  {
    name: 'year',
    options: years,
    placeholder: 'Years',
  },
  {
    name: 'make',
    options: [],
    placeholder: 'Make',
  },
  {
    name: 'model',
    options: [],
    placeholder: 'Model',
  },
];

// export enum VehicleExclusivityLevel {
//   LUXURY = 'LUXURY',
//   SUPER_LUXURY = 'SUPER_LUXURY',
//   ULTRA_LUXURY = 'ULTRA_LUXURY',
//   STANDARD = 'STANDARD',
// }
