import { useCallback, useEffect, useState } from 'react';

import { useFormik } from 'formik';
import { GoogleLocation } from '@/models/google';
import { validationSchema } from '../const/validationSchema';
import { useGetDispatcherQuery } from '@/api/dispatchersEndpoints';
import { useCreateTravelAgencyMutation } from '@/api/travelAgenciesEndpoints';

const initValues = {
  name: '',
  phoneNumber: '',
  description: '',
  supportEmail: '',
  logo: null,
  exclusiveDispatcherId: '',
  exclusivePeriod: '',
  supportedCountries: [],
  isVatEnabled: true,
  defaultVat: 0,
  supportsShuttles: false,
  isWebhookCreationEnabled: false,
  commissionAmount: 0,
  commissionType: 'FIXED',
  commissionIncludedInPrice: false,
  isDev: false,
};

export const useCreateTravelAgencySheet = () => {
  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [location, setLocation] = useState<GoogleLocation | null>(null);
  const [isExclusiveDispatcherOpen, setExclusiveDispatcherOpen] =
    useState(false);
  const { data: dispatchers } = useGetDispatcherQuery('');
  const [dispatchersList, setDispatchersList] = useState<
    { value: string; label: string }[]
  >([]);
  const [createTravelAgency, { isLoading, isSuccess }] =
    useCreateTravelAgencyMutation();

  useEffect(() => {
    if (isSuccess) {
      setIsOpenSheet(false);
    }
  }, [isSuccess]);

  const formik = useFormik({
    initialValues: initValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const formData = new FormData();
      if (values.logo) {
        formData.append('logo', values.logo);
      }
      formData.append('name', values.name);
      formData.append('phoneNumber', values.phoneNumber);
      formData.append('description', values.description);
      formData.append('supportEmail', values.supportEmail);
      formData.append(
        'isWebhookCreationEnabled',
        String(values.isWebhookCreationEnabled)
      );
      formData.append('exclusiveDispatcherId', values.exclusiveDispatcherId);
      formData.append(
        'supportedCountries',
        values.supportedCountries.join(',')
      );
      formData.append('defaultVat', String(values.defaultVat));
      formData.append('isVatEnabled', String(values.isVatEnabled));
      formData.append('supportsShuttles', String(values.supportsShuttles));
      formData.append('commissionAmount', String(values.commissionAmount));
      formData.append('commissionType', values.commissionType);
      formData.append('commissionIncludedInPrice', String(values.commissionIncludedInPrice));
      formData.append('isDev', String(values.isDev));
      await createTravelAgency(formData);
    },
  });

  useEffect(() => {
    if (dispatchers) {
      const list = dispatchers.map((item) => ({
        value: item.id,
        label: item.companyName,
      }));
      setDispatchersList(list);
    }
  }, [dispatchers]);

  const handleLogoChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        if (file.type === 'image/svg+xml') {
          e.target.value = '';
        } else {
          formik.setFieldValue('logo', file);
          const reader = new FileReader();
          reader.onloadend = () => {
            setLogoPreview(reader.result as string);
          };
          reader.readAsDataURL(file);
        }
      }
    },
    [formik]
  );

  const handleLocation = useCallback(
    (location: GoogleLocation) => {
      setLocation(location);

      formik.setFieldValue('lat', location.latitude.toString());
      formik.setFieldValue('lng', location.longitude.toString());
    },
    [formik]
  );

  return {
    data: {
      isOpenSheet,
      formik,
      logoPreview,
      location,
      dispatchersList,
      isExclusiveDispatcherOpen,
      isLoading,
    },
    handlers: {
      setIsOpenSheet,
      handleLogoChange,
      handleLocation,
      setExclusiveDispatcherOpen,
    },
  };
};
