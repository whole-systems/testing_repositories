import { useRefValue } from '@ryed-ui/hooks';
import { useCallback, useState } from 'react';

export interface IUseDatePickerPopoverProps {
  initialOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

export const useDatePickerPopover = ({
  initialOpen = false,
  onClose,
  onOpen,
}: IUseDatePickerPopoverProps) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const onCloseRef = useRefValue(onClose);
  const onOpenRef = useRefValue(onOpen);

  const setOpen = useCallback(
    (open: boolean) => {
      setIsOpen(open);

      if (open) {
        onOpenRef.current?.();
      } else {
        onCloseRef.current?.();
      }
    },
    [onCloseRef, onOpenRef]
  );

  return { isOpen, setOpen };
};
