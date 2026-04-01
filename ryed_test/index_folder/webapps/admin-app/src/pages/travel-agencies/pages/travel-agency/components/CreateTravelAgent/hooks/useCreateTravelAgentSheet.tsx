import { useCallback, useEffect, useState } from 'react';

import { useFormik } from 'formik';
import { GoogleLocation } from '@/models/google';
import { validationSchema } from '../const/validationSchema';
import { useCreateTravelAgentMutation } from '@/api/travelAgentsEndpoints';
import { useParams } from 'react-router-dom';

const initValues = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  logo: null,
  supportedCountries: [],
  commissionAmount: 0,
  commissionType: 'FIXED',
  commissionIncludedInPrice: false,
  isDev: false,
  role: 'agent' as 'agent' | 'admin',
};

export const useCreateTravelAgentSheet = () => {
  const { agencyId } = useParams();
  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [location, setLocation] = useState<GoogleLocation | null>(null);

  const [createTravelAgent, { isLoading, isSuccess }] =
    useCreateTravelAgentMutation();

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
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('phoneNumber', values.phoneNumber);
      formData.append('email', values.email);

      formData.append(
        'supportedCountries',
        values.supportedCountries.join(',')
      );
      formData.append('commissionAmount', values.commissionAmount.toString());
      formData.append('commissionType', values.commissionType);
      formData.append('commissionIncludedInPrice', values.commissionIncludedInPrice.toString());
      formData.append('isDev', values.isDev.toString());
      formData.append('role', values.role);
      await createTravelAgent({ id: agencyId, formData });
    },
  });

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

      isLoading,
    },
    handlers: {
      setIsOpenSheet,
      handleLogoChange,
      handleLocation,
    },
  };
};
