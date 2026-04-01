import { useFormik } from 'formik';
import { scheme, schemeWithoutPriceFields } from '../utils/scheme';
import { initialValues } from '../utils/consts';
import { InitialEffectsInformationValues } from '../utils/models';
import { useCallback, useMemo } from 'react';
import { getTimezoneForCountryName } from '@ryed-ui/utils/parseTime';
import { usePriceRulesContext } from '../../../context/PriceRules/hooks/usePriceRulesContext';
import { EAdjustmentType, ERuleType } from '@/models/price-rules';

export const useEffectsInformation = () => {
  const { data: priceRulesData, handlers: priceRulesHandlers } =
    usePriceRulesContext();

  const hasNumberOfPassengersRule = useMemo(() => {
    return priceRulesData?.priceRulesData.ruleSpecifications?.some(
      (rule) => rule.ruleType === ERuleType.NUMBER_OF_PASSENGERS
    );
  }, [priceRulesData]);

  const formik = useFormik<InitialEffectsInformationValues>({
    initialValues:
      priceRulesData?.priceRulesData.effectsInformation || initialValues,
    validationSchema: hasNumberOfPassengersRule ? schemeWithoutPriceFields : scheme,
    onSubmit: (values) => {
      priceRulesHandlers.handleSetPriceRuleData(values, 'effectsInformation');
      priceRulesHandlers.handleNextStep();
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
    submitForm,
  } = formik;

  const handleChangeTypeOfPrice = useCallback(
    (value: EAdjustmentType) => {
      setFieldValue('typeOfPrice', value);
    },
    [setFieldValue]
  );
  const handleChangeValueOfPrice = useCallback(
    (value: string) => {
      setFieldValue('valueOfPrice', value);
    },
    [setFieldValue]
  );
  const handleChangeEffectsTime = useCallback(
    (value: string, type: 'effectsFrom' | 'effectsTo') => {
      setFieldValue(type, value);
    },
    [setFieldValue]
  );
  const timezoneForCountry = useMemo(() => {
    const country = priceRulesData?.priceRulesData.ruleSpecifications?.find(
      (f) => f.country
    )?.country;
    if (!country) return;
    return getTimezoneForCountryName(country.name);
  }, [priceRulesData]);

  return {
    data: { values, errors, timezoneForCountry, hasNumberOfPassengersRule },
    handlers: {
      handleChange,
      handleSubmit,
      handleChangeTypeOfPrice,
      handleChangeValueOfPrice,
      submitForm,
      priceRulesHandlers,
      handleChangeEffectsTime,
    },
  };
};
