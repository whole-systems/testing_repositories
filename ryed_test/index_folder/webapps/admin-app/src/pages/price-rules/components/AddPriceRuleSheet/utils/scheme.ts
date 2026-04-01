import * as yup from 'yup';

export const scheme = yup.object().shape({
  name: yup.string().required('Name is required'),
  priority: yup.string().required('Priority is required'),
  typeOfJourney: yup.string().required('Type of journey is required'),
  typeOfUsers: yup.string().required('Type of users is required'),
  userId: yup.string().nullable(),
  ruleSpecificationType: yup.string().oneOf(['hoursOfDay', 'daysOfWeek', '']),
  hoursOfDay: yup
    .object()
    .nullable()
    .when('ruleSpecificationType', {
      is: 'hoursOfDay',
      then: (schema) =>
        schema.required().shape({
          from: yup.string().required('From time is required'),
          to: yup.string().required('To time is required'),
        }),
    }),
  daysOfWeek: yup
    .object()
    .nullable()
    .when('ruleSpecificationType', {
      is: 'daysOfWeek',
      then: (schema) =>
        schema.required().shape({
          from: yup.string().required('From day is required'),
          to: yup.string().required('To day is required'),
        }),
    }),
  fromSupportedRegion: yup
    .string()
    .required('From supported region is required'),
  toSupportedRegion: yup.string().required('To supported region is required'),
  vehicleType: yup.string().required('Vehicle type is required'),
});
