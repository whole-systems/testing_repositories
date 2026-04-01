import { SERVICES_TYPES } from '@/pages/journey-services/consts/types';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Service name is required'),
  type: Yup.string()
    .oneOf(Object.values(SERVICES_TYPES), 'Invalid service type')
    .required('Service type is required'),
  active: Yup.boolean().required('Active status is required'),
  maxItems: Yup.number()
    .min(1, 'Must allow at least 1 item')
    .required('Maximum items is required'),
  price: Yup.string()
    .matches(/^\d+(\.\d{1,2})?$/, 'Must be a valid price (e.g., 10.99)')
    .required('Price is required'),
  isFrontFacing: Yup.boolean().required('Front Facing is required'),
  // dispatcherId: Yup.string(),
});
