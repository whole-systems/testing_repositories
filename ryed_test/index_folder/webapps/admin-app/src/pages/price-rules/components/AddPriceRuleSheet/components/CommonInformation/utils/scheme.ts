import * as yup from 'yup';

export const scheme = yup.object().shape({
  name: yup.string().required('Name is required'),
  priority: yup.string().required('Priority is required'),
  typeOfJourney: yup.string().required('Type of journey is required'),
});
