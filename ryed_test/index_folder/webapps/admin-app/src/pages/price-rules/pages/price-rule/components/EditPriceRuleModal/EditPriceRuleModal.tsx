import { FC } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@ryed/ui';
import { Button } from '@ryed/ui';
import { Pencil } from 'lucide-react';

import { useEditRulePriceModal } from './hooks/useEditRulePriceModal';
import { CommonInformation } from './components/CommonInformation/CommonInformation';
import { EffectsInformation } from './components/EffectsInformation/EffectsInformation';
import { TypeOfUserInformation } from './components/TypeOfUserInformation/TypeOfUserInformation';
import { RuleSpecificationInformation } from './components/RuleSpecificationInformation/RuleSpecificationInformation';
import { PriceRule } from '@/models/price-rules';

interface EditPriceRuleModalProps {
  priceRule: PriceRule;
}

export const EditPriceRuleModal: FC<EditPriceRuleModalProps> = ({ priceRule }) => {
  const { data, handlers } = useEditRulePriceModal(priceRule);

  return (
    <Dialog open={data.isOpen} onOpenChange={handlers.handleToggleEditModal}>
      <DialogTrigger>
        <Button onClick={() => handlers.handleToggleEditModal(true)}>
          <div className="flex">
            <span className="mr-2">EDIT</span>
            <Pencil size={20} />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex w-[95%] h-[80%] max-w-none  p-10">
        <DialogTitle>Edit Price Rule</DialogTitle>
        <div className="flex flex-col w-full flex-1 ">
          <div className="flex flex-col gap-2 w-full h-full justify-start mt-10 overflow-y-auto ">
            <div className="grid grid-cols-2 gap-2">
              <CommonInformation formik={data.formik} />
              <EffectsInformation formik={data.formik} />
              <TypeOfUserInformation formik={data.formik} />
            </div>

            <RuleSpecificationInformation formik={data.formik} />

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  handlers.handleToggleEditModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  data.formik.submitForm();
                }}
                disabled={data.isEditLoading}
              >
                {data.isEditLoading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
