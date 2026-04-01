import { useFormik } from 'formik';
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  IFormErrors,
  InitialRuleSpecificationsInformationValues,
} from '../utils/models';
import { initialValues } from '../utils/consts';
import { EAdjustmentType, ERuleType } from '@/models/price-rules';
import { schema } from '../utils/scheme';
import {
  useLazyGetSupportedCountriesQuery,
  useLazyGetSupportedRegionsQuery,
} from '@/api/priceRulesEndpoints';
import { usePriceRulesContext } from '../../../context/PriceRules/hooks/usePriceRulesContext';

export const useRuleSpecificationsInformation = () => {
  const { data: priceRulesData, handlers: priceRulesHandlers } =
    usePriceRulesContext();
  const [getSupportedCountries, { data: supportedCountries }] =
    useLazyGetSupportedCountriesQuery();
  const [getSupportedRegions, { data: supportedRegions }] =
    useLazyGetSupportedRegionsQuery();

  const formik = useFormik<InitialRuleSpecificationsInformationValues[]>({
    initialValues:
      priceRulesData?.priceRulesData.ruleSpecifications || initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      priceRulesHandlers.handleSetPriceRuleData(values, 'ruleSpecifications');
      priceRulesHandlers.handleNextStep();
    },
    validateOnBlur: false,
    validateOnChange: false,
  });
  const { values, errors, handleSubmit, setValues, submitForm } = formik;
  const typedErrors = errors as IFormErrors;

  const handleAddRule = useCallback(() => {
    const firstRuleType = values[0]?.ruleType;
    const firstVehicleType = values[0]?.vehicleType;
    const isLockedType =
      firstRuleType === ERuleType.NUMBER_OF_PASSENGERS;
    const newRuleType = isLockedType ? firstRuleType : ERuleType.STATIC;
    const newVehicleType = isLockedType ? firstVehicleType : undefined;
    setValues([...values, { id: uuidv4(), ruleType: newRuleType, vehicleType: newVehicleType }]);
  }, [values, setValues]);

  const handleRemoveRule = useCallback(
    (id: string) => {
      setValues(values.filter((value) => value.id !== id));
    },
    [values, setValues]
  );

  const handleChangeRuleType = useCallback(
    async (id: string, ruleType: ERuleType) => {
      const isFirstRule = values[0]?.id === id;
      const isLockedType =
        ruleType === ERuleType.NUMBER_OF_PASSENGERS;

      if (isFirstRule && isLockedType) {
        const firstVehicleType = values[0]?.vehicleType;
        setValues(values.map((value) => ({ ...value, ruleType, vehicleType: firstVehicleType })));
      } else {
        setValues(
          values.map((value) =>
            value.id === id ? { ...value, ruleType } : value
          )
        );
      }

      if (
        ruleType === ERuleType.FROM_SOURCE_COUNTRY ||
        ruleType === ERuleType.BETWEEN_REGION
      ) {
        await getSupportedCountries();
      }
    },
    [values, setValues, getSupportedCountries]
  );

  const handleChangeDaysOfWeek = useCallback(
    (id: string, daysOfWeek: string[]) => {
      setValues(
        values.map((value) =>
          value.id === id ? { ...value, daysOfWeek } : value
        )
      );
    },
    [values, setValues]
  );

  const handleChangeVehicleType = useCallback(
    (id: string, vehicleType: string[]) => {
      const isFirstRule = values[0]?.id === id;
      const ruleType = values[0]?.ruleType;
      const isLockedType =
        ruleType === ERuleType.NUMBER_OF_PASSENGERS;

      if (isFirstRule && isLockedType) {
        setValues(values.map((value) => ({ ...value, vehicleType })));
      } else {
        setValues(
          values.map((value) =>
            value.id === id ? { ...value, vehicleType } : value
          )
        );
      }
    },
    [values, setValues]
  );

  const handleChangeHoursOfDays = useCallback(
    (id: string, value: string, type: 'startHourOfDays' | 'stopHourOfDays') => {
      setValues(
        values.map((rule) =>
          rule.id === id
            ? {
                ...rule,
                hoursOfDays: rule.hoursOfDays
                  ? { ...rule.hoursOfDays, [type]: value }
                  : { startHourOfDays: '', stopHourOfDays: '', [type]: value },
              }
            : rule
        )
      );
    },
    [values, setValues]
  );

  const handleChangeFromSourceCountry = useCallback(
    (id: string, value: string) => {
      const foundCountry = supportedCountries?.find(
        (country) => country.id === value
      );
      if (!foundCountry) return;
      setValues(
        values.map((rule) =>
          rule.id === id ? { ...rule, country: foundCountry } : rule
        )
      );
    },
    [values, setValues, supportedCountries]
  );

  const handleChangeCountryForRegions = useCallback(
    async (id: string, value: string) => {
      const foundCountry = supportedCountries?.find(
        (country) => country.id === value
      );
      if (!foundCountry) return;
      setValues(
        values.map((rule) =>
          rule.id === id
            ? {
                ...rule,
                regions: {
                  country: foundCountry,
                  fromRegion: undefined,
                  toRegion: undefined,
                },
              }
            : rule
        )
      );
      await getSupportedRegions(foundCountry.countryCode);
    },
    [values, setValues, getSupportedRegions, supportedCountries]
  );

  const handleChangeRegion = useCallback(
    (id: string, value: string, type: 'fromRegion' | 'toRegion') => {
      const foundRegion = supportedRegions?.find(
        (region) => region.id === value
      );
      if (!foundRegion) return;
      setValues(
        values.map((rule) =>
          rule.id === id
            ? {
                ...rule,
                regions: {
                  ...rule.regions,
                  country: rule.regions!.country,
                  [type]: foundRegion,
                },
              }
            : rule
        )
      );
    },
    [values, setValues, supportedRegions]
  );

  const handleChangePassengersAmount = useCallback(
    (id: string, passengersAmount: number) => {
      setValues(
        values.map((value) =>
          value.id === id ? { ...value, passengersAmount } : value
        )
      );
    },
    [values, setValues]
  );

  const handleChangeAdjustmentType = useCallback(
    (id: string, adjustmentType: EAdjustmentType) => {
      setValues(
        values.map((value) =>
          value.id === id ? { ...value, adjustmentType } : value
        )
      );
    },
    [values, setValues]
  );

  const handleChangePriceAdjustment = useCallback(
    (id: string, priceAdjustment: number | undefined) => {
      setValues(
        values.map((value) =>
          value.id === id ? { ...value, priceAdjustment } : value
        )
      );
    },
    [values, setValues]
  );

  const isFirstRuleLockedType = values[0]?.ruleType === ERuleType.NUMBER_OF_PASSENGERS;

  return {
    data: {
      values,
      errors: typedErrors,
      supportedCountries,
      supportedRegions,
      isFirstRuleLockedType,
    },
    handlers: {
      handleSubmit,
      handleAddRule,
      handleRemoveRule,
      handleChangeRuleType,
      handleChangeDaysOfWeek,
      handleChangeVehicleType,
      handleChangeHoursOfDays,
      handleChangeFromSourceCountry,
      handleChangeCountryForRegions,
      handleChangeRegion,
      handleChangePassengersAmount,
      handleChangeAdjustmentType,
      handleChangePriceAdjustment,
      priceRulesHandlers,
      submitForm,
    },
  };
};
