import { Button } from '@ryed-ui/ui/Button';
import { Calendar } from '@ryed-ui/ui/Calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@ryed-ui/ui/Popover/Popover';
import { ctw } from '@ryed-ui/utils/ctw';
import { endOfDay, format, isBefore, Locale, startOfDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

interface DatePickerWithRangeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  defaultRange?: { from?: Date; to?: Date };
  from?: Date;
  to?: Date;
  locale?: Locale;
  onDateChange?: (range: { from: Date; to: Date }) => void;
  disabledDays?: { before?: Date; after: Date };
}

export function DatePickerWithRange({
  className,
  from,
  to,
  locale = enUS,
  onDateChange,
  defaultRange,
  disabledDays,
}: DatePickerWithRangeProps) {
  const today = startOfDay(new Date());
  const initialFrom = defaultRange?.from || from || today;
  const initialTo = defaultRange?.to || to || today;

  const initialRange: DateRange = {
    from: isBefore(initialFrom, initialTo) ? initialFrom : initialTo,
    to: isBefore(initialFrom, initialTo) ? initialTo : initialFrom,
  };

  const [date, setDate] = useState<DateRange>(initialRange);

  useEffect(() => {
    if (from && to) {
      setDate({
        from: isBefore(from, to) ? from : to,
        to: isBefore(from, to) ? to : from,
      });
    }
  }, [from, to]);

  const handleDateChange = (newRange: DateRange | undefined) => {
    if (newRange?.from && newRange?.to) {
      const orderedRange = {
        from: isBefore(newRange.from, newRange.to)
          ? newRange.from
          : newRange.to,
        to: isBefore(newRange.from, newRange.to) ? newRange.to : newRange.from,
      };
      setDate(orderedRange);
      if (onDateChange) {
        onDateChange(orderedRange);
      }
    } else if (newRange?.from) {
      const newDate = { from: newRange.from, to: endOfDay(newRange.from) };
      setDate(newDate);
      if (onDateChange) {
        onDateChange(newDate);
      }
    }
  };

  return (
    <div className={ctw('w-full', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={ctw(
              'min-w-[300px] w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            locale={locale}
            defaultMonth={date.to}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
            disabled={disabledDays}
            // toDate={today}
            today={today}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
