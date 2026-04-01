import { BaseRuleLogic, ERuleType, PriceRule } from '@/models/price-rules';
import { InitialEditPriceRuleValues, RuleSpecifications } from './models';
import { Dispatcher } from '@/models/dispatchers';
import { TravelAgency } from '@/models/travel-agencies';
import { SupportedCountry, Region } from '@/models/regions';
import { setHours, setMinutes } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

export const parseDataToFormik = (
  data: PriceRule,
  additionalInfo: {
    travelAgency: TravelAgency | undefined;
    dispatcher: Dispatcher | undefined;
    supportedCountries: SupportedCountry[] | undefined;
    supportedRegions: Region[] | undefined;
  }
): InitialEditPriceRuleValues => {
  return {
    name: data.name,
    priority: data.priority.toString(),
    typeOfJourney: data.journeyType,
    typeOfPrice: data.adjustmentType,
    valueOfPrice: data.priceAdjustment.toString(),
    effectsFrom: data.activeFrom,
    effectsTo: data.activeUntil || undefined,
    typeOfUsers: data.entityType || '',
    user: additionalInfo.travelAgency || additionalInfo.dispatcher || null,
    agencyId: '',
    ruleSpecifications: data.ruleLogic
      .map((rule) => parseRuleLogicToFormik(rule, additionalInfo))
      .filter((rule) => rule !== null) as RuleSpecifications[],
  };
};

const parseRuleLogicToFormik = (
  ruleLogic: BaseRuleLogic,
  additionalInfo: {
    supportedCountries: SupportedCountry[] | undefined;
    supportedRegions: Region[] | undefined;
  }
): RuleSpecifications | null => {
  switch (ruleLogic.type) {
    case ERuleType.STATIC:
      return {
        id: '',
        ruleType: ruleLogic.type,
      };
    case ERuleType.DAY_OF_WEEK:
      return {
        id: uuidv4(),
        ruleType: ruleLogic.type,
        daysOfWeek: ruleLogic.daysOfWeek?.split(','),
      };
    case ERuleType.HOURS_OF_DAYS:
      return {
        id: uuidv4(),
        ruleType: ruleLogic.type,
        hoursOfDays: {
          startHourOfDays: setHours(
            setMinutes(
              new Date(),
              parseInt(ruleLogic.startHourOfDays?.split('.')[1] || '0')
            ),
            parseInt(ruleLogic.startHourOfDays?.split('.')[0] || '0')
          ).toISOString(),
          stopHourOfDays: setHours(
            setMinutes(
              new Date(),
              parseInt(ruleLogic.stopHourOfDays?.split('.')[1] || '0')
            ),
            parseInt(ruleLogic.stopHourOfDays?.split('.')[0] || '0')
          ).toISOString(),
        },
      };
    case ERuleType.FROM_SOURCE_COUNTRY:
      return {
        id: uuidv4(),
        ruleType: ruleLogic.type,
        country: additionalInfo.supportedCountries?.find(
          (country) => country.id === ruleLogic.fromSupportedCountryId
        ),
      };
    case ERuleType.BETWEEN_REGION: {
      const countryCode = additionalInfo.supportedRegions?.find(
        (region) => region.id === ruleLogic.fromSupportedRegionId
      )?.countryCode;

      const country = additionalInfo.supportedCountries?.find(
        (country) => country.countryCode === countryCode
      );
      return {
        id: uuidv4(),
        ruleType: ruleLogic.type,
        regions: {
          fromRegion: additionalInfo.supportedRegions?.find(
            (region) => region.id === ruleLogic.fromSupportedRegionId
          ),
          toRegion: additionalInfo.supportedRegions?.find(
            (region) => region.id === ruleLogic.toSupportedRegionId
          ),
          country: country!,
        },
      };
    }
    case ERuleType.VEHICLE_TYPE:
      return {
        id: uuidv4(),
        ruleType: ruleLogic.type,
        vehicleType: ruleLogic.vehicleType?.split(','),
      };
    case ERuleType.NUMBER_OF_PASSENGERS:
      return {
        id: ruleLogic.id || '',
        ruleType: ruleLogic.type,
        vehicleType: ruleLogic.vehicleType?.split(','),
        passengersAmount: ruleLogic.passengersAmount,
        adjustmentType: ruleLogic.adjustmentType,
        priceAdjustment: ruleLogic.priceAdjustment,
      };
    default:
      return null;
  }
};
