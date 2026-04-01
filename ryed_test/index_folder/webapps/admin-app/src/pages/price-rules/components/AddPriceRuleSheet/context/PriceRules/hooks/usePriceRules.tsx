import { useCallback, useEffect, useState } from 'react';
import { InitialCommonInformationValues } from '../../../components/CommonInformation/hooks/useCommonInfromation';
import { InitialTypeOfUserInformationValues } from '../../../components/TypeOfUserInformation/hooks/useTypeOfUserInformation';
import { InitialRuleSpecificationsInformationValues } from '../../../components/RuleSpecificationsInformation/utils/models';
import { InitialEffectsInformationValues } from '../../../components/EffectsInformation/utils/models';
import { parseFormDataToCreate } from '../../utils/parseFormDataToCreate';
import { useCreatePriceRuleMutation } from '@/api/priceRulesEndpoints';
import { EAdjustmentType, ERuleType, NumberOfPassengersRule } from '@/models/price-rules';
import _ from 'lodash';

export enum EPriceRuleStep {
  COMMON_INFORMATION = 1,
  TYPE_OF_USERS = 2,
  RULE_SPECIFICATION = 3,
  EFFECTS_TIME = 4,
  FINISH = 5,
}

export interface PriceRulesData {
  commonInformation: InitialCommonInformationValues | null;
  typeOfUsers: InitialTypeOfUserInformationValues | null;
  ruleSpecifications: InitialRuleSpecificationsInformationValues[] | null;
  effectsInformation: InitialEffectsInformationValues | null;
}

type PriceRulesDataFieldName = keyof PriceRulesData;
type PriceRulesDataFieldValue = PriceRulesData[PriceRulesDataFieldName];

const initialPriceRulesData: PriceRulesData = {
  commonInformation: null,
  typeOfUsers: null,
  ruleSpecifications: null,
  effectsInformation: null,
};

export const usePriceRules = () => {
  const [createPriceRule, { isLoading, isSuccess }] =
    useCreatePriceRuleMutation();
  const [isCreateRuleModalOpen, setIsCreateRuleModalOpen] = useState(false);

  const handleToggleCreateRuleModal = useCallback((open: boolean) => {
    setIsCreateRuleModalOpen(open);
  }, []);
  const [priceRulesData, setPriceRuleData] = useState<PriceRulesData>(
    initialPriceRulesData
  );
  const [currentStep, setCurrentStep] = useState(
    EPriceRuleStep.COMMON_INFORMATION
  );

  const handleNextStep = useCallback(() => {
    setCurrentStep(currentStep + 1);
  }, [currentStep]);

  const handlePreviousStep = useCallback(() => {
    setCurrentStep(currentStep - 1);
  }, [currentStep]);

  const handleSetPriceRuleData = useCallback(
    (data: PriceRulesDataFieldValue, fieldName: PriceRulesDataFieldName) => {
      setPriceRuleData((prev) => ({
        ...prev,
        [fieldName]: data,
      }));
      handleNextStep();
    },
    [handleNextStep]
  );

  const handleCreatePriceRule = useCallback(async () => {
    const createPriceRuleDTO = parseFormDataToCreate(priceRulesData);
    if (createPriceRuleDTO.ruleLogic[0].type === ERuleType.NUMBER_OF_PASSENGERS) {
      const batchId = crypto.randomUUID();
      for (const rule of createPriceRuleDTO.ruleLogic as NumberOfPassengersRule[]) {
        const createPriceRuleBatchItem = _.cloneDeep(createPriceRuleDTO);
        createPriceRuleBatchItem.batchId = batchId;
        createPriceRuleBatchItem.adjustmentType = rule.adjustmentType || EAdjustmentType.FIXED;
        createPriceRuleBatchItem.priceAdjustment = rule.priceAdjustment || 0;
        rule.adjustmentType = undefined;
        rule.priceAdjustment = undefined;
        createPriceRuleBatchItem.ruleLogic = [rule];
        await createPriceRule(createPriceRuleBatchItem);
      }
    } else {
      await createPriceRule(createPriceRuleDTO);
    }
  }, [priceRulesData, createPriceRule]);

  useEffect(() => {
    if (isSuccess) {
      setIsCreateRuleModalOpen(false);
      setPriceRuleData(initialPriceRulesData);
      setCurrentStep(EPriceRuleStep.COMMON_INFORMATION);
    }
  }, [isSuccess]);

  return {
    data: {
      currentStep,
      priceRulesData,
      isCreateRuleModalOpen,
      isCreatePriceRuleLoading: isLoading,
      isCreatePriceRuleSuccess: isSuccess,
    },
    handlers: {
      handleNextStep,
      handlePreviousStep,
      handleSetPriceRuleData,
      handleToggleCreateRuleModal,
      handleCreatePriceRule,
    },
  };
};
