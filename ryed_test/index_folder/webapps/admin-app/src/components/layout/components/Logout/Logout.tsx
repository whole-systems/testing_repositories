import { Button } from '@/components/ui/Button/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog/Dialog';
import { logout } from '@/utils/logout/logout';
import { FC, useCallback, useState } from 'react';

export const Logout: FC = () => {
  const [open, setOpen] = useState(false);
  const handleLogout = useCallback(() => {
    setOpen(false);
    logout();
  }, []);
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild className="w-full">
        <Button variant="destructive">Logout</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Logout</DialogTitle>
          <DialogDescription>Are you sure?</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2"></div>
        <DialogFooter className="sm:justify-start">
          <div className="flex justify-end w-full">
            <Button
              className="mr-3"
              type="button"
              variant="destructive"
              onClick={handleLogout}
            >
              Logout
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
