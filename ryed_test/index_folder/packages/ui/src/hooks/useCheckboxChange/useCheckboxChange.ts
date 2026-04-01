import { CheckedState } from '@radix-ui/react-checkbox';
import { FormikProps } from 'formik';
import { useCallback } from 'react';

export const useCheckboxChange = (formik: FormikProps<any>) => {
  const handleChange = useCallback(
    (fieldName: string) => (checked: CheckedState) => {
      formik.setFieldValue(fieldName, checked);
    },
    [formik]
  );

  return handleChange;
};
