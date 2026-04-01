import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@ryed-ui/ui/Button';
import { Calendar } from '@ryed-ui/ui/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@ryed/ui/ui/Popover';
import { FC } from 'react';

interface Props {
  onDateChange?: (date: Date) => void;
  value?: Date;
  disabledDays?: Date;
  isPast?: boolean;
}

export const DatePicker: FC<Props> = ({
  onDateChange,
  value,
  isPast,
  disabledDays,
}) => {
  const today = new Date();

  const getDisabledDays = () => {
    if (isPast === true) {
      if (disabledDays) {
        return { after: disabledDays };
      }
      return { after: today };
    }
    if (isPast === false) {
      if (disabledDays) {
        return { before: disabledDays };
      }
      return { before: today };
    }
    if (disabledDays) {
      return { before: disabledDays };
    }
    return undefined;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Calendar
          defaultMonth={value}
          mode="single"
          selected={value}
          onSelect={(date) => {
            if (date) {
              onDateChange?.(date);
            }
          }}
          disabled={getDisabledDays()}
        />
      </PopoverContent>
    </Popover>
  );
};
