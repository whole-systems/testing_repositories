import { FC } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Input,
  DatePicker,
} from '@ryed/ui';
import { useEffectsInformation } from './hooks/useEffectsInformation';
import { typeOfPrices } from './utils/consts';
import { EAdjustmentType } from '@/models/price-rules';

export const EffectsInformation: FC = () => {
  const { data, handlers } = useEffectsInformation();
  return (
    <div className="flex flex-col h-full justify-between">
      <Card>
        <CardHeader>
          <CardTitle>Effects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {!data.hasNumberOfPassengersRule && (
              <div className="flex flex-row w-full gap-2">
                <div className="flex flex-col gap-2 w-full">
                  <Select
                    onValueChange={(value) => {
                      handlers.handleChangeTypeOfPrice(value as EAdjustmentType);
                    }}
                    value={data.values.typeOfPrice}
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
                    {data.errors.typeOfPrice}
                  </p>
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <Input
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    value={data.values.valueOfPrice}
                    onChange={(e) => {
                      handlers.handleChangeValueOfPrice(e.target.value);
                    }}
                  />
                  {data.values.typeOfPrice && data.values.valueOfPrice !== undefined && data.values.valueOfPrice !== null && data.values.valueOfPrice !== '' && (
                    <p className="text-sm text-muted-foreground">
                      Example: If base price is $10, the new price will be{' '}
                      {data.values.typeOfPrice === EAdjustmentType.FIXED
                        ? `$${Math.ceil(10 + Number(data.values.valueOfPrice))}`
                        : data.values.typeOfPrice === EAdjustmentType.PERCENTAGE
                        ? `$${Math.ceil(10 + (10 * Number(data.values.valueOfPrice)) / 100)}`
                        : data.values.typeOfPrice === EAdjustmentType.OVERRIDE
                        ? `$${Math.ceil(Number(data.values.valueOfPrice))}`
                        : ''}
                      {' '}(rounded up using ceiling - e.g., 10.4 → 11)
                    </p>
                  )}
                  <p className="text-sm text-red-700">
                    {data.errors.valueOfPrice}
                  </p>
                </div>
              </div>
            )}
            <div className="flex flex-row w-full gap-2">
              <DatePicker
                value={data.values.effectsFrom}
                onChange={(value) => {
                  handlers.handleChangeEffectsTime(
                    value?.toString() || '',
                    'effectsFrom'
                  );
                }}
                placeholder="Select effects from"
                disablePastDays
                showTimePicker
                format="YYYY-MM-DD HH:mm"
                timezone={data.timezoneForCountry}
              />
              <DatePicker
                value={data.values.effectsTo}
                onChange={(value) => {
                  handlers.handleChangeEffectsTime(
                    value?.toString() || '',
                    'effectsTo'
                  );
                }}
                placeholder="Select effects to"
                disablePastDays
                showTimePicker
                format="YYYY-MM-DD HH:mm"
                timezone={data.timezoneForCountry}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={handlers.priceRulesHandlers.handlePreviousStep}
        >
          Back
        </Button>
        <Button onClick={handlers.submitForm}>Next</Button>
      </div>
    </div>
  );
};
