export enum EAdjustmentType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED',
  OVERRIDE = 'OVERRIDE',
}

export enum EJourneyType {
  SCHEDULED = 'Scheduled',
  ON_DEMAND = 'OnDemand',
  HALF_DAY = 'HalfDay',
  FULL_DAY = 'FullDay',
  CUSTOM_BY_TIME = 'CustomByTime',
}

export interface PriceRule {
  id: string;
  batchId?: string;
  name: string;
  entityType?: string;
  entityId?: string;
  ruleLogic: BaseRuleLogic[];
  activeFrom: string;
  activeUntil?: string | null;
  priceAdjustment: number;
  journeyType: EJourneyType;
  adjustmentType: EAdjustmentType;
  isEnabled: boolean;
  priority: number;
  userId?: string | null;
  vehicleDriverId?: string | null;
  vehicleId?: string | null;
  dispatcherId?: string | null;
  serviceSpotId?: string | null;
  conciergeId?: string | null;
  userManagerId?: string | null;
  travelAgencyId?: string | null;
  travelAgencyAgentId?: string | null;
  fromSupportedCountryId?: string | null;
  fromSupportedRegionId?: string | null;
  toSupportedRegionId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePriceRuleDTO {
  batchId?: string;
  name: string;
  entityType?: string;
  entityId?: string;
  ruleLogic: BaseRuleLogic[];
  activeFrom: string;
  activeUntil?: string;
  priceAdjustment: number;
  journeyType: EJourneyType;
  adjustmentType: EAdjustmentType;
  isEnabled?: boolean;
  priority: number;
  userId?: string;
  vehicleDriverId?: string;
  vehicleId?: string;
  dispatcherId?: string;
  serviceSpotId?: string;
  conciergeId?: string;
  userManagerId?: string;
  travelAgencyId?: string;
  travelAgencyAgentId?: string;
}

export interface EditPriceRuleDTO {
  name?: string;
  entityType?: string;
  entityId?: string;
  ruleLogic?: BaseRuleLogic[];
  activeFrom?: string | null;
  activeUntil?: string | null;
  priceAdjustment?: number;
  journeyType?: EJourneyType;
  adjustmentType?: EAdjustmentType;
  isEnabled?: boolean;
  priority?: number;
  userId?: string;
  vehicleDriverId?: string;
  vehicleId?: string;
  dispatcherId?: string;
  serviceSpotId?: string;
  conciergeId?: string;
  userManagerId?: string;
  travelAgencyId?: string;
  travelAgencyAgentId?: string;
}

export enum ERuleType {
  STATIC = 'static',
  HOURS_OF_DAYS = 'hours_of_days',
  DAY_OF_WEEK = 'day_of_week',
  BETWEEN_REGION = 'between_region_to_region',
  FROM_SOURCE_COUNTRY = 'source_country',
  VEHICLE_TYPE = 'vehicle_type',
  NUMBER_OF_PASSENGERS = 'number_of_passengers',
}

export type BaseRuleLogic =
  | HoursOfDaysRule
  | DayOfWeekRule
  | BetweenRegionRule
  | CountryRule
  | VehicleTypeRule
  | NumberOfPassengersRule
  | StaticRule;

export interface HoursOfDaysRule {
  type: ERuleType.HOURS_OF_DAYS;
  startHourOfDays?: string;
  stopHourOfDays?: string;
}

export interface DayOfWeekRule {
  type: ERuleType.DAY_OF_WEEK;
  daysOfWeek?: string;
}

export interface BetweenRegionRule {
  type: ERuleType.BETWEEN_REGION;
  fromSupportedRegionId?: string;
  toSupportedRegionId?: string;
}

export interface CountryRule {
  type: ERuleType.FROM_SOURCE_COUNTRY;
  fromSupportedCountryId?: string;
}

export interface VehicleTypeRule {
  type: ERuleType.VEHICLE_TYPE;
  vehicleType: string;
}

export interface NumberOfPassengersRule {
  type: ERuleType.NUMBER_OF_PASSENGERS;
  id?: string;
  vehicleType: string;
  passengersAmount: number;
  adjustmentType?: EAdjustmentType;
  priceAdjustment?: number;
}

export interface StaticRule {
  type: ERuleType.STATIC;
}
