import { Input } from '@ryed/ui';
import { FC } from 'react';

import { useSearchByReadableId } from './hooks/useSearchByReadableId';
import { useLazyGetJourneysQuery } from '@/api/journeysEndpoints';
import { FilterJournyes } from '@/models/journey';

type GetTableDataFn = ReturnType<typeof useLazyGetJourneysQuery>[0];

export interface SearchByReadableIdProps {
  getData: GetTableDataFn;
  quaryStateParams: FilterJournyes;
}

export const SearchByReadableId: FC<SearchByReadableIdProps> = ({
  getData,
  quaryStateParams,
}) => {
  const { data, handlers } = useSearchByReadableId({
    getData,
    quaryStateParams,
  });
  return (
    <div className="flex">
      <Input
        placeholder={'Search by journey id'}
        name="serachById"
        onChange={handlers.handleSearchByIdChange}
        value={data.searchById}
        tabIndex={1}
        className="w-full"
        onKeyDown={(e) => {
          if (['e', 'E', '+', '-'].includes(e.key)) {
            e.preventDefault();
          }
        }}
        type="number"
      />
    </div>
  );
};
