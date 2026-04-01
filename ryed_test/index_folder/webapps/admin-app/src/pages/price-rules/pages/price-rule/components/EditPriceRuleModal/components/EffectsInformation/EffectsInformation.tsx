import { EAdjustmentType, ERuleType } from '@/models/price-rules';
import { FormikProps } from 'formik';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DatePicker,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ryed/ui';
import { FC, useMemo } from 'react';
import { InitialEditPriceRuleValues } from '../../utils/models';
import { typeOfPrices } from '@/pages/price-rules/components/AddPriceRuleSheet/components/EffectsInformation/utils/consts';
import { getTimezoneForCountryName } from '@ryed-ui/utils/parseTime';

interface Props {
  formik: FormikProps<InitialEditPriceRuleValues>;
}

export const EffectsInformation: FC<Props> = ({ formik }) => {
  const timezoneForCountry = useMemo(() => {
    const country = formik.values.ruleSpecifications?.find(
      (f) => f.country
    )?.country;
    if (!country) return;
    return getTimezoneForCountryName(country.name);
  }, [formik.values.ruleSpecifications]);

  const hasNumberOfPassengersRule = useMemo(() => {
    return formik.values.ruleSpecifications?.some(
      (rule) => rule.ruleType === ERuleType.NUMBER_OF_PASSENGERS
    );
  }, [formik.values.ruleSpecifications]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Effects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {!hasNumberOfPassengersRule && (
            <div className="flex flex-row w-full gap-2">
              <div className="flex flex-col gap-2 w-full">
                <Select
                  onValueChange={(value) => {
                    formik.setFieldValue('typeOfPrice', value as EAdjustmentType);
                  }}
                  value={formik.values.typeOfPrice}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type of price" />
                  </SelectTrigger>
                  <SelectContent>
                    {typeOfPrices.map((price) => (
                      <SelectItem key={price.value} value={price.value}>
                        {price.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-red-700">
                  {formik.errors.typeOfPrice}
                </p>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Input
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  value={formik.values.valueOfPrice}
                  onChange={(e) => {
                    formik.setFieldValue('valueOfPrice', e.target.value);
                  }}
                />
                {formik.values.typeOfPrice && formik.values.valueOfPrice !== undefined && formik.values.valueOfPrice !== null && formik.values.valueOfPrice !== '' && (
                  <p className="text-sm text-muted-foreground">
                    Example: If base price is $10, the new price will be{' '}
                    {formik.values.typeOfPrice === EAdjustmentType.FIXED
                      ? `$${Math.ceil(10 + Number(formik.values.valueOfPrice))}`
                      : formik.values.typeOfPrice === EAdjustmentType.PERCENTAGE
                      ? `$${Math.ceil(10 + (10 * Number(formik.values.valueOfPrice)) / 100)}`
                      : formik.values.typeOfPrice === EAdjustmentType.OVERRIDE
                      ? `$${Math.ceil(Number(formik.values.valueOfPrice))}`
                      : ''}
                    {' '}(rounded up using ceiling - e.g., 10.4 → 11)
                  </p>
                )}
                <p className="text-sm text-red-700">
                  {formik.errors.valueOfPrice}
                </p>
              </div>
            </div>
          )}
          <div className="flex flex-row w-full gap-2">
            <DatePicker
              value={formik.values.effectsFrom}
              onChange={(value) => {
                formik.setFieldValue('effectsFrom', value?.toString() || '');
              }}
              placeholder="Select effects from"
              disablePastDays
              showTimePicker
              format="YYYY-MM-DD HH:mm"
              timezone={timezoneForCountry}
            />
            <DatePicker
              value={formik.values.effectsTo}
              onChange={(value) => {
                formik.setFieldValue('effectsTo', value?.toString() || '');
              }}
              placeholder="Select effects to"
              disablePastDays
              showTimePicker
              format="YYYY-MM-DD HH:mm"
              timezone={timezoneForCountry}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
