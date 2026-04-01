export interface TravelAgent {
  createdAt: string;
  email: string;
  fcmToken: string | null;
  firstName: string;
  id: string;
  lastName: string;
  phoneNumber: string;
  supportedCountries: string[];
  travelAgencyId: string;
  updatedAt: string;
  logo?: string | null;
  language?: string;
  status: string;
  commissionAmount: number
  commissionType: 'PERCENTAGE' | 'FIXED'
  commissionIncludedInPrice: boolean
  isDev: boolean
  role?: 'agent' | 'admin'
}

export interface UpdateTravelAgentBody {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  supportedCountries: string[];
  logo?: File | null;
  language?: string;
  role?: 'agent' | 'admin';
}
