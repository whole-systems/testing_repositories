import { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { validationSchema } from '../const/validationSchema';
import {
  useGetTravelAgencyQuery,
  useUpdateTravelAgencyMutation,
} from '@/api/travelAgenciesEndpoints';
import { useGetDispatcherQuery } from '@/api/dispatchersEndpoints';
import { toast } from 'sonner';

const initValues = {
  name: '',
  phoneNumber: '',
  description: '',
  isVatEnabled: true,
  defaultVat: 0,
  supportsShuttles: false,
  supportEmail: '',
  logo: null,
  exclusiveDispatcherId: '',
  exclusivePeriod: '',
  supportedCountries: [''],
  isWebhookCreationEnabled: false,
  commissionAmount: 0,
  commissionType: 'FIXED',
  commissionIncludedInPrice: false,
  isDev: false,
};

export const useUpdateTravelAgencySheet = (agencyId: string) => {
  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isExclusiveDispatcherOpen, setExclusiveDispatcherOpen] =
    useState(false);
  const [dispatchersList, setDispatchersList] = useState<
    { value: string; label: string }[]
  >([]);

  const { data: travelAgency } = useGetTravelAgencyQuery(agencyId, {
    skip: !isOpenSheet,
  });
  const { data: dispatchers } = useGetDispatcherQuery('');
  const [updateTravelAgency, { isLoading, isSuccess }] =
    useUpdateTravelAgencyMutation();

  useEffect(() => {
    if (isSuccess) {
      setIsOpenSheet(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (dispatchers) {
      const list = dispatchers.map((item) => ({
        value: item.id,
        label: item.companyName,
      }));
      setDispatchersList(list);
    }
  }, [dispatchers]);

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
      formData.append('isVatEnabled', String(values.isVatEnabled));
      formData.append('defaultVat', String(values.defaultVat));
      formData.append('commissionAmount', String(values.commissionAmount));
      formData.append('commissionType', values.commissionType);
      formData.append(
        'commissionIncludedInPrice',
        String(values.commissionIncludedInPrice)
      );
      formData.append('supportsShuttles', String(values.supportsShuttles));
      formData.append('isDev', String(values.isDev));
      try {
        await updateTravelAgency({ id: agencyId, data: formData });
      } catch (error) {
        toast.error('Failed to update travel agency');
      }
    },
  });

  useEffect(() => {
    if (travelAgency) {
      setLogoPreview(travelAgency.logoUrl || null);

      formik.setValues({
        name: travelAgency.name,
        phoneNumber: travelAgency.phoneNumber,
        description: travelAgency.description || '',
        supportEmail: travelAgency.supportEmail,
        supportedCountries: travelAgency.supportedCountries,
        exclusiveDispatcherId: travelAgency.dispatcherOrderrerExclusivity?.dispatcherId || '',
        exclusivePeriod: travelAgency.exclusivePeriod || '',
        logo: null,
        isVatEnabled: travelAgency.isVatEnabled,
        defaultVat: travelAgency.defaultVat || 0,
        supportsShuttles: travelAgency.supportsShuttles,
        isWebhookCreationEnabled:
          travelAgency.isWebhookCreationEnabled || false,
        commissionAmount: travelAgency.commissionAmount || 0,
        commissionType: travelAgency.commissionType || 'PERCENTAGE',
        commissionIncludedInPrice:
          travelAgency.commissionIncludedInPrice || false,
        isDev: travelAgency.isDev || false,
      });
    }
  }, [travelAgency]);

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

  return {
    data: {
      isOpenSheet,
      formik,
      logoPreview,
      dispatchersList,
      isExclusiveDispatcherOpen,
      isLoading,
    },
    handlers: {
      setIsOpenSheet,
      handleLogoChange,
      setExclusiveDispatcherOpen,
    },
  };
};
