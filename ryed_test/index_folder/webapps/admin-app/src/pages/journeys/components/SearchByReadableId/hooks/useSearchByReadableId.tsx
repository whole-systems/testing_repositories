import { SearchByReadableIdProps } from '../SearchByReadableId';
import { useCallback, useEffect, useRef, useState } from 'react';

const defaultParams = {
  page: 0,
  limit: 30,
};

export const useSearchByReadableId = ({
  getData,
  quaryStateParams,
}: SearchByReadableIdProps) => {
  const [searchById, setSearchById] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSearchById('');
  }, [quaryStateParams]);

  const triggerSearch = useCallback(
    (value: string) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        if (value === '') {
          getData(quaryStateParams);
          return;
        }
        if (value.length >= 3) {
          getData({ ...defaultParams, readableId: value });
        }
      }, 1000);
    },
    [getData, quaryStateParams]
  );

  const handleSearchByIdChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchById(e.target.value);
      triggerSearch(e.target.value);
    },
    [triggerSearch]
  );
  return {
    data: {
      searchById,
    },
    handlers: {
      handleSearchByIdChange,
    },
  };
};
