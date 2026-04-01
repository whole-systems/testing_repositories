import { EAdjustmentType } from '@/models/price-rules';

export interface InitialEffectsInformationValues {
  typeOfPrice: EAdjustmentType;
  valueOfPrice: string;
  effectsFrom: string;
  effectsTo?: string;
}
