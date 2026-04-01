import {
  TDatePickerBlurHandler,
  TDatePickerInputValue,
} from '@ryed-ui/ui/DatePicker/types';
import { useCallback } from 'react';

export interface IUseDatePickerBlurHandlerProps {
  inputName?: string;
  value?: TDatePickerInputValue;
  onBlur?: TDatePickerBlurHandler;
}

export const useDatePickerBlurHandler = ({
  inputName,
  onBlur,
}: IUseDatePickerBlurHandlerProps) => {
  const handleBlur = useCallback(
    (value: TDatePickerInputValue) => {
      setTimeout(() => {
        onBlur?.({
          target: {
            name: inputName!,
            value: value,
          },
        } as React.FocusEvent<HTMLInputElement | HTMLButtonElement>);
      }, 10);
    },
    [onBlur]
  );

  return handleBlur;
};
