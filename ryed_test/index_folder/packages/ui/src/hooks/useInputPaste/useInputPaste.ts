import { useRefValue } from '@ryed-ui/hooks/useRefValue';
import { FormikProps } from 'formik';
import { useCallback } from 'react';

export const useInputPaste = <TValues extends object>(
  formik: FormikProps<TValues>,
  format: (value: string) => string
) => {
  const formatRef = useRefValue(format);

  const handlePaste = useCallback(
    (fieldName: string) => (e: React.ClipboardEvent<HTMLInputElement>) => {
      const formattedValue = formatRef.current(e.clipboardData.getData('Text'));
      formik.setFieldValue(fieldName, formattedValue);

      e.preventDefault();
    },
    [formatRef, formik]
  );

  return handlePaste;
};
