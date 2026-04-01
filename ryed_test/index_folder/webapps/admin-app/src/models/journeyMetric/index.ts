export type TJourneyMetric = {
  id: string;
  isUnscoped: boolean;
  dispatcherId: string;
  vehicleId?: string;
  vehicleDriverId?: string;
  serviceSpotId?: string;
  userManagerId?: string;
  scope: string;
  date: string;
  sum: number;
  count: number;
  avg: number;
  fullScope: FullScope;
  createdAt: string;
};

export type TJourneyMetricDTO = {
  journeyMetrics: TJourneyMetric[];
  totalPrices: number;
  totalDistances: number;
  totalDuration: number;
  scopeAvg: number;
};
export interface AdditionalMetrics {
  totalTripPrice: number;
  totalTripDistance: number;
  totalTripDuration: number;
}

export interface FullScope {
  toDate: string;
  fromDate: string;
  dispatcher: string;
}

export type TFullScopeJourneyMetric = {
  vehicleMetrics: TMetricVehicle[];
  vehicleDriverId: TMetricVehicleDriverId[];
};

export type TMetricVehicle = {
  id: string;
  isUnscoped: boolean;
  dispatcherId: string;
  vehicleId: string;
  vehicleDriverId: string;
  serviceSpotId: string;
  userManagerId: string;
  scope: string;
  date: string;
  sum: number;
  count: number;
  avg: number;
  additionalMetrics: AdditionalMetrics;
  fullScope: FullScope;
  createdAt: string;
  vehicle: {
    make: string;
    id: string;
    model: string;
    registeredNumber: string;
  };
};

export interface AdditionalMetrics {
  totalTripPrice: number;
  totalTripDistance: number;
  totalTripDuration: number;
}

export interface FullScope {
  toDate: string;
  vehicle: string;
  fromDate: string;
}

export type TMetricVehicleDriverId = {
  id: string;
  isUnscoped: boolean;
  dispatcherId: string;
  vehicleId: string;
  vehicleDriverId: string;
  serviceSpotId: string;
  userManagerId: string;
  scope: string;
  date: string;
  sum: number;
  count: number;
  avg: number;
  additionalMetrics: AdditionalMetrics2;
  fullScope: FullScope2;
  createdAt: string;
  vehicleDriver: {
    email: string;
    firstName: string;
    id: string;
    lastName: string;
  };
};

export interface AdditionalMetrics2 {
  totalTripPrice: number;
  totalTripDistance: number;
  totalTripDuration: number;
}

export interface FullScope2 {
  toDate: string;
  fromDate: string;
  vehicleDriver: string;
}
