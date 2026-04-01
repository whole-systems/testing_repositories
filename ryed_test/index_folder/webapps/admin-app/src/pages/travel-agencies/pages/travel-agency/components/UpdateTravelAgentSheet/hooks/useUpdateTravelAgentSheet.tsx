import { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { validationSchema } from '../const/validationSchema';
import {
  useGetTravelAgentByIdQuery,
  useUpdateTravelAgentMutation,
} from '@/api/travelAgentsEndpoints';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const initValues = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  logo: null,
  supportedCountries: [''],
  commissionAmount: 0,
  commissionType: 'FIXED',
  commissionIncludedInPrice: false,
  isDev: false,
  role: 'agent' as 'agent' | 'admin',
};

export const useUpdateTravelAgentSheet = (travelAgentId: string) => {
  const { agencyId } = useParams();
  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const { data: travelAgent } = useGetTravelAgentByIdQuery({
    agencyId: agencyId!,
    travelAgentId: travelAgentId,
  });

  const [updateTravelAgent, { isLoading, isSuccess }] =
    useUpdateTravelAgentMutation();

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
      if (agencyId) {
        await updateTravelAgent({ agencyId, travelAgentId, formData });
      } else {
        toast.error('Unknown Agency id');
      }
    },
  });

  useEffect(() => {
    if (travelAgent) {
      setLogoPreview(travelAgent.logo || null);
      formik.setValues({
        firstName: travelAgent.firstName,
        lastName: travelAgent.lastName,
        phoneNumber: travelAgent.phoneNumber,
        email: travelAgent.email,
        supportedCountries: travelAgent.supportedCountries,
        logo: null,
        commissionAmount: travelAgent.commissionAmount || 0,
        commissionType: travelAgent.commissionType || 'FIXED',
        commissionIncludedInPrice: travelAgent.commissionIncludedInPrice || false,
        isDev: travelAgent.isDev || false,
        role: travelAgent.role || 'agent',
      });
    }
  }, [travelAgent]);

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

      isLoading,
    },
    handlers: {
      setIsOpenSheet,
      handleLogoChange,
    },
  };
};
