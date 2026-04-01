export interface AuthResponse {
  accessToken: string;
  user: User;
  supportedCountry: string[];
  supportedRegions: string[];
  iat: string;
  role: string;
  iss: string;
  aud: string;
}

export interface AdminDTO {
  fcmToken?: string;
  id: string;
}

export interface User {
  id: string;
  logoUrl: string;
  companyName: string;
  email: string;
  description: string;
  fcmToken: string;
  image?: string;
  status: string;
  phoneNumber: string;
  metadata: string;
  createdAt: string;
  updatedAt: string;
}
