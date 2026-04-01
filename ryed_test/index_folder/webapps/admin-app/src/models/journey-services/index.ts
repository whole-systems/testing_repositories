export interface Service {
  id: string;
  name: string;
  type: string;
  active: boolean;
  maxItems: number;
  priceInUsd: number;
  currency: string;
  price: number;
  dispatcherId?: string | null;
  supportedCountryId?: string | null;
  translations: Translations;
  createdAt: string;
  updatedAt: string;
  label: string;
  isFrontFacing: boolean;
}

export interface Translations {
  [key: string]: string;
}
