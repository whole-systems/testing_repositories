export enum CountryISO {
  FR = 'FR',
  US = 'US',
  IL = 'IL',
  CH = 'CH',
  CZ = 'CZ',
  IT = 'IT',
  GR = 'GR',
  EG = 'EG', // Egypt
  JO = 'JO', // Jordan
}
export enum CountryName {
  IL = 'Israel',
  FR = 'France',
  US = 'United States',
  CH = 'Switzerland',
  CZ = 'Czech Republic',
  IT = 'Italy',
  GR = 'Greece',
  EG = 'Egypt',
  JO = 'Jordan',
}
export const SUPPORTED_COUNTRIES = [
  CountryName.IL,
  CountryName.FR,
  CountryName.CH,
  CountryName.CZ,
  CountryName.IT,
  CountryName.GR,
  CountryName.EG,
  CountryName.JO,
] satisfies CountryName[];
