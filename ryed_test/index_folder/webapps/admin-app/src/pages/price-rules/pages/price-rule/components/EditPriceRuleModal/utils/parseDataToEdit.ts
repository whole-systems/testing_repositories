import { InitialEditPriceRuleValues, RuleSpecifications } from './models';
import {
  BaseRuleLogic, EAdjustmentType,
  EditPriceRuleDTO,
  ERuleType
} from '@/models/price-rules';
import { format } from 'date-fns';

export const parseDataToEdit = (
  data: InitialEditPriceRuleValues
): EditPriceRuleDTO => {
  return {
    // name: data.name || '',
    priority: Number(data.priority) || 0,
    ...(data.typeOfUsers !== 'all' && {
      entityType: data.typeOfUsers,
      entityId: data.user?.id || '',
    }),
    journeyType: data.typeOfJourney || '',
    ruleLogic:
      data.ruleSpecifications?.map((rule) => parseRuleLogic(rule)) || [],
    adjustmentType: data.typeOfPrice || '',
    priceAdjustment: data.valueOfPrice !== '' && data.valueOfPrice !== null && data.valueOfPrice !== undefined ? Number(data.valueOfPrice) : 0,
    activeFrom: data.effectsFrom || '',

    activeUntil: data.effectsTo ? data.effectsTo : null,

    ...(data.typeOfUsers === 'dispatcher' && {
      dispatcherId: data.user?.id || '',
    }),
    ...(data.typeOfUsers === 'travel-agency' && {
      travelAgencyId: data.user?.id || '',
    }),
    ...(data.typeOfUsers === 'travel-agency-agent' && {
      travelAgencyAgentId: data.user?.id || '',
    }),
  };
};

const parseRuleLogic = (rule: RuleSpecifications): BaseRuleLogic => {
  switch (rule.ruleType) {
    case ERuleType.HOURS_OF_DAYS:
      return {
        type: rule.ruleType,
        startHourOfDays: format(rule.hoursOfDays!.startHourOfDays, 'HH.mm'),
        stopHourOfDays: format(rule.hoursOfDays!.stopHourOfDays, 'HH.mm'),
      };
    case ERuleType.DAY_OF_WEEK:
      return {
        type: rule.ruleType,
        daysOfWeek: rule.daysOfWeek?.join(','),
      };
    case ERuleType.BETWEEN_REGION:
      return {
        type: rule.ruleType,
        fromSupportedRegionId: rule.regions?.fromRegion?.id,
        toSupportedRegionId: rule.regions?.toRegion?.id,
      };
    case ERuleType.FROM_SOURCE_COUNTRY:
      return {
        type: rule.ruleType,
        fromSupportedCountryId: rule.country?.id,
      };
    case ERuleType.VEHICLE_TYPE:
      return {
        type: rule.ruleType,
        vehicleType: rule.vehicleType?.join(',') || '',
      };
    case ERuleType.NUMBER_OF_PASSENGERS:
      return {
        type: rule.ruleType,
        vehicleType: rule.vehicleType?.join(',') || '',
        passengersAmount: rule.passengersAmount ?? 0,
        adjustmentType: rule.adjustmentType || EAdjustmentType.FIXED,
        priceAdjustment: rule.priceAdjustment !== null && rule.priceAdjustment !== undefined ? rule.priceAdjustment : 0,
        id: rule.id,
      };
    case ERuleType.STATIC:
    default:
      return {
        type: rule.ruleType,
      };
  }
};
