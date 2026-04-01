import { useMemo, useState } from 'react';

export const useFindAndAddList = (options: string[]) => {
  const [searchValue, setSearchValue] = useState('');

  const optionsToShow = useMemo(() => {
    if (!searchValue) return options;
    const lowerCaseQuery = searchValue.toLowerCase();
    return options.filter((item) =>
      item.toLowerCase().includes(lowerCaseQuery)
    );
  }, [searchValue, options]);

  return {
    data: {
      optionsToShow,
      searchValue,
    },
    handlers: {
      setSearchValue,
    },
  };
};
