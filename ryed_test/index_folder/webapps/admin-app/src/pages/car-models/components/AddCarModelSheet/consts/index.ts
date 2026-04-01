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
];

export const years = Array.from(
  { length: new Date().getFullYear() + 2 - 2010 },
  (_, i) => i + 2010
).map((item) => ({ label: item.toString(), value: item.toString() }));

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
  // {
  //   name: 'exclusivityLevel',
  //   options: exclusivityLevelOptions,
  //   placeholder: 'Exclusivity level',
  // },
  // {
  //   name: 'type',
  //   options: typeOfVehicleOptions,
  //   placeholder: 'Type',
  // },
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
  // {
  //   name: 'model',
  //   options: [],
  //   placeholder: 'Model',
  // },
];
