import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  carPriceUSD: Yup.number()
    .required('Car price is required')
    .min(1000, 'Car price must be from 1000')
    .max(10000000, `Car price must be to 10000000`),
  tripPricePerKm: Yup.number().required('Trip price per km is required'),
  tripPricePerMinute: Yup.number().required(
    'Trip price per minute is required'
  ),
  tripMinPrice: Yup.number().required('Trip min price is required'),
  numberOfSits: Yup.number().required('Number of sitsis required'),
});
