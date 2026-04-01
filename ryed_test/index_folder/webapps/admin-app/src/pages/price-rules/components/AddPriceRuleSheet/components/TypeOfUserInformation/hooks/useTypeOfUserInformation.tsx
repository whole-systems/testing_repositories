import { useFormik } from 'formik';
import { scheme } from '../utils/scheme';
import { useCallback, useState } from 'react';
import {
  useLazyGetAgenciesQuery,
  useLazyGetDispatchersQuery,
  useLazyGetAgentsQuery,
} from '../../../../../../../api/priceRulesEndpoints';
import { usePriceRulesContext } from '../../../context/PriceRules/hooks/usePriceRulesContext';
import { Dispatcher } from '@/models/dispatchers';
import { TravelAgency } from '@/models/travel-agencies';
import { TravelAgent } from '@/models/travel-agents';

export interface InitialTypeOfUserInformationValues {
  typeOfUsers: string;
  user: Dispatcher | TravelAgency | TravelAgent | null;
  agencyId: string;
}

const initialValues: InitialTypeOfUserInformationValues = {
  typeOfUsers: '',
  user: null,
  agencyId: '',
};

export const useTypeOfUserInformation = () => {
  const { data: priceRulesData, handlers: priceRulesHandlers } =
    usePriceRulesContext();
  const [getAgencies, { isFetching: isGetAgenciesFetching, data: agencies }] =
    useLazyGetAgenciesQuery();
  const [
    getDispatchers,
    { isFetching: isGetDispatchersFetching, data: dispatchers },
  ] = useLazyGetDispatchersQuery();
  const [getAgents, { isFetching: isGetAgentsFetching, data: agents }] =
    useLazyGetAgentsQuery();

  const formik = useFormik({
    initialValues: priceRulesData?.priceRulesData.typeOfUsers || initialValues,
    validationSchema: scheme,
    onSubmit: (values) => {
      priceRulesHandlers.handleSetPriceRuleData(values, 'typeOfUsers');
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
    isValid,
    submitForm,
  } = formik;

  const [openDispatcherCombobox, setOpenDispatcherCombobox] = useState(false);
  const [openTravelAgencyCombobox, setOpenTravelAgencyCombobox] =
    useState(false);
  const [openAgentCombobox, setOpenAgentCombobox] = useState(false);

  const handleChangeTypeOfUsers = useCallback(
    async (value: string) => {
      setFieldValue('typeOfUsers', value);
      setFieldValue('agencyId', '');
      if (value === 'dispatcher') {
        await getDispatchers();
        return;
      }
      if (value === 'travel-agency' || value === 'agent') {
        await getAgencies();
        return;
      }
    },
    [setFieldValue, getDispatchers, getAgencies]
  );

  const handleGetAgents = useCallback(
    async (value: string) => {
      setFieldValue('agencyId', value);
      if (value) {
        await getAgents(value);
      }
    },
    [getAgents, setFieldValue]
  );

  return {
    data: {
      values,
      errors,
      openDispatcherCombobox,
      openTravelAgencyCombobox,
      openAgentCombobox,
      isGetAgenciesFetching,
      isGetDispatchersFetching,
      isGetAgentsFetching,
      agencies,
      dispatchers,
      agents,
      isValid,
    },
    handlers: {
      handleChange,
      handleSubmit,
      setFieldValue,
      setOpenDispatcherCombobox,
      setOpenTravelAgencyCombobox,
      setOpenAgentCombobox,
      handleChangeTypeOfUsers,
      handleGetAgents,
      submitForm,
      handlePreviousStep: priceRulesHandlers.handlePreviousStep,
    },
  };
};
