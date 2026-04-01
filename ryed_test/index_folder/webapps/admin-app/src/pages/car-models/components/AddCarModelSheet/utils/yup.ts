import * as Yup from 'yup';

const year = new Date().getFullYear() + 1;

export const validationSchema = Yup.object().shape({
  year: Yup.number()
    .required('Year is required')
    .min(1990, 'Year must be from 1990')
    .max(year, `Year must be up to ${year}`),
  make: Yup.string().required('Make is required'),
  model: Yup.string().required('Model is required'),
});
