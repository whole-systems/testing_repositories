export type TJourney = {
  id: string;
  readableId: string;
  userId: string;
  currency: string;
  vehicleDriverId: string | null;
  vehicleId: string | null;
  dispatcherId: string | null;
  driverAcceptedAt: string | null;
  serviceSpotId: string | null;
  conciergeId: string | null;
  userManagerId: string | null;
  travelAgencyId: string | null;
  travelAgencyAgentId: string | null;
  status: string;
  sortStatus: number;
  fromLatLang: FromLatLang;
  toLatLang: FromLatLang;
  fromAddress: string;
  toAddress: string;
  fromAddressLocalized: string;
  toAddressLocalized: string;
  tripPriceUSD: number | null;
  tripPrice: number | null;
  tripDistance: number | null;
  tripDuration: number | null;
  tipUSD: number | null;
  tip: number | null;
  isUserEditable?: boolean;
  metadata: Metadata;
  events: Event[];
  createdAt: string;
  updatedAt: string;
  user?: User;
  userManager?: UserManager | null;
  travelAgency?: TravelAgency | null;
  travelAgencyAgent?: TravelAgent | null;
  scheduledJourney: ScheduledJourney | null;
  vehicle?: Vehicle;
  vehicleDriver?: VehicleDriver;
  unavailabilitySchedule?: UnavailabilitySchedule;
  pricingSegments?: PricingCalculationResult;
  journeyPayment?: PaymentDetails;
  journeyDriverAcceptances: {
    vehicleDriver: VehicleDriver;
    isAccepted: boolean | null;
  }[];
};

export type PricingCalculationResult = {
  totalSumUSD: number;
  totalSum: number;
  currency: string;
  effectedRulePricing?: {
    id: string;
    name: string;
    effectingPrice: { type: unknown; value: number };
    price: number;
    currency: string;
  }[];
  additionalServicesPricing?: {
    name: string;
    quantity: number;
    priceForEach: number;
    totalPrice: number;
    currency: string;
  }[];
  journeyPricing?: {
    price: number;
    currency: string;
  };
  dispatcherDynamicPricing?: {
    price: number;
    currency: string;
  };
};
interface Event {
  status: string;
  label?: string;
  timestamp: string;
}
interface Metadata {
  message: string;
  requestedCarType: string[];
  additionalServices: { name: string; quantity: number; id?: string }[];
  scheduledPickupTime: string;
  requestedExclusivity: string[];
  passengerCount: number;
  orderrerInformation: OrdererInformation;
  routeDetails: RouteDetails;
  userInformation?: {
    email: string;
    lastName: string;
    firstName: string;
    phoneNumber: string;
  };
  route: {
    arrivalTime: Date;

    departureTime: Date;
    distanceBetweenSpotsKm: number;
    durationTrafficInMinutes: number;
    durationTrafficText: string;
    flightDistanceKm: number;
    fullDrivePathKm: number;
    route: {
      fromAddress: string;
      toAddress: string;
      fromLocation: {
        lat: number;
        lng: number;
      };
      toDestination: {
        lat: number;
        lng: number;
      };
    };
  };
  journeyMetrics?: {
    totalTime: number;
    journeyTime: number;
    waitingTime: number;
    rideToJourney: number;
    totalTimeFormatted: string;
    journeyTotalRouteKm: number;
    journeyTimeFormatted: string;
    waitingTimeFormatted: string;
    rideToJourneyFormatted: string;
  };
  avoidNotifyUser: boolean;
}
export interface RouteDetails {
  polyline: string;
  stops: AdditionalStopPoint[];
}
export type OrdererInformation = {
  displayInfo: {
    type: 'manager' | 'concierge' | 'agent' | 'dispatcher' | 'user' | 'api';
    name: string;
    phoneNumber: string;
    companyName: string;
    logoUrl: string;
  };
  id: string;
};
interface FromLatLang {
  country: string;
  latitude: number;
  longitude: number;
  locationName: string;
  locationNameLocalized: string;
}

export type FilterJournyes = {
  page: number;
  limit: number;
  driverId?: string;
  status?: string;
  createdAtTo?: number;
  createdAtFrom?: number;
  pickupTimeFrom?: number;
  pickupTimeTo?: number;
  finishedTimeFrom?: number;
  finishedTimeTo?: number;
  vehicleDriverId?: string;
  vehicleId?: string;
  userId?: string;
  orderBy?: string;
  travelAgencyIds?: string;
  dispatcherIds?: string;
  withDev?: boolean;
  readableId?: string;
  withPayment?: string;
};

export type TJourneysData = {
  journeys: TJourney[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
};

export type TravelAgent = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  logoUrl: string;
  travelAgency: TravelAgency;
};

export type TravelAgency = {
  id: string;
  phoneNumber: string;
  supportEmail: string;
  logoUrl: string;
  name: string;
  status: string;
  supportedCountries: string[];
  language: string;
  description: string;
  crossCountryEnabled: boolean;
  isWebhookCreationEnabled: boolean;
};

export type UserManager = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  logoUrl: string;
  organizationName: string;
};

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profilePictureURL: string;
  location: string;
  email: string;
}

export interface ScheduledJourney {
  id: string;
  journeyId: string;
  flightNumber: number | null;
  flightArrivalTime: string | null;
  flightDepartureTime: string | null;
  airportId: string | null;
  otaId: string | null;
  managerId: string | null;
  pickupTime: string;
  departureTime: string | null;
  createdAt: string;
  updatedAt: string;
  fullFlightInformation: IFlightDetails | null;
}
export interface IFlightDetails {
  flight_date: string;
  flight_status: string;
  departure: {
    airport: string;
    timezone: string;
    iata: string;
    icao: string;
    terminal: string | null;
    gate: string | null;
    delay: number | null;
    scheduled: string;
    estimated: string;
    actual: string | null;
    estimated_runway: string | null;
    actual_runway: string | null;
  };
  arrival: {
    airport: string;
    timezone: string;
    iata: string;
    icao: string;
    terminal: string | null;
    gate: string | null;
    baggage: string | null;
    delay: number | null;
    scheduled: string;
    estimated: string;
    actual: string | null;
    estimated_runway: string | null;
    actual_runway: string | null;
  };
  airline: {
    name: string;
    iata: string;
    icao: string;
  };
  flight: {
    number: string;
    iata: string;
    icao: string;
    codeshared: unknown | null;
  };
  aircraft: unknown | null;
  live: unknown | null;
  isMonitoring: boolean;
}
export enum ETripStatus {
  PENDING = 'PENDING',
  SEARCHING_FOR_DRIVER = 'SEARCHING_FOR_DRIVER',
  DRIVER_ON_THE_WAY = 'DRIVER_ON_THE_WAY',
  DRIVER_AT_PICKUP_SPOT = 'DRIVER_AT_PICKUP_SPOT',
  IN_PROGRESS = 'IN_PROGRESS',
  PENDING_SCHEDULED_JOURNEY = 'PENDING_SCHEDULED_JOURNEY',
  FINISHED = 'FINISHED',
  CANCELLED_BY_USER = 'CANCELLED_BY_USER',
  CANCELLED_BY_DRIVER = 'CANCELLED_BY_DRIVER',
  FAILED = 'FAILED',
  ARCHIVED = 'ARCHIVED',
  PENDING_DRIVER_ACCEPTANCE = 'PENDING_DRIVER_ACCEPTANCE',
  PENDING_UPDATE_ACCEPTED = 'PENDING_UPDATE_ACCEPTED',
  CANCELLED_BY_TRAVEL_AGENT = 'CANCELLED_BY_TRAVEL_AGENT',
}

export interface Vehicle {
  id: string;
  type: string;
  exclusivityLevel: string;
  numberOfSits: number;
  registeredNumber: string;
  make: string;
  model: string;
  year: number;
  color: string;
  carPriceUSD: number;
  tripPricePerKm: number;
  tripPricePerMinute: number;
  tripMinPrice: number;
  dailyStaticPrice: number;
  dispatcherId: string;
  createdAt: string;
  updatedAt: string;
  galleryImages: Record<string, string>;
}

export interface VehicleDriver {
  id: string;
  firstName: string;
  lastName: string;
  profileImageUrl: string;
  phoneNumber: string;
  images: string[];
  location: string;
  status: string;
  profile: null;
  metadata: null;
}

export interface UnavailabilitySchedule {
  unavailableFrom: Date;
  unavailableUntil: Date;
}

export interface AssignJourneyDTO {
  journeyId: string;
  vehicleDriverId: string;
  vehicleId: string;
  price: number;
  currencyCode: string;
}

export interface JourneyRequestApprovalDTO {
  price?: number;
  priceUsd: number;
  journeyId: string;
  vehicleDriverIds: string[];
  vehicleId: string;
}

export interface TLocation {
  longitude: number;
  latitude: number;
  locationName: string;
  locationNameLocalized: string;
  country: string;
  city?: string;
  address?: string;
  region?: string;
  formattedAddress?: string;
  googlePlaceId?: string;
}

export interface AdditionalStopPoint extends TLocation {
  additionalPassengers: {
    phoneNumber: string;
    firstName: string;
    lastName: string;
  }[];
}

export interface FlightDetails {
  flight_date: string;
  flight_status: string;
  departure: {
    airport: string;
    timezone: string;
    iata: string;
    icao: string;
    terminal: string | null;
    gate: string | null;
    delay: number | null;
    scheduled: string;
    estimated: string;
    actual: string | null;
    estimated_runway: string | null;
    actual_runway: string | null;
  };
  arrival: {
    airport: string;
    timezone: string;
    iata: string;
    icao: string;
    terminal: string | null;
    gate: string | null;
    baggage: string | null;
    delay: number | null;
    scheduled: string;
    estimated: string;
    actual: string | null;
    estimated_runway: string | null;
    actual_runway: string | null;
  };
  airline: {
    name: string;
    iata: string;
    icao: string;
  };
  flight: {
    number: string;
    iata: string;
    icao: string;
    codeshared: unknown | null;
  };
  aircraft: unknown | null;
  live: unknown | null;
  isMonitoring: boolean;
}

export type JourneyCreateDto = {
  fromLocation: TLocation;
  toDestination: TLocation;

  pickupTime: Date | string;
  additionalServices: IService[];

  carType: Array<VehicleType>;

  flightInformation?: {
    flightNumber: string;
    otaId: string;
    managerId: string;
    flightArrivalTime: Date | string | undefined;
    flightDepartureTime: Date | string | undefined;
    flightDetails: IFlightDetails | null;
  } | null;

  user: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  };

  orderrerInformation?: {
    name: string;
    phoneNumber: string;
    type: 'agent' | 'manager' | 'concierge';
  };
  routeDetails?: RouteDetails;
};

export enum VehicleExclusivityLevel {
  LUXURY = 'LUXURY',
  SUPER_LUXURY = 'SUPER_LUXURY',
  ULTRA_LUXURY = 'ULTRA_LUXURY',
  STANDARD = 'STANDARD',
}

export enum VehicleType {
  SEDAN = 'SEDAN',
  DELUXE_SEDAN = 'DELUXE_SEDAN',
  FIRST_CLASS_SEDAN = 'FIRST_CLASS_SEDAN',
  FIRST_CLASS_SEDAN_PREMIUM = 'FIRST_CLASS_SEDAN_PREMIUM',
  SUV = 'SUV',
  DELUX_SUV = 'DELUX_SUV',
  DELUX_SUV_PREMIUM = 'DELUX_SUV_PREMIUM',
  VAN = 'VAN',
  VAN_PREMIUM = 'VAN_PREMIUM',
  MINIBUS = 'MINIBUS',
  MINIBUS_VIP = 'MINIBUS_VIP',
  BUS = 'BUS',
  ACCESSSABLE_VEHICLE = 'ACCESSSABLE_VEHICLE',
  TAXI = 'TAXI',
  SHUTTLE = 'SHUTTLE',
}

export interface RecentClient {
  id: string;
  email: string | null;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  orderrerInfo?: {
    name?: string;
    phoneNumber?: string;
    type: 'agent' | 'manager' | 'concierge' | 'user';
  };
}

export interface ActiveRoute {
  arrivalEta: string;
  distanceInKm: number;
  id: string;
  location: { lat: number; lng: number; heading: number };
  route: string;
  timeTilEtaInSeconds: number;
  userId: string;
}

export interface PricingDTO {
  fromLocation: Location;
  toDestination: Location;
  carType: string;
  additionalStops?: Location[];
}

export interface Location {
  longitude: number;
  latitude: number;
  country: string;
}

export interface PricingResponse {
  pricingSegments: PricingSegment[];
  totalSumUSD: number;
  totalSum: number;
}

export interface PricingSegment {
  id: string;
  dispatcherId?: string | null;
  fromSupportedRegionId: string;
  toSupportedRegionId: string;
  priceLocal: number;
  currency: string;
  priceUSD: number;
  vehicleType: string;
  createdAt: Date;
  updatedAt: Date;
  isRyedDefault?: boolean;
}
export interface IService {
  id: string;
  name: string;
  quantity: number;
}

export interface PaymentDetails {
  id: string;
  journeyId: string;
  invoiceUrl: string;
  paymentId: string;
  invoiceId: string;
  paymentDetails: {
    id: string;
    payer: {
      name: string;
      phone: string;
    };
    total: number;
    channel: string;
    description: string;
    transactions: {
      id: string;
      payer: {
        name: string;
      };
      total: number;
      gateway: string;
      currency: string;
      createdAt: number;
      installments: number;
      paymentMethod: {
        type: string;
        cardNumber: string;
      };
      gatewayTransactionId: string;
    }[];
  };
  invoiceDetails: {
    id: string;
    tax: {
      name: string;
      rate: number;
      total: number;
    }[];
    date: string;
    type: number;
    files: {
      signed: boolean;
      downloadLinks: {
        en: string;
        he: string;
        origin: string;
      };
    };
    items: {
      sku: string;
      tax: {
        name: string;
        rate: number;
      }[];
      price: number;
      currency: string;
      quantity: number;
      description: string;
      taxIncludedInPrice: boolean;
    }[];
    total: number;
    custom: string;
    number: number;
    country: string;
    remarks: string;
    currency: string;
    rounding: boolean;
    subtotal: number;
    createdAt: number;
    recipient: {
      zip: string;
      city: string;
      name: string;
      phone: string;
      emails: string[];
      mobile: string;
      address: string;
      country: string;
      department: string;
    };
    businessId: string;
    description: string;
    exemptTotal: number;
    businessType: number;
    taxableTotal: number;
    transactions: {
      id: string;
      date: string;
      price: number;
      currency: string;
      paymentMethod: {
        type: string;
        cardNumber: string;
      };
    }[];
    reverseCharge: boolean;
    vatTaxableTotal: number;
    revenueTaxableTotal: number;
  };
  provider: string;
  createdAt: string;
}
