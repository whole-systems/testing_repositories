import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  // Combobox,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Input,
} from '@ryed/ui';
import { PlusCircleIcon, X } from 'lucide-react';
import { FC } from 'react';
import { useRuleSpecificationsInformation } from './hooks/useRuleSpecificationsInformation';
import { MultiSelect } from '@/components/MultiSelect/MultiSelect';
import { daysOfWeek, vehiclesData } from './utils/consts';
import { EAdjustmentType, ERuleType } from '@/models/price-rules';
import { typeOfRule } from './utils/consts';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { timePickerStyles } from './utils/styles';
import {
  typeOfPrices
} from '@/pages/price-rules/components/AddPriceRuleSheet/components/EffectsInformation/utils/consts';

export const RuleSpecificationsInformation: FC = () => {
  const { data, handlers } = useRuleSpecificationsInformation();
  return (
    <div className="flex flex-col flex-1 justify-between ">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Rule Specifications</CardTitle>
          <Button
            className="p-0 rounded-full"
            variant="ghost"
            onClick={handlers.handleAddRule}
          >
            <PlusCircleIcon className="w-10 h-10" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {data.values.map((rule, index) => (
              <Card key={rule.id}>
                <CardHeader className="flex flex-row justify-between items-center">
                  <CardTitle>Rule #{index + 1}</CardTitle>
                  <Button
                    className="p-0 rounded-full"
                    variant="ghost"
                    onClick={() => handlers.handleRemoveRule(rule.id)}
                  >
                    <X className="w-10 h-10" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <Select
                      value={rule.ruleType}
                      disabled={index !== 0 && data.isFirstRuleLockedType}
                      onValueChange={(typeValue) => {
                        handlers.handleChangeRuleType(
                          rule.id,
                          typeValue as ERuleType
                        );
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select rule specification" />
                      </SelectTrigger>
                      <SelectContent>
                        {typeOfRule.map((item) => (
                          <SelectItem
                            disabled={data.values.some(
                              (r) => r.ruleType === item.value
                            )}
                            key={item.value}
                            value={item.value}
                          >
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {rule.ruleType === ERuleType.HOURS_OF_DAYS && (
                      <div className="flex flex-col">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <div className="flex flex-row gap-2">
                            <div className="flex flex-col w-full">
                              <p className="text-sm font-medium">From</p>
                              <TimePicker
                                ampm={false}
                                onChange={(value) => {
                                  handlers.handleChangeHoursOfDays(
                                    rule.id,
                                    value as string,
                                    'startHourOfDays'
                                  );
                                }}
                                sx={timePickerStyles}
                              />
                              <p className="text-red-700">
                                {data.errors[index]?.hoursOfDays
                                  ?.startHourOfDays &&
                                  data.errors[index].hoursOfDays
                                    .startHourOfDays}
                              </p>
                            </div>
                            <div className="flex flex-col w-full">
                              <p className="text-sm font-medium">To</p>
                              <TimePicker
                                ampm={false}
                                onChange={(value) => {
                                  handlers.handleChangeHoursOfDays(
                                    rule.id,
                                    value as string,
                                    'stopHourOfDays'
                                  );
                                }}
                                sx={timePickerStyles}
                              />
                              <p className="text-red-700">
                                {data.errors[index]?.hoursOfDays
                                  ?.stopHourOfDays &&
                                  data.errors[index].hoursOfDays.stopHourOfDays}
                              </p>
                            </div>
                          </div>
                        </LocalizationProvider>
                      </div>
                    )}
                    {rule.ruleType === ERuleType.DAY_OF_WEEK && (
                      <div className="flex flex-col">
                        <MultiSelect
                          placeholder={'Select days of week'}
                          data={daysOfWeek}
                          onChange={(value) => {
                            handlers.handleChangeDaysOfWeek(
                              rule.id,
                              value.map((item) => item.value)
                            );
                          }}
                        />
                        <p className="text-red-700">
                          {data.errors[index]?.daysOfWeek &&
                            data.errors[index].daysOfWeek}
                        </p>
                      </div>
                    )}

                    {rule.ruleType === ERuleType.FROM_SOURCE_COUNTRY && (
                      <div className="flex flex-col">
                        <Select
                          value={rule.country?.id}
                          onValueChange={(value) => {
                            handlers.handleChangeFromSourceCountry(
                              rule.id,
                              value
                            );
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select source country" />
                          </SelectTrigger>
                          <SelectContent>
                            {data.supportedCountries?.map((country) => (
                              <SelectItem key={country.id} value={country.id}>
                                {country.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-red-700">
                          {data.errors[index]?.country &&
                            data.errors[index].country}
                        </p>
                      </div>
                    )}

                    {rule.ruleType === ERuleType.BETWEEN_REGION && (
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                          <Select
                            value={rule.country?.id}
                            onValueChange={(value) => {
                              handlers.handleChangeCountryForRegions(
                                rule.id,
                                value
                              );
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select source country" />
                            </SelectTrigger>
                            <SelectContent>
                              {data.supportedCountries?.map((country) => (
                                <SelectItem key={country.id} value={country.id}>
                                  {country.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-red-700">
                            {data.errors[index]?.regions?.country &&
                              data.errors[index].regions.country}
                          </p>
                        </div>
                        <div className="flex flex-row gap-2">
                          <div className="flex flex-col w-full">
                            <Select
                              disabled={!rule.regions?.country}
                              value={rule.regions?.fromRegion?.id}
                              onValueChange={(value) => {
                                handlers.handleChangeRegion(
                                  rule.id,
                                  value,
                                  'fromRegion'
                                );
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select from region" />
                              </SelectTrigger>

                              <SelectContent>
                                {data.supportedRegions?.map((region) => (
                                  <SelectItem
                                    disabled={
                                      rule.regions?.toRegion?.id === region.id
                                    }
                                    key={region.id}
                                    value={region.id}
                                  >
                                    {region.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <p className="text-red-700">
                              {data.errors[index]?.regions?.fromRegion &&
                                data.errors[index].regions.fromRegion}
                            </p>
                          </div>
                          <div className="flex flex-col w-full">
                            <Select
                              disabled={!rule.regions?.country}
                              value={rule.regions?.toRegion?.id}
                              onValueChange={(value) => {
                                handlers.handleChangeRegion(
                                  rule.id,
                                  value,
                                  'toRegion'
                                );
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select to region" />
                              </SelectTrigger>
                              <SelectContent>
                                {data.supportedRegions?.map((region) => (
                                  <SelectItem
                                    disabled={
                                      rule.regions?.fromRegion?.id === region.id
                                    }
                                    key={region.id}
                                    value={region.id}
                                  >
                                    {region.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <p className="text-red-700">
                              {data.errors[index]?.regions?.toRegion &&
                                data.errors[index].regions.toRegion}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {(rule.ruleType === ERuleType.VEHICLE_TYPE ||
                      rule.ruleType === ERuleType.NUMBER_OF_PASSENGERS) && (
                      <div className="flex flex-col">
                        <MultiSelect
                          placeholder={'Select vehicle type'}
                          data={vehiclesData}
                          disabled={index !== 0 && data.isFirstRuleLockedType}
                          initialSelected={
                            rule.vehicleType
                              ? vehiclesData.filter((v) =>
                                  rule.vehicleType?.includes(v.value)
                                )
                              : []
                          }
                          onChange={(value) => {
                            handlers.handleChangeVehicleType(
                              rule.id,
                              value.map((item) => item.value)
                            );
                          }}
                        />
                        <p className="text-red-700">
                          {data.errors[index]?.vehicleType &&
                            data.errors[index].vehicleType}
                        </p>
                      </div>
                    )}

                    {rule.ruleType === ERuleType.NUMBER_OF_PASSENGERS && (
                      <>
                        <div className="flex flex-col">
                          <label className="text-sm font-medium mb-1">
                            Minimum Number of Passengers
                          </label>
                          <Input
                            type="number"
                            inputMode="numeric"
                            placeholder="Enter minimum number of passengers"
                            value={rule.passengersAmount ?? ''}
                            onChange={(e) => {
                              handlers.handleChangePassengersAmount(
                                rule.id,
                                Number(e.target.value)
                              );
                            }}
                          />
                          {rule.passengersAmount && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {(() => {
                                const passengerRules = data.values
                                  .filter(r =>
                                    r.ruleType === ERuleType.NUMBER_OF_PASSENGERS &&
                                    r.passengersAmount !== undefined &&
                                    r.passengersAmount !== null &&
                                    !isNaN(r.passengersAmount)
                                  )
                                  .sort((a, b) => (a.passengersAmount || 0) - (b.passengersAmount || 0));
                                const nextRule = passengerRules.find(r =>
                                  (r.passengersAmount || 0) > (rule.passengersAmount || 0)
                                );
                                const minPassengers = rule.passengersAmount;
                                const maxPassengers = nextRule?.passengersAmount ? nextRule.passengersAmount - 1 : null;
                                if (maxPassengers !== null) {
                                  return `This rule applies for ${minPassengers}-${maxPassengers} passengers`;
                                } else {
                                  return `This rule applies for ${minPassengers}+ passengers`;
                                }
                              })()}
                            </p>
                          )}
                          <p className="text-red-700">
                            {data.errors[index]?.passengersAmount &&
                              data.errors[index].passengersAmount}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <Select
                            value={rule.adjustmentType}
                            onValueChange={(value) => {
                              handlers.handleChangeAdjustmentType(
                                rule.id,
                                value as EAdjustmentType
                              );
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select adjustment type" />
                            </SelectTrigger>
                            <SelectContent>
                              {typeOfPrices.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-red-700">
                            {data.errors[index]?.adjustmentType &&
                              data.errors[index].adjustmentType}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <Input
                            type="number"
                            inputMode="decimal"
                            step="0.01"
                            placeholder="Price adjustment value"
                            value={rule.priceAdjustment ?? ''}
                            onChange={(e) => {
                              const value = e.target.value === '' ? undefined : Number(e.target.value);
                              handlers.handleChangePriceAdjustment(
                                rule.id,
                                value
                              );
                            }}
                          />
                          {rule.adjustmentType && rule.priceAdjustment !== undefined && rule.priceAdjustment !== null && !isNaN(rule.priceAdjustment) && (
                            <p className="text-sm text-muted-foreground mt-1">
                              Example: If base price is $10, the new price will be{' '}
                              {rule.adjustmentType === EAdjustmentType.FIXED
                                ? `$${Math.ceil(10 + rule.priceAdjustment)}`
                                : rule.adjustmentType === EAdjustmentType.PERCENTAGE
                                ? `$${Math.ceil(10 + (10 * rule.priceAdjustment) / 100)}`
                                : rule.adjustmentType === EAdjustmentType.OVERRIDE
                                ? `$${Math.ceil(rule.priceAdjustment)}`
                                : ''}
                              {' '}(rounded up using ceiling - e.g., 10.4 → 11)
                            </p>
                          )}
                          <p className="text-red-700">
                            {data.errors[index]?.priceAdjustment &&
                              data.errors[index].priceAdjustment}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-row justify-end gap-4 my-4">
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
