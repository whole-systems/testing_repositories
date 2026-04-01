import { Button } from '@/components/ui/Button/Button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover/Popover';
import { Region } from '@/models/regions';

import { Trash2 } from 'lucide-react';
import { useState } from 'react';

interface DeletePopoverProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  deleteRegionHandler: (id: string) => void;
  polygon: Region;
}

export const DeletePopover = ({
  deleteRegionHandler,
  polygon,
}: DeletePopoverProps) => {
  const [openPopover, setOpenPopover] = useState(false);
  return (
    <Popover open={openPopover}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => setOpenPopover(true)}
        >
          <Trash2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-4 justify-center items-center">
          <p className="font-semibold text-center">
            Are you sure you want to delete this region?
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
              onClick={() => deleteRegionHandler(polygon.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
