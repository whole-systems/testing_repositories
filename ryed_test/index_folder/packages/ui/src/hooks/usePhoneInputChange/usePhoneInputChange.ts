import { FormikProps } from 'formik';
import { useCallback } from 'react';

export const usePhoneInputChange = (formik: FormikProps<any>) => {
  const handleChange = useCallback(
    (fieldName: string) => (value: string) => {
      formik.setFieldValue(fieldName, value);
    },
    [formik]
  );

  return handleChange;
};
