import { useRefValue } from '@ryed-ui/hooks';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IQueryNavigationContext } from '../../types';
import {
  IInternalQueryNavigationContextParams,
  IInternalQueryNavigationContextState,
} from './types';

export const useInternalQueryNavigationContext = ({
  initialPageKey,
  queryKey,
  clearOnUnmount = true,
  disabledPages,
  fallbackToWhenDisabled,
  replaceOnRedirect = false,
  onPageChange,
  onInitialPageOverrideByUrl,
}: IInternalQueryNavigationContextParams): IQueryNavigationContext => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyFromUrl = searchParams.get(queryKey);

  const [state, setState] = useState<IInternalQueryNavigationContextState>({
    activePage: disabledPages?.includes(keyFromUrl!)
      ? fallbackToWhenDisabled || initialPageKey
      : keyFromUrl || initialPageKey,
  });

  const initialPageKeyRef = useRefValue(initialPageKey);
  const prevActivePageRef = useRef(state.activePage);
  const onPageChangeRef = useRefValue(onPageChange);
  const onInitialPageOverrideByUrlRef = useRefValue(onInitialPageOverrideByUrl);

  useEffect(() => {
    if (prevActivePageRef.current !== state.activePage) {
      onPageChangeRef.current?.(prevActivePageRef.current, state.activePage);
      prevActivePageRef.current = state.activePage;
    }
  }, [state.activePage]);

  useEffect(() => {
    if (
      initialPageKeyRef.current !== state.activePage &&
      keyFromUrl === state.activePage
    ) {
      onInitialPageOverrideByUrlRef.current?.(state.activePage);
    }
  }, [state.activePage, initialPageKeyRef, onInitialPageOverrideByUrlRef]);

  useEffect(() => {
    if (
      searchParams.get(queryKey) &&
      state.activePage !== searchParams.get(queryKey)
    ) {
      console.log(
        `Current page ${
          state.activePage
        } is not the same as search param ${searchParams.get(
          queryKey
        )}. Syncing...`
      );
      searchParams.set(queryKey, state.activePage);
      setSearchParams(searchParams);
    }
  }, []);

  const clearSearchParam = useCallback(() => {
    searchParams.delete(queryKey);
    setSearchParams(searchParams);
  }, [searchParams, queryKey, setSearchParams]);

  const clearRef = useRefValue(clearSearchParam);
  const isBackButtonPressed = useRef(false);

  useEffect(() => {
    const handlePopState = () => {
      isBackButtonPressed.current = true;
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      setTimeout(() => {
        if (clearOnUnmount && !isBackButtonPressed.current) {
          clearRef.current();
        }
        window.removeEventListener('popstate', handlePopState);
      }, 10);
    };
  }, [clearRef, isBackButtonPressed, clearOnUnmount]);

  const redirectFn = useCallback(
    (pageKey: string) => {
      searchParams.set(queryKey, pageKey);
      setSearchParams(searchParams, {
        replace: replaceOnRedirect, // Use replace instead of push
      });

      setState({ activePage: pageKey });
    },
    [searchParams, queryKey, setSearchParams, replaceOnRedirect]
  );

  const context: IQueryNavigationContext = useMemo(
    () => ({
      activePage: state.activePage,
      redirect: redirectFn,
    }),
    [state.activePage, redirectFn]
  );

  return context;
};
