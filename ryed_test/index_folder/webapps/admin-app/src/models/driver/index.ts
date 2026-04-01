import { Vehicle } from '../vehicle/vehicle';

export type TDriver = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  profileImageUrl: string | null;
  driverLicenseFrontUrl: string | null;
  driverLicenseBackUrl: string | null;
  phoneNumber: string;
  fcmToken: string | null;
  description: string | null;
  images: {
    fullImage?: string | null;
    faceImage?: string | null;
    profileImage?: string | null;
  };
  supportedRegions: string | null;
  location?: string;
  status: string;
  profile: string | null;
  metadata: string | null;
  dispatcherId: string;
  createdAt: Date;
  updatedAt: Date;
  vehicle: Vehicle;
  dispatcher: {
    id: string;
    companyName: string;
    email: string;
    description: string | null;
    images: string;
    phoneNumber: string | null;
    logoUrl: string | null;
  };
};

export type TCreateDriverDTO = {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export type TEditDriverDTO = {
  firstName: string;
  lastName: string;
  fullName: string;
  id: string;
};

export type FilterDrivers = {
  status?:
    | 'ONBOARDING_IN_PROGRESS'
    | 'ONBOARDING_PENDING_APPROVAL'
    | 'ONBOARDING_REJECTED'
    | 'ONBOARDING_REVISION'
    | 'BLOCKED'
    | 'ARCHIVED'
    | 'OFFLINE'
    | 'APP_ONBOARDING'
    | 'AVAILABLE'
    | 'IN_DRIVE'
    | 'ON_THE_WAY'
    | 'IN_SCHEDULE';
  dispatcherId?: string;
  page?: number;
  limit?: number;
  skip?: number;
};
