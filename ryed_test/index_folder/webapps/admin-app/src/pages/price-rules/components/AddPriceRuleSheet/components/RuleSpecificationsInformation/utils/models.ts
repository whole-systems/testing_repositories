import { Region, SupportedCountry } from '@/models/regions';
import { EAdjustmentType, ERuleType } from '@/models/price-rules';

export interface InitialRuleSpecificationsInformationValues {
  ruleType: ERuleType;
  daysOfWeek?: string[];
  hoursOfDays?: {
    startHourOfDays: string;
    stopHourOfDays: string;
  };
  country?: SupportedCountry;
  regions?: {
    country: SupportedCountry;
    fromRegion?: Region;
    toRegion?: Region;
  };
  vehicleType?: string[];
  passengersAmount?: number;
  adjustmentType?: EAdjustmentType;
  priceAdjustment?: number;
  id: string;
}

export interface IFormErrors {
  [key: number]: {
    hoursOfDays?: {
      startHourOfDays?: string;
      stopHourOfDays?: string;
    };
    daysOfWeek?: string;
    country?: string;
    regions?: {
      country?: string;
      fromRegion?: string;
      toRegion?: string;
    };
    vehicleType?: string;
    passengersAmount?: string;
    adjustmentType?: string;
    priceAdjustment?: string;
    ruleType?: string;
    id?: string;
  };
}
