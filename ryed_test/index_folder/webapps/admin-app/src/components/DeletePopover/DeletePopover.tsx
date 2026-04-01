import { Button } from '@/components/ui/Button/Button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover/Popover';

import { Trash2 } from 'lucide-react';
import { useState } from 'react';

interface DeletePopoverProps {
  deleteHandler: (id: string) => void;
  id: string;
}

export const DeletePopover = ({ deleteHandler, id }: DeletePopoverProps) => {
  const [openPopover, setOpenPopover] = useState(false);
  return (
    <Popover open={openPopover}>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost" onClick={() => setOpenPopover(true)}>
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-4 justify-center items-center">
          <p className="font-semibold text-center">
            Are you sure you want to delete this?
          </p>
          <div>
            <Button
              size="sm"
              className="mr-8"
              onClick={() => setOpenPopover(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => deleteHandler(id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
