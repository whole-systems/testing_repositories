import { useCallback, useEffect, useState } from 'react';
import { validationSchema } from '../consts/validationSchema';
import { useFormik } from 'formik';
import { GoogleLocation } from '@/models/google';
import {
  useGetDispatcherByIdQuery,
  useUpdateDispatcherMutation,
} from '@/api/dispatchersEndpoints';

const initValues = {
  companyName: '',
  phoneNumber: '',
  email: '',
  logo: null,
  lat: '',
  lng: '',
  address: '',
  isMultiDriverApproval: false,
  supportedCountries: ['Israel'],
  defaultVat: 0,
  commissionAmount: 0,
  commissionType: 'FIXED',
  commissionIncludedInPrice: false,
  isDev: false,
};

export const useUpdateDispatcherSheet = (dispatcherId: string) => {
  const { data: dispatcher } = useGetDispatcherByIdQuery(dispatcherId);
  const [updateDispatcherAPI, { isLoading }] = useUpdateDispatcherMutation();
  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [location, setLocation] = useState<GoogleLocation | null>(null);
  const formik = useFormik({
    initialValues: initValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = new FormData();
      if (values.logo) {
        formData.append('logo', values.logo);
      }
      formData.append('companyName', values.companyName);
      formData.append('email', values.email);
      formData.append('phoneNumber', values.phoneNumber);
      formData.append('lat', values.lat);
      formData.append('lng', values.lng);
      formData.append('address', values.address);
      formData.append('defaultVat', String(values.defaultVat));
      formData.append(
        'isMultiDriverApproval',
        String(values.isMultiDriverApproval)
      );
      formData.append(
        'supportedCountries',
        values.supportedCountries.join(',')
      );
      formData.append('commissionAmount', values.commissionAmount.toString());
      formData.append('commissionType', values.commissionType);
      formData.append('commissionIncludedInPrice', values.commissionIncludedInPrice.toString());
      formData.append('isDev', values.isDev.toString());
      await updateDispatcherAPI({ id: dispatcherId, data: formData });
    },
  });
  useEffect(() => {
    if (dispatcher) {
      formik.setValues({
        companyName: dispatcher.companyName,
        phoneNumber: dispatcher.phoneNumber || '',
        email: dispatcher.email,
        logo: null,
        lat: dispatcher.location.lat.toString() || '',
        lng: dispatcher.location.lng.toString() || '',
        address: dispatcher.metadata?.address || '',
        isMultiDriverApproval:
          dispatcher.features?.isMultiDriverApproval || false,
        supportedCountries: dispatcher.supportedCountries,
        defaultVat: dispatcher.defaultVat,
        commissionAmount: dispatcher.commissionAmount || 0,
        commissionType: dispatcher.commissionType || 'PERCENTAGE',
        commissionIncludedInPrice: dispatcher.commissionIncludedInPrice || false,
        isDev: dispatcher.isDev || false,
      });
    }
  }, [dispatcher]);

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
      formik.setFieldValue('address', location.formattedAddress);
    },
    [formik]
  );

  return {
    data: { isOpenSheet, formik, logoPreview, location, isLoading, dispatcher },
    handlers: { setIsOpenSheet, handleLogoChange, handleLocation },
  };
};
