import { usePriceRules } from './hooks/usePriceRules';
import { PriceRulesContext } from '.';

export const PriceRulesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data, handlers } = usePriceRules();

  return (
    <PriceRulesContext.Provider value={{ data, handlers }}>
      {children}
    </PriceRulesContext.Provider>
  );
};
