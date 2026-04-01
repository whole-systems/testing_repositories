export interface TravelAgency {
  description: string;
  id: string;
  logoUrl: string;
  name: string;
  phoneNumber: string;
  status: string;
  supportEmail: string;
  supportedCountries: string[];
  dispatcherOrderrerExclusivity: {
    id: string;
    dispatcherId: string;
    piriodMinutes: number;
  };
  exclusivePeriod: string;
  isVatEnabled: boolean;
  defaultVat: number;
  supportsShuttles: boolean;
  isWebhookCreationEnabled: boolean;
  inviteLink?: string;
  commissionAmount: number;
  commissionType: 'PERCENTAGE' | 'FIXED';
  commissionIncludedInPrice: boolean;
  isDev: boolean;
}

export interface TravelAgenciesGet {
  currentPage: number;
  totalPages: number | null;
  travelAgencies: TravelAgency[];
}
