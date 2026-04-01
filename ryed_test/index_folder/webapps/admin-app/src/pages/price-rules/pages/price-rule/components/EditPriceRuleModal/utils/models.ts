import { EAdjustmentType, ERuleType } from '@/models/price-rules';
// import { Region } from '@/models/regions';
import { Dispatcher } from '@/models/dispatchers';
// import { ERuleType } from '@/models/price-rules';
// import { SupportedCountry } from '@/models/regions';
import { TravelAgency } from '@/models/travel-agencies';
import { TravelAgent } from '@/models/travel-agents';
import { Region } from '@/models/regions';
import { SupportedCountry } from '@/models/regions';

export enum EJourneyType {
  SCHEDULED = 'Scheduled',
  ON_DEMAND = 'OnDemand',
  HALF_DAY = 'HalfDay',
  FULL_DAY = 'FullDay',
  CUSTOM_BY_TIME = 'CustomByTime',
}

export interface RuleSpecifications {
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

export interface InitialEditPriceRuleValues {
  name: string;
  priority: string;
  typeOfJourney: EJourneyType;
  typeOfUsers: string;
  user: Dispatcher | TravelAgency | TravelAgent | null;
  agencyId?: string;
  ruleSpecifications: RuleSpecifications[];
  typeOfPrice: EAdjustmentType;
  valueOfPrice: string;
  effectsFrom: string;
  effectsTo?: string;
}
