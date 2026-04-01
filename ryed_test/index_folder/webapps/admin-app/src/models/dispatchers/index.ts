interface Location {
  lat: number;
  lng: number;
}

export interface Dispatcher {
  id: string;
  companyName: string;
  email: string;
  description: string | null;
  images: string[];
  logoUrl: string;
  status: 'ACTIVE' | 'BLOCKED';
  fcmToken: string | null;
  phoneNumber: string | null;
  location: Location;
  metadata: Metadata | null;
  features?: {
    isMultiDriverApproval: boolean;
  } | null;
  createdAt: string;
  updatedAt: string;
  supportedCountries: string[];
  defaultVat: number;
  commissionAmount: number;
  commissionType: 'PERCENTAGE' | 'FIXED';
  commissionIncludedInPrice: boolean;
  isDev: boolean;
}

interface Metadata {
  address: string;
}
