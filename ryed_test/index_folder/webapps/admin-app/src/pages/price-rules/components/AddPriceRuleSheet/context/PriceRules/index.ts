import { createContext } from 'react';
import { usePriceRules } from './hooks/usePriceRules';

export const PriceRulesContext = createContext<ReturnType<
  typeof usePriceRules
> | null>(null);
