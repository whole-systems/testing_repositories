import { getSortedRowModel } from '@tanstack/react-table';
import { getCoreRowModel } from '@tanstack/react-table';
import { useReactTable } from '@tanstack/react-table';
import { useState, useMemo, useCallback } from 'react';
import {
  useEditPriceRuleMutation,
  useGetPriceRulesQuery,
} from '@/api/priceRulesEndpoints';
import { SortingState } from '@tanstack/react-table';
import { getColumns } from '../const/columns';

export const usePriceRulesTable = () => {
  const { data: priceRulesData, isLoading } = useGetPriceRulesQuery();
  const [editPriceRule] = useEditPriceRuleMutation();
  const [sorting, setSorting] = useState<SortingState>([]);

  const tableData = useMemo(() => {
    if (!priceRulesData) return [];

    const grouped = new Map<
      string,
      {
        id: string;
        isBatched: boolean;
        name: string;
        entityType: string;
        journeyType: string;
        priority: number;
        priceAdjustments: Set<string>;
        adjustmentTypes: Set<string>;
        isEnabled: boolean;
        ids: Set<string>;
      }
    >();

    priceRulesData.forEach((priceRule) => {
      const id = priceRule.batchId !== null ? priceRule.batchId : priceRule.id;
      const key = `${id}-${priceRule.name}-${priceRule.entityType || ''}-${priceRule.journeyType}-${priceRule.priority}-${priceRule.isEnabled}`;
      if (grouped.has(key)) {
        const existing = grouped.get(key)!;
          existing.priceAdjustments.add(String(priceRule.priceAdjustment));
          existing.adjustmentTypes.add(priceRule.adjustmentType);
          existing.ids.add(priceRule.id);
      } else {
        grouped.set(key, {
          id: id || '',
          isBatched: priceRule.batchId !== null,
          name: priceRule.name,
          entityType: priceRule.entityType || '',
          journeyType: priceRule.journeyType,
          priority: priceRule.priority,
          priceAdjustments: new Set([String(priceRule.priceAdjustment)]),
          adjustmentTypes: new Set([priceRule.adjustmentType]),
          isEnabled: priceRule.isEnabled,
          ids: new Set([priceRule.id]),
        });
      }
    });

    return Array.from(grouped.values()).map((item) => ({
      id: item.id,
      isBatched: item.isBatched,
      name: item.name,
      entityType: item.entityType,
      journeyType: item.journeyType,
      priority: item.priority,
      priceAdjustment: Array.from(item.priceAdjustments).join(', '),
      adjustmentType: Array.from(item.adjustmentTypes).join(', '),
      isEnabled: item.isEnabled,
      ids: item.ids,
    }));
  }, [priceRulesData]);

  const handleEnablePriceRule = useCallback(
    async (id: string, isEnabled: boolean) => {
      tableData?.forEach((priceRule) => {
        if (priceRule.id === id) {
          if (priceRule.isBatched) {
            priceRule.ids.forEach((id) => {
              editPriceRule({ id, data: { isEnabled } });
            });
          } else {
            editPriceRule({ id: priceRule.id, data: { isEnabled } });
          }
        }
      });
    },
    [tableData, editPriceRule]
  );

  const columns = useMemo(
    () => getColumns(handleEnablePriceRule),
    [handleEnablePriceRule]
  );

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return { data: { priceRulesData, isLoading, table, columns } };
};
