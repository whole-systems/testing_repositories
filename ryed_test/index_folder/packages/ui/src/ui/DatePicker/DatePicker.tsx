import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Button } from '@ryed-ui/ui/Button';
import { Calendar } from '@ryed-ui/ui/Calendar';
import { useCalendarDateSelectHandler } from '@ryed-ui/ui/DatePicker/hooks/useCalendarDateSelectHandler';
import { useDatePickerBlurHandler } from '@ryed-ui/ui/DatePicker/hooks/useDatePickerBlurHandler';
import { useDatePickerPopover } from '@ryed-ui/ui/DatePicker/hooks/useDatePickerPopover';
import { useDatePickerValue } from '@ryed-ui/ui/DatePicker/hooks/useDatePickerValue';
import { IDatePickerProps } from '@ryed-ui/ui/DatePicker/types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@ryed-ui/ui/Popover/Popover';
import { ctw } from '@ryed-ui/utils/ctw';
import { formatDate } from '@ryed-ui/utils/format-date';
import { enUS } from 'date-fns/locale';
import dayjs from 'dayjs';
import { CalendarIcon, X } from 'lucide-react';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import {
  FunctionComponent,
  useCallback,
  useRef,
  useState,
  useEffect,
} from 'react';

dayjs.extend(utc);
dayjs.extend(timezone);

const DATE_FORMAT_WITH_TIMEZONE = 'YYYY-MM-DDTHH:mm:ssZ';

export const DatePicker: FunctionComponent<IDatePickerProps> = ({
  name,
  value,
  placeholder = 'Select date and time',
  format: _dateFormat = 'YYYY-MM-DD',
  timezone,
  locale = enUS,
  closeOnSelect = true,
  clearable = true,
  disablePastDays = false,
  disableFutureDays = false,
  onChange,
  onFocus,
  onBlur,
  showTimePicker = false,
}) => {
  const handleBlur = useDatePickerBlurHandler({
    inputName: name,
    onBlur,
  });
  const { isOpen, setOpen } = useDatePickerPopover({
    onClose: () => handleBlur(value || null),
  });

  const { dateValue } = useDatePickerValue(value, timezone);
  const [selectedTime, setSelectedTime] = useState<dayjs.Dayjs | null>(
    dateValue && showTimePicker ? dayjs(dateValue) : null
  );
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const timePickerRef = useRef<HTMLDivElement>(null);

  const handleChange = useCalendarDateSelectHandler({
    onChange: (date) => {
      if (date) {
        setTempDate(new Date(date));
        if (!showTimePicker) {
          onChange?.(
            formatDate(date, { timezone, format: DATE_FORMAT_WITH_TIMEZONE })
          );
          if (closeOnSelect) {
            setOpen(false);
          }
          handleBlur(
            formatDate(date, { timezone, format: DATE_FORMAT_WITH_TIMEZONE })
          );
        } else {
          // Focus time picker when date is selected
          setTimeout(() => {
            const input = timePickerRef.current?.querySelector('input');
            if (input) {
              input.focus();
            }
          }, 0);
        }
      } else {
        onChange?.(null);
        setSelectedTime(null);
        setTempDate(null);
        if (closeOnSelect) {
          setOpen(false);
        }
        handleBlur(null);
      }
    },
    onSelect: () => {},
    format: _dateFormat,
  });

  const handleTimeChange = useCallback(
    (newTime: dayjs.Dayjs | null) => {
      if (!tempDate && dateValue) {
        setTempDate(dayjs.utc(dateValue).tz(timezone).toDate());
      }
      setSelectedTime(newTime);
    },
    [tempDate, dateValue, timezone]
  );

  const handleSetDateTime = useCallback(() => {
    if (tempDate && selectedTime) {
      const updatedDate = dayjs(tempDate)
        .hour(selectedTime.hour())
        .minute(selectedTime.minute())
        .tz(dayjs.tz.guess(), true);

      const localDateTimeInTargetZone = updatedDate.tz(timezone, true);
      const utcDateTime = localDateTimeInTargetZone.utc();
      console.log(utcDateTime.toISOString(), 'UTC DateTime');

      onChange?.(utcDateTime.toISOString());
      setOpen(false);
      setTempDate(null);
      handleBlur(utcDateTime.toISOString());
    }
  }, [tempDate, selectedTime, onChange, timezone, setOpen, handleBlur]);

  useEffect(() => {
    // handleChange(undefined);
    setSelectedTime(null);
    setTempDate(null);
  }, []);

  // @ts-ignore
  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          onFocus={onFocus}
          className={ctw(
            'w-full justify-between text-left font-normal',
            !dateValue && 'text-muted-foreground'
          )}
        >
          <div className="flex items-center flex-nowrap">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateValue ? (
              formatDate(dateValue, {
                timezone,
                format: _dateFormat,
                useExistingTimezone: true,
              })
            ) : (
              <span>{placeholder}</span>
            )}
          </div>
          {clearable && dateValue && (
            <X
              className="ml-2 h-4 w-4"
              onClick={(e) => {
                e.stopPropagation();
                handleChange(undefined);
                setSelectedTime(null);
                setTempDate(null);
                handleBlur(null);
              }}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          // @ts-ignore
          selected={
            tempDate ||
            (dateValue ? dayjs.utc(dateValue).tz(timezone).toDate() : null)
          }
          locale={locale}
          onSelect={handleChange}
          initialFocus
          fromDate={disablePastDays ? new Date() : undefined}
          toDate={disableFutureDays ? new Date() : undefined}
        />
        {showTimePicker && (
          <div className="p-3 border-t">
            <div
              className="flex flex-row items-center gap-2"
              ref={timePickerRef}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  value={selectedTime}
                  timezone={timezone}
                  onChange={handleTimeChange}
                  disabled={!tempDate && !dateValue}
                  ampm={false}
                  components={{
                    OpenPickerIcon: () => null,
                  }}
                  // desktopModeMediaQuery="@media(min-width:0px)"
                  sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '0.375rem',
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--input))',
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:focus-within': {
                        outline: 'none',
                        boxShadow:
                          '0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(var(--ring))',
                      },
                    },
                    '& .MuiInputBase-input': {
                      height: '36px',
                      padding: '0 0.75rem',
                      fontSize: '1rem',
                      color: 'hsl(var(--foreground))',
                      '&::placeholder': {
                        color: 'hsl(var(--muted-foreground))',
                      },
                      '&:disabled': {
                        opacity: 0.5,
                        cursor: 'not-allowed',
                      },
                    },
                    '& .MuiInputAdornment-root': {
                      display: 'none',
                    },
                  }}
                />
              </LocalizationProvider>
              <Button
                onClick={handleSetDateTime}
                disabled={!tempDate || !selectedTime}
              >
                Set
              </Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
