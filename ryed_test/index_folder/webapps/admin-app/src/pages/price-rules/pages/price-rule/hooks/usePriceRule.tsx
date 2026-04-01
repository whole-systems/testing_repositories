import { useParams, useNavigate } from 'react-router-dom';
import {
  useGetPriceRuleQuery,
  useDeletePriceRuleMutation,
  useGetPriceRulesByBatchIdQuery
} from '@/api/priceRulesEndpoints';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useGetAdditionalInfo } from './useGetAdditionalInfo';
import { parseDataToRulePrice } from '../utils/parseDataToRulePrice';
import { isArray } from 'lodash';

export const usePriceRule = (isBatched: boolean) => {
  const navigate = useNavigate();
  const { priceRuleId, priceRuleBatchId } = useParams();

  const id = isBatched ? priceRuleBatchId : priceRuleId;

  const { data: singlePriceRule, isLoading: isLoadingSingle } =
    useGetPriceRuleQuery(priceRuleId ?? '', { skip: isBatched || !priceRuleId });

  const { data: batchedPriceRules, isLoading: isLoadingBatched } =
    useGetPriceRulesByBatchIdQuery(priceRuleBatchId ?? '', { skip: !isBatched || !priceRuleBatchId });

  const priceRule = isBatched ? batchedPriceRules : singlePriceRule;
  const isLoadingPriceRule = isBatched ? isLoadingBatched : isLoadingSingle;

  const { additionalInfo } = useGetAdditionalInfo(priceRule);

  const [
    deletePriceRule,
    { isLoading: isDeletingPriceRule, isSuccess: isSuccessDeletePriceRule },
  ] = useDeletePriceRuleMutation();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = useCallback(async () => {
    if (isArray(priceRule)) {
      for (const item of priceRule) {
        await deletePriceRule(item.id as string);
      }
    } else {
      await deletePriceRule(id as string);
    }
  }, [deletePriceRule, id, priceRule]);

  useEffect(() => {
    if (isSuccessDeletePriceRule) {
      setIsDeleteModalOpen(false);
      navigate(-1);
    }
  }, [isSuccessDeletePriceRule, navigate]);

  const parseData = useMemo(() => {
    if (!priceRule) return null;
    return parseDataToRulePrice(priceRule, additionalInfo);
  }, [priceRule, additionalInfo]);

  return {
    data: {
      priceRule: parseData,
      rawPriceRule: priceRule,
      isLoadingPriceRule,
      isDeleteModalOpen,
      isDeletingPriceRule,
    },
    handlers: { setIsDeleteModalOpen, handleDelete },
  };
};
