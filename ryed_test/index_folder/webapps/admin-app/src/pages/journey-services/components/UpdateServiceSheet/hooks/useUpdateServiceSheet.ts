import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import {
  useUpdateServiceMutation,
  useGetServicesQuery,
} from '@/api/journeyServicesEndpoints';
import { validationSchema } from '../consts/validationSchema';
import { Service } from '@/models/journey-services';
import { getCurrencyCodeFromCountry } from '@/utils/getCurrencyCodeFromCountry/getCurrencyCodeFromCountry';
import { useSearchParams } from 'react-router-dom';
import { useGetSupportedCountriesQuery } from '@/api/regionsEndpoints';
import { useGetDefaultCurrenciesQuery } from '@/api/configEndpoints/configEndpoints';

const initValues = {
  name: '',
  type: 'BRING_WITH',
  active: true,
  isFrontFacing: false,
  maxItems: 1,
  price: '',
  currency: 'USD',
  // dispatcherId: '',
};

export const useUpdateServiceSheet = (serviceId: string) => {
  const [searchParams] = useSearchParams();
  const countryId = searchParams.get('countryId');

  const [updateServiceAPI, { isLoading, isSuccess }] =
    useUpdateServiceMutation();
  const { data: defaultCurrencies } = useGetDefaultCurrenciesQuery({});
  const { data: supportedCoutries } = useGetSupportedCountriesQuery();
  const { data: services } = useGetServicesQuery();
  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const [currencyList, setCurrencyList] = useState<string[]>([]);

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
        name: values.name.toString(),
        type: values.type,
        active: values.active,
        maxItems: +values.maxItems,
        price: +values.price,
        currency: values.currency,
        isFrontFacing: values.isFrontFacing,
      };
      await updateServiceAPI({ id: serviceId, data });
    },
  });

  useEffect(() => {
    if (services) {
      const service = services.find(
        (service: Service) => service.id === serviceId
      );
      formik.setValues({
        name: service?.name || '',
        type: service?.type || 'BRING_WITH',
        active: service?.active || true,
        maxItems: service?.maxItems || 1,
        price: service?.price?.toString() || '',
        currency: service?.currency || 'USD',
        isFrontFacing: service?.isFrontFacing || false,
        // dispatcherId: service?.dispatcherId || '',
      });
    }
  }, [services]);

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
