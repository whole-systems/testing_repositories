import { FC } from 'react';
import { AddPriceRuleSheet } from './components/AddPriceRuleSheet/AddPriceRuleSheet';
import { PriceRulesProvider } from './components/AddPriceRuleSheet/context/PriceRules/PriceRulesProvider';
import { PriceRulesTable } from './components/PriceRulesTable/PriceRulesTable';
export const PriceRules: FC = () => {
  return (
    <div className="flex-1 flex w-full flex-col">
      <div className="p-2 w-full justify-end flex space-x-3">
        <PriceRulesProvider>
          <AddPriceRuleSheet />
        </PriceRulesProvider>
      </div>
      <div className="flex-1 flex w-full flex-col">
        <PriceRulesTable />
      </div>
    </div>
  );
};
