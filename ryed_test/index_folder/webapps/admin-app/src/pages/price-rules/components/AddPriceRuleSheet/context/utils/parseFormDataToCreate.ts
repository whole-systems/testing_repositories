import { InitialRuleSpecificationsInformationValues } from '../../components/RuleSpecificationsInformation/utils/models';
import { PriceRulesData } from '../PriceRules/hooks/usePriceRules';
import {
  BaseRuleLogic,
  CreatePriceRuleDTO, EAdjustmentType,
  ERuleType
} from '@/models/price-rules';
import { format } from 'date-fns';
export const parseFormDataToCreate = (
  formData: PriceRulesData
): CreatePriceRuleDTO => {
  if (
    !formData.commonInformation ||
    !formData.typeOfUsers ||
    !formData.ruleSpecifications ||
    !formData.effectsInformation
  ) {
    throw new Error('Form data is missing');
  }
  return {
    name: formData.commonInformation.name || '',
    priority: Number(formData.commonInformation.priority) || 0,
    ...(formData.typeOfUsers.typeOfUsers !== 'all' && {
      entityType: formData.typeOfUsers.typeOfUsers,
      entityId: formData.typeOfUsers.user?.id || '',
    }),
    journeyType: formData.commonInformation.typeOfJourney || '',
    ruleLogic:
      formData.ruleSpecifications?.map((rule) => parseRuleLogic(rule)) || [],
    adjustmentType: formData.effectsInformation.typeOfPrice || '',
    priceAdjustment: Number(formData.effectsInformation.valueOfPrice) || 0,
    activeFrom: formData.effectsInformation.effectsFrom || '',
    ...(formData.effectsInformation.effectsTo && {
      activeUntil: formData.effectsInformation.effectsTo,
    }),
    ...(formData.typeOfUsers.typeOfUsers === 'dispatcher' && {
      dispatcherId: formData.typeOfUsers.user?.id || '',
    }),
    ...(formData.typeOfUsers.typeOfUsers === 'travel-agency' && {
      travelAgencyId: formData.typeOfUsers.user?.id || '',
    }),
    ...(formData.typeOfUsers.typeOfUsers === 'travel-agency-agent' && {
      travelAgencyAgentId: formData.typeOfUsers.user?.id || '',
    }),
  };
};

const parseRuleLogic = (
  rule: InitialRuleSpecificationsInformationValues
): BaseRuleLogic => {
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
        passengersAmount: rule.passengersAmount || 0,
        adjustmentType: rule.adjustmentType || EAdjustmentType.FIXED,
        priceAdjustment: rule.priceAdjustment || 0,
      };
    case ERuleType.STATIC:
    default:
      return {
        type: rule.ruleType,
      };
  }
};
