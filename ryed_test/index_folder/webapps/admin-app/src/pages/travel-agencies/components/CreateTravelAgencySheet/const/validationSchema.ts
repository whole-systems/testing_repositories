import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(
      /^\+?(\d{1,3})[ -]?(\(\d{1,3}\)|\d{1,3})[ -]?(\d{1,4})[ -]?(\d{1,4})[ -]?(\d{1,4})$/
    )
    .required('Phone number is required'),
  name: Yup.string().required('Name is required'),
  description: Yup.string(),
  supportEmail: Yup.string().email().required('Email is required'),
  logo: Yup.mixed(),
  supportedCountries: Yup.array()
    .min(1, 'At least one country must be selected')
    .required('The countries field is required'),
  defaultVat: Yup.number().required('Vat is Required'),
  commissionAmount: Yup.number()
    .min(0, 'Must be >= 0')
    .required('Commission amount is required'),
  commissionType: Yup.string()
    .oneOf(['PERCENTAGE', 'FIXED'])
    .required('Commission type is required'),
  commissionIncludedInPrice: Yup.boolean().required(
    'Commission included in price is required'
  ),
  isDev: Yup.boolean().required('isDev is required'),
});
