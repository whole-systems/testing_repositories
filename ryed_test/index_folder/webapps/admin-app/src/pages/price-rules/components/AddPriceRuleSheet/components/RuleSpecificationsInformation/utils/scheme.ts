import * as yup from 'yup';
import { EAdjustmentType, ERuleType } from '@/models/price-rules';

export const schema = yup.array().of(
  yup.object().shape({
    id: yup.string().required(),
    ruleType: yup.string().oneOf(Object.values(ERuleType)).required(),
    daysOfWeek: yup.array().when('ruleType', {
      is: ERuleType.DAY_OF_WEEK,
      then: (schema) =>
        schema
          .min(1, 'Select at least one day')
          .required('Days of week are required'),
      otherwise: (schema) => schema.nullable(),
    }),
    hoursOfDays: yup.object().when('ruleType', {
      is: ERuleType.HOURS_OF_DAYS,
      then: (schema) =>
        schema
          .shape({
            startHourOfDays: yup
              .date()
              .typeError('Please set hours and minutes')
              .required('Start hour is required'),
            stopHourOfDays: yup
              .date()
              .typeError('Please set hours and minutes')
              .required('Stop hour is required'),
          })
          .required(),
      otherwise: (schema) => schema.nullable(),
    }),
    country: yup.object().when('ruleType', {
      is: ERuleType.FROM_SOURCE_COUNTRY,
      then: (schema) => schema.required('Country is required'),
      otherwise: (schema) => schema.nullable(),
    }),
    regions: yup.object().when('ruleType', {
      is: ERuleType.BETWEEN_REGION,
      then: (schema) =>
        schema
          .shape({
            country: yup.object().required('Country is required'),
            fromRegion: yup.object().required('From region is required'),
            toRegion: yup.object().required('To region is required'),
          })
          .required(),
      otherwise: (schema) => schema.nullable(),
    }),
    vehicleType: yup.array().when('ruleType', {
      is: (val: ERuleType) =>
        val === ERuleType.VEHICLE_TYPE || val === ERuleType.NUMBER_OF_PASSENGERS,
      then: (schema) =>
        schema
          .min(1, 'Select at least one vehicle type')
          .required('Vehicle types are required'),
      otherwise: (schema) => schema.nullable(),
    }),
    passengersAmount: yup.number().when('ruleType', {
      is: ERuleType.NUMBER_OF_PASSENGERS,
      then: (schema) =>
        schema
          .min(1, 'Passengers amount must be at least 1')
          .max(50, 'Passengers amount must be at most 50')
          .required('Passengers amount is required'),
      otherwise: (schema) => schema.nullable(),
    }),
    adjustmentType: yup.string().when('ruleType', {
      is: ERuleType.NUMBER_OF_PASSENGERS,
      then: (schema) =>
        schema
          .oneOf(Object.values(EAdjustmentType), 'Invalid adjustment type')
          .required('Adjustment type is required'),
      otherwise: (schema) => schema.nullable(),
    }),
    priceAdjustment: yup.number().when('ruleType', {
      is: ERuleType.NUMBER_OF_PASSENGERS,
      then: (schema) =>
        schema
          .required('Price adjustment is required')
          .typeError('Please enter a valid number'),
      otherwise: (schema) => schema.nullable(),
    }),
  })
);
