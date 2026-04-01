import {
  useCreatePriceRuleMutation,
  useEditPriceRuleMutation
} from '@/api/priceRulesEndpoints';
import { CreatePriceRuleDTO, EAdjustmentType, ERuleType, NumberOfPassengersRule, PriceRule } from '@/models/price-rules';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEditPriceRuleForm } from './useEditPriceRuleForm';
import { parseDataToFormik } from '../utils/parseDataToFormik';
import { useGetAdditionalInfo } from './useGetAdditionalInfo';
import { InitialEditPriceRuleValues } from '../utils/models';
import { parseDataToEdit } from '../utils/parseDataToEdit';
import _ from 'lodash';

export const useEditRulePriceModal = (priceRule: PriceRule) => {
  const { priceRuleId } = useParams();
  const [
    editPriceRule,
    { isLoading: isEditLoading, isSuccess: isEditSuccess },
  ] = useEditPriceRuleMutation();

  const [
    createPriceRule,
    { isLoading: isCreateLoading, isSuccess: isCreateSuccess },
  ] = useCreatePriceRuleMutation();

  const additionalInfo = useGetAdditionalInfo(priceRule);
  const parsedPriceRule = useMemo(() => {
    return priceRule ? parseDataToFormik(priceRule, additionalInfo) : null;
  }, [priceRule, additionalInfo]);

  const [isOpen, setIsOpen] = useState(false);

  const handleToggleEditModal = useCallback((state: boolean) => {
    setIsOpen(state);
  }, []);

  const handleEditPriceRule = useCallback(
    async (values: InitialEditPriceRuleValues) => {
      const parseData = parseDataToEdit(values);
      if (parseData?.ruleLogic && parseData.ruleLogic.length > 0 && parseData.ruleLogic[0].type === ERuleType.NUMBER_OF_PASSENGERS) {
        const batchId = priceRule?.batchId || crypto.randomUUID();
        for (const rule of parseData.ruleLogic as NumberOfPassengersRule[]) {
          const priceRuleBatchItem = _.cloneDeep(parseData);
          priceRuleBatchItem.adjustmentType = rule.adjustmentType || EAdjustmentType.FIXED;
          priceRuleBatchItem.priceAdjustment = rule.priceAdjustment || 0;
          rule.adjustmentType = undefined;
          rule.priceAdjustment = undefined;
          priceRuleBatchItem.ruleLogic = [rule];

          const ruleId = rule.id;
          rule.id = undefined;
          if (ruleId) {
            await editPriceRule({ id: ruleId as string, data: priceRuleBatchItem });
          } else {
            const createData: CreatePriceRuleDTO = {
              ...priceRuleBatchItem,
              batchId,
              name: priceRule?.name || '',
              activeFrom: priceRuleBatchItem.activeFrom || '',
              activeUntil: priceRuleBatchItem.activeUntil || undefined,
              priceAdjustment: priceRuleBatchItem.priceAdjustment || 0,
              journeyType: priceRuleBatchItem.journeyType!,
              adjustmentType: priceRuleBatchItem.adjustmentType!,
              priority: priceRuleBatchItem.priority || 0,
              ruleLogic: priceRuleBatchItem.ruleLogic || [],
            };
            await createPriceRule(createData);
          }
        }
      } else {
        await editPriceRule({ id: priceRuleId as string, data: parseData });
      }
    },
    [editPriceRule, createPriceRule, priceRuleId, priceRule?.batchId, priceRule?.name]
  );

  const formik = useEditPriceRuleForm(parsedPriceRule, handleEditPriceRule);
  const { values, errors, setFieldValue } = formik;

  useEffect(() => {
    if (isEditSuccess || isCreateSuccess) {
      setIsOpen(false);
    }
  }, [isEditSuccess, isCreateSuccess]);

  return {
    data: {
      isOpen,
      formik,
      values,
      errors,
      isEditLoading: isEditLoading || isCreateLoading,
    },
    handlers: {
      setIsOpen,
      handleToggleEditModal,
      setFieldValue,
    },
  };
};
