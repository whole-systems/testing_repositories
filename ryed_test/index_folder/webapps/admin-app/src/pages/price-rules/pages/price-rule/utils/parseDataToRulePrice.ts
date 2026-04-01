import { Dispatcher } from '@/models/dispatchers';
import { ERuleType, PriceRule } from '@/models/price-rules';
import { Country } from '@/models/regions';
import { Region } from '@/models/regions';
import { TravelAgency } from '@/models/travel-agencies';

interface AdditionalInfo {
  supportedCountry?: Country;
  fromSupportedRegion?: Region;
  toSupportedRegion?: Region;
  travelAgency?: TravelAgency;
  dispatcher?: Dispatcher;
}

export const parseDataToRulePrice = (
  data: PriceRule | PriceRule[],
  additionalInfo: AdditionalInfo
) => {

  let priceRule: PriceRule
  if (Array.isArray(data)) {
    const ruleLogic = data.map((item) => ({
      ...item.ruleLogic[0],
      id: item.id,
      adjustmentType: item.adjustmentType,
      priceAdjustment: item.priceAdjustment,
    }));
    priceRule = { ...data[0], ruleLogic };
  } else {
    priceRule = data;
  }

  const user =
    priceRule.entityType === 'travel-agency'
      ? additionalInfo.travelAgency
      : priceRule.entityType === 'dispatcher'
      ? additionalInfo.dispatcher
      : null;

  const ruleLogic = priceRule.ruleLogic.map((rule) => {
    if (rule.type === ERuleType.FROM_SOURCE_COUNTRY) {
      return {
        ...rule,
        ...additionalInfo.supportedCountry,
      };
    }
    if (rule.type === ERuleType.BETWEEN_REGION) {
      return {
        ...rule,
        fromSupportedRegion: additionalInfo.fromSupportedRegion,
        toSupportedRegion: additionalInfo.toSupportedRegion,
      };
    }
    return {
      ...rule,
    };
  });
  return {
    ...priceRule,
    ruleLogic,
    user
  };
};
