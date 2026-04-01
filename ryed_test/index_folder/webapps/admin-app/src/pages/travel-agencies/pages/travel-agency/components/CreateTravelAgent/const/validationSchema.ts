import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(
      /^\+?(\d{1,3})[ -]?(\(\d{1,3}\)|\d{1,3})[ -]?(\d{1,4})[ -]?(\d{1,4})[ -]?(\d{1,4})$/
    )
    .required('Phone number is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email().required('Email is required'),
  logo: Yup.mixed().nullable().optional(),
  role: Yup.string().oneOf(['agent', 'admin']).required('Role is required'),
  supportedCountries: Yup.array()
    .min(1, 'At least one country must be selected')
    .required('The countries field is required'),
});
