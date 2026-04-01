import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

interface IUseQueryOpen {
  queryKey: string;
  cleanupOnClose?: boolean;
  replace?: boolean;
}

export const useQueryOpen = ({
  queryKey,
  cleanupOnClose = true,
  replace = false,
}: IUseQueryOpen) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isOpen = useMemo(() => {
    const queryValue = searchParams.get(queryKey);

    try {
      const queryValueBoolean = JSON.parse(queryValue ?? 'false');

      return queryValueBoolean;
    } catch (error) {
      return false;
    }
  }, [queryKey, searchParams]);

  const setOpen = useCallback(
    (open: boolean) => {
      if (cleanupOnClose && open === false) {
        searchParams.delete(queryKey);
      } else {
        searchParams.set(queryKey, JSON.stringify(open));
      }

      setSearchParams(searchParams, { replace });
    },
    [searchParams, cleanupOnClose, queryKey, setSearchParams, replace]
  );

  return { isOpen, setOpen };
};
