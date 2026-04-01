import * as yup from 'yup';

export const scheme = yup.object().shape({
  typeOfPrice: yup.string().required('Type of price is required'),
  valueOfPrice: yup
    .string()
    .required('Value of price is required')
    .test('valid-number', 'Please enter a valid number', (value) => {
      if (!value) return true;
      const number = Number(value);
      return !isNaN(number) && isFinite(number);
    }),
});

export const schemeWithoutPriceFields = yup.object().shape({
  typeOfPrice: yup.string().nullable(),
  valueOfPrice: yup.string().nullable(),
});
