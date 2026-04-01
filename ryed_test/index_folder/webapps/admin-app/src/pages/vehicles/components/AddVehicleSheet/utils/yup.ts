import * as Yup from 'yup';

const year = new Date().getFullYear();

export const validationSchema = Yup.object().shape({
  exclusivityLevel: Yup.string().required("It's required field"),
  type: Yup.string().required("It's required field"),
  year: Yup.number()
    .required('Year is required')
    .min(1990, 'Year must be from 1990')
    .max(year, `Year must be up to ${year}`),
  make: Yup.string().required('Make is required'),
  model: Yup.string().required('Model is required'),
  registeredNumber: Yup.string().required('Register number is required'),
  carPriceUSD: Yup.number()
    .required('Car price is required')
    .min(1000, 'Car price must be from 1000')
    .max(1000000, `Car price must be from 1000000`),
  tripPricePerKm: Yup.number().required('Trip price per km is required'),
  tripPricePerMinute: Yup.number().required(
    'Trip price per minute is required'
  ),

  tripMinPrice: Yup.number().required('Trip min price is required'),
  numberOfSits: Yup.number().required('Number of sits is required'),
  color: Yup.string().required('Color is required'),
});
