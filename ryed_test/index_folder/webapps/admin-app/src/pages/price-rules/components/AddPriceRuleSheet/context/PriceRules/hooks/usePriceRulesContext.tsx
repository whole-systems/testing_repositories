import { useContext } from 'react';
import { PriceRulesContext } from '..';

export const usePriceRulesContext = () => {
  const context = useContext(PriceRulesContext);
  if (!context) {
    throw new Error(
      'usePriceRulesContext must be used within a PriceRulesProvider'
    );
  }
  return context;
};
