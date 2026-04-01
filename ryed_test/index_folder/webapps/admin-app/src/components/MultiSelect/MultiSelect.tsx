import { cn } from '@/lib/utils';
import { Badge } from '@ryed/ui/ui/Badge';
import { Card } from '@ryed/ui/ui/Card';
import { Input } from '@ryed/ui/ui/Input';
import { Popover, PopoverContent, PopoverTrigger } from '@ryed/ui/ui/Popover';
import { Separator } from '@ryed/ui/ui/Separator';
import { ChevronsUpDown, Search, X } from 'lucide-react';
import { forwardRef, useImperativeHandle } from 'react';
import { useMultiSelect } from './hooks/useMultiSelect';

interface Props {
  data: {
    label: string;
    value: string;
  }[];
  initialSelected?: {
    label: string;
    value: string;
  }[];
  onChange: (
    data: {
      label: string;
      value: string;
    }[]
  ) => void;
  inputSearch?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export const MultiSelect = forwardRef<{ resetSelection: () => void }, Props>(
  (
    {
      data,
      onChange,
      inputSearch = false,
      initialSelected = [],
      placeholder = 'No selected',
      disabled = false,
    },
    ref
  ) => {
    const { data: hookData, handlers } = useMultiSelect({
      data,
      onChange,
      inputSearch,
      initialSelected,
    });
    useImperativeHandle(ref, () => ({
      resetSelection() {
        handlers.resetSelected();
      },
    }));

    return (
      <Popover
        open={!disabled && hookData.openValuesMenu}
        onOpenChange={(open) => {
          if (disabled) return;
          if (open) {
            handlers.toggleValuesMenu();
            handlers.setOpenValuesMenu(open);
          } else {
            handlers.setOpenValuesMenu(open);
          }
        }}
      >
        <PopoverTrigger asChild disabled={disabled}>
          <Card
            className={cn(
              'pl-4 py-2 flex pr-0 flex justify-between',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <div>
              {!hookData.selectedValues.length && placeholder}
              {hookData.selectedValues.map((item, index) => (
                <Badge
                  onClick={(e) => {
                    if (disabled) {
                      e.stopPropagation();
                      return;
                    }
                    handlers.handleUnSelect(item);
                  }}
                  className={cn(
                    'm-1',
                    !disabled && 'cursor-pointer'
                  )}
                  key={index}
                >
                  {item.label}
                  <X size={14} />
                </Badge>
              ))}
            </div>

            <div
              className={cn(
                'px-2',
                !disabled && 'cursor-pointer'
              )}
              onClick={(e) => {
                if (disabled) {
                  e.stopPropagation();
                  return;
                }
                handlers.toggleValuesMenu();
              }}
            >
              <ChevronsUpDown />
            </div>
            {hookData.openValuesMenu ? (
              <div className="z-40 fixed top-0 left-0 w-full h-full" />
            ) : null}
          </Card>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <div className="overflow-auto max-h-60 min-h-20">
            {inputSearch && (
              <div>
                <div className="flex items-center p-4">
                  <Search size={24} className="mr-4" />
                  <Input
                    onChange={(e) =>
                      handlers.handleInputSearch(e.currentTarget.value)
                    }
                    value={hookData.searchInputValue}
                  />
                </div>
                <Separator />
              </div>
            )}

            {hookData.availableValues.length ? (
              hookData.availableValues.map((item, index) => (
                <div
                  className={cn(
                    'cursor-pointer hover:bg-accent hover:text-accent-foreground'
                  )}
                  key={index}
                  onClick={() => handlers.handleSelect(item)}
                >
                  <span className="p-3 flex">{item.label}</span>
                  {index + 1 !== hookData.availableValues.length ? (
                    <Separator />
                  ) : null}
                </div>
              ))
            ) : (
              <div className="flex w-full justify-center my-5">
                <span>No options</span>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);
