import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { validationSchema } from '../utils/validationSchema';
import { useParams } from 'react-router-dom';
import { useCancelJourneyMutation } from '@/api/journeysEndpoints';
import { usePosthog } from '@/hooks/usePosthog/usePosthog';
import { TJourney } from '@/models/journey';
interface FormValues {
  reason: string;
}

export const useCancelJourneyDialog = () => {
  const [openModal, setOpenModal] = useState(false);
  const { journeyId } = useParams();
  const { trackEvent } = usePosthog();
  const [cancelJourneyAPI, { isSuccess, isLoading }] =
    useCancelJourneyMutation();

  const formik = useFormik<FormValues>({
    validationSchema,
    initialValues: {
      reason: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      if (journeyId) {
        await cancelJourneyAPI({ reason: values.reason, journeyId })
          .unwrap()
          .then((res) => {
            trackEvent('RIDE_CANCELLED_BY_ADMIN', {
              ...values,
              readableId: (res as TJourney).readableId,
            });
          });
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setOpenModal(false);
    }
  }, [isSuccess]);

  return {
    data: { openModal, formik, isLoading },
    handlers: { setOpenModal },
  };
};
