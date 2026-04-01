import { Button } from '@ryed/ui/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ryed/ui/ui/Dialog';
import { Input } from '@ryed/ui/ui/Input';
import { FC, useCallback, useState } from 'react';
import { Pencil } from 'lucide-react';
import { useUpdateJourneyPriceMutation } from '@/api/journeysEndpoints';
import { TJourney } from '@/models/journey';
import { toast } from 'sonner';

export const UpdatePriceDialog: FC<{ journey: TJourney }> = ({ journey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [newPrice, setNewPrice] = useState('');
  const [updateJourneyPrice, { isLoading }] = useUpdateJourneyPriceMutation();

  const rawPrice =
    journey.currency === 'USD'
      ? journey.tripPriceUSD
      : journey.tripPrice;

  const currencyLabel = journey.currency || 'USD';

  const formattedCurrentPrice =
    rawPrice != null
      ? currencyLabel === 'USD'
        ? `$${rawPrice.toFixed(2)}`
        : `${rawPrice.toFixed(2)} ${currencyLabel}`
      : 'N/A';

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setIsConfirming(false);
      setNewPrice('');
    }
  }, []);

  const handleNext = useCallback(() => {
    const parsed = parseFloat(newPrice);
    if (isNaN(parsed) || parsed <= 0) {
      toast.error('Please enter a valid positive price.');
      return;
    }
    setIsConfirming(true);
  }, [newPrice]);

  const handleConfirm = useCallback(async () => {
    try {
      await updateJourneyPrice({
        journeyId: journey.id,
        newPrice: parseFloat(newPrice),
      }).unwrap();
      toast.success('Price updated successfully.');
      handleOpenChange(false);
    } catch {
      toast.error('Failed to update price.');
    }
  }, [journey.id, newPrice, updateJourneyPrice, handleOpenChange]);

  const handleBack = useCallback(() => {
    setIsConfirming(false);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6 ml-2">
          <Pencil className="h-3.5 w-3.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {!isConfirming ? (
          <>
            <DialogHeader>
              <DialogTitle>Update Journey Price</DialogTitle>
              <DialogDescription>
                Current price: {formattedCurrentPrice}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <label className="text-sm font-medium mb-2 block">
                New Price ({currencyLabel})
              </label>
              <Input
                type="number"
                placeholder="Enter new price"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => handleOpenChange(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleNext} disabled={!newPrice}>
                Next
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Confirm Price Change</DialogTitle>
              <DialogDescription>
                Are you sure you want to change the price from{' '}
                <strong>{formattedCurrentPrice}</strong> to{' '}
                <strong>
                  {currencyLabel === 'USD'
                    ? `$${parseFloat(newPrice).toFixed(2)}`
                    : `${parseFloat(newPrice).toFixed(2)} ${currencyLabel}`}
                </strong>
                ?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleConfirm} disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Confirm'}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

