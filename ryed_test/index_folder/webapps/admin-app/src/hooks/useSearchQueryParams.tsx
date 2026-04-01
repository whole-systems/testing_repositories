import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useSearchQueryParams = (initialState?: Record<string, string>) => {
  const [searchParams, setSearchParams] = useSearchParams(initialState);

  const setSearchQueryParams = useCallback(
    (params: Record<string, string>) => {
      const newSearchParams = new URLSearchParams(searchParams);

      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && newSearchParams.get(key) !== String(value)) {
          newSearchParams.set(key, String(value));
        }
      });

      setSearchParams(newSearchParams, { replace: true });
      console.log(`useSearchQueryParams setSearchQueryParams`, {
        params,
        newSearchParams,
      });
    },
    [searchParams, setSearchParams]
  );

  const resetAndPasteParams = useCallback(
    (params: Record<string, string>) => {
      const newSearchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && newSearchParams.get(key) !== String(value)) {
          newSearchParams.set(key, String(value));
        }
      });

      setSearchParams(newSearchParams, { replace: true });
    },
    [setSearchParams]
  );

  const currentParams: Record<string, string> = useMemo(
    () =>
      Array.from(searchParams.entries()).reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>),
    [searchParams]
  );

  return {
    searchParams: currentParams,
    setSearchQueryParams,
    resetAndPasteParams,
  };
};
