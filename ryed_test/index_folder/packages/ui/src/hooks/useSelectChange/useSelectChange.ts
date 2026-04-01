import { FormikProps } from 'formik';
import { useCallback } from 'react';

export const useSelectChange = <TFormikValues extends object>(
  formik: FormikProps<TFormikValues>
) => {
  const onChange = useCallback(
    (fieldName: string) => (value: string) => {
      formik.setFieldValue(fieldName, value);
    },
    [formik]
  );

  return onChange;
};
