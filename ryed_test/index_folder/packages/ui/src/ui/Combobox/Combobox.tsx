import { ctw } from '@ryed-ui/utils/ctw';
import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import { Button } from '../Button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from '../Command/Command';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover/Popover';

interface Props {
  value: string | number;
  setValue: (value: string) => void;
  selectText?: string;
  notFoundText?: string;
  searchPlaceHolder?: string;
  options?: {
    value: string;
    label: string;
    available?: boolean;
  }[];
  disabled?: boolean;
  open: boolean;
  setOpen: (newState: boolean) => void;
  isLoading?: boolean;
}

export const Combobox: React.FC<Props> = (props) => {
  const {
    open,
    setOpen,
    value,
    setValue,
    selectText = 'Select...',
    notFoundText = 'Not found...',
    searchPlaceHolder = 'Search...',
    options,

    disabled = false,
    isLoading = false,
  } = props;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger disabled={disabled} asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between text-wrap"
        >
          {value && options?.length
            ? options.find((item) => item.value == value)?.label ?? selectText
            : selectText}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]">
        <Command
          filter={(value, search) => {
            const currentItem = options?.find(
              (item) => item.value.toLowerCase() === value.toLowerCase()
            );

            if (!currentItem) return 0;
            if (
              !currentItem.label
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase())
            )
              return 0;
            return 1;
          }}
          // shouldFilter={true}
        >
          <CommandInput placeholder={searchPlaceHolder} />

          {isLoading ? (
            <CommandLoading>Loading...</CommandLoading>
          ) : (
            <CommandList>
              <CommandEmpty>{notFoundText}</CommandEmpty>
              <CommandGroup className="max-h-32 overflow-y-auto">
                {options &&
                  options.map((item) => {
                    return (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        onSelect={(currentValue) => {
                          const checkValue =
                            currentValue === value ? '' : currentValue;
                          setValue(checkValue);
                          setOpen(false);
                        }}
                        className={
                          item.available !== false
                            ? 'opacity-100'
                            : 'opacity-40'
                        }
                      >
                        <Check
                          className={ctw(
                            'mr-2 h-4 w-4',
                            value === item.value ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                        {item.label}
                      </CommandItem>
                    );
                  })}
              </CommandGroup>
            </CommandList>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
};
