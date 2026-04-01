import { EAdjustmentType, EJourneyType } from '@/models/price-rules';
import { useFormik } from 'formik';
import { scheme } from '../utils/scheme';
import { InitialEditPriceRuleValues } from '../utils/models';
const initValues: InitialEditPriceRuleValues = {
  name: '',
  priority: '',
  typeOfJourney: EJourneyType.SCHEDULED,
  typeOfUsers: '',
  user: null,
  agencyId: '',
  ruleSpecifications: [],
  typeOfPrice: EAdjustmentType.FIXED,
  valueOfPrice: '',
  effectsFrom: '',
  effectsTo: '',
};

export const useEditPriceRuleForm = (
  initialValues: InitialEditPriceRuleValues | null,
  handleEditPriceRule: (values: InitialEditPriceRuleValues) => Promise<void>
) => {
  const formik = useFormik({
    initialValues: initialValues || initValues,
    onSubmit: async (values) => {
      await handleEditPriceRule(values);
    },
    validationSchema: scheme,
    enableReinitialize: true,
  });
  return formik;
};
