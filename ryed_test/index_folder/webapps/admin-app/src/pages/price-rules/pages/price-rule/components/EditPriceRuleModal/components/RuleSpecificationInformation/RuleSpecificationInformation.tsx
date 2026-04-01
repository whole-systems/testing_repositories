import { FormikProps } from 'formik';
import { FC, useEffect, useState } from 'react';
import { InitialEditPriceRuleValues } from '../../utils/models';
import { X } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  SelectValue,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Input,
} from '@ryed/ui';
import { PlusCircleIcon } from 'lucide-react';
import { EAdjustmentType, ERuleType } from '@/models/price-rules';
import {
  daysOfWeek,
  typeOfRule,
  vehiclesData,
} from '@/pages/price-rules/components/AddPriceRuleSheet/components/RuleSpecificationsInformation/utils/consts';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { timePickerStyles } from '@/pages/price-rules/components/AddPriceRuleSheet/components/RuleSpecificationsInformation/utils/styles';
import { MultiSelect } from '@/components/MultiSelect/MultiSelect';
import { useLazyGetSupportedCountriesQuery } from '@/api/priceRulesEndpoints';
import { useLazyGetSupportedRegionsQuery } from '@/api/priceRulesEndpoints';
import { IFormErrors } from '@/pages/price-rules/components/AddPriceRuleSheet/components/RuleSpecificationsInformation/utils/models';
import {
  typeOfPrices
} from '@/pages/price-rules/components/AddPriceRuleSheet/components/EffectsInformation/utils/consts';

interface Props {
  formik: FormikProps<InitialEditPriceRuleValues>;
}

export const RuleSpecificationInformation: FC<Props> = ({ formik }) => {
  const typedErrors =
    (formik.errors?.ruleSpecifications as IFormErrors) || undefined;
  const [fetchedInitData, setFetchedInitData] = useState<boolean>(true);
  const [getSupportedCountries, { data: supportedCountries }] =
    useLazyGetSupportedCountriesQuery();
  const [getSupportedRegions, { data: supportedRegions }] =
    useLazyGetSupportedRegionsQuery();

  const firstRuleType = formik.values.ruleSpecifications[0]?.ruleType;
  const isFirstRuleLockedType = firstRuleType === ERuleType.NUMBER_OF_PASSENGERS;

  useEffect(() => {
    if (!fetchedInitData) return;
    if (
      formik.values.ruleSpecifications.some(
        (rule) =>
          rule.ruleType === ERuleType.FROM_SOURCE_COUNTRY ||
          rule.ruleType === ERuleType.BETWEEN_REGION
      )
    ) {
      getSupportedCountries();
    }
    if (
      formik.values.ruleSpecifications.some(
        (rule) => rule.ruleType === ERuleType.BETWEEN_REGION
      )
    ) {
      const countryCode = formik.values.ruleSpecifications.find(
        (rule) => rule.ruleType === ERuleType.BETWEEN_REGION
      )?.regions?.country?.countryCode;
      if (countryCode) {
        getSupportedRegions(countryCode);
      }
    }
    setFetchedInitData(false);
  }, [
    formik.values.ruleSpecifications,
    getSupportedCountries,
    getSupportedRegions,
    fetchedInitData,
  ]);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Rule Specifications</CardTitle>
        <Button
          className="p-0 rounded-full"
          variant="ghost"
          onClick={() => {
            if (
              formik.values.ruleSpecifications.length >=
              Object.keys(ERuleType).length
            ) {
              return;
            }
            const newRuleType = isFirstRuleLockedType
              ? firstRuleType
              : ERuleType.STATIC;
            const firstVehicleType = isFirstRuleLockedType
              ? formik.values.ruleSpecifications[0]?.vehicleType
              : undefined;
            formik.setFieldValue(`ruleSpecifications`, [
              ...formik.values.ruleSpecifications,
              { id: undefined, ruleType: newRuleType, vehicleType: firstVehicleType },
            ]);
          }}
        >
          <PlusCircleIcon className="w-10 h-10" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {formik.values.ruleSpecifications.map((rule, index) => {
            const error =
              typedErrors && typedErrors[index] ? typedErrors[index] : null;
            return (
              <Card key={rule.id}>
                <CardHeader className="flex flex-row justify-between items-center">
                  <CardTitle>Rule #{index + 1}</CardTitle>
                  <Button
                    className="p-0 rounded-full"
                    variant="ghost"
                    onClick={() => {
                      const newRuleSpecifications = [
                        ...formik.values.ruleSpecifications,
                      ];
                      newRuleSpecifications.splice(index, 1);
                      formik.setFieldValue(
                        `ruleSpecifications`,
                        newRuleSpecifications
                      );
                    }}
                  >
                    <X className="w-10 h-10" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <Select
                      value={rule.ruleType}
                      disabled={index !== 0 && isFirstRuleLockedType}
                      onValueChange={(typeValue) => {
                        const isFirstRule = index === 0;
                        const isLockedType =
                          typeValue === ERuleType.NUMBER_OF_PASSENGERS;

                        if (isFirstRule && isLockedType) {
                          const firstVehicleType = formik.values.ruleSpecifications[0]?.vehicleType;
                          const updatedRules =
                            formik.values.ruleSpecifications.map((r) => ({
                              ...r,
                              ruleType: typeValue,
                              vehicleType: firstVehicleType,
                            }));
                          formik.setFieldValue('ruleSpecifications', updatedRules);
                        } else {
                          formik.setFieldValue(
                            `ruleSpecifications[${index}].ruleType`,
                            typeValue
                          );
                        }

                        if (
                          typeValue === ERuleType.FROM_SOURCE_COUNTRY ||
                          typeValue === ERuleType.BETWEEN_REGION
                        ) {
                          getSupportedCountries();
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select rule specification" />
                      </SelectTrigger>
                      <SelectContent>
                        {typeOfRule.map((item) => (
                          <SelectItem
                            disabled={formik.values.ruleSpecifications.some(
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
                                  formik.setFieldValue(
                                    `ruleSpecifications[${index}].hoursOfDays.startHourOfDays`,
                                    value as string
                                  );
                                }}
                                value={rule.hoursOfDays?.startHourOfDays}
                                sx={timePickerStyles}
                              />
                              <p className="text-red-700">
                                {error &&
                                error.hoursOfDays &&
                                error.hoursOfDays.startHourOfDays
                                  ? error.hoursOfDays.startHourOfDays
                                  : null}
                              </p>
                            </div>
                            <div className="flex flex-col w-full">
                              <p className="text-sm font-medium">To</p>
                              <TimePicker
                                ampm={false}
                                value={rule.hoursOfDays?.stopHourOfDays}
                                onChange={(value) => {
                                  formik.setFieldValue(
                                    `ruleSpecifications[${index}].hoursOfDays.stopHourOfDays`,
                                    value as string
                                  );
                                }}
                                sx={timePickerStyles}
                              />
                              <p className="text-red-700">
                                {error &&
                                error.hoursOfDays &&
                                error.hoursOfDays.stopHourOfDays
                                  ? error.hoursOfDays.stopHourOfDays
                                  : null}
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
                          initialSelected={rule.daysOfWeek?.map((item) => ({
                            label: item,
                            value: item,
                          }))}
                          onChange={(value) => {
                            formik.setFieldValue(
                              `ruleSpecifications[${index}].daysOfWeek`,
                              value.map((item) => item.value)
                            );
                          }}
                        />
                        <p className="text-red-700">
                          {error && error.daysOfWeek ? error.daysOfWeek : null}
                        </p>
                      </div>
                    )}

                    {rule.ruleType === ERuleType.FROM_SOURCE_COUNTRY && (
                      <div className="flex flex-col">
                        <Select
                          value={rule.country?.id}
                          onValueChange={(value) => {
                            formik.setFieldValue(
                              `ruleSpecifications[${index}].country`,
                              value
                            );
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select source country" />
                          </SelectTrigger>
                          <SelectContent>
                            {supportedCountries?.map((country) => (
                              <SelectItem key={country.id} value={country.id}>
                                {country.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-red-700">
                          {error && error.country ? error.country : null}
                        </p>
                      </div>
                    )}

                    {rule.ruleType === ERuleType.BETWEEN_REGION && (
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                          <Select
                            value={rule.regions?.country.id}
                            onValueChange={(value) => {
                              const country = supportedCountries?.find(
                                (country) => country.id === value
                              );
                              formik.setFieldValue(
                                `ruleSpecifications[${index}].regions.country`,
                                country
                              );
                              formik.setFieldValue(
                                `ruleSpecifications[${index}].regions.fromRegion`,
                                null
                              );
                              formik.setFieldValue(
                                `ruleSpecifications[${index}].regions.toRegion`,
                                null
                              );
                              if (country) {
                                getSupportedRegions(country.countryCode);
                              }
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select source country" />
                            </SelectTrigger>
                            <SelectContent>
                              {supportedCountries?.map((country) => (
                                <SelectItem key={country.id} value={country.id}>
                                  {country.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-red-700">
                            {error && error.regions && error.regions.country
                              ? error.regions.country
                              : null}
                          </p>
                        </div>
                        <div className="flex flex-row gap-2">
                          <div className="flex flex-col w-full">
                            <Select
                              disabled={!rule.regions?.country}
                              value={rule.regions?.fromRegion?.id}
                              onValueChange={(value) => {
                                const region = supportedRegions?.find(
                                  (region) => region.id === value
                                );
                                if (region) {
                                  formik.setFieldValue(
                                    `ruleSpecifications[${index}].regions.fromRegion`,
                                    region
                                  );
                                }
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select from region" />
                              </SelectTrigger>

                              <SelectContent>
                                {supportedRegions?.map((region) => (
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
                              {error &&
                              error.regions &&
                              error.regions.fromRegion
                                ? error.regions.fromRegion
                                : null}
                            </p>
                          </div>
                          <div className="flex flex-col w-full">
                            <Select
                              disabled={!rule.regions?.country}
                              value={rule.regions?.toRegion?.id}
                              onValueChange={(value) => {
                                const region = supportedRegions?.find(
                                  (region) => region.id === value
                                );
                                if (region) {
                                  formik.setFieldValue(
                                    `ruleSpecifications[${index}].regions.toRegion`,
                                    region
                                  );
                                }
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select to region" />
                              </SelectTrigger>
                              <SelectContent>
                                {supportedRegions?.map((region) => (
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
                              {error && error.regions && error.regions.toRegion
                                ? error.regions.toRegion
                                : null}
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
                          disabled={index !== 0 && isFirstRuleLockedType}
                          initialSelected={
                            rule.vehicleType
                              ? vehiclesData.filter((v) =>
                                  rule.vehicleType?.includes(v.value)
                                )
                              : []
                          }
                          onChange={(value) => {
                            const isFirstRule = index === 0;
                            if (isFirstRule && isFirstRuleLockedType) {
                              // Update all rules with the same vehicle type
                              const updatedRules = formik.values.ruleSpecifications.map((r) => ({
                                ...r,
                                vehicleType: value.map((item) => item.value),
                              }));
                              formik.setFieldValue('ruleSpecifications', updatedRules);
                            } else {
                              formik.setFieldValue(
                                `ruleSpecifications[${index}].vehicleType`,
                                value.map((item) => item.value)
                              );
                            }
                          }}
                        />
                        <p className="text-red-700">
                          {error && error.vehicleType
                            ? error.vehicleType
                            : null}
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
                              formik.setFieldValue(
                                `ruleSpecifications[${index}].passengersAmount`,
                                e.target.value
                              );
                            }}
                          />
                          {rule.passengersAmount && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {(() => {
                                // Get all NUMBER_OF_PASSENGERS rules sorted by passenger amount
                                const passengerRules = formik.values.ruleSpecifications
                                  .filter(r =>
                                    r.ruleType === ERuleType.NUMBER_OF_PASSENGERS &&
                                    r.passengersAmount !== undefined &&
                                    r.passengersAmount !== null &&
                                    !isNaN(r.passengersAmount)
                                  )
                                  .sort((a, b) => (a.passengersAmount || 0) - (b.passengersAmount || 0));

                                // Find the next rule with higher passenger amount
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
                            {error && error.passengersAmount
                              ? error.passengersAmount
                              : null}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <Select
                            value={rule.adjustmentType}
                            onValueChange={(value) => {
                              formik.setFieldValue(
                                `ruleSpecifications[${index}].adjustmentType`,
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
                            {error && error.adjustmentType
                              ? error.adjustmentType
                              : null}
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
                              formik.setFieldValue(
                                `ruleSpecifications[${index}].priceAdjustment`,
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
                            {error && error.priceAdjustment
                              ? error.priceAdjustment
                              : null}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
