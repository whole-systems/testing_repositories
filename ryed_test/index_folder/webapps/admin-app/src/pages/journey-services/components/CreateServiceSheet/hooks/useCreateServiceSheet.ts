import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useCreateServiceMutation } from '@/api/journeyServicesEndpoints';
import { validationSchema } from '../consts/validationSchema';
import { useGetDefaultCurrenciesQuery } from '@/api/configEndpoints/configEndpoints';
import { getCurrencyCodeFromCountry } from '@/utils/getCurrencyCodeFromCountry/getCurrencyCodeFromCountry';
import { useGetSupportedCountriesQuery } from '@/api/regionsEndpoints';
import { useSearchParams } from 'react-router-dom';

const initValues = {
  name: '',
  type: 'BRING_WITH',
  active: true,
  maxItems: 1,
  currency: 'USD',
  price: '',
  isFrontFacing: false,
  //   dispatcherId: '',
};

export const useCreateServiceSheet = () => {
  const [searchParams] = useSearchParams();
  const countryId = searchParams.get('countryId');

  const [createServiceAPI, { isLoading, isSuccess }] =
    useCreateServiceMutation();
  const { data: defaultCurrencies } = useGetDefaultCurrenciesQuery({});
  const { data: supportedCoutries } = useGetSupportedCountriesQuery();
  const [currencyList, setCurrencyList] = useState<string[]>([]);

  const [isOpenSheet, setIsOpenSheet] = useState(false);

  useEffect(() => {
    const country = supportedCoutries?.find(
      (country) => country.id === countryId
    );
    const currencyCode = getCurrencyCodeFromCountry(country?.name ?? '');

    if (currencyCode) {
      setCurrencyList(currencyCode === 'USD' ? ['USD'] : ['USD', currencyCode]);
    }
  }, [countryId, defaultCurrencies, supportedCoutries]);

  const formik = useFormik({
    initialValues: initValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const data = {
        supportedCountryId: countryId,
        name: values.name.toString(),
        type: values.type,
        active: values.active,
        maxItems: +values.maxItems,
        price: +values.price,
        currency: values.currency,
        isFrontFacing: values.isFrontFacing,
      };
      await createServiceAPI(data);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      formik.resetForm();
      setIsOpenSheet(false);
    }
  }, [isSuccess]);

  return {
    data: { isOpenSheet, formik, isLoading, currencyList },
    handlers: { setIsOpenSheet },
  };
};
