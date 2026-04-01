import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@ryed/ui';
import { FC } from 'react';

interface DeleteModalProps {
  isOpen: boolean;
  onDelete: () => void;
  onClose: () => void;
  isLoading: boolean;
}

export const DeleteModal: FC<DeleteModalProps> = ({
  isOpen,
  onDelete,
  onClose,
  isLoading,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Price Rule</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this price rule?
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" disabled={isLoading} onClick={onDelete}>
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
