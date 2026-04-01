import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover/Popover';
import { Button } from '../Button/Button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandLoading,
} from '../Command/Command';

interface Props {
  value: string | number;
  setValue: (value: string) => void;
  selectText?: string;
  notFoundText?: string;
  searchPlaceHolder?: string;
  options?: {
    value: string;
    label: string;
  }[];
  disabled?: boolean;
  open: boolean;
  setOpen: (newState: boolean) => void;
  isLoading?: boolean;
  className?: string;
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
    className,
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
          className={`w-full justify-between text-wrap ${className}`}
        >
          {value && options?.length
            ? options.find((item) => item.value === value)?.label ?? selectText
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
        >
          <CommandInput placeholder={searchPlaceHolder} />
          <CommandEmpty>{notFoundText}</CommandEmpty>

          {isLoading ? (
            <CommandLoading>Loading...</CommandLoading>
          ) : (
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
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === item.value ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {item.label}
                    </CommandItem>
                  );
                })}
            </CommandGroup>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
};
