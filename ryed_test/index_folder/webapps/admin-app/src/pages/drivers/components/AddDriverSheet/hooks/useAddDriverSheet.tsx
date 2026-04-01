import { useCreateDriverMutation } from '@/api/driversEndpoints';
import { useFormik } from 'formik';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { validationSchema } from '../utils/yup';

interface FormValues {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  [key: string]: string;
}

export const useAddDriverSheet = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
    },
    validationSchema,
    validateOnChange: true,
    onSubmit: () => {},
  });

  const [
    createDriverMutation,
    { isSuccess, isLoading: isCreatingDriver, isError },
  ] = useCreateDriverMutation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = useCallback((newDrawerState: boolean) => {
    setIsDrawerOpen(newDrawerState);
  }, []);

  const disabledFormBtn = useMemo(() => {
    if (Object.keys(formik.errors).length) {
      return true;
    }
    const emptyField = Object.keys(formik.values).some(
      (item) => !formik.values[item]
    );
    return emptyField;
  }, [formik]);

  useEffect(() => {
    if (isSuccess) {
      toggleDrawer(false);
      toast.success('Driver created successfully.');
    }
  }, [isSuccess, toggleDrawer]);

  useEffect(() => {
    if (isError) {
      toast.error('Failed to create driver.');
    }
  }, [isError]);

  const createDriver = useCallback(() => {
    createDriverMutation(formik.values);
  }, [formik, createDriverMutation]);

  return {
    data: { isDrawerOpen, formik, disabledFormBtn },
    handlers: { toggleDrawer, createDriver },
    isCreatingDriver,
  };
};
