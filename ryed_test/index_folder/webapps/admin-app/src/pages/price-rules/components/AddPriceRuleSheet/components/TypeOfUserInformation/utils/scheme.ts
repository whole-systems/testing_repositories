import * as yup from 'yup';

export const scheme = yup.object().shape({
  typeOfUsers: yup.string().required('Type of users is required'),
  user: yup
    .object()
    .when('typeOfUsers', {
      is: (value: string) => value !== 'all',
      then: (schema) => schema.required('User is required'),
    })
    .nullable(),
});
