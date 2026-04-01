import { FormikProps } from 'formik';
import { useCallback } from 'react';
import { IClient } from './types';

export const useClientSelection = <TValues extends object>(
  formik: FormikProps<TValues>
) => {
  const handleClientSelect = useCallback(
    (client: IClient) => {
      client.firstName && formik.setFieldValue('firstName', client.firstName);
      client.lastName && formik.setFieldValue('lastName', client.lastName);
      client.email && formik.setFieldValue('email', client.email);
      client.phoneNumber &&
        formik.setFieldValue('phoneNumber', client.phoneNumber);
    },
    [formik]
  );

  return handleClientSelect;
};
