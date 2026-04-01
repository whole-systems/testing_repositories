import { FC } from 'react';
import { Card } from '../ui/Card/Card';
import { Separator } from '../ui/Separator/Separator';
import { Button } from '../ui/Button/Button';
import { ChevronsUpDown, Search, Plus } from 'lucide-react';
import { useFindAndAddList } from './hooks/useFindAndAddList';

interface Props {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  options: string[];
  setValue: (value: string) => void;
  value: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export const FindAndAddList: FC<Props> = (props) => {
  const {
    isOpen,
    setIsOpen,
    options,
    value,
    setValue,
    disabled = false,
    isLoading = false,
  } = props;
  const { data, handlers } = useFindAndAddList(options);
  return (
    <div>
      <div className="relative">
        <Button
          variant="outline"
          role="combobox"
          // aria-expanded={open}
          disabled={disabled}
          className="w-full justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          {value ? value : 'Add new'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
        {isOpen ? (
          <Card className="absolute z-50 w-full mt-1 flex flex-col max-h-32 overflow-y-auto">
            <div className="px-3 flex flex-col w-full">
              <div className="flex items-center">
                <Search className="mr-2 h-6 w-6 opacity-50" />
                <input
                  value={data.searchValue}
                  onChange={(e) =>
                    handlers.setSearchValue(e.target.value! ?? '')
                  }
                  type="text"
                  placeholder="Find..."
                  className=" h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                />
                {!data.optionsToShow.length && (
                  <Plus
                    className=" h-6 w-6 cursor-pointer"
                    onClick={() => {
                      setValue(data.searchValue);
                      setIsOpen(false);
                    }}
                  />
                )}
              </div>

              <Separator />
            </div>
            <div className="my-2 px-2 ">
              {data.optionsToShow.map((item, index) => (
                <div
                  className="relative flex cursor-pointer rounded-md px-3 select-none items-center  py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  key={index}
                  onClick={() => {
                    setValue(item);
                    setIsOpen(false);
                  }}
                >
                  <span className="flex">{item}</span>
                </div>
              ))}
            </div>
            {!data.optionsToShow.length && (
              <div className="flex justify-center mb-4">Not found...</div>
            )}
            {isLoading && (
              <div className="flex justify-center mb-4">Loading...</div>
            )}
          </Card>
        ) : null}
        {isOpen ? (
          <div
            className="h-screen w-screen z-40 fixed top-0 left-0"
            onClick={() => setIsOpen(false)}
          />
        ) : null}
      </div>
    </div>
  );
};
