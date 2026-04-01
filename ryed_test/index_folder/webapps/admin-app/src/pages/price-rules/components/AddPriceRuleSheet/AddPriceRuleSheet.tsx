import { Button, Dialog, DialogTrigger, DialogContent } from '@ryed/ui';
import { Plus } from 'lucide-react';
import { FC } from 'react';

import { usePriceRulesContext } from './context/PriceRules/hooks/usePriceRulesContext';
import { CommonInformation } from './components/CommonInformation/CommonInformation';
import { EPriceRuleStep } from './context/PriceRules/hooks/usePriceRules';
import { TypeOfUserInformation } from './components/TypeOfUserInformation/TypeOfUserInformation';
import { RuleSpecificationsInformation } from './components/RuleSpecificationsInformation/RuleSpecificationsInformation';
import { EffectsInformation } from './components/EffectsInformation/EffectsInformation';
import { FinishInformation } from './components/FinishInformation/FinishInformation';

export const AddPriceRuleSheet: FC = () => {
  const { data: priceRulesData, handlers: priceRulesHandlers } =
    usePriceRulesContext();

  return (
    <>
      {priceRulesData.isCreateRuleModalOpen && (
        <div className="fixed inset-0 z-[11] dark:bg-black bg-white opacity-70" />
      )}
      <Dialog
        modal={false}
        open={priceRulesData.isCreateRuleModalOpen}
        onOpenChange={priceRulesHandlers.handleToggleCreateRuleModal}
      >
        <DialogTrigger>
          <Button
            onClick={() => priceRulesHandlers.handleToggleCreateRuleModal(true)}
          >
            <div className="flex">
              <span className="mr-2">PRICE RULE</span>
              <Plus size={20} />
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent
          className="flex w-[95%] h-[80%] max-w-none  p-10"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <div className="flex flex-col w-full flex-1 ">
            <div className="w-full bg-gray-700 h-4 rounded-full">
              <div
                className="h-full bg-white rounded-full"
                style={{
                  width: `${(priceRulesData.currentStep / 5) * 100}%`,
                }}
              />
            </div>
            <div className="flex flex-col w-full h-full justify-start mt-10 overflow-y-auto ">
              {priceRulesData.currentStep ===
                EPriceRuleStep.COMMON_INFORMATION && <CommonInformation />}
              {priceRulesData.currentStep === EPriceRuleStep.TYPE_OF_USERS && (
                <TypeOfUserInformation />
              )}
              {priceRulesData.currentStep ===
                EPriceRuleStep.RULE_SPECIFICATION && (
                <RuleSpecificationsInformation />
              )}
              {priceRulesData.currentStep === EPriceRuleStep.EFFECTS_TIME && (
                <EffectsInformation />
              )}
              {priceRulesData.currentStep === EPriceRuleStep.FINISH && (
                <FinishInformation />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
