import { useFormik } from 'formik';
import { scheme } from '../utils/scheme';
import { useCallback } from 'react';
import { useState } from 'react';
import { usePriceRulesContext } from '../../../context/PriceRules/hooks/usePriceRulesContext';
import { EJourneyType } from '../../../../../../../models/price-rules';
export const priorityOptions = Array.from({ length: 100 }, (_, index) => ({
  label: (index + 1).toString(),
  value: (index + 1).toString(),
}));
export interface InitialCommonInformationValues {
  name: string;
  priority: string;
  typeOfJourney: EJourneyType;
}

const initialValues: InitialCommonInformationValues = {
  name: '',
  priority: '',
  typeOfJourney: EJourneyType.SCHEDULED,
};
export const useCommonInformation = () => {
  const { data: priceRulesData, handlers: priceRulesHandlers } =
    usePriceRulesContext();
  const formik = useFormik({
    initialValues:
      priceRulesData?.priceRulesData.commonInformation || initialValues,
    validationSchema: scheme,
    onSubmit: (values) => {
      priceRulesHandlers.handleSetPriceRuleData(values, 'commonInformation');
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
    isValid,
  } = formik;

  const [openPriorityCombobox, setOpenPriorityCombobox] = useState(false);

  const handleChangePriority = useCallback(
    async (value: string) => {
      setFieldValue('priority', value);
    },
    [setFieldValue]
  );

  return {
    data: {
      values,
      errors,
      openPriorityCombobox,
      isValid,
    },
    handlers: {
      handleChange,
      handleSubmit,
      setFieldValue,
      setOpenPriorityCombobox,
      handleChangePriority,
      submitForm,
    },
  };
};
