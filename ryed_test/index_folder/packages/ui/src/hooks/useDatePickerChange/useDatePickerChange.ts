import { TDatePickerOutputValue } from '@ryed-ui/ui/DatePicker';
import { FormikProps } from 'formik';
import { useCallback } from 'react';

export const useDatePickerChange = <TValues extends object>(
  formik: FormikProps<TValues>
) => {
  const handleChange = useCallback(
    (fieldName: string) => (date: TDatePickerOutputValue) => {
      formik.setFieldValue(fieldName, date);
    },
    [formik]
  );

  return handleChange;
};
