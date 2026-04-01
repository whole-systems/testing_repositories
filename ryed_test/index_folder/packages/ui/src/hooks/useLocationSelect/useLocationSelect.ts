import { FormikProps } from 'formik';
import { useCallback } from 'react';
import { ILocation } from './types';

export const useLocationSelect = (formik: FormikProps<any>) => {
  const handleLocationChange = useCallback(
    (fieldName: string) => (location: ILocation | null) => {
      formik.setFieldValue(fieldName, location);
    },
    [formik]
  );

  return handleLocationChange;
};
