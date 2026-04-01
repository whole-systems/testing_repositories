import { FunctionComponent, ReactNode } from 'react';
import { QueryNavigationContext } from './context/query-navigation.context';
import { useInternalQueryNavigationContext } from './hooks/useInternalQueryNavigationContext';

const { Provider } = QueryNavigationContext;

export interface IQueryNavigationProps {
  queryKey: string;
  initialValue: string;
  children: ReactNode | ReactNode[];

  // Page keys that disabled and not accesible by url, user will be redirected to fallbackToWhenDisabled
  disabledPages?: string[];
  fallbackToWhenDisabled?: string;
  replaceOnRedirect?: boolean;
  // Called when page changes
  onPageChange?: (prevPage: string | null, currentPage: string) => void;

  // Called when initial page is overridden by url
  onInitialPageOverrideByUrl?: (pageKey: string) => void;
}

export const QueryNavigation: FunctionComponent<IQueryNavigationProps> = ({
  queryKey,
  initialValue,
  disabledPages,
  fallbackToWhenDisabled,
  children,
  replaceOnRedirect,
  onPageChange,
  onInitialPageOverrideByUrl,
}) => {
  const context = useInternalQueryNavigationContext({
    queryKey,
    initialPageKey: initialValue,
    disabledPages,
    fallbackToWhenDisabled,
    replaceOnRedirect,
    onPageChange,
    onInitialPageOverrideByUrl,
  });

  return <Provider value={context}>{children}</Provider>;
};
