import { EAdjustmentType } from '@/models/price-rules';

export const typeOfPrices = [
  {
    label: 'Fixed',
    value: EAdjustmentType.FIXED,
  },
  {
    label: 'Percentage %',
    value: EAdjustmentType.PERCENTAGE,
  },
  {
    label: 'Override',
    value: EAdjustmentType.OVERRIDE,
  },
  // {
  //   label: 'Static',
  //   value: ETypeOfPrice.STATIC,
  // },
];

export const initialValues = {
  typeOfPrice: EAdjustmentType.FIXED,
  valueOfPrice: '',
  effectsFrom: new Date().toISOString(),
};
